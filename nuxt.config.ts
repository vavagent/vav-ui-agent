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
  nitro: {
    storage: {}
  }
})
