<script setup>
const route = useRoute()
const router = useRouter()
const slug = computed(() => String(route.params.slug || ''))

const { data: v, error } = await useAsyncData(
  () => `variant-${slug.value}`,
  () =>
    $fetch(
      import.meta.server
        ? `/api/variant?slug=${slug.value}`
        : `/api/v/${slug.value}.json`
    ),
  { watch: [slug] }
)

const mode = ref('auto') // auto | 768 | 375
const width = computed(() => (mode.value === 'auto' ? '100%' : `${mode.value}px`))

const tab = ref('refactor') // refactor | full | short
const tabs = [
  { key: 'refactor', label: '改造模板（推荐）', hint: '改现有页面用这个：只动样式，不动结构' },
  { key: 'full', label: '原始设计说明', hint: '从零做一个组件时用' },
  { key: 'short', label: '一句话', hint: '只要一个感觉，快速试' }
]
const currentText = computed(() => {
  if (!v.value) return ''
  if (tab.value === 'refactor') return v.value.prompt_refactor || ''
  if (tab.value === 'short') return v.value.prompt_short || ''
  return v.value.prompt || ''
})

const toast = ref('')
async function copyText(text, label) {
  if (v.value) track('copy', { cat: v.value.category_slug, name: v.value.name, q: label })
  try {
    await navigator.clipboard.writeText(text)
    toast.value = '已复制'
    setTimeout(() => (toast.value = ''), 1200)
  } catch {
    toast.value = '复制失败，请手动选择'
    setTimeout(() => (toast.value = ''), 1600)
  }
}

function copyMdLink() {
  const url = `https://ui.vavagent.com/api/v/${slug.value}.md`
  copyText(url, 'md')
}

onMounted(() => {
  if (v.value) track('view', { cat: v.value.category_slug, name: v.value.name })
})

useHead(() => ({
  title: v.value ? `${v.value.name} · VAV UI-agent` : 'VAV UI-agent',
  meta: [{ name: 'description', content: v.value ? `${v.value.name}：${v.value.description || ''} 含预览与可直接复制的提示词。` : '' }]
}))
</script>

<template>
  <div class="detail">
    <header class="topbar">
      <div class="topbar-inner">
        <NuxtLink to="/" class="logo">
          <span class="logo-mark">V</span>
          <span class="logo-name">VAV UI-agent</span>
        </NuxtLink>
        <div class="topbar-right">
          <NuxtLink class="topbar-link" to="/guide">使用教程</NuxtLink>
          <NuxtLink class="topbar-link" to="/stats">数据看板</NuxtLink>
          <a class="topbar-link" href="https://github.com/vavagent/vav-ui-agent" target="_blank">GitHub</a>
        </div>
      </div>
    </header>

    <main class="wrap">
      <div v-if="error" class="state">
        <p>没有找到这个变体（{{ slug }}）。</p>
        <NuxtLink to="/" class="btn">回素材库</NuxtLink>
      </div>

      <template v-else-if="v">
        <nav class="crumb">
          <NuxtLink to="/">素材库</NuxtLink>
          <span>/</span>
          <NuxtLink :to="`/?cat=${v.category_slug}`">{{ v.category_name }}</NuxtLink>
          <span>/</span>
          <em>{{ v.name }}</em>
        </nav>

        <div class="head">
          <h1>{{ v.name }}</h1>
          <p class="desc">{{ v.description || '—' }}</p>
          <div class="tags">
            <NuxtLink v-for="t in v.tags.slice(0, 12)" :key="t" :to="`/?cat=${v.category_slug}&tag=${encodeURIComponent(t)}`" class="tag">{{ t }}</NuxtLink>
          </div>
        </div>

        <section class="panel">
          <div class="panel-head">
            <h2>响应式预览</h2>
            <div class="modes">
              <button :class="{ on: mode === 'auto' }" @click="mode = 'auto'">自适应</button>
              <button :class="{ on: mode === '768' }" @click="mode = '768'">768</button>
              <button :class="{ on: mode === '375' }" @click="mode = '375'">375</button>
            </div>
          </div>
          <p class="hint">切到 375 看手机宽度：布局问题通常只在窄屏暴露，桌面端好看不算过关。</p>
          <div class="stage-wrap">
            <div class="stage" :style="{ width }">
              <iframe :srcdoc="v.preview_html" sandbox="" loading="lazy" />
            </div>
          </div>
        </section>

        <section class="panel">
          <div class="panel-head">
            <h2>提示词</h2>
            <div class="tabs">
              <button v-for="t in tabs" :key="t.key" :class="{ on: tab === t.key }" @click="tab = t.key">{{ t.label }}</button>
            </div>
          </div>
          <p class="hint">{{ (tabs.find(t => t.key === tab) || {}).hint }}</p>
          <pre class="code">{{ currentText }}</pre>
          <div class="actions">
            <button class="btn primary" @click="copyText(currentText, tab)">复制这段提示词</button>
            <button class="btn" @click="copyMdLink">复制 Markdown 链接</button>
            <NuxtLink class="btn ghost" :to="`${v.md_url}`" target="_blank">查看 .md</NuxtLink>
            <span v-if="toast" class="toast">{{ toast }}</span>
          </div>
        </section>

        <section class="panel" v-if="v.related && v.related.length">
          <div class="panel-head"><h2>同分类其他变体</h2></div>
          <div class="related">
            <NuxtLink v-for="r in v.related" :key="r.slug" :to="`/v/${r.slug}/`" class="rel">
              <span class="rel-name">{{ r.name }}</span>
              <span class="rel-tags">{{ r.tags.join(' · ') }}</span>
            </NuxtLink>
          </div>
        </section>

        <section class="panel ai">
          <div class="panel-head"><h2>丢给 AI 直接读</h2></div>
          <p class="hint">这个变体的 Markdown 版是给模型看的，地址：</p>
          <pre class="code small">https://ui.vavagent.com/api/v/{{ v.slug }}.md</pre>
          <p class="hint">全库目录（一次读懂有哪些组件）：<code>https://ui.vavagent.com/catalog.md</code></p>
        </section>
      </template>

      <div v-else class="state">加载中…</div>
    </main>
  </div>
