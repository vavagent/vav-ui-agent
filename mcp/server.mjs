#!/usr/bin/env node
/**
 * VAV UI-agent MCP server（零依赖，stdio）
 *
 * 把 702 个 UI 变体当成「参照物库」提供给 AI：
 *   search          按关键词/标签/分类收窄范围（只返回元数据，不烧上下文）
 *   get_inspiration 按技术栈与标签重排候选（对应 21st.dev 的 get_inspiration）
 *   get_variant     取单个变体的 Markdown（设计说明 + 一句话 + 改造模板）
 *   get_catalog     全库目录 Markdown
 *   list_categories 分类清单
 *
 * 用法（在 Cursor / Claude Code 的 MCP 配置里）：
 *   { "command": "node", "args": ["<仓库路径>/mcp/server.mjs"], "env": { "VAV_UI_LOCAL_DIR": "<仓库路径>/public" } }
 * 不配 env 时从 https://ui.vavagent.com 拉取（带磁盘缓存）。
 */
import { createInterface } from 'node:readline'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { homedir } from 'node:os'

const BASE = (process.env.VAV_UI_BASE || 'https://ui.vavagent.com').replace(/\/+$/, '')
const LOCAL = process.env.VAV_UI_LOCAL_DIR || ''
const CACHE_DIR = resolve(homedir(), '.cache', 'vav-ui-mcp')
const TTL = 10 * 60 * 1000

let indexCache = null
let catalogCache = null

function cachePath(name) {
  return resolve(CACHE_DIR, name)
}

function readLocal(rel) {
  return readFileSync(resolve(LOCAL, rel), 'utf8')
}

async function fetchText(rel, cacheName) {
  if (LOCAL) return readLocal(rel.replace(/^\//, ''))
  const cached = cachePath(cacheName)
  try {
    if (existsSync(cached)) {
      const stat = readFileSync(cached, 'utf8')
      const meta = JSON.parse(stat)
      if (Date.now() - meta.at < TTL && meta.body) return meta.body
    }
  } catch {}
  const res = await fetch(`${BASE}${rel}`)
  if (!res.ok) throw new Error(`${rel} → HTTP ${res.status}`)
  const body = await res.text()
  try {
    mkdirSync(CACHE_DIR, { recursive: true })
    writeFileSync(cached, JSON.stringify({ at: Date.now(), body }), 'utf8')
  } catch {}
  return body
}

async function loadIndex() {
  if (indexCache) return indexCache
  indexCache = JSON.parse(await fetchText('/search.json', 'search.json'))
  return indexCache
}

async function loadCatalog() {
  if (catalogCache) return catalogCache
  catalogCache = await fetchText('/catalog.md', 'catalog.md')
  return catalogCache
}

async function loadMd(slug) {
  return fetchText(`/api/v/${slug}.md`, `v/${slug}.md`)
}

/* ---------- 工具实现 ---------- */

function bullet(v, extra = '') {
  const tags = (v.tags || []).slice(0, 6).join('、')
  return `- **${v.name}**（${v.slug}，${v.catName}）${tags ? ` · ${tags}` : ''}\n  ${v.desc || ''}${extra ? `\n  ${extra}` : ''}\n  ${BASE}/v/${v.slug}/`
}

async function toolSearch({ query = '', tags = [], category = '', limit = 8 } = {}) {
  const idx = await loadIndex()
  const q = String(query).toLowerCase().trim()
  const wantTags = tags.map((t) => String(t).toLowerCase())
  const cat = String(category).toLowerCase().trim()

  const rows = idx.variants
  const byCat = cat
    ? rows.filter((v) => v.cat.toLowerCase() === cat || v.catName.toLowerCase().includes(cat))
    : rows
  const matchQuery = (v) =>
    [v.name, v.desc, v.gist, (v.tags || []).join(' ')].join(' ').toLowerCase().includes(q)
  const matchTags = (v) =>
    wantTags.some((t) => (v.tags || []).some((x) => x.toLowerCase() === t))

  let hits = byCat
  if (q) hits = hits.filter(matchQuery)
  if (wantTags.length) hits = hits.filter(matchTags)

  // 关键词 + 标签同时给且交集为空时，退化成并集，避免「什么都搜不到」
  if (!hits.length && q && wantTags.length) {
    const qRows = byCat.filter(matchQuery)
    const tRows = byCat.filter(matchTags)
    hits = [...new Set([...qRows, ...tRows])].slice(0, Math.max(limit * 2, 12))
  }

  if (!hits.length) {
    return `没有匹配的变体（query="${query}" tags=${wantTags.join('、') || '空'} category=${category || '不限'}）。全库 ${idx.total} 个变体，可先用 list_categories 看分类，或放宽条件。`
  }

  const head = `共 ${hits.length} 个匹配，返回前 ${Math.min(limit, hits.length)} 个（取细节用 get_variant 传 slug）：\n`
  return head + hits.slice(0, limit).map((v) => bullet(v, v.gist)).join('\n')
}

async function toolInspiration({ tags = [], category = '', stack = '', limit = 5 } = {}) {
  const idx = await loadIndex()
  const wantTags = tags.map((t) => String(t).toLowerCase())
  const stackWords = String(stack).toLowerCase().split(/[\s,+/]+/).filter(Boolean)
  const cat = String(category).toLowerCase().trim()

  const scored = idx.variants.map((v) => {
    const vt = (v.tags || []).map((t) => t.toLowerCase())
    let score = 0
    if (cat && (v.cat.toLowerCase() === cat || v.catName.toLowerCase().includes(cat))) score += 6
    for (const t of wantTags) if (vt.includes(t)) score += 4
    for (const s of stackWords) {
      if (vt.includes(s)) score += 3
      else if (vt.some((x) => x.includes(s))) score += 1
    }
    // 标签信息越完整的变体，越可能是这条分类里的「主推形态」
    score += Math.min(vt.length, 8) / 8
    return { v, score }
  })

  const top = scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  if (!top.length) return `没有按这些条件排出来的候选（tags: ${wantTags.join('、') || '空'}）。先用 search 收窄。`

  return (
    `按 ${wantTags.join(' / ') || '无标签'}${stack ? ` + ${stack}` : ''} 重排后的候选，按相关度降序：\n` +
    top.map((x, i) => `${i + 1}. ${x.v.name}（${x.v.slug}，相关度 ${x.score.toFixed(1)}）\n   ${x.v.gist || x.v.desc}\n   ${BASE}/v/${x.v.slug}/`).join('\n') +
    `\n\n确认哪一个，再用 get_variant 取它的完整提示词。`
  )
}

async function toolGetVariant({ slug = '' } = {}) {
  const s = String(slug).trim()
  if (!/^[a-z0-9-]+$/.test(s)) return `slug 不合法：${s}（形如 card-001）`
  try {
    return await loadMd(s)
  } catch (e) {
    return `取 ${s} 失败：${e.message}。先用 search 找到正确的 slug。`
  }
}

async function toolGetCatalog() {
  return await loadCatalog()
}

async function toolListCategories() {
  const idx = await loadIndex()
  return (
    `全库 ${idx.total} 个变体，${idx.categories.length} 个分类：\n\n` +
    idx.categories.map((c) => `- ${c.name}（${c.slug}）· ${c.group} · ${c.count} 个 · 用法: search({category:"${c.slug}"})`).join('\n')
  )
}

const TOOLS = [
  {
    name: 'search',
    description: '在 VAV UI-agent 素材库里按关键词 / 风格标签 / 分类搜索 UI 变体，只返回名称、标签、一句话和链接（不返回代码，省上下文）。',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: '关键词，如「定价」「侧边栏」' },
        tags: { type: 'array', items: { type: 'string' }, description: '风格标签，如 Linear / 极简 / 玻璃拟态' },
        category: { type: 'string', description: '分类 slug 或名称，如 card / 卡片' },
        limit: { type: 'number', description: '返回条数，默认 8' }
      }
    }
  },
  {
    name: 'get_inspiration',
    description: '按指定风格标签与项目技术栈给候选变体打分重排，返回最贴合的几条，用于「挑参照」而不是逐个翻。',
    inputSchema: {
      type: 'object',
      properties: {
        tags: { type: 'array', items: { type: 'string' }, description: '想要的风格标签' },
        category: { type: 'string', description: '限定分类 slug 或名称' },
        stack: { type: 'string', description: '项目技术栈 / 设计体系，如 Vue Quasar antd' },
        limit: { type: 'number', description: '返回条数，默认 5' }
      }
    }
  },
  {
    name: 'get_variant',
    description: '取单个变体的 Markdown：设计说明、一句话、可直接用的「改造模板」提示词、相关变体。',
    inputSchema: {
      type: 'object',
      properties: { slug: { type: 'string', description: '变体 slug，如 card-001' } },
      required: ['slug']
    }
  },
  {
    name: 'get_catalog',
    description: '取全库目录 Markdown（702 个变体按分类列出）。适合需要整体了解有哪些组件时一次性读入。',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'list_categories',
    description: '列出全部分类及其变体数量，便于决定去哪个分类里搜。',
    inputSchema: { type: 'object', properties: {} }
  }
]

