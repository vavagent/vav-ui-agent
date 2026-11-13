<script setup>
const router = useRouter()

const data = ref(null)
const catNames = ref({})
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  const [stats, catalog] = await Promise.allSettled([
    fetch('/stats.json', { cache: 'no-store' }).then(r => (r.ok ? r.json() : Promise.reject(new Error(`stats.json ${r.status}`)))),
    fetch('/catalog.json').then(r => (r.ok ? r.json() : null))
  ])
  if (stats.status === 'fulfilled') data.value = stats.value
  else error.value = String(stats.reason && stats.reason.message ? stats.reason.message : stats.reason)

  if (catalog.status === 'fulfilled' && catalog.value) {
    const map = {}
    for (const group of Object.values(catalog.value.groups || {})) {
      for (const c of group) if (c && c.slug) map[c.slug] = c.name
    }
    catNames.value = map
  }
  loading.value = false
})

const days = computed(() => Object.entries((data.value && data.value.days) || {}))
const dayList = computed(() =>
  days.value
    .map(([date, d]) => ({ date, pv: d.pv || 0, uv: (d.ips || []).length, cats: d.cats || {}, copies: d.copies || {}, searches: d.searches || {} }))
    .sort((a, b) => (a.date < b.date ? -1 : 1))
)
const recent = computed(() => dayList.value.slice(-14))
const maxPv = computed(() => Math.max(1, ...recent.value.map(d => d.pv)))
const today = computed(() => (dayList.value.length ? dayList.value[dayList.value.length - 1] : null))
const totalPv = computed(() => dayList.value.reduce((s, d) => s + d.pv, 0))
const totalUv = computed(() => {
  const ips = new Set()
  for (const [, d] of days.value) for (const ip of d.ips || []) ips.add(ip)
  return ips.size
})

function sum(key, dateFrom) {
  const acc = {}
  for (const [date, d] of days.value) {
    if (dateFrom && date < dateFrom) continue
    for (const [k, v] of Object.entries(d[key] || {})) acc[k] = (acc[k] || 0) + v
  }
  return Object.entries(acc).sort((a, b) => b[1] - a[1])
}

function dateBefore(n) {
  const latest = dayList.value.length ? dayList.value[dayList.value.length - 1].date : ''
  if (!latest) return ''
  const d = new Date(`${latest}T00:00:00+08:00`)
  d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}

const topCatsToday = computed(() => (today.value ? Object.entries(today.value.cats).sort((a, b) => b[1] - a[1]).slice(0, 10) : []))
const topCopies7 = computed(() => sum('copies', dateBefore(6)).slice(0, 10))
const topSearch7 = computed(() => sum('searches', dateBefore(6)).slice(0, 10))
const topTags7 = computed(() => sum('tags', dateBefore(6)).slice(0, 14))
</script>

