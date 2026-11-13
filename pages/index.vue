<script setup>
const route = useRoute()
const router = useRouter()

const currentCat = computed(() => route.query.cat || 'nav')
const searchQ = computed(() => route.query.q || '')
const activeTag = computed(() => route.query.tag || '')

/* 风格弹窗 */
const showStyleModal = ref(false)
const styleSearch = ref('')
const styleGroups = [
  { name: '国外设计体系', items: ['antd', 'iOS', 'Material', 'Bootstrap', 'Tailwind', 'Element', 'Vuetify', 'Fluent', 'Atlassian', 'Shopify', 'shadcn', 'Mantine', 'Chakra', 'Radix'] },
  { name: '产品风格', items: ['Linear', 'Vercel', 'Stripe', 'Notion', 'GitHub', 'Apple', 'Google', 'Slack', 'Discord', 'Figma', 'Airbnb', 'Spotify', 'Dropbox', '小红书', '微信', '支付宝', '钉钉', '飞书', '字节', '京东', '美团', '抖音', 'B站', '淘宝', '知乎', '掘金'] },
  { name: '视觉风格', items: ['极简', '扁平', '拟物', '新拟态', '玻璃拟态', '暗黑模式', '赛博朋克', '复古像素', '双色调', '瑞士国际主义', '颗粒渐变', '手绘'] },
  { name: '潮流风格', items: ['3D立体', '插画', '黏土', '新粗野主义', '便当盒布局', '霓虹发光', '故障风'] },
]
const filteredGroups = computed(() => {
  const q = styleSearch.value.trim().toLowerCase()
  if (!q) return styleGroups
  return styleGroups.map(g => ({
    ...g,
    items: g.items.filter(i => i.toLowerCase().includes(q))
  })).filter(g => g.items.length > 0)
})
function openStyleModal() {
  styleSearch.value = ''
  showStyleModal.value = true
}
function pickStyle(s) {
  setQuery({ tag: activeTag.value === s ? '' : s })
  showStyleModal.value = false
}

/* SSR 拉分类 */
const { data: catGroups } = await useFetch('/api/categories')

/* SSR 拉当前分类的全部组件（用于标签列表，不受筛选影响） */
const { data: allComps } = await useFetch(
  '/api/components',
  {
    query: computed(() => ({ cat: currentCat.value })),
    watch: [currentCat]
  }
)

/* SSR 拉当前分类的组件（带筛选） */
const { data: comps, pending } = await useFetch(
  '/api/components',
  {
    query: computed(() => ({
      cat: currentCat.value,
      q: searchQ.value,
      tag: activeTag.value
    })),
    watch: [currentCat, searchQ, activeTag]
  }
)

/* 当前分类的元信息 */
const currentCatMeta = computed(() => {
  for (const grp of Object.values(catGroups.value || {})) {
    const found = grp.find(c => c.slug === currentCat.value)
    if (found) return found
  }
  return { name: currentCat.value, count: 0 }
})

/* 当前分类下所有可用标签（从全量组件提取，不随筛选变化） */
const allTags = computed(() => {
  const s = new Set()
  for (const c of (allComps.value || [])) (c.tags || []).forEach(t => s.add(t))
  return [...s]
})

function setQuery(patch) {
  const q = { ...route.query }
  for (const [k, v] of Object.entries(patch)) {
    if (!v) delete q[k]
    else q[k] = v
  }
  router.push({ query: q })
}

async function copy(text, ev) {
  try {
    await navigator.clipboard.writeText(text)
    const btn = ev.currentTarget
    const old = btn.textContent
    btn.textContent = '已复制 ✓'
    setTimeout(() => (btn.textContent = old), 1200)
  } catch {}
}
</script>