const HANDLERS = {
  search: toolSearch,
  get_inspiration: toolInspiration,
  get_variant: toolGetVariant,
  get_catalog: toolGetCatalog,
  list_categories: toolListCategories
}

/* ---------- JSON-RPC over stdio ---------- */

function send(msg) {
  process.stdout.write(JSON.stringify(msg) + '\n')
}

async function handle(msg) {
  const { id, method, params } = msg || {}
  const isNotification = id === undefined || id === null
  if (isNotification) return // 通知不需要回复

  if (method === 'initialize') {
    send({
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: params?.protocolVersion || '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: { name: 'vav-ui-agent', version: '1.0.0' }
      }
    })
    return
  }

  if (method === 'ping') {
    send({ jsonrpc: '2.0', id, result: {} })
    return
  }

  if (method === 'tools/list') {
    send({ jsonrpc: '2.0', id, result: { tools: TOOLS } })
    return
  }

  if (method === 'tools/call') {
    const name = params?.name
    const handler = HANDLERS[name]
    if (!handler) {
      send({ jsonrpc: '2.0', id, error: { code: -32602, message: `未知工具：${name}` } })
      return
    }
    try {
      const text = await handler(params?.arguments || {})
      send({ jsonrpc: '2.0', id, result: { content: [{ type: 'text', text }], isError: false } })
    } catch (e) {
      send({
        jsonrpc: '2.0',
        id,
        result: { content: [{ type: 'text', text: `执行失败：${e.message}` }], isError: true }
      })
    }
    return
  }

  send({ jsonrpc: '2.0', id, error: { code: -32601, message: `不支持的方法：${method}` } })
}

const rl = createInterface({ input: process.stdin, terminal: false })
rl.on('line', (line) => {
  const t = line.trim()
  if (!t) return
  let msg
  try {
    msg = JSON.parse(t)
  } catch {
    send({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'JSON 解析失败' } })
    return
  }
  handle(msg).catch((e) => {
    if (msg && msg.id) send({ jsonrpc: '2.0', id: msg.id, error: { code: -32603, message: e.message } })
  })
})