</template>

<style scoped>
.detail{min-height:100vh;background:#fff}
.topbar{position:sticky;top:0;z-index:100;background:#fff;border-bottom:1px solid var(--border);height:56px;display:flex;align-items:center}
.topbar-inner{flex:1;padding:0 24px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--text)}
.logo-mark{width:28px;height:28px;border-radius:6px;background:var(--accent);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:15px}
.logo-name{font-size:16px;font-weight:600}
.topbar-right{display:flex;gap:16px}
.topbar-link{font-size:14px;color:var(--text-2);text-decoration:none}
.topbar-link:hover{color:var(--accent)}

.wrap{max-width:1040px;margin:0 auto;padding:28px 24px 80px}
.crumb{display:flex;gap:8px;align-items:center;font-size:13px;color:var(--text-3);margin-bottom:16px;flex-wrap:wrap}
.crumb a{color:var(--text-2);text-decoration:none}
.crumb a:hover{color:var(--accent)}
.crumb em{font-style:normal;color:var(--text)}

.head h1{font-size:26px;margin:0 0 8px}
.desc{color:var(--text-2);font-size:14px;margin:0 0 12px}
.tags{display:flex;flex-wrap:wrap;gap:6px}
.tag{font-size:12px;padding:3px 10px;border-radius:4px;background:var(--bg);border:1px solid var(--border);color:var(--text-2);text-decoration:none}
.tag:hover{color:var(--accent);border-color:var(--accent)}

.panel{margin-top:20px;border:1px solid var(--border);border-radius:var(--radius);padding:18px 20px}
.panel-head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:6px}
.panel-head h2{margin:0;font-size:15px;font-weight:600}
.hint{font-size:12.5px;color:var(--text-3);margin:4px 0 12px}
.hint code{font-size:12.5px}

.modes,.tabs{display:flex;gap:6px}
.modes button,.tabs button{font-size:12px;padding:4px 12px;border-radius:4px;border:1px solid var(--border);background:#fff;color:var(--text-2);cursor:pointer}
.modes button.on,.tabs button.on{background:var(--accent);border-color:var(--accent);color:#fff}

.stage-wrap{display:flex;justify-content:center;padding:16px;background:linear-gradient(45deg,#fafafa 25%,transparent 25%),linear-gradient(-45deg,#fafafa 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#fafafa 75%),linear-gradient(-45deg,transparent 75%,#fafafa 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0;border-radius:var(--radius-sm)}
.stage{background:#fff;border:1px solid var(--border);border-radius:var(--radius-sm);overflow:hidden;transition:width .2s}
.stage iframe{display:block;width:100%;height:440px;border:0;background:#fff}

.code{margin:0 0 12px;padding:14px 16px;background:var(--code-bg);color:var(--code-text);border-radius:var(--radius-sm);font-size:12.5px;line-height:1.7;font-family:"SF Mono",Menlo,Consolas,monospace;white-space:pre-wrap;word-break:break-word}
.code.small{font-size:12px}
.actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.btn{display:inline-block;font-size:13px;padding:7px 14px;border-radius:6px;border:1px solid var(--border);background:#fff;color:var(--text);text-decoration:none;cursor:pointer}
.btn.primary{background:var(--accent);border-color:var(--accent);color:#fff}
.btn.primary:hover{background:var(--accent-hover)}
.btn.ghost{color:var(--text-2)}
.toast{font-size:12px;color:var(--accent)}

.related{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}
.rel{display:flex;flex-direction:column;gap:4px;padding:12px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);text-decoration:none;color:var(--text)}
.rel:hover{border-color:var(--accent);background:#fafbff}
.rel-name{font-size:13.5px;font-weight:500}
.rel-tags{font-size:11.5px;color:var(--text-3)}

.state{padding:80px 0;text-align:center;color:var(--text-3)}
</style>
