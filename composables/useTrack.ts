/**
 * 极简埋点：GET /collect.gif?ev=...&cat=...&name=...
 * 由 nginx 记录到日志，再由服务器定时任务汇总成 /stats.json。
 * 只在客户端触发，不阻塞交互，失败静默。
 */
export function track(event: string, params: Record<string, string | number | undefined | null> = {}) {
  if (!import.meta.client) return
  try {
    const qs = new URLSearchParams({ ev: event })
    for (const [k, v] of Object.entries(params)) {
      if (v === undefined || v === null || v === '') continue
      qs.set(k, String(v))
    }
    fetch(`/collect.gif?${qs.toString()}`, {
      method: 'GET',
      keepalive: true,
      cache: 'no-store'
    }).catch(() => {})
  } catch {
    /* 埋点失败不影响页面 */
  }
}