<template>
  <div class="stats-page">
    <header class="stats-header">
      <div class="back" @click="router.push('/')">← 返回素材库</div>
      <h1>数据看板</h1>
      <p class="sub">访问量与使用偏好，数据来自站点内嵌埋点（不含第三方统计）</p>
    </header>

    <div v-if="loading" class="hint">加载中…</div>
    <div v-else-if="error" class="hint">暂时读不到统计数据：{{ error }}</div>

    <div v-else class="stats-body">
      <section class="kpis">
        <div class="kpi">
          <span class="kpi-label">今日访问（PV）</span>
          <strong>{{ today ? today.pv : 0 }}</strong>
        </div>
        <div class="kpi">
          <span class="kpi-label">今日访客（UV）</span>
          <strong>{{ today ? today.uv : 0 }}</strong>
        </div>
        <div class="kpi">
          <span class="kpi-label">累计访问</span>
          <strong>{{ totalPv }}</strong>
        </div>
        <div class="kpi">
          <span class="kpi-label">累计访客</span>
          <strong>{{ totalUv }}</strong>
        </div>
      </section>

      <section class="panel">
        <h2>最近 14 天</h2>
        <div v-if="!recent.length" class="hint">还没有数据</div>
        <div v-else class="bars">
          <div v-for="d in recent" :key="d.date" class="bar-row">
            <span class="bar-date">{{ d.date.slice(5) }}</span>
            <div class="bar-track">
              <div class="bar-fill" :style="{ width: Math.max(2, Math.round((d.pv / maxPv) * 100)) + '%' }"></div>
            </div>
            <span class="bar-num">{{ d.pv }} PV / {{ d.uv }} UV</span>
          </div>
        </div>
      </section>

      <div class="grid">
        <section class="panel">
          <h2>今日热门分类</h2>
          <div v-if="!topCatsToday.length" class="hint">还没有数据</div>
          <ul v-else class="rank">
            <li v-for="([slug, n], i) in topCatsToday" :key="slug">
              <span class="idx">{{ i + 1 }}</span>
              <span class="name">{{ catNames[slug] || slug }}</span>
              <span class="count">{{ n }}</span>
            </li>
          </ul>
        </section>

        <section class="panel">
          <h2>最常复制的组件（近 7 天）</h2>
          <div v-if="!topCopies7.length" class="hint">还没有数据</div>
          <ul v-else class="rank">
            <li v-for="([name, n], i) in topCopies7" :key="name">
              <span class="idx">{{ i + 1 }}</span>
              <span class="name">{{ name }}</span>
              <span class="count">{{ n }}</span>
            </li>
          </ul>
        </section>
      </div>

      <section class="panel">
        <h2>搜索词（近 7 天）</h2>
        <div v-if="!topSearch7.length" class="hint">还没有数据</div>
        <div v-else class="tags">
          <span v-for="([q, n]) in topSearch7" :key="q" class="tag">{{ q }} <em>{{ n }}</em></span>
        </div>
      </section>

      <section class="panel">
        <h2>风格标签筛选（近 7 天）</h2>
        <div v-if="!topTags7.length" class="hint">还没有数据</div>
        <div v-else class="tags">
          <span v-for="([t, n]) in topTags7" :key="t" class="tag">{{ t }} <em>{{ n }}</em></span>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.stats-page{max-width:1040px;margin:0 auto;padding:24px 20px 64px}
.stats-header{margin-bottom:20px}
.back{display:inline-block;font-size:13px;color:var(--text-3);cursor:pointer;margin-bottom:8px}
.back:hover{color:var(--accent)}
h1{font-size:24px;margin:20px 0 6px}
.sub{color:var(--text-3);font-size:13px;margin:0}
.stats-body{display:flex;flex-direction:column;gap:16px}
.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.kpi{background:var(--panel-2);border:1px solid var(--border);border-radius:var(--radius-sm);padding:14px 16px}
.kpi-label{display:block;font-size:12px;color:var(--text-3);margin-bottom:6px}
.kpi strong{font-size:26px;font-weight:600}
.panel{background:#fff;border:1px solid var(--border);border-radius:var(--radius-sm);padding:16px 20px}
.panel h2{font-size:15px;margin:0 0 12px}
.bars{display:flex;flex-direction:column;gap:6px}
.bar-row{display:grid;grid-template-columns:52px 1fr 110px;align-items:center;gap:10px;font-size:12px;color:var(--text-3)}
.bar-track{height:8px;background:var(--panel-2);border-radius:4px;overflow:hidden}
.bar-fill{height:100%;background:var(--accent);border-radius:4px}
.bar-num{text-align:right;font-variant-numeric:tabular-nums;color:var(--text-2)}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.rank{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}
.rank li{display:flex;align-items:center;gap:10px;font-size:13px}
.idx{width:18px;color:var(--text-3);font-size:12px}
.name{flex:1;color:var(--text-1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.count{color:var(--accent);font-variant-numeric:tabular-nums;font-weight:500}
.tags{display:flex;flex-wrap:wrap;gap:8px}
.tag{font-size:12px;padding:4px 10px;border-radius:12px;background:var(--panel-2);border:1px solid var(--border)}
.tag em{font-style:normal;color:var(--accent);margin-left:4px}
.hint{color:var(--text-3);font-size:13px;padding:12px 0}
@media (max-width:760px){.kpis{grid-template-columns:1fr 1fr}.grid{grid-template-columns:1fr}}
</style>
