// 构建期把素材库导出成静态文件，供前端一次性加载并本地筛选。
// 数据源：server/database/seed-snapshot.json（与线上 SQLite 首次装载的内容一致）。
//
// 产物：
//   public/catalog.json        全量数据（首页用）
//   public/search.json         精简索引（给 AI / 脚本按需取，约 100KB）
//   public/catalog.md          全库目录的 Markdown 版（AI 直接读）
//   public/api/v/<slug>.json   单个变体的完整数据（详情页按需取）
//   public/api/v/<slug>.md     单个变体的 Markdown 版（把链接丢给 AI 即可）
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const snapshotPath = resolve(root, 'server/database/seed-snapshot.json')
const outDir = resolve(root, 'public')
const apiDir = resolve(outDir, 'api/v')

const snapshot = JSON.parse(readFileSync(snapshotPath, 'utf8'))
const categories = snapshot.categories || []
const components = snapshot.components || []

const parseTags = (v) => {
  if (!v) return []
  if (Array.isArray(v)) return v
  try {
    const parsed = JSON.parse(v)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const counts = new Map()
for (const c of components) counts.set(c.cat, (counts.get(c.cat) || 0) + 1)

const groupMap = {}
const catMeta = {}
for (const [i, c] of categories.entries()) {
  const row = {
    id: i + 1,
    slug: c.slug,
    name: c.name,
    grp: c.grp,
    sort: c.sort ?? i + 1,
    count: counts.get(c.slug) || 0
  }
  ;(groupMap[row.grp] ||= []).push(row)
  catMeta[c.slug] = { name: c.name, grp: c.grp }
}

/* slug：分类内按 sort + 原始顺序编号，形如 card-012，稳定且短 */
const seqByCat = new Map()
const slugOf = (c) => {
  const n = (seqByCat.get(c.cat) || 0) + 1
  seqByCat.set(c.cat, n)
  return `${c.cat}-${String(n).padStart(3, '0')}`
}

const sorted = components
  .slice()
  .sort((a, b) => (a.cat || '').localeCompare(b.cat || '') || (a.sort ?? 0) - (b.sort ?? 0))
  .map((c) => {
    const tags = parseTags(c.tags)
    return {
      slug: slugOf(c),
      category_slug: c.cat,
      name: c.name,
      description: c.desc || '',
      tags,
      preview_html: c.preview || '',
      prompt: (c.prompt || '').trim(),
      sort: c.sort ?? 0
    }
  })

/* 三种粒度的提示词：原始设计说明 / 一句话 / 改造现有页面的模板 */
const firstLine = (s) => ((s || '').split('\n')[0] || '').trim()
const clip = (s, n) => (s.length > n ? s.slice(0, n).replace(/[，,、\s]+$/, '') + '…' : s)

function compactPrompt(v) {
  const gist = v.description || firstLine(v.prompt) || v.name
  const style = v.tags.slice(0, 4).join(' / ')
  return `${v.name}：${clip(gist, 40)}${style ? ` 风格 ${style}` : ''}`
}

function refactorPrompt(v) {
  const style = v.tags.slice(0, 6).join(' / ') || '按参照描述'
  const spec = v.prompt ? `\n参照描述：\n${v.prompt}\n` : `\n参照：同名组件「${v.name}」的常见形态（${v.description || '见预览'}）。\n`
  return `把现有页面里的「${v.name}」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。
${spec}
约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：${style}`
}

const rows = sorted.map((v, i) => ({
  id: i + 1,
  slug: v.slug,
  category_slug: v.category_slug,
  name: v.name,
  description: v.description,
  tags: v.tags,
  preview_html: v.preview_html,
  prompt: v.prompt,
  prompt_short: compactPrompt(v),
  sort: v.sort
}))

const catalog = { groups: groupMap, components: rows, generated_at: new Date().toISOString() }

mkdirSync(outDir, { recursive: true })
writeFileSync(resolve(outDir, 'catalog.json'), JSON.stringify(catalog), 'utf8')

/* 精简索引：只留检索需要的字段 */
const index = {
  generated_at: catalog.generated_at,
  site: 'https://ui.vavagent.com',
  total: rows.length,
  categories: Object.entries(catMeta)
    .map(([slug, m]) => ({ slug, name: m.name, group: m.grp, count: counts.get(slug) || 0 }))
    .sort((a, b) => b.count - a.count),
  variants: rows.map((v) => ({
    slug: v.slug,
    name: v.name,
    cat: v.category_slug,
    catName: catMeta[v.category_slug]?.name || v.category_slug,
    tags: v.tags,
    desc: clip(v.description, 60),
    gist: v.prompt_short,
    url: `/v/${v.slug}/`
  }))
}
writeFileSync(resolve(outDir, 'search.json'), JSON.stringify(index), 'utf8')

/* 全库目录 Markdown：AI 一次读完就知道有什么 */
const mdLines = [
  '# VAV UI-agent 组件视觉与提示词素材库',
  '',
  `> ${rows.length} 个组件变体 / ${counts.size} 个分类，按组件类型分组；每个变体都有页面链接、风格标签和三种粒度的提示词。`,
  '> 单变体 Markdown：把 `/api/v/<slug>.md` 直接丢给 AI 即可。',
  ''
]
for (const grp of Object.keys(groupMap)) {
  mdLines.push(`## ${grp}`, '')
  for (const cat of groupMap[grp]) {
    mdLines.push(`### ${cat.name}（${cat.slug}，${cat.count} 个）`, '')
    for (const v of rows.filter((r) => r.category_slug === cat.slug)) {
      const t = v.tags.slice(0, 4).join('、')
      mdLines.push(`- [${v.name}](/v/${v.slug}/) — ${v.description || v.name}${t ? `（${t}）` : ''}`)
    }
    mdLines.push('')
  }
}
writeFileSync(resolve(outDir, 'catalog.md'), mdLines.join('\n'), 'utf8')

/* 单变体：JSON + Markdown，清空旧目录避免残留过期文件 */
rmSync(apiDir, { recursive: true, force: true })
mkdirSync(apiDir, { recursive: true })

const byCat = new Map()
for (const v of rows) {
  const list = byCat.get(v.category_slug) || []
  list.push(v)
  byCat.set(v.category_slug, list)
}

for (const v of rows) {
  const related = (byCat.get(v.category_slug) || [])
    .filter((r) => r.slug !== v.slug)
    .slice(0, 6)
    .map((r) => ({ slug: r.slug, name: r.name, tags: r.tags.slice(0, 3) }))

  const payload = {
    ...v,
    category_name: catMeta[v.category_slug]?.name || v.category_slug,
    category_group: catMeta[v.category_slug]?.grp || '',
    prompt_refactor: refactorPrompt(v),
    url: `/v/${v.slug}/`,
    md_url: `/api/v/${v.slug}.md`,
    related
  }
  writeFileSync(resolve(apiDir, `${v.slug}.json`), JSON.stringify(payload), 'utf8')

  const refactor = payload.prompt_refactor

  const md = [
    `# ${v.name}`,
    '',
    `- 分类：${payload.category_name}（${v.category_slug}）`,
    `- 分组：${payload.category_group}`,
    `- 风格标签：${v.tags.join('、') || '无'}`,
    `- 页面：https://ui.vavagent.com/v/${v.slug}/`,
    '',
    '## 设计说明',
    '',
    v.prompt || v.description || v.name,
    '',
    '## 一句话描述',
    '',
    v.prompt_short,
    '',
    '## 改造现有页面用的提示词',
    '',
    '```text',
    refactor,
    '```',
    '',
    '## 同分类其他变体',
    '',
    ...related.map((r) => `- ${r.name}（/v/${r.slug}/）`)
  ].join('\n')
  writeFileSync(resolve(apiDir, `${v.slug}.md`), md, 'utf8')
}

const kb = (f) => (readFileSync(resolve(outDir, f)).length / 1024).toFixed(0)
console.log(
  `[catalog] ${categories.length} 个分类 / ${rows.length} 个变体 → catalog.json（${kb('catalog.json')} KB）、` +
    `search.json（${kb('search.json')} KB）、catalog.md、api/v/ ${rows.length} 组 json+md`
)
