<template>
  <div class="guide-page">
    <header class="guide-header">
      <div class="guide-back" @click="router.push('/')">← 返回素材库</div>
      <h1>VAV UI-agent 使用教程</h1>
      <p class="guide-sub">从选组件到 AI 生成成品，三步搞定你的下一个界面</p>
    </header>

    <div class="guide-content">
      <!-- 第一步 -->
      <section class="guide-section">
        <h2>一、这个素材库是什么？</h2>
        <p>
          做网站/App 时，同一个功能（比如导航菜单）有很多种实现方式，但你可能不知道有多少种、也不知道怎么跟 AI 描述。
          这个素材库把常见 UI 组件按<strong>分类 + 产品风格</strong>整理好，每个变体都配了一段<strong>可直接复制给 AI 的提示词</strong>。
        </p>
        <div class="tip-box">
          <strong>核心价值：</strong>你不用自己想"这个按钮该长什么样"，直接挑一个对得上的产品风格（Linear / Vercel / 小红书），把提示词丢给 AI 就行。
        </div>
      </section>

      <!-- 第二步 -->
      <section class="guide-section">
        <h2>二、怎么用（三步）</h2>

        <div class="step">
          <div class="step-num">1</div>
          <div class="step-body">
            <h3>选分类</h3>
            <p>左侧菜单选你要的组件类型（导航 / 按钮 / 表单 / 卡片...），或者直接顶部搜索关键词。</p>
          </div>
        </div>

        <div class="step">
          <div class="step-num">2</div>
          <div class="step-body">
            <h3>挑变体</h3>
            <p>看预览效果，挑一个风格对得上的。比如你要做后台，就找 Vercel/Linear 那种极简风；做电商，就找淘宝/小红书那种。</p>
          </div>
        </div>

        <div class="step">
          <div class="step-num">3</div>
          <div class="step-body">
            <h3>复制提示词</h3>
            <p>点"复制"按钮，把提示词粘贴给 AI（ChatGPT / Claude / 豆包），AI 就能生成对应的代码了。</p>
          </div>
        </div>
      </section>

      <!-- 第三步 -->
      <section class="guide-section">
        <h2>三、提示词怎么写更好</h2>

        <div class="do-dont">
          <div class="do">
            <h4>✅ 好的提示词</h4>
            <pre>设计一个后台侧边导航：
- 深色背景 #0a0a0a，宽度 240px
- 菜单项 14px，hover 时左侧 2px 蓝色竖条 #1677ff
- 当前页面蓝底圆角背景
- 折叠/展开动画 0.2s
整体风格：Vercel Dashboard 侧边栏</pre>
          </div>
          <div class="dont">
            <h4>❌ 差的提示词</h4>
            <pre>做个导航栏</pre>
          </div>
        </div>

        <div class="tip-box">
          <strong>公式：</strong>组件类型 + 具体参数（颜色/尺寸/圆角/间距）+ 参考风格（哪个产品）+ 状态（hover/active/disabled）
        </div>
      </section>

      <!-- SEO/GEO -->
      <section class="guide-section">
        <h2>四、SEO / GEO 优化建议</h2>

        <h3>SEO（搜索引擎优化）</h3>
        <ul>
          <li><strong>语义化 HTML：</strong>用 &lt;nav&gt; &lt;main&gt; &lt;article&gt; 这些标签，爬虫能看懂结构</li>
          <li><strong>页面标题：</strong>每个组件分类页有独立 title，比如"按钮组件 | VAV UI-agent"</li>
          <li><strong>描述：</strong>meta description 写清楚这页有什么内容</li>
          <li><strong>图片 alt：</strong>预览图加 alt 文字，搜索引擎能识别</li>
        </ul>

        <h3>GEO（生成引擎优化）</h3>
        <p>GEO 是让 AI 搜索引擎（ChatGPT / Perplexity / 豆包）在回答时引用你的内容。</p>
        <ul>
          <li><strong>结构化内容：</strong>每个组件有分类、标签、描述，AI 容易抓取</li>
          <li><strong>可直接复制：</strong>提示词是独立、完整的，AI 可以直接引用</li>
          <li><strong>FAQ 格式：</strong>加常见问题页面，AI 喜欢问答格式</li>
          <li><strong>内部链接：</strong>相关组件互相链接，AI 能发现更多内容</li>
        </ul>

        <div class="tip-box">
          <strong>建议：</strong>后续可以加一个"组件对比"页面，AI 在被问"哪种导航适合后台"时更容易引用你的内容。
        </div>
      </section>

      <!-- 快捷键 -->
      <section class="guide-section">
        <h2>五、快捷键 & 小技巧</h2>
        <div class="shortcuts">
          <div class="shortcut">
            <kbd>Ctrl + K</kbd>
            <span>聚焦搜索框</span>
          </div>
          <div class="shortcut">
            <kbd>点击标签</kbd>
            <span>快速筛选风格</span>
          </div>
          <div class="shortcut">
            <kbd>点击预览</kbd>
            <span>试试交互效果</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
</script>

<style scoped>
.guide-page{min-height:100vh;background:#fff}
.guide-header{padding:48px 48px 32px;border-bottom:1px solid var(--border)}
.guide-back{font-size:13px;color:var(--accent);cursor:pointer;margin-bottom:16px}
.guide-back:hover{text-decoration:underline}
.guide-header h1{font-size:32px;margin:0 0 8px;font-weight:600}
.guide-sub{font-size:16px;color:var(--text-2);margin:0}
.guide-content{max-width:800px;padding:40px 48px 80px}
.guide-section{margin-bottom:48px}
.guide-section h2{font-size:22px;margin:0 0 16px;padding-bottom:8px;border-bottom:1px solid var(--border)}
.guide-section h3{font-size:16px;margin:20px 0 8px}
.guide-section p{font-size:14px;line-height:1.8;color:var(--text-2);margin:0 0 12px}
.guide-section ul{padding-left:20px}
.guide-section li{font-size:14px;line-height:2;color:var(--text-2)}
.tip-box{background:var(--accent-soft);border-radius:8px;padding:16px;margin:16px 0;font-size:14px;line-height:1.6}
.step{display:flex;gap:16px;margin-bottom:24px}
.step-num{width:32px;height:32px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;flex-shrink:0}
.step-body h3{margin:0 0 4px;font-size:15px}
.step-body p{margin:0;font-size:14px;color:var(--text-2)}
.do-dont{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:16px 0}
.do,.dont{border-radius:8px;padding:16px}
.do{background:#f6ffed;border:1px solid #b7eb8f}
.dont{background:#fff2f0;border:1px solid #ffccc7}
.do h4{color:#52c41a;margin:0 0 8px}
.dont h4{color:#ff4d4f;margin:0 0 8px}
.do pre,.dont pre{margin:0;font-size:12px;line-height:1.6;white-space:pre-wrap;font-family:"SF Mono",Menlo,monospace}
.shortcuts{display:flex;flex-direction:column;gap:12px}
.shortcut{display:flex;align-items:center;gap:16px}
kbd{background:var(--bg);border:1px solid var(--border);border-radius:4px;padding:4px 10px;font-size:13px;font-family:monospace}
.shortcut span{font-size:14px;color:var(--text-2)}
</style>
