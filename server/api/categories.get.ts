import db from '../database'

export default defineEventHandler(() => {
  const rows = db.prepare(`
    SELECT id, slug, name, grp, sort FROM categories ORDER BY sort ASC
  `).all() as Array<{ id: number; slug: string; name: string; grp: string; sort: number }>

  // 统计每个分类下的组件数
  const counts = db.prepare(`
    SELECT category_slug, COUNT(*) AS c FROM components GROUP BY category_slug
  `).all() as Array<{ category_slug: string; c: number }>
  const map = Object.fromEntries(counts.map(r => [r.category_slug, r.c]))

  // 按 grp 分组
  const groups: Record<string, Array<any>> = {}
  for (const r of rows) {
    if (!groups[r.grp]) groups[r.grp] = []
    groups[r.grp].push({ ...r, count: map[r.slug] || 0 })
  }
  return groups
})
