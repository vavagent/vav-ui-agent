// 构建期把素材库导出成静态 catalog.json，供前端一次性加载并本地筛选。
// 数据源：server/database/seed-snapshot.json（与线上 SQLite 首次装载的内容一致）。
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const snapshotPath = resolve(root, 'server/database/seed-snapshot.json')
const outDir = resolve(root, 'public')
const outPath = resolve(outDir, 'catalog.json')

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
}

const rows = components
  .slice()
  .sort((a, b) => (a.cat || '').localeCompare(b.cat || '') || (a.sort ?? 0) - (b.sort ?? 0))
  .map((c, i) => ({
    id: i + 1,
    category_slug: c.cat,
    name: c.name,
    description: c.desc || '',
    tags: parseTags(c.tags),
    preview: c.preview || '',
    prompt: c.prompt || '',
    sort: c.sort ?? i + 1
  }))

const catalog = { groups: groupMap, components: rows, generated_at: new Date().toISOString() }

mkdirSync(outDir, { recursive: true })
writeFileSync(outPath, JSON.stringify(catalog), 'utf8')

const size = (readFileSync(outPath).length / 1024).toFixed(0)
console.log(`[catalog] ${categories.length} 个分类 / ${rows.length} 个变体 → public/catalog.json（${size} KB）`)
