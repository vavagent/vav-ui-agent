import db from '../database'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const cat = (query.cat as string) || 'nav'
  const q = (query.q as string || '').trim().toLowerCase()
  const tag = (query.tag as string || '').trim()

  let sql = 'SELECT * FROM components WHERE category_slug = @cat'
  const params: any = { cat }

  if (tag) {
    // tags 是 JSON 数组字符串，用 LIKE 粗匹配（数据量小够用）
    sql += ' AND tags LIKE @tag'
    params.tag = `%"${tag}"%`
  }
  if (q) {
    sql += ' AND (LOWER(name) LIKE @q OR LOWER(description) LIKE @q OR LOWER(prompt) LIKE @q)'
    params.q = `%${q}%`
  }
  sql += ' ORDER BY sort ASC'

  const rows = db.prepare(sql).all(params) as any[]
  // parse tags
  return rows.map(r => ({
    ...r,
    tags: safeParse(r.tags)
  }))
})

function safeParse(s: any): string[] {
  if (!s) return []
  if (Array.isArray(s)) return s
  try { return JSON.parse(s) } catch { return [] }
}
