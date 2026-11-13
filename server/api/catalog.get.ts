import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

// 构建期（prerender）用：直接读构建脚本产出的 public/catalog.json
export default defineEventHandler(async () => {
  const file = resolve(process.cwd(), 'public/catalog.json')
  return JSON.parse(await readFile(file, 'utf8'))
})