<template>
  <div class="app">
    <!-- 顶部固定 Header（Ant Design 风格） -->
    <header class="topbar">
      <div class="topbar-inner">
        <div class="logo" @click="setQuery({ cat: '', tag: '', q: '' })">
          <div class="logo-mark">V</div>
          <span class="logo-name">VAV UI-agent</span>
        </div>
        <div class="topbar-search">
          <span>🔍</span>
          <input
            :value="searchQ"
            placeholder="输入关键字搜索组件…"
            @input="setQuery({ q: $event.target.value })"
          >
        </div>
        <div class="topbar-right">
          <button class="style-btn" @click="openStyleModal">
            🎨 风格筛选
            <span v-if="activeTag" class="style-badge">{{ activeTag }}</span>
          </button>
          <a class="topbar-link" href="/guide">使用教程</a>
          <a class="topbar-link" href="https://github.com/vavagent/vav-ui-agent" target="_blank">GitHub</a>
        </div>
      </div>
    </header>

    <!-- 左侧分类菜单 -->
    <aside class="sidebar">
      <div class="sidebar-inner">
        <template v-for="(items, grp) in (catGroups || {})" :key="grp">
          <div class="nav-group">
            <div class="nav-group-title">{{ grp }}</div>
            <div
              v-for="c in items"
              :key="c.slug"
              class="nav-item"
              :class="{ active: c.slug === currentCat }"
              @click="setQuery({ cat: c.slug })"
            >
              <span class="nav-name">{{ c.name }}</span>
              <span class="nav-count">{{ c.count || 0 }}</span>
            </div>
          </div>
        </template>
      </div>
    </aside>

    <!-- 主内容区 -->
    <main class="main">
      <div class="main-inner">
        <!-- 分类标题 -->
        <div class="cat-header">
          <h1>{{ currentCatMeta.name }}</h1>
          <p>同一类组件在不同产品形态下的常见变体。挑一个对得上的，把提示词丢给 AI 就行。</p>
        </div>

        <!-- 标签筛选 -->
        <div class="tag-filter">
          <span
            class="tag"
            :class="{ active: !activeTag }"
            @click="setQuery({ tag: '' })"
          >全部</span>
          <span
            v-for="t in allTags"
            :key="t"
            class="tag"
            :class="{ active: activeTag === t }"
            @click="setQuery({ tag: activeTag === t ? '' : t })"
          >{{ t }}</span>
        </div>

        <!-- 组件列表 -->
        <div v-if="pending" class="empty">加载中…</div>
        <div v-else-if="!comps || comps.length === 0" class="empty">这一类还在整理中，下一轮补上。</div>

        <div v-for="c in comps" :key="c.id" class="variant">
          <div class="variant-head">
            <h3>{{ c.name }}</h3>
            <div class="meta">
              <span v-for="t in c.tags" :key="t" class="mini-tag">{{ t }}</span>
            </div>
          </div>
          <div class="preview">
            <div class="stage" v-html="c.preview_html"></div>
          </div>
          <div class="prompt">
            <div class="prompt-head">
              <span>AI 提示词（可直接复制）</span>
              <button class="copy-btn" @click="copy(c.prompt, $event)">复制</button>
            </div>
            <pre>{{ c.prompt }}</pre>
          </div>
        </div>
      </div>
    </main>

    <!-- 风格筛选弹窗 -->
    <div v-if="showStyleModal" class="modal-mask" @click="showStyleModal = false">
      <div class="modal-box" @click.stop>
        <div class="modal-head">
          <h3>选择风格</h3>
          <span class="modal-close" @click="showStyleModal = false">✕</span>
        </div>
        <div class="modal-search">
          <span>🔍</span>
          <input v-model="styleSearch" placeholder="搜索风格…" autofocus>
        </div>
        <div class="modal-body">
          <div v-for="grp in filteredGroups" :key="grp.name" class="modal-group">
            <div class="modal-group-title">{{ grp.name }}</div>
            <div class="modal-tags">
              <span
                v-for="s in grp.items"
                :key="s"
                class="modal-tag"
                :class="{ active: activeTag === s }"
                @click="pickStyle(s)"
              >{{ s }}</span>
            </div>
          </div>
          <div v-if="filteredGroups.length === 0" class="modal-empty">没有找到相关风格</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app{display:flex;flex-direction:column;min-height:100vh}

