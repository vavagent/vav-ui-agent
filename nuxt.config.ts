export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  ssr: true,
  app: {
    head: {
      title: 'UI 素材库 · 提示词手册',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
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
    // SSG：构建期把三个页面预渲染成静态 HTML，数据由 public/catalog.json 提供
    prerender: {
      routes: ['/', '/guide', '/filter'],
      crawlLinks: true
    }
  }
})
