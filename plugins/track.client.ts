export default defineNuxtPlugin(() => {
  const router = useRouter()

  // 只在 path 变化时记 PV（搜索词、切分类这类 query 变化不算新访问）。
  // 用 window 上的标记去重，避免插件/HMR 等情况重复注册导致重复计数。
  router.afterEach((to) => {
    const w = window as unknown as { __vavPvPath?: string }
    if (w.__vavPvPath === to.path) return
    w.__vavPvPath = to.path
    track('pv', {
      path: to.path,
      cat: (to.query.cat as string) || '',
      q: (to.query.q as string) || ''
    })
  })
})