/* 顶部 Header（Ant Design 风格） */
.topbar{background:#fff;border-bottom:1px solid var(--border);position:fixed;top:0;left:0;right:0;z-index:100;height:56px;display:flex;align-items:center}
.topbar-inner{flex:1;padding:0 24px;display:flex;align-items:center;gap:32px}
.logo{display:flex;align-items:center;gap:10px;cursor:pointer;flex-shrink:0}
.logo-mark{width:28px;height:28px;border-radius:6px;background:var(--accent);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:15px}
.logo-name{font-size:16px;font-weight:600;color:var(--text)}
.topbar-search{flex:1;max-width:400px;display:flex;align-items:center;gap:8px;background:var(--bg);border:1px solid var(--border-strong);border-radius:var(--radius-sm);padding:6px 12px;transition:all .2s}
.topbar-search:focus-within{border-color:var(--accent);background:#fff}
.topbar-search input{flex:1;border:none;outline:none;background:transparent;font-size:14px}
.topbar-right{display:flex;align-items:center;gap:16px;margin-left:auto}
.style-btn{display:flex;align-items:center;gap:6px;padding:6px 14px;border-radius:6px;border:1px solid var(--border);background:var(--panel);cursor:pointer;font-size:13px;transition:all .2s}
.style-btn:hover{border-color:var(--accent);color:var(--accent)}
.style-badge{background:var(--accent);color:#fff;font-size:11px;padding:1px 8px;border-radius:10px}
.topbar-link{font-size:14px;color:var(--text-2);text-decoration:none;transition:color .2s}
.topbar-link:hover{color:var(--accent)}

/* 风格弹窗 */
.modal-mask{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.45);z-index:1000;display:flex;align-items:center;justify-content:center}
.modal-box{background:#fff;border-radius:12px;width:560px;max-width:90vw;max-height:80vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.2)}
.modal-head{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid var(--border)}
.modal-head h3{margin:0;font-size:16px}
.modal-close{cursor:pointer;color:var(--text-3);font-size:18px}
.modal-close:hover{color:var(--text)}
.modal-search{display:flex;align-items:center;gap:8px;padding:12px 20px;border-bottom:1px solid var(--border)}
.modal-search input{flex:1;border:none;outline:none;font-size:14px}
.modal-body{padding:16px 20px;overflow-y:auto;flex:1}
.modal-group{margin-bottom:20px}
.modal-group-title{font-size:12px;color:var(--text-3);font-weight:600;margin-bottom:8px}
.modal-tags{display:flex;flex-wrap:wrap;gap:8px}
.modal-tag{font-size:13px;padding:4px 12px;border-radius:6px;border:1px solid var(--border);cursor:pointer;transition:all .2s}
.modal-tag:hover{color:var(--accent);border-color:var(--accent)}
.modal-tag.active{background:var(--accent);color:#fff;border-color:var(--accent)}
.modal-empty{text-align:center;color:var(--text-3);padding:40px}

/* 左侧分类菜单 */
.sidebar{position:fixed;top:56px;left:0;bottom:0;width:240px;background:#fff;border-right:1px solid var(--border);overflow-y:auto;padding:16px 12px;scrollbar-width:thin;scrollbar-color:transparent transparent}
.sidebar:hover{scrollbar-color:rgba(0,0,0,.2) transparent}
.sidebar::-webkit-scrollbar{width:6px}
.sidebar::-webkit-scrollbar-track{background:transparent}
.sidebar::-webkit-scrollbar-thumb{background:transparent;border-radius:3px}
.sidebar:hover::-webkit-scrollbar-thumb{background:rgba(0,0,0,.2)}
.sidebar::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.35)}
.sidebar-inner{}
.nav-group{padding:4px 0}
.nav-group-title{font-size:12px;color:var(--text-3);padding:8px 12px 4px;font-weight:500}
.nav-item{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;cursor:pointer;color:var(--text);font-size:14px;border-radius:6px;transition:all .2s;margin-bottom:2px}
.nav-item:hover{background:var(--bg)}
.nav-item.active{background:#e6f4ff;color:var(--accent);font-weight:500}
.nav-name{}
.nav-count{font-size:11px;color:var(--text-3);background:var(--bg);padding:1px 8px;border-radius:10px}
.nav-item.active .nav-count{background:#bae0ff;color:var(--accent)}

/* 主内容区 */
.main{margin-top:56px;margin-left:240px;background:#fff;min-height:calc(100vh - 56px)}
.main-inner{padding:32px 48px 80px;max-width:1400px}

/* 分类标题 */
.cat-header{margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border)}
.cat-header h1{font-size:30px;margin:0 0 8px;font-weight:600}
.cat-header p{color:var(--text-2);margin:0;font-size:14px;max-width:680px}

/* 标签筛选 */
.tag-filter{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:24px}
.tag{font-size:12px;padding:3px 10px;border-radius:4px;background:var(--bg);border:1px solid var(--border);color:var(--text-2);cursor:pointer;user-select:none;transition:all .2s}
.tag:hover{color:var(--accent);border-color:var(--accent)}
.tag.active{background:var(--accent);color:#fff;border-color:var(--accent)}

/* 组件卡片 */
.variant{background:#fff;border:1px solid var(--border);border-radius:var(--radius);margin-bottom:16px;overflow:hidden;transition:box-shadow .2s}
.variant:hover{box-shadow:var(--shadow)}
.variant-head{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid var(--border);gap:12px;flex-wrap:wrap}
.variant-head h3{margin:0;font-size:16px;font-weight:600}
.variant-head .meta{display:flex;gap:6px;flex-wrap:wrap}
.mini-tag{font-size:11px;padding:2px 8px;border-radius:4px;background:var(--bg);color:var(--text-3)}
.preview{background:linear-gradient(45deg,#fafafa 25%,transparent 25%),linear-gradient(-45deg,#fafafa 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#fafafa 75%),linear-gradient(-45deg,transparent 75%,#fafafa 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0;background-color:#fff;padding:24px;min-height:120px;display:flex;align-items:center}
.stage{width:100%;background:#fff;border:1px solid var(--border);border-radius:var(--radius-sm);overflow:hidden}

.prompt{padding:16px 20px;background:var(--panel-2);border-top:1px solid var(--border)}
.prompt-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.prompt-head span{font-size:13px;color:var(--text-3);font-weight:500}
.copy-btn{font-size:12px;padding:4px 12px;border-radius:4px;cursor:pointer;background:var(--accent);color:#fff;border:none;font-weight:500;transition:background .2s}
.copy-btn:hover{background:var(--accent-hover)}
.prompt pre{margin:0;padding:12px 16px;background:var(--code-bg);color:var(--code-text);border-radius:var(--radius-sm);font-size:12.5px;line-height:1.65;font-family:"SF Mono",Menlo,Consolas,monospace;white-space:pre-wrap;word-break:break-word}

.empty{padding:60px;text-align:center;color:var(--text-3)}
</style>
