import { readFileSync } from 'node:fs'

// 变体详情页在构建期逐个预渲染，路由列表来自 make-catalog 的产物
const catalog = JSON.parse(readFileSync('public/catalog.json', 'utf8'))
const variantRoutes = (catalog.components || []).map((c: { slug: string }) => `/v/${c.slug}`)

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  ssr: true,
  app: {
    head: {
      title: 'UI 素材库 · 提示词手册',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#5e6ad2' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest.json' }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  experimental: {
    // 把 SSR 取到的数据抽到 _payload.json，HTML 保持轻量
    payloadExtraction: true
  },
  nitro: {
    storage: {},
    // SSG：构建期把页面预渲染成静态 HTML（内容页 + 702 个变体详情页）
    prerender: {
      routes: ['/', '/guide', '/filter', '/stats', ...variantRoutes],
      crawlLinks: false
    }
  }
})
