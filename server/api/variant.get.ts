import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

// 构建期（prerender）用：直接读构建脚本产出的 public/api/v/<slug>.json
export default defineEventHandler(async (event) => {
  const slug = String(getQuery(event).slug || '')
  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw createError({ statusCode: 400, statusMessage: 'bad slug' })
  }
  const file = resolve(process.cwd(), 'public/api/v', `${slug}.json`)
  return JSON.parse(await readFile(file, 'utf8'))
})
