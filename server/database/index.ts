import Database from 'better-sqlite3'
import path from 'node:path'
import fs from 'node:fs'

const DB_DIR = path.join(process.cwd(), 'data')
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true })
const DB_FILE = path.join(DB_DIR, 'ui.db')

const db = new Database(DB_FILE)
db.pragma('journal_mode = WAL')

db.exec(`
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  grp TEXT NOT NULL,
  sort INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS components (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  tags TEXT,
  preview_html TEXT,
  prompt TEXT,
  sort INTEGER DEFAULT 0,
  created_at INTEGER DEFAULT (strftime('%s','now'))
);

CREATE INDEX IF NOT EXISTS idx_components_cat ON components(category_slug);
`)

/* ---------- 种子数据：只在空库时插入 ---------- */
const row = db.prepare('SELECT COUNT(*) AS c FROM categories').get() as { c: number }
if (row.c === 0) {
  const insertCat = db.prepare('INSERT INTO categories (slug,name,grp,sort) VALUES (?,?,?,?)')
  const insertComp = db.prepare(`
    INSERT INTO components (category_slug,name,description,tags,preview_html,prompt,sort)
    VALUES (@cat,@name,@desc,@tags,@preview,@prompt,@sort)
  `)

  /* 优先从全量快照 seed-snapshot.json 装载（保留后续直连库扩充的组件）；
     快照不存在时再用下方内置 comps 兜底 */
  const snapPath = path.join(process.cwd(), 'server/database/seed-snapshot.json')
  let fromSnapshot = false
  if (fs.existsSync(snapPath)) {
    const snap = JSON.parse(fs.readFileSync(snapPath, 'utf8'))
    for (const c of snap.categories) insertCat.run(c.slug, c.name, c.grp, c.sort)
    for (const x of snap.components) insertComp.run({
      cat: x.cat, name: x.name, desc: x.desc, tags: x.tags,
      preview: x.preview, prompt: x.prompt, sort: x.sort
    })
    console.log(`[seed] snapshot inserted ${snap.components.length} components`)
    fromSnapshot = true
  }

  const cats = [
    ['nav', '导航菜单', '导航与结构', 1],
    ['breadcrumb', '面包屑/步骤', '导航与结构', 2],
    ['layout', '布局栅格', '导航与结构', 3],
    ['footer', '页脚', '导航与结构', 4],
    ['button', '按钮', '基础控件', 5],
    ['form', '表单输入', '基础控件', 6],
    ['card', '卡片', '基础控件', 7],
    ['list', '列表', '基础控件', 8],
    ['modal', '弹窗/抽屉', '反馈与弹层', 9],
    ['toast', 'Toast/提示', '反馈与弹层', 10],
    ['loading', '加载态/空态', '反馈与弹层', 11],
    ['table', '表格', '数据展示', 12],
    ['chart', '图表', '数据展示', 13],
    ['avatar', '头像/标签', '数据展示', 14],
    ['filter', '筛选面板', '基础控件', 8.5],
    ['toc', '目录导航', '导航与结构', 5],
    ['calendar', '日期日历', '基础控件', 6.5],
    ['dropdown', '下拉框', '基础控件', 6.6],
    ['popover', '气泡 Popover', '反馈与弹层', 10.5],
    ['badge', '徽标 Badge', '基础控件', 6.7],
    ['tabs', '标签页 Tabs', '导航与结构', 4.5],
    ['steps', '步骤条 Steps', '导航与结构', 4.6],
    ['collapse', '折叠面板', '数据展示', 14.5],
    ['alert', '警告提示', '反馈与弹层', 10.6],
    ['progress', '进度条', '反馈与弹层', 10.7],
    ['choice', '单选/复选', '基础控件', 6.8],
    ['tag', '标签 Tag', '数据展示', 14.6],
    ['pagination', '分页', '导航与结构', 4.7],
  ] as const
  if (!fromSnapshot) for (const [slug, name, grp, sort] of cats) insertCat.run(slug, name, grp, sort)

  const comps: Array<{
    cat: string; name: string; desc: string; tags: string[];
    preview: string; prompt: string; sort: number
  }> = [
    /* ===== 1. Linear 风格顶部导航 ===== */
    {
      cat: 'nav', sort: 1,
      name: 'Linear 风格顶部导航',
      desc: '极简 SaaS 顶栏：白底、紧凑、黑色文字、当前项底部短下划线。',
      tags: ['桌面端', 'SaaS', '极简', 'Linear'],
      preview: `<div style="background:#fff;height:48px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;border-bottom:1px solid #f1f2f4;font-family:inherit">
  <div style="display:flex;align-items:center;gap:24px">
    <div style="display:flex;align-items:center;gap:8px;font-weight:600;font-size:14px;color:#0f172a">
      <div style="width:18px;height:18px;border-radius:5px;background:linear-gradient(135deg,#5e6ad2,#7b86e8)"></div>
      Linear
    </div>
    <nav style="display:flex;gap:20px;font-size:13px;color:#667085">
      <span style="color:#0f172a;font-weight:500;padding-bottom:14px;border-bottom:2px solid #0f172a">产品</span>
      <span>功能</span><span>定价</span><span>客户</span><span>文档</span>
    </nav>
  </div>
  <div style="display:flex;align-items:center;gap:12px;font-size:13px">
    <span style="color:#667085">登录</span>
    <div style="background:#0f172a;color:#fff;padding:6px 12px;border-radius:6px;font-weight:500">免费试用</div>
  </div>
</div>`,
      prompt:`设计一个 Linear 风格的顶部导航栏：
- 高度 48px，纯白底，底部 1px #f1f2f4 分割线
- 左侧：渐变紫色 Logo 方块（18×18，圆角 5px）+ "Linear" 加粗 14px 文字
- 中间：水平菜单，间距 20px，未选中 #667085，选中 #0f172a + 底部 2px 短下划线
- 右侧：灰色"登录"文字 + 深色 CTA 按钮（#0f172a 底白字，圆角 6px，padding 6px 12px）
- 整体风格：极致克制、紧凑、无阴影、无多余装饰
- 对标：linear.app 官网顶栏`
    },

    /* ===== 2. Vercel 控制台侧边栏 ===== */
    {
      cat: 'nav', sort: 2,
      name: 'Vercel 控制台侧边栏',
      desc: '纯黑底、等宽字体、精细图标、悬浮态高亮。',
      tags: ['桌面端', '后台', '深色', 'Vercel'],
      preview: `<div style="display:flex;height:220px;font-family:inherit">
  <div style="width:240px;background:#000;color:#fff;padding:16px 0;border-right:1px solid #1a1a1a">
    <div style="padding:0 16px 16px;display:flex;align-items:center;gap:8px">
      <div style="width:16px;height:16px;background:#fff;clip-path:polygon(50% 0,100% 100%,0 100%)"></div>
      <span style="font-size:13px;font-weight:600">acme-project</span>
      <span style="color:#666;font-size:11px">▾</span>
    </div>
    <div style="padding:4px 8px">
      <div style="display:flex;align-items:center;gap:10px;padding:6px 8px;border-radius:6px;background:#1a1a1a;font-size:13px;color:#fff">
        <span style="width:14px;height:14px;border:1.5px solid #fff;border-radius:3px;display:inline-block"></span>
        Overview
      </div>
      <div style="display:flex;align-items:center;gap:10px;padding:6px 8px;border-radius:6px;font-size:13px;color:#888;margin-top:2px">
        <span style="width:14px;height:14px;border:1.5px solid #666;border-radius:3px;display:inline-block"></span>
        Deployments
      </div>
      <div style="display:flex;align-items:center;gap:10px;padding:6px 8px;border-radius:6px;font-size:13px;color:#888;margin-top:2px">
        <span style="width:14px;height:14px;border:1.5px solid #666;border-radius:3px;display:inline-block"></span>
        Domains
      </div>
      <div style="display:flex;align-items:center;gap:10px;padding:6px 8px;border-radius:6px;font-size:13px;color:#888;margin-top:2px">
        <span style="width:14px;height:14px;border:1.5px solid #666;border-radius:3px;display:inline-block"></span>
        Analytics
      </div>
    </div>
  </div>
  <div style="flex:1;background:#fafafa;padding:20px">
    <div style="font-size:11px;color:#999;font-family:monospace">/home</div>
    <div style="height:12px;background:#e5e5e5;border-radius:3px;margin-top:8px;width:60%"></div>
    <div style="height:12px;background:#e5e5e5;border-radius:3px;margin-top:6px;width:40%"></div>
  </div>
</div>`,
      prompt:`设计一个 Vercel 控制台风格的深色侧边栏：
- 宽度 240px，纯黑背景 #000，右侧 1px #1a1a1a 分割线
- 顶部：三角 Logo（白色）+ 项目名 + 下拉箭头
- 菜单项：13px 文字，选中态背景 #1a1a1a + 白色文字，未选中 #888
- 每个菜单项前一个 14×14 线性图标（圆角方块占位）
- 行高 32px，圆角 6px，间距 2px
- 右侧主内容区：浅灰底 #fafafa，顶部 monospace 路径
- 整体风格：开发者工具、克制、高密度、对标 vercel.com/dashboard`
    },

    /* ===== 3. Stripe Mega Menu ===== */
    {
      cat: 'nav', sort: 3,
      name: 'Stripe 官网巨型菜单',
      desc: 'hover 后展开多列白色面板，带柔和阴影和卡片。',
      tags: ['桌面端', '官网', '复杂', 'Stripe'],
      preview: `<div style="background:#fff;border-bottom:1px solid #e5e7eb">
  <div style="height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 40px">
    <div style="font-weight:700;font-size:18px;background:linear-gradient(90deg,#635bff,#00d4ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent">stripe</div>
    <nav style="display:flex;gap:28px;font-size:15px;color:#1a1f36">
      <span style="font-weight:600">产品</span><span>解决方案</span><span>开发者</span><span>资源</span><span>定价</span>
    </nav>
    <div style="font-size:14px;color:#635bff;font-weight:500">登录 →</div>
  </div>
  <div style="background:#fff;padding:28px 40px;border-top:1px solid #f0f1f3;display:grid;grid-template-columns:repeat(4,1fr);gap:24px;box-shadow:0 8px 24px rgba(0,0,0,.06)">
    <div>
      <div style="font-size:12px;color:#6b7280;margin-bottom:10px">支付</div>
      <div style="padding:10px 12px;border-radius:8px;background:#f6f9fc;margin-bottom:6px">
        <div style="font-size:13px;font-weight:600;color:#1a1f36">Checkout</div>
        <div style="font-size:12px;color:#6b7280;margin-top:2px">快速托管支付</div>
      </div>
      <div style="padding:10px 12px;border-radius:8px">
        <div style="font-size:13px;font-weight:600;color:#1a1f36">Payment Links</div>
        <div style="font-size:12px;color:#6b7280;margin-top:2px">无需代码</div>
      </div>
    </div>
    <div>
      <div style="font-size:12px;color:#6b7280;margin-bottom:10px">收入</div>
      <div style="font-size:13px;font-weight:600;color:#1a1f36;padding:10px 12px">Billing</div>
      <div style="font-size:13px;font-weight:600;color:#1a1f36;padding:10px 12px">Invoicing</div>
    </div>
    <div>
      <div style="font-size:12px;color:#6b7280;margin-bottom:10px">金融</div>
      <div style="font-size:13px;font-weight:600;color:#1a1f36;padding:10px 12px">Capital</div>
      <div style="font-size:13px;font-weight:600;color:#1a1f36;padding:10px 12px">Issuing</div>
    </div>
    <div>
      <div style="font-size:12px;color:#6b7280;margin-bottom:10px">工具</div>
      <div style="font-size:13px;font-weight:600;color:#1a1f36;padding:10px 12px">Radar</div>
      <div style="font-size:13px;font-weight:600;color:#1a1f36;padding:10px 12px">Climate</div>
    </div>
  </div>
</div>`,
      prompt:`设计一个 Stripe 官网风格的 Mega Menu：
- 顶部导航高度 56px，白底，Logo 用紫蓝渐变色文字（#635bff → #00d4ff）
- 菜单项 15px，未选中 #1a1f36，选中加粗
- hover 展开一个通栏白色面板，padding 28px 40px，4 列网格
- 每列顶部一个 12px 灰色分类标签
- 每个入口是一个小卡片：padding 10px 12px，圆角 8px，选中态背景 #f6f9fc
- 卡片内：13px 标题加粗 + 12px 灰色描述
- 面板带柔和阴影 0 8px 24px rgba(0,0,0,.06)
- 右侧"登录"链接用品牌紫 #635bff
- 整体风格：金融科技、精致、专业，对标 stripe.com`
    },

    /* ===== 4. iOS 移动端导航栏 ===== */
    {
      cat: 'nav', sort: 4,
      name: 'iOS 风格移动端导航栏',
      desc: '白底、大标题左对齐、右侧操作按钮。',
      tags: ['移动端', 'iOS', 'App', '顶栏'],
      preview: `<div style="background:#fff;padding:12px 16px 10px;border-bottom:0.5px solid #c6c6c8">
  <div style="font-size:11px;color:#6b7280;margin-bottom:4px">9:41</div>
  <div style="display:flex;align-items:center;justify-content:space-between">
    <div style="font-size:28px;font-weight:700;color:#000">今天</div>
    <div style="width:32px;height:32px;border-radius:50%;background:#f0f0f0;display:flex;align-items:center;justify-content:center;font-size:18px">+</div>
  </div>
</div>`,
      prompt:`设计一个 iOS 风格的移动端导航栏：
- 白底，底部 0.5px #c6c6c8 分割线
- 顶部状态栏显示时间 9:41（11px 灰色）
- 下方大标题 28px 加粗左对齐（SF Pro / PingFang）
- 右侧一个 32×32 圆形浅灰按钮（#f0f0f0），里面 + 号
- 整体风格：iOS Reminders / Notes 原生应用感
- 不要阴影、不要多余装饰`
    },

    /* ===== 5. 小红书底部 Tab ===== */
    {
      cat: 'nav', sort: 5,
      name: '小红书底部 Tab 栏',
      desc: '白底、中间凸起发布按钮、选中态红色。',
      tags: ['移动端', 'App', 'Tab', '小红书'],
      preview: `<div style="background:#fff;border-top:1px solid #f0f0f0;display:flex;justify-content:space-around;align-items:center;padding:8px 0 20px">
  <div style="display:flex;flex-direction:column;align-items:center;gap:2px;font-size:10px;color:#ff2442;font-weight:600">
    <div style="width:22px;height:22px;border-radius:6px;background:#ff2442"></div>
    首页
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:2px;font-size:10px;color:#666">
    <div style="width:22px;height:22px;border-radius:6px;background:#ddd"></div>
    发现
  </div>
  <div style="width:46px;height:32px;border-radius:8px;background:linear-gradient(135deg,#ff2442,#ff6b81);display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px;font-weight:300">+</div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:2px;font-size:10px;color:#666">
    <div style="width:22px;height:22px;border-radius:6px;background:#ddd"></div>
    消息
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:2px;font-size:10px;color:#666">
    <div style="width:22px;height:22px;border-radius:6px;background:#ddd"></div>
    我
  </div>
</div>`,
      prompt:`设计一个小红书风格的底部 Tab 栏：
- 白底，顶部 1px #f0f0f0 分割线，底部留 20px 安全区
- 5 个入口：首页 / 发现 / 中间发布 / 消息 / 我
- 未选中：灰色 #666，图标 22×22 圆角方块 #ddd
- 选中：品牌红 #ff2442，图标填充红色，文字加粗
- 中间发布按钮：46×32 圆角 8px，红粉渐变，白色 + 号，比其他 tab 大
- 整体风格：小红书首页底部导航`
    },

    /* ===== 6. Notion 文档树侧边栏 ===== */
    {
      cat: 'nav', sort: 6,
      name: 'Notion 文档树侧边栏',
      desc: '可折叠、缩进层级、文档图标、悬浮态。',
      tags: ['桌面端', '后台', '文档', 'Notion'],
      preview: `<div style="display:flex;height:220px">
  <div style="width:260px;background:#fbfbfa;padding:8px 0;border-right:1px solid #e9e9e7;font-size:14px">
    <div style="padding:6px 12px;color:#37352f;display:flex;align-items:center;gap:6px">
      <span style="font-size:10px">▾</span> 🏠 团队空间
    </div>
    <div style="padding:6px 12px 6px 28px;color:#37352f;display:flex;align-items:center;gap:6px;background:#ebedf0">
      <span style="font-size:10px">▾</span> 📄 产品需求文档
    </div>
    <div style="padding:4px 12px 4px 48px;color:#5f5e5b">📄 首页设计 v2</div>
    <div style="padding:4px 12px 4px 48px;color:#5f5e5b">📄 组件库规范</div>
    <div style="padding:6px 12px 6px 28px;color:#37352f;display:flex;align-items:center;gap:6px">
      <span style="font-size:10px">▸</span> 📁 技术方案
    </div>
    <div style="padding:6px 12px;color:#37352f;display:flex;align-items:center;gap:6px">
      <span style="font-size:10px">▸</span> 📁 会议记录
    </div>
    <div style="padding:6px 12px;color:#37352f;display:flex;align-items:center;gap:6px">
      <span style="font-size:10px">▸</span> 📁 个人笔记
    </div>
  </div>
  <div style="flex:1;background:#fff;padding:24px">
    <div style="font-size:22px;font-weight:700;color:#37352f">首页设计 v2</div>
    <div style="height:8px;background:#f1f1ef;border-radius:2px;margin-top:12px;width:70%"></div>
    <div style="height:8px;background:#f1f1ef;border-radius:2px;margin-top:6px;width:50%"></div>
  </div>
</div>`,
      prompt:`设计一个 Notion 风格的文档树侧边栏：
- 宽度 260px，背景 #fbfbfa，右侧 1px #e9e9e7 分割线
- 层级缩进：一级 12px，二级 28px，三级 48px
- 每个节点前：展开/折叠箭头（▾/▸）+ emoji 图标
- 选中态背景 #ebedf0
- 文字 14px，主文字 #37352f，子级 #5f5e5b
- 右侧主内容区白底，大标题 22px 加粗
- 整体风格：Notion 工作区侧边栏`
    },

    /* ===== 7. Apple 全屏菜单 ===== */
    {
      cat: 'nav', sort: 7,
      name: 'Apple 风格全屏菜单',
      desc: '深色毛玻璃、大字居中、极简链接列表。',
      tags: ['桌面端', '品牌', '创意', 'Apple'],
      preview: `<div style="background:#000;color:#fff;height:220px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:6px">
      <div style="font-size:24px;font-weight:500;opacity:.95">Store</div>
      <div style="font-size:24px;font-weight:500;opacity:.95">Mac</div>
      <div style="font-size:24px;font-weight:500;opacity:.95">iPad</div>
      <div style="font-size:24px;font-weight:500;opacity:.95">iPhone</div>
      <div style="font-size:24px;font-weight:500;opacity:.95">Watch</div>
    </div>`,
      prompt:`设计一个 Apple 官网风格的全屏覆盖菜单：
- 点击汉堡后纯黑全屏（#000），无圆角
- 菜单项垂直居中排列，24px 字重 500，白色，间距 6px
- 无图标、无分割线、无装饰
- 底部可放一行小号灰色版权信息
- 过渡动画：淡入 + 轻微上移
- 整体风格：apple.com 产品页全屏菜单，极简、高级`
    },

    /* ===== 8. shadcn/ui Tabs ===== */
    {
      cat: 'nav', sort: 8,
      name: 'shadcn/ui 风格 Tabs',
      desc: '极简圆角、选中态白底灰边框。',
      tags: ['桌面端', 'UI库', '极简', 'shadcn'],
      preview: `<div style="background:#f5f5f5;padding:4px;border-radius:8px;display:inline-flex;gap:2px">
      <div style="background:#fff;padding:6px 14px;border-radius:6px;font-size:13px;font-weight:500;color:#000;box-shadow:0 1px 2px rgba(0,0,0,.1)">Account</div>
      <div style="padding:6px 14px;border-radius:6px;font-size:13px;color:#737373">Password</div>
      <div style="padding:6px 14px;border-radius:6px;font-size:13px;color:#737373">Notifications</div>
      <div style="padding:6px 14px;border-radius:6px;font-size:13px;color:#737373">Billing</div>
    </div>`,
      prompt:`设计一个 shadcn/ui 风格的 Tabs 组件：
- 外层浅灰容器 #f5f5f5，padding 4px，圆角 8px
- 每个 tab：padding 6px 14px，圆角 6px，13px 文字
- 选中态：白底 + 轻微阴影 0 1px 2px rgba(0,0,0,.1) + 黑色文字
- 未选中：透明底 + #737373 文字
- 间距 2px，紧凑
- 整体风格：shadcn/ui 的 Tabs demo，Radix 风格`
    },

    /* ===== 9. GitHub 面包屑 ===== */
    {
      cat: 'nav', sort: 9,
      name: 'GitHub 仓库面包屑',
      desc: '带仓库图标、分支切换、相对时间。',
      tags: ['桌面端', '开发者', '面包屑', 'GitHub'],
      preview: `<div style="background:#fff;padding:16px 24px;display:flex;align-items:center;gap:8px;font-size:14px;border-bottom:1px solid #e5e7eb">
      <span style="color:#0969da">octocat</span>
      <span style="color:#6e7781">/</span>
      <span style="color:#0969da;font-weight:600">hello-world</span>
      <div style="margin-left:12px;background:#f6f8fa;border:1px solid #d0d7de;border-radius:20px;padding:3px 10px;font-size:12px;color:#57606a">
        ⑂ main
      </div>
    </div>`,
      prompt:`设计一个 GitHub 风格的仓库面包屑：
- 白底，padding 16px 24px，底部 1px #e5e7eb 分割线
- 格式：用户名 / 仓库名，用户名和仓库名用蓝色 #0969da
- 仓库名加粗，分隔符灰色 #6e7781
- 右侧一个分支切换按钮：圆角 20px，浅灰底 #f6f8fa，边框 #d0d7de，带分支图标
- 整体风格：github.com 仓库页头部`
    },

    /* ===== 10. 底部 Tab + 中间发布（保留但升级） ===== */
    {
      cat: 'nav', sort: 10,
      name: 'Vercel 毛玻璃收缩导航',
      desc: '滚动后从透明变毛玻璃白底。',
      tags: ['桌面端', '官网', '动效', 'Vercel'],
      preview: `<div style="background:rgba(255,255,255,.8);backdrop-filter:blur(12px);height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 32px;border-bottom:1px solid rgba(0,0,0,.06)">
      <div style="display:flex;align-items:center;gap:8px;color:#000">
        <div style="width:14px;height:14px;background:#000;clip-path:polygon(50% 0,100% 100%,0 100%)"></div>
        <span style="font-weight:600;font-size:14px">Vercel</span>
      </div>
      <nav style="display:flex;gap:24px;font-size:14px;color:#666">
        <span>产品</span><span>下载</span><span>文档</span><span>定价</span>
      </nav>
      <div style="background:#000;color:#fff;padding:6px 14px;border-radius:6px;font-size:13px">部署</div>
    </div>`,
      prompt:`设计一个 Vercel 风格的毛玻璃顶部导航：
- 背景 rgba(255,255,255,.8) + backdrop-filter: blur(12px)
- 高度 56px，底部 1px 半透明分割线 rgba(0,0,0,.06)
- 左侧：黑色三角 Logo + "Vercel" 加粗 14px
- 中间菜单 14px，灰色 #666
- 右侧黑色 CTA 按钮（圆角 6px，padding 6px 14px）
- 滚动前透明，滚动后浮现毛玻璃效果
- 整体风格：vercel.com 官网顶栏`
    },

    /* ===== 11. 手风琴（Ant Design Pro） ===== */
    {
      cat: 'nav', sort: 11,
      name: 'Ant Design Pro 手风琴菜单',
      desc: '标准后台多级菜单，选中项浅蓝底。',
      tags: ['桌面端', '后台', '多级菜单', 'Antd'],
      preview: `<div style="background:#fff;width:220px;border-right:1px solid #f0f0f0;font-size:14px">
      <div style="padding:12px 24px;background:#e6f4ff;color:#1677ff;display:flex;justify-content:space-between;align-items:center">
        <span>📊 数据看板</span><span style="font-size:10px">−</span>
      </div>
      <div style="padding:8px 24px 8px 40px;color:#1677ff;background:#e6f4ff33">实时概览</div>
      <div style="padding:8px 24px 8px 40px;color:#595959">历史报表</div>
      <div style="padding:12px 24px;color:#595959;display:flex;justify-content:space-between;align-items:center">
        <span>👤 用户管理</span><span style="font-size:10px">+</span>
      </div>
      <div style="padding:12px 24px;color:#595959;display:flex;justify-content:space-between;align-items:center">
        <span>📦 订单中心</span><span style="font-size:10px">+</span>
      </div>
    </div>`,
      prompt:`设计一个 Ant Design Pro 风格的手风琴菜单：
- 宽度 220px，白底，右侧 1px #f0f0f0 分割线
- 一级菜单项 14px，padding 12px 24px
- 选中项：背景 #e6f4ff，文字 #1677ff
- 展开后二级菜单缩进 40px，选中态 #1677ff，未选中 #595959
- 展开/折叠符号在右侧
- 整体风格：Ant Design Pro 默认菜单`
    },

    /* ===== 12. 卡片宫格入口 ===== */
    {
      cat: 'nav', sort: 12,
      name: 'Linear 首页宫格入口',
      desc: '桌面端首页用卡片当一级入口，带图标和描述。',
      tags: ['桌面端', '首页', '卡片', 'Linear'],
      preview: `<div style="background:#fafbfc;padding:24px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
      <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px">
        <div style="width:28px;height:28px;border-radius:6px;background:#5e6ad2;margin-bottom:10px"></div>
        <div style="font-size:14px;font-weight:600;color:#111827">Issues</div>
        <div style="font-size:12px;color:#6b7280;margin-top:2px">追踪和管理任务</div>
      </div>
      <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px">
        <div style="width:28px;height:28px;border-radius:6px;background:#10b981;margin-bottom:10px"></div>
        <div style="font-size:14px;font-weight:600;color:#111827">Projects</div>
        <div style="font-size:12px;color:#6b7280;margin-top:2px">规划和发布进度</div>
      </div>
      <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px">
        <div style="width:28px;height:28px;border-radius:6px;background:#f59e0b;margin-bottom:10px"></div>
        <div style="font-size:14px;font-weight:600;color:#111827">Views</div>
        <div style="font-size:12px;color:#6b7280;margin-top:2px">自定义看板视图</div>
      </div>
    </div>`,
      prompt:`设计一个 Linear 风格的首页宫格入口：
- 3 列网格，卡片白底，1px #e5e7eb 边框，圆角 8px
- 每个卡片：padding 16px，顶部 28×28 圆角图标（品牌色）
- 图标下方：14px 加粗标题 + 12px 灰色描述
- 卡片间距 12px，外层浅灰底 #fafbfc
- 整体风格：Linear 工作区首页`
    },

    /* ===== 13. 步骤条 ===== */
    {
      cat: 'nav', sort: 13,
      name: 'Stripe Onboarding 步骤条',
      desc: '带圆形进度、当前项高亮品牌色。',
      tags: ['桌面端', '流程', 'Onboarding', 'Stripe'],
      preview: `<div style="background:#fff;padding:20px;display:flex;align-items:center;max-width:400px">
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <div style="width:28px;height:28px;border-radius:50%;background:#635bff;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600">✓</div>
        <div style="font-size:11px;color:#635bff;font-weight:500">账户</div>
      </div>
      <div style="flex:1;height:2px;background:#635bff;margin:0 8px;margin-bottom:20px"></div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <div style="width:28px;height:28px;border-radius:50%;background:#635bff;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600">2</div>
        <div style="font-size:11px;color:#000;font-weight:600">验证</div>
      </div>
      <div style="flex:1;height:2px;background:#e5e7eb;margin:0 8px;margin-bottom:20px"></div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <div style="width:28px;height:28px;border-radius:50%;background:#e5e7eb;color:#9ca3af;display:flex;align-items:center;justify-content:center;font-size:12px">3</div>
        <div style="font-size:11px;color:#9ca3af">完成</div>
      </div>
    </div>`,
      prompt:`设计一个 Stripe 风格的 Onboarding 步骤条：
- 横向三步，每步一个 28×28 圆形
- 已完成：品牌紫 #635bff 底 + 白色对勾
- 当前步骤：品牌紫底 + 白色数字，下方文字加粗黑色
- 未到达：灰底 #e5e7eb + 灰色数字 #9ca3af
- 步骤之间连接线：已完成段紫色 #635bff，未完成段灰色 #e5e7eb
- 文字标签 11px，在圆形正下方
- 整体风格：Stripe 注册流程步骤条`
    },

    /* ===== 14. 公告条 + 导航 ===== */
    {
      cat: 'nav', sort: 14,
      name: 'Vercel 产品公告条',
      desc: '顶部窄条 + 渐变文字 + CTA 链接。',
      tags: ['桌面端', '官网', '营销', 'Vercel'],
      preview: `<div>
      <div style="background:#000;color:#fff;text-align:center;font-size:12px;padding:6px 12px">
        <span style="background:linear-gradient(90deg,#00d4ff,#635bff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-weight:600">Next.js 15</span>
        <span style="opacity:.7;margin:0 6px">现已发布</span>
        <span style="color:#00d4ff">了解更多 →</span>
      </div>
      <div style="background:#fff;height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 32px;border-bottom:1px solid #e5e7eb">
        <div style="display:flex;align-items:center;gap:8px">
          <div style="width:14px;height:14px;background:#000;clip-path:polygon(50% 0,100% 100%,0 100%)"></div>
          <span style="font-weight:600;font-size:14px">Vercel</span>
        </div>
        <nav style="display:flex;gap:24px;font-size:14px;color:#666"><span>产品</span><span>文档</span><span>定价</span></nav>
        <div style="background:#000;color:#fff;padding:6px 14px;border-radius:6px;font-size:13px">部署</div>
      </div>
    </div>`,
      prompt:`设计一个 Vercel 风格的公告条 + 主导航双层结构：
- 最顶部一条 32px 公告条，纯黑底白字
- 公告内容：渐变色产品名（#00d4ff → #635bff）+ 灰色说明 + 蓝色 CTA 链接
- 下方是正常的 56px 白底主导航（Logo 左、菜单中、CTA 右）
- 整体风格：Vercel 产品发布期官网`
    },

    /* ===== 筛选面板：移动端多层菜单筛选 ===== */
    {
      cat: 'filter', sort: 1,
      name: '移动端多层菜单筛选面板',
      desc: '电商/内容 App 标配：左侧一级分类 tab，右侧二级选项网格，底部确定/重置。',
      tags: ['移动端', '电商', '筛选', '抽屉'],
      preview: `<div style="max-width:375px;margin:0 auto;background:#fff;overflow:hidden;border-radius:8px">
  <!-- 筛选栏 -->
  <div style="height:44px;display:flex;align-items:center;gap:24px;padding:0 16px;border-bottom:1px solid #f0f0f0;background:#fff">
    <span style="font-size:14px;color:#333">综合推荐 ▾</span>
    <span style="font-size:14px;color:#333">销量 ▾</span>
    <span style="font-size:14px;color:#ff2442;font-weight:500">筛选 ⚙</span>
  </div>
  <!-- 主体 -->
  <div style="display:flex">
    <!-- 左侧 tab -->
    <div style="width:90px;background:#f7f7f7;flex-shrink:0">
      <div style="padding:14px 8px;font-size:13px;color:#ff2442;text-align:center;background:#fff;position:relative">
        手机数码
        <span style="position:absolute;left:0;top:12px;bottom:12px;width:3px;background:#ff2442;border-radius:0 2px 2px 0"></span>
      </div>
      <div style="padding:14px 8px;font-size:13px;color:#666;text-align:center">电脑办公</div>
      <div style="padding:14px 8px;font-size:13px;color:#666;text-align:center">家用电器</div>
      <div style="padding:14px 8px;font-size:13px;color:#666;text-align:center">服饰鞋包</div>
    </div>
    <!-- 右侧选项 -->
    <div style="flex:1;padding:16px;background:#fff">
      <div style="font-size:13px;color:#999;margin-bottom:12px">品牌</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        <span style="padding:6px 14px;background:#ff244210;color:#ff2442;border:1px solid #ff2442;border-radius:4px;font-size:13px">Apple</span>
        <span style="padding:6px 14px;background:#f7f7f7;border-radius:4px;font-size:13px;color:#333">华为</span>
        <span style="padding:6px 14px;background:#f7f7f7;border-radius:4px;font-size:13px;color:#333">小米</span>
        <span style="padding:6px 14px;background:#f7f7f7;border-radius:4px;font-size:13px;color:#333">三星</span>
        <span style="padding:6px 14px;background:#f7f7f7;border-radius:4px;font-size:13px;color:#333">OPPO</span>
        <span style="padding:6px 14px;background:#f7f7f7;border-radius:4px;font-size:13px;color:#333">vivo</span>
      </div>
      <div style="font-size:13px;color:#999;margin:16px 0 12px">价格区间</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        <span style="padding:6px 14px;background:#f7f7f7;border-radius:4px;font-size:13px;color:#333">0-1000</span>
        <span style="padding:6px 14px;background:#ff244210;color:#ff2442;border:1px solid #ff2442;border-radius:4px;font-size:13px">1000-3000</span>
        <span style="padding:6px 14px;background:#f7f7f7;border-radius:4px;font-size:13px;color:#333">3000-5000</span>
        <span style="padding:6px 14px;background:#f7f7f7;border-radius:4px;font-size:13px;color:#333">5000以上</span>
      </div>
    </div>
  </div>
  <!-- 底部操作栏 -->
  <div style="height:56px;border-top:1px solid #f0f0f0;display:flex">
    <div style="flex:1;display:flex;align-items:center;justify-content:center;font-size:15px;color:#666">重置</div>
    <div style="flex:2;display:flex;align-items:center;justify-content:center;background:#ff2442;color:#fff;font-size:15px;font-weight:500">确定 (2)</div>
  </div>
</div>`,
      prompt:`设计一个移动端多层菜单筛选面板（电商 App 标配）：
- 顶部筛选栏 44px：综合推荐 ▾ / 销量 ▾ / 筛选 ⚙（选中态红色 #ff2442）
- 主体左右分栏：左侧一级 tab 宽 90px，右侧选项区自适应
- 左侧 tab：背景 #f7f7f7，选中项白底 + 红色文字 + 左侧 3px 红色竖条
- 右侧选项：浅灰底 #f7f7f7 圆角标签，选中态浅红底 #ff244210 + 红边框 #ff2442
- 选项分组：每组顶部 13px 灰色小标题（品牌/价格/规格）
- 底部固定操作栏 56px：左"重置"灰色，右"确定 (N)"红色填充（占 2/3 宽）
- 单选类（排序/价格）：点一个自动清其他；多选类（品牌/规格）：可多选
- 整体风格：淘宝/京东/小红书商品列表筛选面板`
    },

    /* ============================================================
       按钮（button）
    ============================================================ */
    {
      cat: 'button', sort: 1,
      name: 'shadcn/ui 主按钮',
      desc: '白底灰边框，hover 浅灰底，极简。',
      tags: ['桌面端', '极简', 'shadcn'],
      preview: `<div style="display:flex;gap:12px;padding:20px;align-items:center">
        <button style="background:#000;color:#fff;padding:8px 16px;border-radius:6px;font-size:14px;border:none;font-weight:500">默认</button>
        <button style="background:#fff;color:#000;padding:8px 16px;border-radius:6px;font-size:14px;border:1px solid #e5e7eb;font-weight:500">次要</button>
        <button style="background:#fff;color:#6b7280;padding:8px 16px;border-radius:6px;font-size:14px;border:none;font-weight:500">幽灵</button>
      </div>`,
      prompt:`设计一组 shadcn/ui 风格按钮：
- 默认按钮：黑底 #000 白字，padding 8px 16px，圆角 6px，14px 字重 500
- 次要按钮：白底，1px 边框 #e5e7eb，黑字
- 幽灵按钮：透明底，灰字 #6b7280，无边框
- hover 态：按钮背景加深 10%
- 整体风格：Radix/shadcn/ui 默认按钮组`
    },
    {
      cat: 'button', sort: 2,
      name: 'Vercel 黑底按钮',
      desc: '纯黑填充、无阴影、紧凑。',
      tags: ['桌面端', 'SaaS', 'Vercel', '极简'],
      preview: `<div style="display:flex;gap:12px;padding:20px;align-items:center">
        <button style="background:#000;color:#fff;padding:10px 18px;border-radius:6px;font-size:14px;border:none;font-weight:500">Deploy</button>
        <button style="background:transparent;color:#000;padding:10px 18px;border-radius:6px;font-size:14px;border:1px solid #e5e7eb;font-weight:500">Preview</button>
      </div>`,
      prompt:`设计 Vercel 风格按钮组：
- 主按钮：纯黑 #000 填充，白字，padding 10px 18px，圆角 6px，14px 字重 500
- 次按钮：白底，1px 边框 #e5e7eb，黑字
- 无阴影、无渐变、无圆角超过 6px
- 整体风格：vercel.com 按钮，紧凑、开发者工具感`
    },
    {
      cat: 'button', sort: 3,
      name: 'Stripe 渐变按钮',
      desc: '紫蓝渐变、圆角胶囊、阴影。',
      tags: ['桌面端', '金融', 'Stripe', '渐变'],
      preview: `<div style="padding:20px">
        <button style="background:linear-gradient(90deg,#635bff,#00d4ff);color:#fff;padding:12px 24px;border-radius:20px;font-size:15px;border:none;font-weight:500;box-shadow:0 4px 14px rgba(99,91,255,.3)">立即开始</button>
      </div>`,
      prompt:`设计一个 Stripe 风格渐变按钮：
- 背景：线性渐变 90deg，#635bff → #00d4ff
- 文字白色，15px 字重 500，padding 12px 24px
- 圆角 20px（胶囊形）
- 阴影：0 4px 14px rgba(99,91,255,.3)
- hover 时阴影加深
- 整体风格：stripe.com 主 CTA 按钮`
    },
    {
      cat: 'button', sort: 4,
      name: 'iOS 蓝色系统按钮',
      desc: '#007AFF、圆角、紧凑。',
      tags: ['移动端', 'iOS', '原生'],
      preview: `<div style="display:flex;gap:12px;padding:20px;align-items:center">
        <button style="background:#007AFF;color:#fff;padding:10px 20px;border-radius:10px;font-size:16px;border:none;font-weight:500">确认</button>
        <button style="background:transparent;color:#007AFF;padding:10px 20px;font-size:16px;border:none">取消</button>
      </div>`,
      prompt:`设计 iOS 风格按钮：
- 主按钮：#007AFF 蓝底白字，padding 10px 20px，圆角 10px，16px 字重 500
- 次按钮：透明底，#007AFF 蓝色文字，无边框
- 无阴影，扁平
- 整体风格：iOS 系统弹窗按钮`
    },
    {
      cat: 'button', sort: 5,
      name: '小红书红色胶囊按钮',
      desc: '品牌红、圆角胶囊、居中。',
      tags: ['移动端', '电商', '小红书'],
      preview: `<div style="padding:20px;text-align:center">
        <button style="background:#ff2442;color:#fff;padding:10px 32px;border-radius:20px;font-size:15px;border:none;font-weight:600">关注</button>
      </div>`,
      prompt:`设计小红书风格按钮：
- 背景 #ff2442，白字，padding 10px 32px
- 圆角 20px（胶囊），15px 字重 600
- 居中对齐
- 整体风格：小红书笔记关注按钮`
    },
    {
      cat: 'button', sort: 6,
      name: '加载态按钮',
      desc: '按钮内带 spinner 旋转。',
      tags: ['交互', '加载态', '通用'],
      preview: `<div style="display:flex;gap:12px;padding:20px;align-items:center">
        <button style="background:#007AFF;color:#fff;padding:10px 20px;border-radius:8px;font-size:14px;border:none;display:flex;align-items:center;gap:8px">
          <span style="width:14px;height:14px;border:2px solid #fff;border-top-color:transparent;border-radius:50%;display:inline-block"></span>
          加载中
        </button>
      </div>`,
      prompt:`设计一个加载态按钮：
- 按钮内左侧一个 14×14 spinner：2px 白色圆环，顶部缺口（border-top-color: transparent）
- 旋转动画 1s linear infinite
- 按钮文案"加载中"，14px
- 整体禁用态感，opacity 可降到 0.8
- 整体风格：通用表单提交按钮`
    },
    {
      cat: 'button', sort: 7,
      name: '浮动操作按钮 FAB',
      desc: '圆形、右下悬浮、阴影。',
      tags: ['移动端', 'Material', '悬浮'],
      preview: `<div style="position:relative;height:120px;background:#f5f5f5">
        <button style="position:absolute;right:16px;bottom:16px;width:56px;height:56px;border-radius:50%;background:#007AFF;color:#fff;font-size:24px;border:none;box-shadow:0 4px 12px rgba(0,122,255,.4);display:flex;align-items:center;justify-content:center">+</button>
      </div>`,
      prompt:`设计一个 Material 风格浮动操作按钮（FAB）：
- 圆形 56×56px，#007AFF 底白字
- 位置：右下角，right 16px bottom 16px
- 阴影：0 4px 12px rgba(0,122,255,.4)
- 内部 + 号 24px 居中
- hover 时放大 1.05
- 整体风格：Material Design FAB`
    },
    {
      cat: 'button', sort: 8,
      name: 'GitHub 绿色合并按钮',
      desc: '绿色填充、圆角、带图标。',
      tags: ['桌面端', '开发者', 'GitHub'],
      preview: `<div style="display:flex;gap:8px;padding:20px">
        <button style="background:#1f883d;color:#fff;padding:6px 16px;border-radius:6px;font-size:14px;border:1px solid rgba(255,255,255,.5);font-weight:500">✓ Merge pull request</button>
      </div>`,
      prompt:`设计 GitHub 风格合并按钮：
- 背景 #1f883d（绿色），白字，padding 6px 16px，圆角 6px
- 14px 字重 500，左侧带 ✓ 图标
- 1px 半透明白边框
- 整体风格：github.com PR 合并按钮`
    },

    /* ============================================================
       卡片（card）
    ============================================================ */
    {
      cat: 'card', sort: 1,
      name: 'Linear 任务卡片',
      desc: '白底、紧凑、左侧优先级条、标签。',
      tags: ['桌面端', 'SaaS', 'Linear'],
      preview: `<div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:14px 16px;max-width:320px;border-left:3px solid #ff6b6b">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
          <span style="font-size:11px;background:#fef2f2;color:#ff6b6b;padding:2px 6px;border-radius:4px">P0</span>
          <span style="font-size:11px;background:#eff6ff;color:#2563eb;padding:2px 6px;border-radius:4px">Bug</span>
        </div>
        <div style="font-size:14px;font-weight:500;color:#111827;margin-bottom:4px">登录页崩溃在 Safari 17</div>
        <div style="font-size:12px;color:#9ca3af">ASSIGNED TO: 张三 · 2h ago</div>
      </div>`,
      prompt:`设计 Linear 风格任务卡片：
- 白底，1px #e5e7eb 边框，圆角 8px
- 左侧 3px 优先级色条（P0 红色 #ff6b6b）
- 顶部标签：优先级标签（红底）+ 类型标签（蓝底），11px 圆角 4px
- 标题 14px 字重 500，下方 12px 灰色元信息
- padding 14px 16px
- 整体风格：Linear 任务列表卡片`
    },
    {
      cat: 'card', sort: 2,
      name: 'Notion 文档卡片',
      desc: '封面图 + 标题 + 描述 + 作者头像。',
      tags: ['桌面端', '文档', 'Notion'],
      preview: `<div style="background:#fff;border:1px solid #e9e9e7;border-radius:8px;overflow:hidden;max-width:300px">
        <div style="height:100px;background:linear-gradient(135deg:#a855f7,#ec4899)"></div>
        <div style="padding:14px">
          <div style="font-size:15px;font-weight:600;color:#37352f;margin-bottom:4px">产品需求文档 v2</div>
          <div style="font-size:13px;color:#6b7280;margin-bottom:12px">首页改版的完整需求清单</div>
          <div style="display:flex;align-items:center;gap:6px">
            <div style="width:20px;height:20px;border-radius:50%;background:#3b82f6"></div>
            <span style="font-size:12px;color:#9ca3af">张三</span>
          </div>
        </div>
      </div>`,
      prompt:`设计 Notion 风格文档卡片：
- 白底，1px #e9e9e7 边框，圆角 8px
- 顶部封面图 100px 高（渐变紫色占位）
- 下方 padding 14px
- 标题 15px 字重 600，描述 13px 灰色
- 底部 20px 圆形头像 + 作者名 12px 灰色
- 整体风格：Notion 工作区文档卡片`
    },
    {
      cat: 'card', sort: 3,
      name: 'Stripe 功能卡片',
      desc: '左侧图标 + 标题 + 描述，hover 阴影。',
      tags: ['桌面端', '官网', 'Stripe'],
      preview: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:20px;max-width:500px">
        <div style="background:#f6f9fc;border-radius:8px;padding:20px">
          <div style="width:32px;height:32px;border-radius:6px;background:#635bff;margin-bottom:12px"></div>
          <div style="font-size:15px;font-weight:600;color:#1a1f36;margin-bottom:4px">Payments</div>
          <div style="font-size:13px;color:#6b7280">在线支付、订阅、发票一体化</div>
        </div>
        <div style="background:#f6f9fc;border-radius:8px;padding:20px">
          <div style="width:32px;height:32px;border-radius:6px;background:#10b981;margin-bottom:12px"></div>
          <div style="font-size:15px;font-weight:600;color:#1a1f36;margin-bottom:4px">Billing</div>
          <div style="font-size:13px;color:#6b7280">订阅计费自动化</div>
        </div>
      </div>`,
      prompt:`设计 Stripe 风格功能卡片：
- 2 列网格，卡片背景 #f6f9fc，圆角 8px，padding 20px
- 顶部 32×32 圆角图标（品牌色）
- 标题 15px 字重 600 #1a1f36
- 描述 13px 灰色 #6b7280
- hover 时阴影加深
- 整体风格：stripe.com 功能展示卡片`
    },
    {
      cat: 'card', sort: 4,
      name: '小红书笔记卡片',
      desc: '竖图 + 标题 + 作者 + 点赞数。',
      tags: ['移动端', '内容', '小红书'],
      preview: `<div style="background:#fff;border-radius:8px;overflow:hidden;max-width:180px">
        <div style="height:140px;background:linear-gradient(135deg,#fb923c,#f43f5e)"></div>
        <div style="padding:8px">
          <div style="font-size:13px;color:#333;margin-bottom:6px;line-height:1.4">成都必吃的 10 家苍蝇馆子</div>
          <div style="display:flex;align-items:center;justify-content:space-between">
            <div style="display:flex;align-items:center;gap:4px">
              <div style="width:16px;height:16px;border-radius:50%;background:#ddd"></div>
              <span style="font-size:11px;color:#999">美食博主</span>
            </div>
            <span style="font-size:11px;color:#999">♥ 2.3w</span>
          </div>
        </div>
      </div>`,
      prompt:`设计小红书风格笔记卡片：
- 竖版，宽 180px，白底圆角 8px
- 顶部封面图 140px 高（渐变占位）
- 下方 padding 8px
- 标题 13px 两行截断
- 底部：16px 圆形头像 + 作者名 11px 灰色 + 右侧点赞数 ♥
- 整体风格：小红书首页双列瀑布流卡片`
    },
    {
      cat: 'card', sort: 5,
      name: 'GitHub 仓库卡片',
      desc: '仓库名 + 描述 + 星标/语言。',
      tags: ['桌面端', '开发者', 'GitHub'],
      preview: `<div style="background:#fff;border:1px solid #d0d7de;border-radius:6px;padding:16px;max-width:400px">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
          <span style="color:#0969da;font-size:14px">vuejs</span>
          <span style="color:#0969da;font-size:14px;font-weight:600">/ core</span>
        </div>
        <div style="font-size:13px;color:#656d76;margin-bottom:12px">Vue.js 内核仓库</div>
        <div style="display:flex;gap:16px;font-size:12px;color:#656d76">
          <span><span style="width:10px;height:10px;border-radius:50%;background:#41b883;display:inline-block;margin-right:4px"></span>JavaScript</span>
          <span>★ 86.2k</span>
          <span>⑂ 12.4k</span>
        </div>
      </div>`,
      prompt:`设计 GitHub 仓库卡片：
- 白底，1px #d0d7de 边框，圆角 6px，padding 16px
- 顶部：用户名 / 仓库名（蓝色 #0969da，仓库名加粗）
- 描述 13px 灰色 #656d76
- 底部：语言标签（带小圆点）+ 星标数 + fork 数
- 整体风格：github.com 仓库列表卡片`
    },
    {
      cat: 'card', sort: 6,
      name: '统计数据卡片',
      desc: '大数字 + 标签 + 趋势箭头。',
      tags: ['桌面端', 'Dashboard', '数据'],
      preview: `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;padding:20px;max-width:500px">
        <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px">
          <div style="font-size:12px;color:#9ca3af;margin-bottom:4px">今日访问</div>
          <div style="font-size:24px;font-weight:700;color:#111827">12,847</div>
          <div style="font-size:12px;color:#10b981;margin-top:4px">↑ 12.5%</div>
        </div>
        <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px">
          <div style="font-size:12px;color:#9ca3af;margin-bottom:4px">转化率</div>
          <div style="font-size:24px;font-weight:700;color:#111827">3.24%</div>
          <div style="font-size:12px;color:#ef4444;margin-top:4px">↓ 0.8%</div>
        </div>
        <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px">
          <div style="font-size:12px;color:#9ca3af;margin-bottom:4px">营收</div>
          <div style="font-size:24px;font-weight:700;color:#111827">¥42,300</div>
          <div style="font-size:12px;color:#10b981;margin-top:4px">↑ 8.1%</div>
        </div>
      </div>`,
      prompt:`设计一组 Dashboard 统计卡片：
- 3 列网格，白底，1px #e5e7eb 边框，圆角 8px，padding 16px
- 顶部标签 12px 灰色 #9ca3af
- 大数字 24px 字重 700 #111827
- 底部趋势箭头：上涨绿色 #10b981，下跌红色 #ef4444
- 整体风格：通用 SaaS Dashboard 指标卡`
    },
    {
      cat: 'card', sort: 7,
      name: '商品卡片',
      desc: '图 + 标题 + 价格 + 销量。',
      tags: ['移动端', '电商', '商品'],
      preview: `<div style="background:#fff;border-radius:8px;overflow:hidden;max-width:200px">
        <div style="height:120px;background:linear-gradient(135deg,#60a5fa,#a78bfa)"></div>
        <div style="padding:8px">
          <div style="font-size:13px;color:#333;margin-bottom:6px;line-height:1.4">Apple iPhone 16 Pro 256GB</div>
          <div style="display:flex;align-items:baseline;gap:6px;margin-bottom:4px">
            <span style="color:#ff2442;font-size:18px;font-weight:700">¥7999</span>
            <span style="color:#999;font-size:11px;text-decoration:line-through">¥8999</span>
          </div>
          <div style="font-size:11px;color:#999">已售 2.3万件</div>
        </div>
      </div>`,
      prompt:`设计电商商品卡片：
- 白底圆角 8px，图 120px 高
- 标题 13px 两行截断
- 价格：红色 #ff2442 18px 加粗 + 原价灰色删除线
- 销量 11px 灰色
- 整体风格：淘宝/京东商品列表卡片`
    },
    {
      cat: 'card', sort: 8,
      name: '用户资料卡片',
      desc: '头像 + 名字 + 简介 + 操作按钮。',
      tags: ['桌面端', '社交', '个人页'],
      preview: `<div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;max-width:320px;text-align:center">
        <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#ef4444);margin:0 auto 12px"></div>
        <div style="font-size:16px;font-weight:600;color:#111827;margin-bottom:4px">张三</div>
        <div style="font-size:13px;color:#6b7280;margin-bottom:16px">前端工程师 · 成都</div>
        <div style="display:flex;justify-content:center;gap:20px;margin-bottom:16px">
          <div><div style="font-size:16px;font-weight:600">128</div><div style="font-size:11px;color:#9ca3af">关注</div></div>
          <div><div style="font-size:16px;font-weight:600">2.3k</div><div style="font-size:11px;color:#9ca3af">粉丝</div></div>
          <div><div style="font-size:16px;font-weight:600">456</div><div style="font-size:11px;color:#9ca3af">获赞</div></div>
        </div>
        <button style="background:#007AFF;color:#fff;padding:8px 32px;border-radius:6px;font-size:14px;border:none">关注</button>
      </div>`,
      prompt:`设计用户资料卡片：
- 白底，1px #e5e7eb 边框，圆角 12px，padding 20px，居中对齐
- 64px 圆形头像（渐变占位）
- 名字 16px 加粗，简介 13px 灰色
- 三列统计：关注/粉丝/获赞，数字 16px 加粗，标签 11px 灰色
- 底部蓝色关注按钮 #007AFF
- 整体风格：社交 App 个人资料卡`
    },

    /* ============================================================
       表单输入（form）
    ============================================================ */
    {
      cat: 'form', sort: 1,
      name: 'shadcn/ui 输入框',
      desc: '白底灰边框，focus 黑边框。',
      tags: ['桌面端', '极简', 'shadcn'],
      preview: `<div style="padding:20px;max-width:300px">
        <label style="display:block;font-size:14px;font-weight:500;color:#111827;margin-bottom:6px">邮箱</label>
        <input style="width:100%;padding:8px 12px;border:1px solid #e5e7eb;border-radius:6px;font-size:14px;outline:none" placeholder="name@example.com" value="zhangsan@example.com">
      </div>`,
      prompt:`设计 shadcn/ui 风格输入框：
- 标签 14px 字重 500，下方 margin-bottom 6px
- 输入框：白底，1px 边框 #e5e7eb，圆角 6px，padding 8px 12px，14px
- focus 态：边框变黑 #111827
- placeholder 灰色 #9ca3af
- 整体风格：shadcn/ui 默认表单输入`
    },
    {
      cat: 'form', sort: 2,
      name: 'Linear 命令面板输入（⌘K）',
      desc: '居中悬浮、大圆角、带快捷键提示。',
      tags: ['桌面端', '快捷键', 'Linear'],
      preview: `<div style="background:#f5f5f5;padding:40px;text-align:center">
        <div style="background:#fff;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,.15);max-width:480px;margin:0 auto;overflow:hidden">
          <div style="display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #f0f0f0">
            <span style="color:#9ca3af;font-size:16px">⌘</span>
            <input style="flex:1;border:none;outline:none;font-size:15px" placeholder="输入命令或搜索…">
            <span style="font-size:11px;color:#9ca3af;background:#f5f5f5;padding:2px 8px;border-radius:4px">ESC</span>
          </div>
          <div style="padding:8px 0">
            <div style="padding:8px 16px;font-size:14px;color:#111827">🔍 搜索 Issues</div>
            <div style="padding:8px 16px;font-size:14px;color:#6b7280">📄 新建 Issue</div>
            <div style="padding:8px 16px;font-size:14px;color:#6b7280">⚙ 打开设置</div>
          </div>
        </div>
      </div>`,
      prompt:`设计 Linear 风格命令面板（⌘K）：
- 居中悬浮卡片，白底，圆角 12px，阴影 0 10px 40px rgba(0,0,0,.15)
- 输入行：左侧 ⌘ 图标，中间输入框 15px，右侧 ESC 快捷键标签
- 下方命令列表：每行 14px padding 8px 16px
- 整体风格：Linear / Raycast 命令面板`
    },
    {
      cat: 'form', sort: 3,
      name: 'iOS 搜索框',
      desc: '圆角胶囊、浅灰底、放大镜图标。',
      tags: ['移动端', 'iOS', '搜索'],
      preview: `<div style="padding:20px">
        <div style="display:flex;align-items:center;gap:8px;background:#f0f0f5;border-radius:10px;padding:8px 12px">
          <span style="color:#9ca3af;font-size:14px">🔍</span>
          <input style="flex:1;border:none;background:transparent;outline:none;font-size:14px" placeholder="搜索">
          <span style="color:#9ca3af;font-size:14px">✕</span>
        </div>
      </div>`,
      prompt:`设计 iOS 风格搜索框：
- 背景 #f0f0f5，圆角 10px，padding 8px 12px
- 左侧放大镜图标，右侧清除按钮 ✕
- 输入框 14px，无背景无边框
- placeholder 灰色
- 整体风格：iOS 通讯录/设置搜索框`
    },
    {
      cat: 'form', sort: 4,
      name: '登录表单',
      desc: '邮箱 + 密码 + 提交按钮，垂直排列。',
      tags: ['桌面端', '认证', '表单'],
      preview: `<div style="padding:24px;max-width:320px">
        <h2 style="font-size:20px;font-weight:600;margin:0 0 20px">登录</h2>
        <div style="margin-bottom:16px">
          <label style="display:block;font-size:13px;color:#374151;margin-bottom:4px">邮箱</label>
          <input style="width:100%;padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;box-sizing:border-box" placeholder="you@example.com">
        </div>
        <div style="margin-bottom:20px">
          <label style="display:block;font-size:13px;color:#374151;margin-bottom:4px">密码</label>
          <input type="password" style="width:100%;padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;box-sizing:border-box" placeholder="••••••••">
        </div>
        <button style="width:100%;background:#000;color:#fff;padding:10px;border-radius:6px;font-size:14px;border:none;font-weight:500">登录</button>
        <div style="text-align:center;margin-top:16px;font-size:13px;color:#6b7280">
          还没有账号？<a style="color:#007AFF">注册</a>
        </div>
      </div>`,
      prompt:`设计一个标准登录表单：
- 标题 20px 加粗，下方间距 20px
- 每个字段：标签 13px + 输入框（1px #d1d5db 边框，圆角 6px，padding 8px 12px）
- 字段间距 16px，提交按钮全宽黑底白字
- 底部注册链接 13px 灰色，"注册"蓝色 #007AFF
- 整体风格：通用 SaaS 登录页`
    },
    {
      cat: 'form', sort: 5,
      name: '开关 Toggle',
      desc: 'iOS 风格绿色滑块。',
      tags: ['移动端', '开关', 'iOS'],
      preview: `<div style="padding:20px;max-width:300px">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #f0f0f0">
          <span style="font-size:14px;color:#333">通知</span>
          <div onclick="var t=this;var on=t.style.background==='rgb(52, 199, 89)';t.style.background=on?'#e5e5ea':'#34c759';var s=t.firstElementChild;s.style.left=on?'2px':'auto';s.style.right=on?'auto':'2px';s.style.transition='all .2s'" style="width:50px;height:30px;background:#34c759;border-radius:15px;position:relative;cursor:pointer">
            <div style="position:absolute;right:2px;top:2px;width:26px;height:26px;background:#fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)"></div>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0">
          <span style="font-size:14px;color:#333">自动更新</span>
          <div onclick="var t=this;var on=t.style.background==='rgb(52, 199, 89)';t.style.background=on?'#e5e5ea':'#34c759';var s=t.firstElementChild;s.style.left=on?'2px':'auto';s.style.right=on?'auto':'2px';s.style.transition='all .2s'" style="width:50px;height:30px;background:#e5e5ea;border-radius:15px;position:relative;cursor:pointer">
            <div style="position:absolute;left:2px;top:2px;width:26px;height:26px;background:#fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)"></div>
          </div>
        </div>
      </div>`,
      prompt:`设计 iOS 风格开关 Toggle：
- 宽 50px 高 30px，圆角 15px
- 开启态：绿色 #34c759 底，滑块在右侧
- 关闭态：灰色 #e5e5ea 底，滑块在左侧
- 滑块 26×26 白色圆形，带轻微阴影
- 行间距：标签 14px 左，开关右对齐
- 整体风格：iOS 设置页开关`
    },
    {
      cat: 'form', sort: 6,
      name: '复选框',
      desc: '带勾选框 + 标签，支持半选态。',
      tags: ['桌面端', '多选', '表单'],
      preview: `<div style="padding:20px;max-width:300px">
        <label style="display:flex;align-items:center;gap:8px;padding:6px 0;cursor:pointer">
          <div style="width:18px;height:18px;border-radius:4px;background:#007AFF;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px">✓</div>
          <span style="font-size:14px;color:#333">邮件通知</span>
        </label>
        <label style="display:flex;align-items:center;gap:8px;padding:6px 0;cursor:pointer">
          <div style="width:18px;height:18px;border-radius:4px;background:#007AFF;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px">✓</div>
          <span style="font-size:14px;color:#333">短信通知</span>
        </label>
        <label style="display:flex;align-items:center;gap:8px;padding:6px 0;cursor:pointer">
          <div style="width:18px;height:18px;border-radius:4px;border:1.5px solid #d1d5db"></div>
          <span style="font-size:14px;color:#333">推送通知</span>
        </label>
      </div>`,
      prompt:`设计一组复选框：
- 勾选框 18×18px，圆角 4px
- 选中态：#007AFF 蓝底 + 白色 ✓
- 未选中：1.5px #d1d5db 边框
- 标签 14px，间距 8px
- 整体风格：通用表单复选框`
    },
    {
      cat: 'form', sort: 7,
      name: '下拉选择',
      desc: '带下拉箭头、可选中。',
      tags: ['桌面端', '选择', '表单'],
      preview: `<div style="padding:20px;max-width:300px">
        <label style="display:block;font-size:13px;color:#374151;margin-bottom:4px">城市</label>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:14px">
          <span style="color:#333">成都</span>
          <span style="color:#9ca3af">▾</span>
        </div>
      </div>`,
      prompt:`设计一个下拉选择框：
- 标签 13px，下方 margin-bottom 4px
- 选择框：padding 8px 12px，1px #d1d5db 边框，圆角 6px，14px
- 右侧下拉箭头 ▾ 灰色
- 整体风格：通用表单下拉`
    },
    {
      cat: 'form', sort: 8,
      name: '多行文本域',
      desc: '带 resize 手柄、自动高度感。',
      tags: ['桌面端', '文本', '表单'],
      preview: `<div style="padding:20px;max-width:400px">
        <label style="display:block;font-size:13px;color:#374151;margin-bottom:4px">备注</label>
        <textarea style="width:100%;padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;min-height:80px;box-sizing:border-box;resize:vertical" placeholder="请输入备注信息…">客户要求周一前交付，注意配色不要用红色。</textarea>
      </div>`,
      prompt:`设计一个多行文本域：
- 标签 13px
- 文本框：padding 8px 12px，1px #d1d5db 边框，圆角 6px，14px
- 最小高度 80px，允许垂直 resize
- placeholder 灰色
- 整体风格：通用表单文本域`
    },

    /* ============================================================
       面包屑/步骤（breadcrumb）
    ============================================================ */
    {
      cat: 'breadcrumb', sort: 1,
      name: 'GitHub 仓库面包屑',
      desc: '带仓库图标、蓝色链接、分支胶囊。',
      tags: ['桌面端', '开发者', '面包屑'],
      preview: `<div style="background:#fff;padding:16px 24px;display:flex;align-items:center;gap:8px;font-size:14px;border-bottom:1px solid #e5e7eb">
        <span style="color:#0969da">octocat</span><span style="color:#6e7781">/</span>
        <span style="color:#0969da;font-weight:600">hello-world</span>
        <div style="margin-left:12px;background:#f6f8fa;border:1px solid #d0d7de;border-radius:20px;padding:3px 10px;font-size:12px;color:#57606a">⑂ main</div>
      </div>`,
      prompt:`设计 GitHub 风格面包屑：
- 白底 padding 16px 24px，底部 1px #e5e7eb 分割线
- 格式：用户名 / 仓库名，蓝色 #0969da，仓库名加粗
- 右侧分支按钮：圆角 20px，浅灰底 #f6f8fa，边框 #d0d7de
- 整体风格：github.com 仓库页头部`
    },
    {
      cat: 'breadcrumb', sort: 2,
      name: 'Stripe Onboarding 步骤条',
      desc: '圆形进度 + 连接线 + 标签。',
      tags: ['流程', 'Onboarding', 'Stripe'],
      preview: `<div style="background:#fff;padding:20px;display:flex;align-items:center;max-width:400px">
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
          <div style="width:28px;height:28px;border-radius:50%;background:#635bff;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600">✓</div>
          <div style="font-size:11px;color:#635bff;font-weight:500">账户</div>
        </div>
        <div style="flex:1;height:2px;background:#635bff;margin:0 8px;margin-bottom:20px"></div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
          <div style="width:28px;height:28px;border-radius:50%;background:#635bff;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600">2</div>
          <div style="font-size:11px;color:#000;font-weight:600">验证</div>
        </div>
        <div style="flex:1;height:2px;background:#e5e7eb;margin:0 8px;margin-bottom:20px"></div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
          <div style="width:28px;height:28px;border-radius:50%;background:#e5e7eb;color:#9ca3af;display:flex;align-items:center;justify-content:center;font-size:12px">3</div>
          <div style="font-size:11px;color:#9ca3af">完成</div>
        </div>
      </div>`,
      prompt:`设计 Stripe 风格步骤条：
- 横向三步，每步 28×28 圆形
- 已完成：品牌紫 #635bff 底 + 白色对勾
- 当前步骤：紫底白字，下方文字加粗
- 未到达：灰底 #e5e7eb + 灰色数字
- 连接线：已完成段紫色，未完成段灰色
- 整体风格：Stripe 注册流程`
    },
    {
      cat: 'breadcrumb', sort: 3,
      name: '带返回按钮的面包屑',
      desc: '左箭头 + 层级链接。',
      tags: ['移动端', '导航', '返回'],
      preview: `<div style="background:#fff;padding:12px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid #f0f0f0">
        <span style="font-size:20px;color:#333">‹</span>
        <span style="font-size:14px;color:#666">首页</span>
        <span style="color:#999">/</span>
        <span style="font-size:14px;color:#333;font-weight:500">商品详情</span>
      </div>`,
      prompt:`设计移动端返回面包屑：
- 白底 padding 12px 16px，底部 1px #f0f0f0 分割线
- 左侧 ‹ 返回箭头 20px
- 层级链接：首页灰色 / 当前页黑色加粗
- 整体风格：iOS 导航返回`
    },
    {
      cat: 'breadcrumb', sort: 4,
      name: 'Ant Design 步骤条',
      desc: '带图标的横向步骤。',
      tags: ['后台', '流程', 'Antd'],
      preview: `<div style="background:#fff;padding:24px;display:flex;align-items:center;max-width:500px">
        <div style="display:flex;align-items:center;gap:8px">
          <div style="width:24px;height:24px;border-radius:50%;background:#1677ff;color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px">✓</div>
          <span style="font-size:13px;color:#1677ff">提交订单</span>
        </div>
        <div style="flex:1;height:1px;background:#1677ff;margin:0 12px"></div>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="width:24px;height:24px;border-radius:50%;border:1px solid #1677ff;color:#1677ff;display:flex;align-items:center;justify-content:center;font-size:11px">2</div>
          <span style="font-size:13px;color:#000;font-weight:500">付款</span>
        </div>
        <div style="flex:1;height:1px;background:#e5e7eb;margin:0 12px"></div>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="width:24px;height:24px;border-radius:50%;border:1px solid #d9d9d9;color:##999;display:flex;align-items:center;justify-content:center;font-size:11px">3</div>
          <span style="font-size:13px;color:#999">完成</span>
        </div>
      </div>`,
      prompt:`设计 Ant Design 风格步骤条：
- 横向三步，每步 24×24 圆形
- 已完成：#1677ff 蓝底白字
- 当前步骤：蓝边框白底蓝字
- 未到达：灰边框 #d9d9d9 + 灰字
- 连接线：已完成段蓝色，未完成段灰色
- 整体风格：Ant Design Pro 步骤条`
    },

    /* ============================================================
       布局栅格（layout）
    ============================================================ */
    {
      cat: 'layout', sort: 1,
      name: '经典后台三栏布局',
      desc: '左侧边栏 + 主内容 + 右侧栏。',
      tags: ['桌面端', '后台', '布局'],
      preview: `<div style="display:flex;height:200px;font-size:11px">
        <div style="width:160px;background:#111827;color:#fff;padding:12px">侧边栏</div>
        <div style="flex:1;background:#f9fafb;padding:12px">主内容区</div>
        <div style="width:200px;background:#fff;border-left:1px solid #e5e7eb;padding:12px">右侧栏</div>
      </div>`,
      prompt:`设计经典后台三栏布局：
- 左侧边栏 160px，深色 #111827
- 主内容区 flex:1，浅灰 #f9fafb
- 右侧栏 200px，白底，1px 左边框
- 整体风格：通用 SaaS Dashboard 布局`
    },
    {
      cat: 'layout', sort: 2,
      name: '卡片网格布局',
      desc: '响应式网格，自动换行。',
      tags: ['桌面端', '内容', '网格'],
      preview: `<div style="background:#f9fafb;padding:16px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
        <div style="background:#fff;border-radius:8px;padding:16px;height:60px"></div>
        <div style="background:#fff;border-radius:8px;padding:16px;height:60px"></div>
        <div style="background:#fff;border-radius:8px;padding:16px;height:60px"></div>
        <div style="background:#fff;border-radius:8px;padding:16px;height:60px"></div>
        <div style="background:#fff;border-radius:8px;padding:16px;height:60px"></div>
        <div style="background:#fff;border-radius:8px;padding:16px;height:60px"></div>
      </div>`,
      prompt:`设计卡片网格布局：
- 3 列响应式网格，gap 12px
- 卡片白底圆角 8px，padding 16px
- 外层浅灰底 #f9fafb
- 整体风格：内容管理后台卡片墙`
    },
    {
      cat: 'layout', sort: 3,
      name: '居中内容区',
      desc: '最大宽度居中，两侧留白。',
      tags: ['桌面端', '官网', '居中'],
      preview: `<div style="background:#fff;padding:40px 20px">
        <div style="max-width:600px;margin:0 auto;background:#f9fafb;padding:40px;border-radius:8px">
          <div style="height:12px;background:#e5e7eb;border-radius:3px;margin-bottom:8px;width:80%"></div>
          <div style="height:12px;background:#e5e7eb;border-radius:3px;margin-bottom:8px;width:60%"></div>
          <div style="height:12px;background:#e5e7eb;border-radius:3px;width:70%"></div>
        </div>
      </div>`,
      prompt:`设计居中内容区布局：
- 内容最大宽度 600px，margin 0 auto
- 上下 padding 40px
- 整体风格：博客/文档站文章页`
    },
    {
      cat: 'layout', sort: 4,
      name: '移动端单列布局',
      desc: '通宽列表，无侧栏。',
      tags: ['移动端', 'App', '单列'],
      preview: `<div style="background:#f5f5f5;padding:12px;max-width:375px;margin:0 auto">
        <div style="background:#fff;border-radius:8px;padding:16px;margin-bottom:8px"></div>
        <div style="background:#fff;border-radius:8px;padding:16px;margin-bottom:8px"></div>
        <div style="background:#fff;border-radius:8px;padding:16px"></div>
      </div>`,
      prompt:`设计移动端单列布局：
- 背景 #f5f5f5，padding 12px
- 卡片白底圆角 8px，间距 8px
- 整体风格：移动端 App 列表页`
    },

    /* ============================================================
       页脚（footer）
    ============================================================ */
    {
      cat: 'footer', sort: 1,
      name: 'Stripe 官网页脚',
      desc: '多列链接 + 品牌色 + 法律信息。',
      tags: ['桌面端', '官网', 'Stripe'],
      preview: `<div style="background:#0a2540;color:#fff;padding:40px;display:grid;grid-template-columns:repeat(5,1fr);gap:24px;font-size:12px">
        <div>
          <div style="font-weight:700;font-size:16px;background:linear-gradient(90deg,#635bff,#00d4ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent">stripe</div>
          <div style="color:#8898aa;margin-top:8px"> © 2024 Stripe</div>
        </div>
        <div><div style="font-weight:600;margin-bottom:8px">产品</div><div style="color:#8898aa;line-height:2">支付<br>Billing<br>Connect</div></div>
        <div><div style="font-weight:600;margin-bottom:8px">资源</div><div style="color:#8898aa;line-height:2">文档<br>API<br>状态</div></div>
        <div><div style="font-weight:600;margin-bottom:8px">公司</div><div style="color:#8898aa;line-height:2">关于<br>博客<br>招聘</div></div>
        <div><div style="font-weight:600;margin-bottom:8px">法律</div><div style="color:#8898aa;line-height:2">隐私<br>条款</div></div>
      </div>`,
      prompt:`设计 Stripe 风格页脚：
- 深色背景 #0a2540，白字
- 5 列网格：品牌列 + 产品/资源/公司/法律
- Logo 用紫蓝渐变
- 链接 12px 灰色 #8898aa，行高 2
- 整体风格：stripe.com 页脚`
    },
    {
      cat: 'footer', sort: 2,
      name: 'Vercel 极简页脚',
      desc: '黑底白字、单行链接。',
      tags: ['桌面端', '极简', 'Vercel'],
      preview: `<div style="background:#000;color:#fff;padding:24px 32px;display:flex;align-items:center;justify-content:space-between;font-size:12px">
        <div style="display:flex;align-items:center;gap:8px">
          <div style="width:12px;height:12px;background:#fff;clip-path:polygon(50% 0,100% 100%,0 100%)"></div>
          <span>© 2024 Vercel</span>
        </div>
        <div style="display:flex;gap:20px;color:#888"><span>文档</span><span>定价</span><span>GitHub</span><span>X</span></div>
      </div>`,
      prompt:`设计 Vercel 风格极简页脚：
- 纯黑背景 #000，白字 12px
- 左侧：三角 Logo + 版权
- 右侧：单行链接灰色 #888
- padding 24px 32px
- 整体风格：vercel.com 页脚`
    },
    {
      cat: 'footer', sort: 3,
      name: '后台页脚',
      desc: '居中版权 + 版本号。',
      tags: ['桌面端', '后台', '简洁'],
      preview: `<div style="background:#fff;padding:16px;text-align:center;font-size:12px;color:#9ca3af;border-top:1px solid #e5e7eb">
        © 2024 Acme Inc. · v2.3.1 · 京ICP备 xxx 号
      </div>`,
      prompt:`设计后台页脚：
- 白底 padding 16px，顶部 1px #e5e7eb 分割线
- 居中 12px 灰色 #9ca3af
- 版权 + 版本号 + 备案号
- 整体风格：通用后台页脚`
    },
    {
      cat: 'footer', sort: 4,
      name: '小红书 App 页脚',
      desc: '底部 Tab + 版权。',
      tags: ['移动端', 'App', '版权'],
      preview: `<div style="background:#fff;padding:20px;text-align:center;font-size:11px;color:#999;max-width:375px;margin:0 auto">
        <div style="margin-bottom:8px">关于小红书 · 帮助与客服 · 隐私 · 条款</div>
        <div>© 2024 小红书 · 京ICP备 11111111 号</div>
      </div>`,
      prompt:`设计移动端 App 页脚：
- 白底 padding 20px 居中
- 第一行：关于/帮助/隐私/条款链接 11px 灰色
- 第二行：版权 + 备案号
- 整体风格：小红书 App 底部信息`
    },

    /* ============================================================
       列表（list）
    ============================================================ */
    {
      cat: 'list', sort: 1,
      name: 'Linear 任务列表行',
      desc: '紧凑行、优先级条、标签、元信息。',
      tags: ['桌面端', 'SaaS', 'Linear'],
      preview: `<div style="background:#fff;border:1px solid #e5e7eb;border-radius:6px;max-width:400px;overflow:hidden">
        <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid #f3f4f6;border-left:3px solid #ff6b6b">
          <div style="width:14px;height:14px;border:1.5px solid #d1d5db;border-radius:3px;flex-shrink:0"></div>
          <span style="font-size:13px;color:#111827;flex:1">登录页崩溃在 Safari 17</span>
          <span style="font-size:11px;background:#fef2f2;color:#ff6b6b;padding:1px 6px;border-radius:3px">P0</span>
          <div style="width:20px;height:20px;border-radius:50%;background:#3b82f6;flex-shrink:0"></div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-left:3px solid #f59e0b">
          <div style="width:14px;height:14px;border:1.5px solid #d1d5db;border-radius:3px;flex-shrink:0"></div>
          <span style="font-size:13px;color:#111827;flex:1">优化首屏加载速度</span>
          <span style="font-size:11px;background:#fffbeb;color:#f59e0b;padding:1px 6px;border-radius:3px">P1</span>
          <div style="width:20px;height:20px;border-radius:50%;background:#10b981;flex-shrink:0"></div>
        </div>
      </div>`,
      prompt:`设计 Linear 风格任务列表：
- 每行：左侧勾选框 + 标题 + 优先级标签 + 头像
- 左侧 3px 优先级色条（P0 红 / P1 橙）
- 行高 40px，padding 10px 14px
- 1px #f3f4f6 分割线
- 整体风格：Linear 任务列表`
    },
    {
      cat: 'list', sort: 2,
      name: 'iOS 设置列表',
      desc: '图标 + 标题 + 右箭头。',
      tags: ['移动端', 'iOS', '设置'],
      preview: `<div style="background:#fff;border-radius:10px;overflow:hidden;max-width:350px">
        <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid #f0f0f0">
          <div style="width:28px;height:28px;border-radius:6px;background:#3b82f6;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px">✈</div>
          <span style="font-size:15px;flex:1">飞行模式</span>
          <span style="color:#c7c7cc">›</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid #f0f0f0">
          <div style="width:28px;height:28px;border-radius:6px;background:#22c55e;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px">📱</div>
          <span style="font-size:15px;flex:1">Wi-Fi</span>
          <span style="font-size:13px;color:#999">Home</span>
          <span style="color:#c7c7cc">›</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;padding:12px 16px">
          <div style="width:28px;height:28px;border-radius:6px;background:#6b7280;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px">🔔</div>
          <span style="font-size:15px;flex:1">通知</span>
          <span style="color:#c7c7cc">›</span>
        </div>
      </div>`,
      prompt:`设计 iOS 设置列表：
- 白底圆角 10px，行高 44px
- 每行：28×28 彩色图标（圆角 6px）+ 15px 标题 + 右侧值 + › 箭头
- 分割线 1px #f0f0f0
- 整体风格：iOS 设置页`
    },
    {
      cat: 'list', sort: 3,
      name: '聊天列表',
      desc: '头像 + 名字 + 最后消息 + 时间。',
      tags: ['移动端', '社交', '聊天'],
      preview: `<div style="background:#fff;max-width:375px">
        <div style="display:flex;gap:12px;padding:12px 16px;border-bottom:1px solid #f0f0f0">
          <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#ef4444);flex-shrink:0"></div>
          <div style="flex:1">
            <div style="display:flex;justify-content:space-between">
              <span style="font-size:15px;font-weight:500">张三</span>
              <span style="font-size:11px;color:#999">10:30</span>
            </div>
            <div style="font-size:13px;color:#999;margin-top:2px">晚上吃什么？</div>
          </div>
        </div>
        <div style="display:flex;gap:12px;padding:12px 16px">
          <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#8b5cf6);flex-shrink:0"></div>
          <div style="flex:1">
            <div style="display:flex;justify-content:space-between">
              <span style="font-size:15px;font-weight:500">前端小组</span>
              <span style="font-size:11px;color:#999">昨天</span>
            </div>
            <div style="font-size:13px;color:#999;margin-top:2px">李四：这个需求明天上线</div>
          </div>
        </div>
      </div>`,
      prompt:`设计聊天列表行：
- 每行 48px 圆形头像 + 名字 15px 加粗 + 最后消息 13px 灰色 + 时间 11px 灰色
- 垂直排列，分割线 1px #f0f0f0
- 整体风格：微信/WhatsApp 聊天列表`
    },
    {
      cat: 'list', sort: 4,
      name: '通知列表',
      desc: '图标 + 标题 + 描述 + 时间。',
      tags: ['移动端', '通知', '列表'],
      preview: `<div style="background:#fff;max-width:375px">
        <div style="display:flex;gap:12px;padding:14px 16px;border-bottom:1px solid #f0f0f0">
          <div style="width:36px;height:36px;border-radius:50%;background:#eff6ff;display:flex;align-items:center;justify-content:center;font-size:16px">🔔</div>
          <div style="flex:1">
            <div style="font-size:14px;font-weight:500">系统通知</div>
            <div style="font-size:13px;color:#666;margin-top:2px">你的账号已更新</div>
            <div style="font-size:11px;color:#999;margin-top:2px">5分钟前</div>
          </div>
        </div>
      </div>`,
      prompt:`设计通知列表行：
- 36px 圆形图标（浅蓝底）+ 标题 14px 加粗 + 描述 13px 灰色 + 时间 11px
- 整体风格：App 通知中心`
    },

    /* ============================================================
       弹窗/抽屉（modal）
    ============================================================ */
    {
      cat: 'modal', sort: 1,
      name: 'shadcn/ui 对话框',
      desc: '居中卡片、标题、描述、操作按钮。',
      tags: ['桌面端', '弹窗', 'shadcn'],
      preview: `<div style="background:rgba(0,0,0,.4);padding:40px;display:flex;align-items:center;justify-content:center">
        <div style="background:#fff;border-radius:12px;padding:24px;max-width:360px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.2)">
          <h3 style="margin:0 0 8px;font-size:17px;font-weight:600">删除这个文件？</h3>
          <p style="margin:0 0 20px;font-size:14px;color:#6b7280">此操作无法撤销，文件将被永久删除。</p>
          <div style="display:flex;gap:8px;justify-content:flex-end">
            <button style="padding:8px 16px;border-radius:6px;font-size:14px;border:1px solid #e5e7eb;background:#fff">取消</button>
            <button style="padding:8px 16px;border-radius:6px;font-size:14px;background:#ef4444;color:#fff;border:none">删除</button>
          </div>
        </div>
      </div>`,
      prompt:`设计 shadcn/ui 风格对话框：
- 半透明黑底 rgba(0,0,0,.4) 遮罩
- 居中卡片白底，圆角 12px，padding 24px，阴影 0 20px 60px
- 标题 17px 加粗，描述 14px 灰色
- 底部右侧：次要按钮（灰边框）+ 危险按钮（红色 #ef4444）
- 整体风格：shadcn/ui Alert Dialog`
    },
    {
      cat: 'modal', sort: 2,
      name: 'iOS 底部抽屉',
      desc: '从底部滑出、圆角顶部、拖拽指示条。',
      tags: ['移动端', 'iOS', '抽屉'],
      preview: `<div style="background:#f5f5f5;height:200px;position:relative;overflow:hidden">
        <div style="position:absolute;bottom:0;left:0;right:0;background:#fff;border-radius:16px 16px 0 0;padding:12px 20px 32px">
          <div style="width:36px;height:4px;background:#d1d5db;border-radius:2px;margin:0 auto 16px"></div>
          <div style="font-size:16px;font-weight:600;margin-bottom:12px">分享到</div>
          <div style="display:flex;gap:16px">
            <div style="width:48px;height:48px;border-radius:10px;background:#3b82f6"></div>
            <div style="width:48px;height:48px;border-radius:10px;background:#22c55e"></div>
            <div style="width:48px;height:48px;border-radius:10px;background:#f59e0b"></div>
            <div style="width:48px;height:48px;border-radius:10px;background:#ef4444"></div>
          </div>
        </div>
      </div>`,
      prompt:`设计 iOS 风格底部抽屉：
- 从底部滑出，顶部圆角 16px
- 顶部拖拽指示条：36×4px 灰色圆角
- 标题 16px 加粗 + 一行分享图标（48×48 圆角方块）
- 底部安全区 padding 32px
- 整体风格：iOS 分享面板`
    },
    {
      cat: 'modal', sort: 3,
      name: '居中确认弹窗',
      desc: '标题 + 图标 + 按钮。',
      tags: ['移动端', '确认', '弹窗'],
      preview: `<div style="background:rgba(0,0,0,.5);padding:40px;display:flex;align-items:center;justify-content:center">
        <div style="background:#fff;border-radius:14px;padding:24px;max-width:300px;text-align:center">
          <div style="width:48px;height:48px;border-radius:50%;background:#fef2f2;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:24px">⚠</div>
          <div style="font-size:16px;font-weight:600;margin-bottom:8px">确认退出？</div>
          <div style="font-size:13px;color:#666;margin-bottom:20px">未保存的内容将丢失</div>
          <div style="display:flex;gap:8px">
            <button style="flex:1;padding:10px;border-radius:8px;background:#f5f5f5;border:none;font-size:14px">取消</button>
            <button style="flex:1;padding:10px;border-radius:8px;background:#ff2442;color:#fff;border:none;font-size:14px">确认</button>
          </div>
        </div>
      </div>`,
      prompt:`设计移动端居中确认弹窗：
- 半透明黑底 rgba(0,0,0,.5)
- 卡片白底圆角 14px，padding 24px，居中
- 顶部 48px 圆形警告图标（浅红底）
- 标题 16px 加粗 + 描述 13px 灰色
- 底部两个按钮：取消（灰底）+ 确认（红色 #ff2442）
- 整体风格：iOS Alert / 小红书确认弹窗`
    },
    {
      cat: 'modal', sort: 4,
      name: '侧边滑出抽屉',
      desc: '从右侧滑出、全高。',
      tags: ['桌面端', '抽屉', '后台'],
      preview: `<div style="background:#f5f5f5;height:200px;position:relative;overflow:hidden">
        <div style="position:absolute;top:0;right:0;bottom:0;width:280px;background:#fff;box-shadow:-4px 0 16px rgba(0,0,0,.1);padding:20px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <span style="font-size:16px;font-weight:600">详情</span>
            <span style="font-size:18px;color:#999">✕</span>
          </div>
          <div style="height:8px;background:#e5e7eb;border-radius:2px;margin-bottom:8px;width:80%"></div>
          <div style="height:8px;background:#e5e7eb;border-radius:2px;margin-bottom:8px;width:60%"></div>
          <div style="height:8px;background:#e5e7eb;border-radius:2px;width:70%"></div>
        </div>
      </div>`,
      prompt:`设计桌面端侧边抽屉：
- 从右侧滑出，宽 280px，全高
- 白底，左侧阴影 -4px 0 16px rgba(0,0,0,.1)
- 顶部标题 16px 加粗 + 关闭按钮 ✕
- 整体风格：后台详情抽屉`
    },

    /* ============================================================
       Toast/提示（toast）
    ============================================================ */
    {
      cat: 'toast', sort: 1,
      name: 'shadcn/ui Toast',
      desc: '右下角卡片、图标 + 标题 + 描述。',
      tags: ['桌面端', '提示', 'shadcn'],
      preview: `<div style="background:#f5f5f5;padding:40px;position:relative;min-height:120px">
        <div style="position:absolute;right:20px;bottom:20px;background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:12px 16px;box-shadow:0 4px 12px rgba(0,0,0,.1);display:flex;gap:10px;align-items:flex-start;max-width:320px">
          <div style="width:20px;height:20px;border-radius:50%;background:#10b981;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">✓</div>
          <div>
            <div style="font-size:14px;font-weight:500">保存成功</div>
            <div style="font-size:13px;color:#6b7280;margin-top:2px">你的更改已保存</div>
          </div>
        </div>
      </div>`,
      prompt:`设计 shadcn/ui 风格 Toast：
- 右下角定位，白底卡片，1px #e5e7eb 边框，圆角 8px
- 左侧 20px 圆形绿色对勾图标
- 标题 14px 字重 500，描述 13px 灰色
- 阴影 0 4px 12px rgba(0,0,0,.1)
- 整体风格：shadcn/ui Toast`
    },
    {
      cat: 'toast', sort: 2,
      name: 'iOS 顶部通知横幅',
      desc: '从顶部滑下、毛玻璃。',
      tags: ['移动端', 'iOS', '通知'],
      preview: `<div style="background:#f5f5f5;height:120px;position:relative;overflow:hidden">
        <div style="position:absolute;top:0;left:0;right:0;background:rgba(255,255,255,.85);backdrop-filter:blur(20px);padding:12px 16px;display:flex;gap:10px;align-items:center;border-bottom:1px solid rgba(0,0,0,.05)">
          <div style="width:36px;height:36px;border-radius:8px;background:#3b82f6;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px">📱</div>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:600">设置</div>
            <div style="font-size:13px;color:#666">有新的设置可用</div>
          </div>
        </div>
      </div>`,
      prompt:`设计 iOS 顶部通知横幅：
- 从顶部滑下，毛玻璃背景 rgba(255,255,255,.85) + blur(20px)
- 左侧 36×36 App 图标，右侧标题 13px 加粗 + 描述 13px 灰色
- 底部 1px 半透明分割线
- 整体风格：iOS 通知横幅`
    },
    {
      cat: 'toast', sort: 3,
      name: '成功提示',
      desc: '居中浮层、绿色对勾。',
      tags: ['交互', '成功', '提示'],
      preview: `<div style="background:#f5f5f5;padding:40px;text-align:center;min-height:100px">
        <div style="display:inline-flex;align-items:center;gap:8px;background:#10b981;color:#fff;padding:10px 20px;border-radius:20px;font-size:14px">
          <span>✓</span> 操作成功
        </div>
      </div>`,
      prompt:`设计成功提示 Toast：
- 居中胶囊形，绿色 #10b981 底白字
- padding 10px 20px，圆角 20px
- 左侧对勾 ✓ + 文字"操作成功"
- 整体风格：通用成功提示`
    },
    {
      cat: 'toast', sort: 4,
      name: '错误提示',
      desc: '红色、带警告图标。',
      tags: ['交互', '错误', '提示'],
      preview: `<div style="background:#f5f5f5;padding:40px;text-align:center;min-height:100px">
        <div style="display:inline-flex;align-items:center;gap:8px;background:#ef4444;color:#fff;padding:10px 20px;border-radius:20px;font-size:14px">
          <span>✕</span> 操作失败，请重试
        </div>
      </div>`,
      prompt:`设计错误提示 Toast：
- 居中胶囊形，红色 #ef4444 底白字
- padding 10px 20px，圆角 20px
- 左侧 ✕ + 文字"操作失败，请重试"
- 整体风格：通用错误提示`
    },

    /* ============================================================
       加载态/空态（loading）
    ============================================================ */
    {
      cat: 'loading', sort: 1,
      name: 'Linear 骨架屏',
      desc: '灰条占位、模拟内容结构。',
      tags: ['桌面端', '骨架屏', 'Linear'],
      preview: `<div style="background:#fff;padding:20px;max-width:400px">
        <div style="height:16px;background:#e5e7eb;border-radius:4px;margin-bottom:12px;width:60%"></div>
        <div style="height:12px;background:#e5e7eb;border-radius:4px;margin-bottom:8px;width:100%"></div>
        <div style="height:12px;background:#e5e7eb;border-radius:4px;margin-bottom:8px;width:80%"></div>
        <div style="height:12px;background:#e5e7eb;border-radius:4px;width:90%"></div>
      </div>`,
      prompt:`设计骨架屏加载：
- 内容区用灰色条 #e5e7eb 占位
- 标题条稍粗（16px），正文条 12px
- 宽度错落模拟真实文本行
- 整体风格：Linear 内容加载骨架屏`
    },
    {
      cat: 'loading', sort: 2,
      name: 'iOS 菊花',
      desc: '旋转圆圈。',
      tags: ['移动端', '加载', 'iOS'],
      preview: `<div style="background:#fff;padding:40px;text-align:center;min-height:80px">
        <div style="width:32px;height:32px;border:3px solid #e5e7eb;border-top-color:#3b82f6;border-radius:50%;margin:0 auto"></div>
      </div>`,
      prompt:`设计 iOS 菊花加载：
- 32×32 圆圈，3px 边框
- 灰底 #e5e7eb，顶部蓝色 #3b82f6
- 旋转动画 1s linear infinite
- 整体风格：iOS 原生 loading`
    },
    {
      cat: 'loading', sort: 3,
      name: '空状态',
      desc: '插画 + 标题 + 描述 + 操作按钮。',
      tags: ['空态', '引导', '通用'],
      preview: `<div style="background:#fff;padding:40px;text-align:center;max-width:300px;margin:0 auto">
        <div style="width:80px;height:80px;border-radius:50%;background:#f5f5f5;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:36px">📭</div>
        <div style="font-size:16px;font-weight:600;margin-bottom:8px">暂无数据</div>
        <div style="font-size:13px;color:#999;margin-bottom:20px">你还没有任何订单，快去逛逛吧</div>
        <button style="background:#007AFF;color:#fff;padding:8px 24px;border-radius:6px;font-size:14px;border:none">去逛逛</button>
      </div>`,
      prompt:`设计空状态页面：
- 80px 圆形浅灰底插画占位
- 标题 16px 加粗
- 描述 13px 灰色
- 底部蓝色操作按钮 #007AFF
- 整体风格：电商空订单页`
    },
    {
      cat: 'loading', sort: 4,
      name: '按钮加载态',
      desc: '按钮内 spinner。',
      tags: ['交互', '按钮', '加载'],
      preview: `<div style="padding:20px;text-align:center">
        <button style="background:#007AFF;color:#fff;padding:10px 24px;border-radius:8px;font-size:14px;border:none;display:inline-flex;align-items:center;gap:8px">
          <span style="width:14px;height:14px;border:2px solid #fff;border-top-color:transparent;border-radius:50%;display:inline-block"></span>
          提交中
        </button>
      </div>`,
      prompt:`设计按钮加载态：
- 按钮内左侧 14×14 spinner（2px 白环，顶部缺口）
- 文字"提交中"，14px
- 整体禁用感
- 整体风格：表单提交按钮`
    },

    /* ============================================================
       表格（table）
    ============================================================ */
    {
      cat: 'table', sort: 1,
      name: 'GitHub 风格表格',
      desc: '斑马纹、悬浮高亮。',
      tags: ['桌面端', '开发者', '表格'],
      preview: `<div style="background:#fff;border:1px solid #d0d7de;border-radius:6px;overflow:hidden;font-size:13px">
        <div style="display:flex;background:#f6f8fa;padding:10px 16px;font-weight:600;border-bottom:1px solid #d0d7de">
          <span style="flex:2">名称</span><span style="flex:1">分支</span><span style="flex:1">更新时间</span>
        </div>
        <div style="display:flex;padding:10px 16px;border-bottom:1px solid #d0d7de">
          <span style="flex:2;color:#0969da">main.py</span><span style="flex:1;color:#656d76">main</span><span style="flex:1;color:#656d76">2小时前</span>
        </div>
        <div style="display:flex;padding:10px 16px;background:#f6f8fa">
          <span style="flex:2;color:#0969da">utils.js</span><span style="flex:1;color:#656d76">dev</span><span style="flex:1;color:#656d76">昨天</span>
        </div>
      </div>`,
      prompt:`设计 GitHub 风格表格：
- 1px #d0d7de 边框，圆角 6px
- 表头：浅灰底 #f6f8fa，加粗
- 行：斑马纹（偶数行浅灰）
- 文件名蓝色 #0969da
- 整体风格：github.com 文件列表`
    },
    {
      cat: 'table', sort: 2,
      name: '数据表格',
      desc: '带排序、操作列。',
      tags: ['桌面端', '后台', '数据'],
      preview: `<div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;font-size:13px">
        <div style="display:flex;padding:12px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;font-weight:600">
          <span style="flex:2">订单号</span><span style="flex:1">金额</span><span style="flex:1">状态</span><span style="flex:1">操作</span>
        </div>
        <div style="display:flex;padding:12px 16px;border-bottom:1px solid #f3f4f6">
          <span style="flex:2">#1001</span><span style="flex:1">¥299</span>
          <span style="flex:1"><span style="background:#dcfce7;color:#16a34a;padding:2px 8px;border-radius:10px;font-size:11px">已支付</span></span>
          <span style="flex:1;color:#2563eb">详情</span>
        </div>
        <div style="display:flex;padding:12px 16px">
          <span style="flex:2">#1002</span><span style="flex:1">¥159</span>
          <span style="flex:1"><span style="background:#fef3c7;color:#d97706;padding:2px 8px;border-radius:10px;font-size:11px">待发货</span></span>
          <span style="flex:1;color:#2563eb">详情</span>
        </div>
      </div>`,
      prompt:`设计后台数据表格：
- 白底 1px #e5e7eb 边框，圆角 8px
- 表头浅灰底 #f9fafb
- 状态用彩色标签：绿色"已支付"、黄色"待发货"
- 操作列蓝色链接
- 整体风格：通用后台订单表`
    },
    {
      cat: 'table', sort: 3,
      name: '简单键值表',
      desc: '左标签右值。',
      tags: ['详情', '通用', '表格'],
      preview: `<div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;font-size:13px;max-width:400px">
        <div style="display:flex;padding:12px 16px;border-bottom:1px solid #f3f4f6">
          <span style="width:100px;color:#6b7280">商品名</span><span>iPhone 16 Pro</span>
        </div>
        <div style="display:flex;padding:12px 16px;border-bottom:1px solid #f3f4f6">
          <span style="width:100px;color:#6b7280">价格</span><span>¥7999</span>
        </div>
        <div style="display:flex;padding:12px 16px">
          <span style="width:100px;color:#6b7280">库存</span><span>128 件</span>
        </div>
      </div>`,
      prompt:`设计键值详情表：
- 左列标签 100px 宽灰色 #6b7280，右列值
- 行间距 12px 16px
- 分割线 1px #f3f4f6
- 整体风格：商品详情`
    },
    {
      cat: 'table', sort: 4,
      name: '移动端卡片列表',
      desc: '每行一张卡片。',
      tags: ['移动端', '列表', '表格'],
      preview: `<div style="background:#f5f5f5;padding:12px;max-width:375px">
        <div style="background:#fff;border-radius:8px;padding:14px;margin-bottom:8px">
          <div style="font-size:14px;font-weight:500;margin-bottom:6px">#1001 iPhone 16 Pro</div>
          <div style="display:flex;justify-content:space-between;font-size:12px;color:#999">
            <span>¥7999</span><span style="color:#16a34a">已支付</span>
          </div>
        </div>
        <div style="background:#fff;border-radius:8px;padding:14px">
          <div style="font-size:14px;font-weight:500;margin-bottom:6px">#1002 AirPods Pro</div>
          <div style="display:flex;justify-content:space-between;font-size:12px;color:#999">
            <span>¥1899</span><span style="color:#d97706">待发货</span>
          </div>
        </div>
      </div>`,
      prompt:`设计移动端卡片列表：
- 浅灰底 #f5f5f5，padding 12px
- 每行一张白底圆角卡片，间距 8px
- 标题 14px 加粗，下方金额 + 状态
- 整体风格：移动端订单列表`
    },

    /* ============================================================
       图表（chart）
    ============================================================ */
    {
      cat: 'chart', sort: 1,
      name: '柱状图',
      desc: '简单垂直柱状图。',
      tags: ['数据', '图表', '柱状'],
      preview: `<div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:20px;max-width:400px">
        <div style="font-size:14px;font-weight:600;margin-bottom:16px">月度访问量</div>
        <div style="display:flex;align-items:flex-end;gap:8px;height:120px">
          <div style="flex:1;background:#dbeafe;border-radius:4px 4px 0 0;height:40%"></div>
          <div style="flex:1;background:#dbeafe;border-radius:4px 4px 0 0;height:60%"></div>
          <div style="flex:1;background:#3b82f6;border-radius:4px 4px 0 0;height:80%"></div>
          <div style="flex:1;background:#dbeafe;border-radius:4px 4px 0 0;height:50%"></div>
          <div style="flex:1;background:#dbeafe;border-radius:4px 4px 0 0;height:70%"></div>
          <div style="flex:1;background:#dbeafe;border-radius:4px 4px 0 0;height:90%"></div>
        </div>
        <div style="display:flex;gap:8px;margin-top:8px;font-size:11px;color:#999">
          <div style="flex:1;text-align:center">1月</div><div style="flex:1;text-align:center">2月</div>
          <div style="flex:1;text-align:center">3月</div><div style="flex:1;text-align:center">4月</div>
          <div style="flex:1;text-align:center">5月</div><div style="flex:1;text-align:center">6月</div>
        </div>
      </div>`,
      prompt:`设计简单柱状图：
- 白底卡片，标题 14px 加粗
- 柱子：flex 布局，不同高度模拟数据
- 当前月高亮蓝色 #3b82f6，其他月浅蓝 #dbeafe
- 底部 X 轴标签 11px 灰色
- 整体风格：通用 Dashboard 柱状图`
    },
    {
      cat: 'chart', sort: 2,
      name: '折线图',
      desc: '趋势线。',
      tags: ['数据', '图表', '折线'],
      preview: `<div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:20px;max-width:400px">
        <div style="font-size:14px;font-weight:600;margin-bottom:16px">增长趋势</div>
        <svg viewBox="0 0 300 100" style="width:100%;height:100px">
          <polyline points="0,80 50,60 100,70 150,40 200,50 250,20 300,30" fill="none" stroke="#3b82f6" stroke-width="2"/>
          <polyline points="0,80 50,60 100,70 150,40 200,50 250,20 300,30 300,100 0,100" fill="rgba(59,130,246,.1)"/>
        </svg>
      </div>`,
      prompt:`设计简单折线图：
- 白底卡片，标题 14px 加粗
- SVG 折线，蓝色 #3b82f6，2px 线宽
- 下方浅蓝渐变填充区域
- 整体风格：通用趋势图`
    },
    {
      cat: 'chart', sort: 3,
      name: '环形进度',
      desc: '圆形百分比。',
      tags: ['数据', '进度', '环形'],
      preview: `<div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:20px;max-width:200px;text-align:center">
        <div style="width:100px;height:100px;border-radius:50%;border:8px solid #e5e7eb;border-top-color:#3b82f6;border-right-color:#3b82f6;margin:0 auto 12px;display:flex;align-items:center;justify-content:center">
          <span style="font-size:18px;font-weight:700">75%</span>
        </div>
        <div style="font-size:13px;color:#6b7280">完成率</div>
      </div>`,
      prompt:`设计环形进度图：
- 100×100 圆形，8px 边框
- 已完成段蓝色 #3b82f6，未完成段灰色 #e5e7eb
- 中心显示百分比 18px 加粗
- 下方标签 13px 灰色
- 整体风格：任务完成率`
    },
    {
      cat: 'chart', sort: 4,
      name: '数据看板布局',
      desc: '多指标卡片 + 图表。',
      tags: ['Dashboard', '数据', '布局'],
      preview: `<div style="background:#f9fafb;padding:16px;display:grid;grid-template-columns:1fr 1fr;gap:12px;max-width:500px">
        <div style="background:#fff;border-radius:8px;padding:16px">
          <div style="font-size:12px;color:#9ca3af">今日访问</div>
          <div style="font-size:22px;font-weight:700;margin-top:4px">12,847</div>
        </div>
        <div style="background:#fff;border-radius:8px;padding:16px">
          <div style="font-size:12px;color:#9ca3af">转化率</div>
          <div style="font-size:22px;font-weight:700;margin-top:4px">3.24%</div>
        </div>
        <div style="background:#fff;border-radius:8px;padding:16px;grid-column:span 2;height:80px">图表区域</div>
      </div>`,
      prompt:`设计 Dashboard 看板布局：
- 2 列网格，卡片白底圆角 8px
- 小卡片：标签 + 大数字
- 大卡片：跨两列放图表
- 整体风格：通用数据看板`
    },

    /* ============================================================
       头像/标签（avatar）
    ============================================================ */
    {
      cat: 'avatar', sort: 1,
      name: '用户头像',
      desc: '圆形、带状态点。',
      tags: ['用户', '头像', '社交'],
      preview: `<div style="padding:20px;display:flex;gap:16px;align-items:center">
        <div style="position:relative">
          <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#ef4444)"></div>
          <div style="position:absolute;bottom:0;right:0;width:12px;height:12px;background:#10b981;border:2px solid #fff;border-radius:50%"></div>
        </div>
        <div>
          <div style="font-size:14px;font-weight:600">张三</div>
          <div style="font-size:12px;color:#10b981">在线</div>
        </div>
      </div>`,
      prompt:`设计用户头像组件：
- 48×48 圆形头像（渐变占位）
- 右下角 12px 状态点：绿色 #10b981 在线，2px 白边
- 右侧名字 14px 加粗 + 状态 12px 绿色
- 整体风格：社交 App 用户卡`
    },
    {
      cat: 'avatar', sort: 2,
      name: '头像组',
      desc: '多个头像重叠。',
      tags: ['团队', '头像', '社交'],
      preview: `<div style="padding:20px;display:flex;align-items:center">
        <div style="display:flex">
          <div style="width:32px;height:32px;border-radius:50%;background:#3b82f6;border:2px solid #fff;margin-right:-8px"></div>
          <div style="width:32px;height:32px;border-radius:50%;background:#10b981;border:2px solid #fff;margin-right:-8px"></div>
          <div style="width:32px;height:32px;border-radius:50%;background:#f59e0b;border:2px solid #fff;margin-right:-8px"></div>
          <div style="width:32px;height:32px;border-radius:50%;background:#6b7280;border:2px solid #fff;color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px">+3</div>
        </div>
      </div>`,
      prompt:`设计头像组：
- 多个 32×32 圆形头像重叠排列，margin-right -8px
- 每个头像 2px 白边
- 最后一个灰色圆形 + "+3" 文字
- 整体风格：团队成员展示`
    },
    {
      cat: 'avatar', sort: 3,
      name: '标签 Badge',
      desc: '小标签、彩色。',
      tags: ['标签', 'Badge', '通用'],
      preview: `<div style="padding:20px;display:flex;gap:8px;flex-wrap:wrap">
        <span style="background:#eff6ff;color:#2563eb;padding:2px 10px;border-radius:4px;font-size:12px">默认</span>
        <span style="background:#dcfce7;color:#16a34a;padding:2px 10px;border-radius:4px;font-size:12px">成功</span>
        <span style="background:#fef3c7;color:#d97706;padding:2px 10px;border-radius:4px;font-size:12px">警告</span>
        <span style="background:#fef2f2;color:#ef4444;padding:2px 10px;border-radius:4px;font-size:12px">错误</span>
        <span style="background:#f3f4f6;color:#6b7280;padding:2px 10px;border-radius:4px;font-size:12px">中性</span>
      </div>`,
      prompt:`设计一组状态标签 Badge：
- 12px 字号，padding 2px 10px，圆角 4px
- 默认：蓝底 #eff6ff + 蓝字 #2563eb
- 成功：绿底 #dcfce7 + 绿字 #16a34a
- 警告：黄底 #fef3c7 + 黄字 #d97706
- 错误：红底 #fef2f2 + 红字 #ef4444
- 整体风格：通用状态标签`
    },
    {
      cat: 'avatar', sort: 4,
      name: '头像下拉',
      desc: '头像 + 名字 + 下拉箭头。',
      tags: ['用户', '导航', '后台'],
      preview: `<div style="padding:16px;display:flex;align-items:center;gap:8px">
        <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#8b5cf6)"></div>
        <span style="font-size:13px">张三</span>
        <span style="color:#999;font-size:10px">▾</span>
      </div>`,
      prompt:`设计用户头像下拉：
- 32×32 圆形头像
- 13px 名字 + 下拉箭头 ▾
- 整体风格：后台右上角用户菜单`
    },

    /* ============================================================
       目录导航（toc）
    ============================================================ */
    {
      cat: 'toc', sort: 1,
      name: '文档站右侧目录',
      desc: '当前章节高亮，点击跳转。',
      tags: ['桌面端', '文档', '目录'],
      preview: `<div style="background:#fff;border-left:1px solid #e5e7eb;padding:20px;width:240px">
        <div style="font-size:12px;color:#9ca3af;margin-bottom:12px;font-weight:600">本页目录</div>
        <div style="font-size:13px;color:#333;padding:4px 0 4px 12px;border-left:2px solid #2563eb;font-weight:500">快速开始</div>
        <div style="font-size:13px;color:#6b7280;padding:4px 0 4px 12px;border-left:2px solid transparent">安装</div>
        <div style="font-size:13px;color:#6b7280;padding:4px 0 4px 12px;border-left:2px solid transparent">第一个页面</div>
        <div style="font-size:13px;color:#6b7280;padding:4px 0 4px 12px;border-left:2px solid transparent">部署</div>
        <div style="font-size:13px;color:#333;padding:4px 0 4px 12px;border-left:2px solid transparent;margin-top:8px;font-weight:500">进阶</div>
        <div style="font-size:13px;color:#6b7280;padding:4px 0 4px 24px;border-left:2px solid transparent">自定义配置</div>
      </div>`,
      prompt:`设计文档站右侧目录：
- 宽 240px，白底，左侧 1px 分割线
- 标题 12px 灰色加粗"本页目录"
- 当前章节：左侧 2px 蓝色 #2563eb 竖条 + 黑色文字
- 其他章节：灰色文字 #6b7280，透明竖条
- 二级子级缩进 12px
- 整体风格：Vite/Stripe 文档站目录`
    },
    {
      cat: 'toc', sort: 2,
      name: 'GitHub Wiki 目录',
      desc: '带序号、可折叠。',
      tags: ['桌面端', 'Wiki', '目录'],
      preview: `<div style="background:#fff;border:1px solid #d0d7de;border-radius:6px;padding:16px;width:220px;font-size:13px">
        <div style="font-weight:600;margin-bottom:8px">目录</div>
        <div style="color:#0969da;padding:2px 0">1. 简介</div>
        <div style="color:#0969da;padding:2px 0">2. 安装</div>
        <div style="color:#0969da;padding:2px 0">3. 使用指南</div>
        <div style="padding:2px 0 2px 16px;color:#656d76">3.1 快速开始</div>
        <div style="padding:2px 0 2px 16px;color:#656d76">3.2 常见问题</div>
        <div style="color:#0969da;padding:2px 0">4. API 文档</div>
      </div>`,
      prompt:`设计 GitHub Wiki 风格目录：
- 白底 1px #d0d7de 边框，圆角 6px
- 标题"目录"加粗
- 一级条目蓝色 #0969da，带数字序号
- 二级子级缩进 16px，灰色 #656d76
- 整体风格：GitHub Wiki 目录`
    },
    {
      cat: 'toc', sort: 3,
      name: '移动端文章目录',
      desc: '底部弹出、章节列表。',
      tags: ['移动端', '文章', '目录'],
      preview: `<div style="background:#f5f5f5;padding:20px;border-radius:8px;width:300px">
        <div style="font-size:14px;font-weight:600;margin-bottom:12px">目录</div>
        <div style="font-size:13px;color:#333;padding:6px 0;border-bottom:1px solid #eee">1. 什么是 Vue</div>
        <div style="font-size:13px;color:#333;padding:6px 0;border-bottom:1px solid #eee">2. 安装与创建项目</div>
        <div style="font-size:13px;color:#2563eb;padding:6px 0;border-bottom:1px solid #eee">3. 模板语法</div>
        <div style="font-size:13px;color:#333;padding:6px 0">4. 组件基础</div>
      </div>`,
      prompt:`设计移动端文章目录：
- 底部弹出面板，白底圆角 8px
- 标题"目录"14px 加粗
- 章节列表 13px，每章底部 1px #eee 分割线
- 当前章节蓝色 #2563eb
- 整体风格：公众号/简书文章目录`
    },
    {
      cat: 'toc', sort: 4,
      name: '锚点导航',
      desc: '顶部锚点、滚动高亮。',
      tags: ['桌面端', '官网', '锚点'],
      preview: `<div style="background:#fff;padding:12px 24px;border-bottom:1px solid #e5e7eb;display:flex;gap:20px;font-size:13px">
        <span style="color:#2563eb;font-weight:500;border-bottom:2px solid #2563eb;padding-bottom:10px">特性</span>
        <span style="color:#6b7280;padding-bottom:10px">价格</span>
        <span style="color:#6b7280;padding-bottom:10px">客户案例</span>
        <span style="color:#6b7280;padding-bottom:10px">文档</span>
      </div>`,
      prompt:`设计锚点导航：
- 顶部水平排列，13px
- 当前锚点蓝色 #2563eb + 底部 2px 下划线
- 其他灰色 #6b7280
- 滚动时自动高亮当前章节
- 整体风格：官网章节锚点`
    },

    /* ============================================================
       日期日历（calendar）
    ============================================================ */
    {
      cat: 'calendar', sort: 1,
      name: '月历组件',
      desc: '标准月历、日期格子。',
      tags: ['桌面端', '日期', '日历'],
      preview: `<div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px;width:280px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <span style="font-size:14px;font-weight:600">2024年11月</span>
          <span style="color:#9ca3af">‹ ›</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;font-size:11px;color:#9ca3af;text-align:center;margin-bottom:4px">
          <div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;font-size:12px;text-align:center">
          <div style="padding:6px;color:#ccc">29</div><div style="padding:6px;color:#ccc">30</div><div style="padding:6px">1</div><div style="padding:6px">2</div><div style="padding:6px">3</div><div style="padding:6px">4</div><div style="padding:6px">5</div>
          <div style="padding:6px">6</div><div style="padding:6px">7</div><div style="padding:6px;background:#2563eb;color:#fff;border-radius:4px">8</div><div style="padding:6px">9</div><div style="padding:6px">10</div><div style="padding:6px">11</div><div style="padding:6px">12</div>
        </div>
      </div>`,
      prompt:`设计月历组件：
- 白底 1px #e5e7eb 边框，圆角 8px，padding 16px
- 顶部：月份标题 14px 加粗 + 左右切换箭头
- 星期行：11px 灰色，日/一/二/三/四/五/六
- 日期格子：12px，padding 6px，居中
- 选中日期：蓝色 #2563eb 底白字，圆角 4px
- 整体风格：通用日期选择器`
    },
    {
      cat: 'calendar', sort: 2,
      name: '日期范围选择',
      desc: '开始日期到结束日期高亮。',
      tags: ['桌面端', '日期', '范围'],
      preview: `<div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px;width:360px;display:flex;gap:16px">
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600;margin-bottom:8px">开始日期</div>
          <div style="padding:8px 12px;border:1px solid #2563eb;border-radius:6px;font-size:13px">2024-11-08</div>
        </div>
        <div style="color:#9ca3af;align-self:center">→</div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600;margin-bottom:8px">结束日期</div>
          <div style="padding:8px 12px;border:1px solid #e5e7eb;border-radius:6px;font-size:13px;color:#9ca3af">选择结束日期</div>
        </div>
      </div>`,
      prompt:`设计日期范围选择器：
- 左右两个日期输入框，中间箭头分隔
- 已选日期：1px #2563eb 边框
- 未选：1px #e5e7eb 边框 + 灰色 placeholder
- 标签 13px 加粗在上
- 整体风格：预订/筛选日期范围`
    },
    {
      cat: 'calendar', sort: 3,
      name: '移动端日期选择',
      desc: '底部滚轮选择。',
      tags: ['移动端', '日期', '滚轮'],
      preview: `<div style="background:#fff;border-radius:10px;padding:16px;width:300px">
        <div style="font-size:16px;font-weight:600;text-align:center;margin-bottom:16px">选择日期</div>
        <div style="display:flex;justify-content:center;gap:12px;font-size:15px">
          <span style="color:#9ca3af">2024</span>
          <span style="font-weight:600">11月</span>
          <span style="font-weight:600">8日</span>
        </div>
        <div style="display:flex;justify-content:center;gap:8px;margin-top:20px">
          <button style="padding:8px 20px;border-radius:6px;background:#f5f5f5;border:none;font-size:14px">取消</button>
          <button style="padding:8px 20px;border-radius:6px;background:#007AFF;color:#fff;border:none;font-size:14px">确定</button>
        </div>
      </div>`,
      prompt:`设计移动端日期选择器：
- 底部弹出白底圆角卡片
- 标题 16px 加粗居中
- 滚轮选择日期：年/月/日，选中项加粗黑色
- 底部：取消（灰底）+ 确定（蓝底 #007AFF）
- 整体风格：iOS 日期滚轮`
    },
    {
      cat: 'calendar', sort: 4,
      name: '日历带事件标记',
      desc: '日期下方小圆点标记事件。',
      tags: ['日历', '事件', '提醒'],
      preview: `<div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px;width:280px">
        <div style="font-size:14px;font-weight:600;margin-bottom:12px">11月</div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;font-size:12px;text-align:center">
          <div style="padding:6px;position:relative">8<div style="width:4px;height:4px;background:#2563eb;border-radius:50%;margin:2px auto 0"></div></div>
          <div style="padding:6px;position:relative">12<div style="width:4px;height:4px;background:#ef4444;border-radius:50%;margin:2px auto 0"></div></div>
          <div style="padding:6px;position:relative">15<div style="width:4px;height:4px;background:#10b981;border-radius:50%;margin:2px auto 0"></div></div>
          <div style="padding:6px;position:relative">20<div style="width:4px;height:4px;background:#f59e0b;border-radius:50%;margin:2px auto 0"></div></div>
        </div>
      </div>`,
      prompt:`设计带事件标记的日历：
- 日期下方 4px 彩色小圆点标记事件
- 不同颜色区分事件类型（蓝/红/绿/橙）
- 整体风格：Notion/Google Calendar 日历`
    },

    /* ============================================================
       下拉框（dropdown）
    ============================================================ */
    {
      cat: 'dropdown', sort: 1,
      name: 'shadcn/ui 下拉菜单',
      desc: '触发按钮 + 垂直菜单、分割线。',
      tags: ['桌面端', '菜单', 'shadcn'],
      preview: `<div style="padding:20px">
        <button onclick="var m=this.nextElementSibling;m.style.display=m.style.display==='none'?'block':'none'" style="padding:6px 14px;border:1px solid #e5e7eb;border-radius:6px;background:#fff;font-size:13px;cursor:pointer">操作 ▾</button>
        <div style="margin-top:8px;background:#fff;border:1px solid #e5e7eb;border-radius:6px;box-shadow:0 4px 12px rgba(0,0,0,.1);padding:4px;width:180px">
          <div style="padding:6px 10px;font-size:13px;cursor:pointer" onmouseover="this.style.background='#f5f5f5'" onmouseout="this.style.background=''">编辑</div>
          <div style="padding:6px 10px;font-size:13px;cursor:pointer" onmouseover="this.style.background='#f5f5f5'" onmouseout="this.style.background=''">复制</div>
          <div style="border-top:1px solid #f3f4f6;margin:4px 0"></div>
          <div style="padding:6px 10px;font-size:13px;color:#ef4444;cursor:pointer" onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background=''">删除</div>
        </div>
      </div>`,
      prompt:`设计 shadcn/ui 风格下拉菜单：
- 触发按钮：白底 1px #e5e7eb 边框，圆角 6px，13px
- 弹出菜单：白底，1px 边框，圆角 6px，阴影 0 4px 12px
- 菜单项 13px，padding 6px 10px
- 危险操作红色 #ef4444
- 分割线 1px #f3f4f6
- 整体风格：shadcn/ui Dropdown Menu`
    },
    {
      cat: 'dropdown', sort: 2,
      name: '下拉选择框',
      desc: '带选中值、可清空。',
      tags: ['表单', '选择', '下拉'],
      preview: `<div style="padding:20px;width:260px">
        <label style="display:block;font-size:13px;color:#374151;margin-bottom:4px">城市</label>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;background:#fff">
          <span>成都</span>
          <span style="color:#9ca3af">▾</span>
        </div>
      </div>`,
      prompt:`设计下拉选择框：
- 标签 13px 在上
- 选择框：padding 8px 12px，1px #d1d5db 边框，圆角 6px，14px
- 右侧下拉箭头灰色
- 整体风格：通用表单下拉选择`
    },
    {
      cat: 'dropdown', sort: 3,
      name: '级联下拉',
      desc: '鼠标移入二级展开。',
      tags: ['桌面端', '多级', '菜单'],
      preview: `<div style="padding:20px">
        <div style="background:#fff;border:1px solid #e5e7eb;border-radius:6px;box-shadow:0 4px 12px rgba(0,0,0,.1);padding:4px;width:200px">
          <div style="padding:6px 10px;font-size:13px;display:flex;justify-content:space-between;align-items:center">文件 <span style="color:#9ca3af">›</span></div>
          <div style="padding:6px 10px;font-size:13px">编辑</div>
          <div style="padding:6px 10px;font-size:13px">视图</div>
        </div>
      </div>`,
      prompt:`设计级联下拉菜单：
- 一级菜单项右侧带 › 箭头，hover 时右侧弹出二级
- 菜单项 13px，padding 6px 10px
- 整体风格：桌面应用菜单栏`
    },
    {
      cat: 'dropdown', sort: 4,
      name: '移动端底部 Action Sheet',
      desc: '从底部弹出、多选项。',
      tags: ['移动端', '菜单', '底部'],
      preview: `<div style="background:#f5f5f5;padding:20px;border-radius:10px;width:300px">
        <div style="background:#fff;border-radius:10px;overflow:hidden;margin-bottom:8px">
          <div style="padding:14px;text-align:center;font-size:15px;border-bottom:1px solid #f0f0f0">拍照</div>
          <div style="padding:14px;text-align:center;font-size:15px;border-bottom:1px solid #f0f0f0">从相册选择</div>
          <div style="padding:14px;text-align:center;font-size:15px">删除</div>
        </div>
        <div style="background:#fff;border-radius:10px;padding:14px;text-align:center;font-size:15px;color:#007AFF;font-weight:600">取消</div>
      </div>`,
      prompt:`设计移动端 Action Sheet：
- 从底部弹出，多组圆角卡片
- 每组内选项间 1px #f0f0f0 分割线
- 单独一组"取消"按钮，加粗蓝色
- 整体风格：iOS Action Sheet`
    },

    /* ============================================================
       气泡 Popover（popover）
    ============================================================ */
    {
      cat: 'popover', sort: 1,
      name: 'shadcn/ui Popover',
      desc: 'hover 弹出、带小箭头。',
      tags: ['桌面端', '气泡', 'shadcn'],
      preview: `<div style="padding:40px;position:relative">
        <button style="padding:6px 14px;border:1px solid #e5e7eb;border-radius:6px;background:#fff;font-size:13px">添加</button>
        <div style="position:absolute;top:40px;left:60px;background:#fff;border:1px solid #e5e7eb;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.1);padding:12px;width:200px">
          <div style="font-size:13px;font-weight:600;margin-bottom:6px">添加项目</div>
          <div style="font-size:12px;color:#6b7280">输入项目名称，按回车创建</div>
          <div style="width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid #fff;position:absolute;top:-6px;left:20px;filter:drop-shadow(0 -1px 0 #e5e7eb)"></div>
        </div>
      </div>`,
      prompt:`设计 shadcn/ui 风格 Popover：
- 触发按钮 hover 时弹出白色卡片
- 卡片：1px #e5e7eb 边框，圆角 8px，阴影 0 4px 12px
- 顶部小箭头（6px 三角）指向触发按钮
- 卡片内：标题 13px 加粗 + 描述 12px 灰色
- 整体风格：shadcn/ui Popover`
    },
    {
      cat: 'popover', sort: 2,
      name: '用户名片气泡',
      desc: 'hover 用户头像弹出资料卡。',
      tags: ['社交', '用户', '气泡'],
      preview: `<div style="padding:40px;position:relative">
        <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#8b5cf6)"></div>
        <div style="position:absolute;top:50px;left:0;background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.12);padding:16px;width:240px">
          <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px">
            <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#8b5cf6)"></div>
            <div>
              <div style="font-size:14px;font-weight:600">张三</div>
              <div style="font-size:12px;color:#6b7280">前端工程师</div>
            </div>
          </div>
          <div style="font-size:12px;color:#6b7280;margin-bottom:12px">专注 Vue/React 开发，喜欢写开源项目。</div>
          <button style="width:100%;padding:6px;border-radius:6px;background:#007AFF;color:#fff;border:none;font-size:13px">关注</button>
        </div>
      </div>`,
      prompt:`设计用户名片 Popover：
- hover 用户头像弹出资料卡
- 卡片：白底，1px 边框，圆角 12px，阴影柔和
- 顶部：48px 头像 + 名字 14px 加粗 + 职位 12px 灰色
- 中间：简介 12px
- 底部：全宽关注按钮 #007AFF
- 整体风格：GitHub/LinkedIn 用户名片`
    },
    {
      cat: 'popover', sort: 3,
      name: '提示气泡（Tooltip）',
      desc: '纯文字、小号、深色底。',
      tags: ['提示', 'Tooltip', '通用'],
      preview: `<div style="padding:40px;position:relative">
        <span style="border-bottom:1px dotted #999">帮助</span>
        <div style="position:absolute;top:30px;left:0;background:#111827;color:#fff;padding:6px 10px;border-radius:4px;font-size:12px;white-space:nowrap">
          点击查看帮助文档
          <div style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:5px solid #111827;position:absolute;top:-5px;left:20px"></div>
        </div>
      </div>`,
      prompt:`设计 Tooltip 提示气泡：
- 深色底 #111827 白字，12px
- padding 6px 10px，圆角 4px
- 顶部小三角指向触发元素
- 纯文字，无按钮
- 整体风格：通用 Tooltip`
    },
    {
      cat: 'popover', sort: 4,
      name: '移动端分享气泡',
      desc: 'hover 按钮弹出分享选项。',
      tags: ['移动端', '分享', '气泡'],
      preview: `<div style="padding:40px;position:relative;max-width:300px">
        <button style="width:100%;padding:10px;border-radius:8px;background:#007AFF;color:#fff;border:none;font-size:14px">分享</button>
        <div style="position:absolute;top:50px;left:0;right:0;background:#fff;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,.1);padding:12px;display:flex;justify-content:space-around">
          <div style="text-align:center"><div style="width:40px;height:40px;border-radius:8px;background:#22c55e;margin:0 auto 4px"></div><div style="font-size:10px">微信</div></div>
          <div style="text-align:center"><div style="width:40px;height:40px;border-radius:8px;background:#3b82f6;margin:0 auto 4px"></div><div style="font-size:10px">微博</div></div>
          <div style="text-align:center"><div style="width:40px;height:40px;border-radius:8px;background:#f59e0b;margin:0 auto 4px"></div><div style="font-size:10px">QQ</div></div>
        </div>
      </div>`,
      prompt:`设计移动端分享气泡：
- 分享按钮下方弹出白色卡片
- 横向排列分享渠道（微信/微博/QQ）
- 每个渠道：40×40 彩色图标 + 10px 标签
- 整体风格：App 分享面板`
    },

    /* ============================================================
       徽标 Badge（badge）
    ============================================================ */
    {
      cat: 'badge', sort: 1,
      name: '数字徽标',
      desc: '红色圆点 + 数字。',
      tags: ['通知', 'Badge', '通用'],
      preview: `<div style="padding:30px;display:flex;gap:24px;align-items:center">
        <div style="position:relative">
          <div style="width:40px;height:40px;border-radius:8px;background:#f5f5f5;display:flex;align-items:center;justify-content:center">🔔</div>
          <div style="position:absolute;top:-4px;right:-4px;background:#ef4444;color:#fff;font-size:10px;min-width:18px;height:18px;border-radius:9px;display:flex;align-items:center;justify-content:center;padding:0 5px">9</div>
        </div>
        <div style="position:relative">
          <div style="width:40px;height:40px;border-radius:8px;background:#f5f5f5;display:flex;align-items:center;justify-content:center">💬</div>
          <div style="position:absolute;top:-4px;right:-4px;background:#ef4444;color:#fff;font-size:10px;min-width:18px;height:18px;border-radius:9px;display:flex;align-items:center;justify-content:center;padding:0 5px">99+</div>
        </div>
      </div>`,
      prompt:`设计数字徽标：
- 绝对定位在图标右上角
- 红色 #ef4444 圆点，白字 10px
- 最小宽度 18px，高度 18px，圆角 9px（胶囊形）
- 超过 99 显示"99+"
- 整体风格：通用通知角标`
    },
    {
      cat: 'badge', sort: 2,
      name: '状态标签',
      desc: '彩色背景 + 文字。',
      tags: ['状态', '标签', '通用'],
      preview: `<div style="padding:20px;display:flex;gap:8px;flex-wrap:wrap">
        <span style="background:#dcfce7;color:#16a34a;padding:2px 10px;border-radius:4px;font-size:12px">已完成</span>
        <span style="background:#fef3c7;color:#d97706;padding:2px 10px;border-radius:4px;font-size:12px">进行中</span>
        <span style="background:#fef2f2;color:#ef4444;padding:2px 10px;border-radius:4px;font-size:12px">已失败</span>
        <span style="background:#eff6ff;color:#2563eb;padding:2px 10px;border-radius:4px;font-size:12px">待审核</span>
      </div>`,
      prompt:`设计状态标签：
- 12px 字号，padding 2px 10px，圆角 4px
- 成功：绿底 #dcfce7 + 绿字 #16a34a
- 进行中：黄底 #fef3c7 + 黄字 #d97706
- 失败：红底 #fef2f2 + 红字 #ef4444
- 待审核：蓝底 #eff6ff + 蓝字 #2563eb
- 整体风格：通用状态标签`
    },
    {
      cat: 'badge', sort: 3,
      name: '头像角标',
      desc: '头像右下角在线状态。',
      tags: ['头像', '在线', '社交'],
      preview: `<div style="padding:30px;display:flex;gap:16px">
        <div style="position:relative">
          <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#8b5cf6)"></div>
          <div style="position:absolute;bottom:0;right:0;width:12px;height:12px;background:#10b981;border:2px solid #fff;border-radius:50%"></div>
        </div>
        <div style="position:relative">
          <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#ef4444)"></div>
          <div style="position:absolute;bottom:0;right:0;width:12px;height:12px;background:#9ca3af;border:2px solid #fff;border-radius:50%"></div>
        </div>
      </div>`,
      prompt:`设计头像在线状态角标：
- 12×12 圆形状态点，2px 白边
- 在线：绿色 #10b981
- 离线：灰色 #9ca3af
- 整体风格：社交 App 头像状态`
    },
    {
      cat: 'badge', sort: 4,
      name: '新品/热卖标签',
      desc: '商品角标。',
      tags: ['电商', '商品', '标签'],
      preview: `<div style="padding:20px;display:flex;gap:16px">
        <div style="position:relative;width:120px;height:120px;background:linear-gradient(135deg,#60a5fa,#a78bfa);border-radius:8px">
          <span style="position:absolute;top:8px;left:8px;background:#ef4444;color:#fff;font-size:10px;padding:2px 6px;border-radius:3px">热卖</span>
        </div>
        <div style="position:relative;width:120px;height:120px;background:linear-gradient(135deg,#34d399,#10b981);border-radius:8px">
          <span style="position:absolute;top:8px;left:8px;background:#f59e0b;color:#fff;font-size:10px;padding:2px 6px;border-radius:3px">新品</span>
        </div>
      </div>`,
      prompt:`设计商品角标：
- 绝对定位在商品图左上角
- 红色 #ef4444"热卖" / 黄色 #f59e0b"新品"
- 10px 字号，padding 2px 6px，圆角 3px
- 整体风格：电商商品角标`
    },

    /* ============================================================
       标签页 Tabs（tabs）
    ============================================================ */
    {
      cat: 'tabs', sort: 1,
      name: 'antd Tabs',
      desc: '下划线式标签页。',
      tags: ['桌面端', 'Tabs', 'antd'],
      preview: `<div style="background:#fff;padding:20px">
        <div style="display:flex;border-bottom:1px solid #e8e8e8;gap:24px">
          <div style="padding:8px 0;border-bottom:2px solid #1677ff;color:#1677ff;font-size:14px;font-weight:500">基本使用</div>
          <div style="padding:8px 0;color:rgba(0,0,0,.65);font-size:14px">自定义触发</div>
          <div style="padding:8px 0;color:rgba(0,0,0,.65);font-size:14px">图标页签</div>
          <div style="padding:8px 0;color:rgba(0,0,0,.65);font-size:14px">卡片式页签</div>
        </div>
        <div style="padding:20px 0;font-size:14px;color:rgba(0,0,0,.65)">
          选项卡内容一
        </div>
      </div>`,
      prompt:`设计 antd 风格 Tabs：
- 标签栏底部 1px #e8e8e8 分割线
- 当前标签：蓝色 #1677ff 文字 + 底部 2px 蓝色下划线
- 其他标签：灰色文字 rgba(0,0,0,.65)
- 标签间距 24px，padding 8px 0
- 内容区 padding 20px
- 整体风格：Ant Design Tabs 下划线式`
    },
    {
      cat: 'tabs', sort: 2,
      name: '卡片式 Tabs',
      desc: '带边框的卡片式标签。',
      tags: ['桌面端', 'Tabs', '卡片'],
      preview: `<div style="background:#fff;padding:20px">
        <div style="display:flex;gap:0">
          <div style="padding:8px 16px;border:1px solid #d9d9d9;border-bottom:none;border-radius:6px 6px 0 0;background:#fff;font-size:14px;font-weight:500">Tab 1</div>
          <div style="padding:8px 16px;border:1px solid #e8e8e8;border-bottom:none;border-radius:6px 6px 0 0;background:#fafafa;font-size:14px;color:rgba(0,0,0,.65)">Tab 2</div>
          <div style="padding:8px 16px;border:1px solid #e8e8e8;border-bottom:none;border-radius:6px 6px 0 0;background:#fafafa;font-size:14px;color:rgba(0,0,0,.65)">Tab 3</div>
        </div>
        <div style="border:1px solid #d9d9d9;border-radius:0 6px 6px 6px;padding:20px;font-size:14px;color:rgba(0,0,0,.65)">
          卡片式标签内容
        </div>
      </div>`,
      prompt:`设计卡片式 Tabs：
- 标签带边框 1px #d9d9d9，圆角 6px（仅顶部圆角）
- 当前标签：白底 + 加粗黑色
- 其他标签：灰底 #fafafa + 灰色文字
- 内容区带边框，圆角 6px（仅底部圆角）
- 整体风格：Ant Design 卡片式 Tabs`
    },
    {
      cat: 'tabs', sort: 3,
      name: 'iOS 底部 Tab',
      desc: 'App 底部导航标签。',
      tags: ['移动端', 'Tab', 'iOS'],
      preview: `<div style="background:#fff;border-top:1px solid #e5e5e5;padding:8px 0;display:flex;justify-content:space-around">
        <div style="text-align:center;color:#ff2442">
          <div style="font-size:20px">🏠</div>
          <div style="font-size:10px;margin-top:2px">首页</div>
        </div>
        <div style="text-align:center;color:#999">
          <div style="font-size:20px">🔍</div>
          <div style="font-size:10px;margin-top:2px">发现</div>
        </div>
        <div style="text-align:center;color:#999">
          <div style="font-size:20px">💬</div>
          <div style="font-size:10px;margin-top:2px">消息</div>
        </div>
        <div style="text-align:center;color:#999">
          <div style="font-size:20px">👤</div>
          <div style="font-size:10px;margin-top:2px">我的</div>
        </div>
      </div>`,
      prompt:`设计 iOS 底部 Tab 栏：
- 顶部 1px #e5e5e5 分割线
- 4 个 Tab 均匀分布
- 图标 20px + 文字 10px
- 当前 Tab：红色 #ff2442
- 其他 Tab：灰色 #999
- 整体风格：小红书/iOS 底部导航`
    },
    {
      cat: 'tabs', sort: 4,
      name: '垂直 Tabs',
      desc: '左侧垂直标签。',
      tags: ['桌面端', 'Tabs', '垂直'],
      preview: `<div style="background:#fff;padding:20px;display:flex;gap:24px">
        <div style="width:120px;border-right:1px solid #e8e8e8">
          <div style="padding:8px 16px;border-right:2px solid #1677ff;color:#1677ff;font-size:14px">基本信息</div>
          <div style="padding:8px 16px;color:rgba(0,0,0,.65);font-size:14px">安全设置</div>
          <div style="padding:8px 16px;color:rgba(0,0,0,.65);font-size:14px">通知设置</div>
        </div>
        <div style="flex:1;padding-top:8px;font-size:14px;color:rgba(0,0,0,.65)">
          垂直标签内容
        </div>
      </div>`,
      prompt:`设计垂直 Tabs：
- 左侧标签栏宽度 120px，右侧 1px #e8e8e8 分割线
- 当前标签：蓝色 #1677ff + 右侧 2px 蓝色竖条
- 其他标签：灰色文字
- 整体风格：后台设置页垂直 Tabs`
    },

    /* ============================================================
       步骤条 Steps（steps）
    ============================================================ */
    {
      cat: 'steps', sort: 1,
      name: 'antd 水平步骤条',
      desc: '表单流程步骤。',
      tags: ['桌面端', '步骤', 'antd'],
      preview: `<div style="background:#fff;padding:24px">
        <div style="display:flex;align-items:center;justify-content:space-between;max-width:500px">
          <div style="display:flex;flex-direction:column;align-items:center">
            <div style="width:32px;height:32px;border-radius:50%;background:#1677ff;color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px">1</div>
            <div style="font-size:13px;margin-top:8px;color:#1677ff">填写订单</div>
          </div>
          <div style="flex:1;height:1px;background:#1677ff;margin:0 8px;margin-bottom:28px"></div>
          <div style="display:flex;flex-direction:column;align-items:center">
            <div style="width:32px;height:32px;border-radius:50%;background:#1677ff;color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px">2</div>
            <div style="font-size:13px;margin-top:8px;color:#1677ff">支付</div>
          </div>
          <div style="flex:1;height:1px;background:#e8e8e8;margin:0 8px;margin-bottom:28px"></div>
          <div style="display:flex;flex-direction:column;align-items:center">
            <div style="width:32px;height:32px;border-radius:50%;background:#fff;border:1px solid #d9d9d9;color:rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;font-size:14px">3</div>
            <div style="font-size:13px;margin-top:8px;color:rgba(0,0,0,.25)">完成</div>
          </div>
        </div>
      </div>`,
      prompt:`设计 antd 水平步骤条：
- 3 步水平排列，圆形节点 32px
- 已完成：蓝色 #1677ff 底白字 + 连接线蓝色
- 当前步：蓝色 #1677ff 底白字
- 未完成：白底灰边 + 灰色文字
- 节点下方标签 13px
- 整体风格：Ant Design Steps`
    },
    {
      cat: 'steps', sort: 2,
      name: '移动端步骤条',
      desc: '订单流程步骤。',
      tags: ['移动端', '步骤', '订单'],
      preview: `<div style="background:#fff;padding:20px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div style="display:flex;flex-direction:column;align-items:center">
            <div style="width:28px;height:28px;border-radius:50%;background:#34c759;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px">✓</div>
            <div style="font-size:11px;margin-top:4px;color:#34c759">下单</div>
          </div>
          <div style="flex:1;height:2px;background:#34c759;margin:0 4px;margin-bottom:20px"></div>
          <div style="display:flex;flex-direction:column;align-items:center">
            <div style="width:28px;height:28px;border-radius:50%;background:#34c759;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px">✓</div>
            <div style="font-size:11px;margin-top:4px;color:#34c759">发货</div>
          </div>
          <div style="flex:1;height:2px;background:#e5e5e5;margin:0 4px;margin-bottom:20px"></div>
          <div style="display:flex;flex-direction:column;align-items:center">
            <div style="width:28px;height:28px;border-radius:50%;background:#e5e5e5;color:#999;display:flex;align-items:center;justify-content:center;font-size:12px">3</div>
            <div style="font-size:11px;margin-top:4px;color:#999">收货</div>
          </div>
        </div>
      </div>`,
      prompt:`设计移动端步骤条：
- 3 步水平排列，圆形节点 28px
- 已完成：绿色 #34c759 底白字 ✓
- 未完成：灰色 #e5e5e5 底灰字
- 连接线 2px，已完成绿色，未完成灰色
- 整体风格：淘宝/京东订单流程`
    },
    {
      cat: 'steps', sort: 3,
      name: '垂直步骤条',
      desc: '带描述文字。',
      tags: ['桌面端', '步骤', '垂直'],
      preview: `<div style="background:#fff;padding:20px;max-width:300px">
        <div style="display:flex;gap:12px">
          <div style="display:flex;flex-direction:column;align-items:center">
            <div style="width:28px;height:28px;border-radius:50%;background:#1677ff;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">1</div>
            <div style="width:1px;background:#e8e8e8;flex:1;margin-top:4px"></div>
          </div>
          <div style="padding-bottom:20px">
            <div style="font-size:14px;font-weight:500">账户信息</div>
            <div style="font-size:12px;color:rgba(0,0,0,.45);margin-top:2px">请输入您的账户信息</div>
          </div>
        </div>
        <div style="display:flex;gap:12px">
          <div style="display:flex;flex-direction:column;align-items:center">
            <div style="width:28px;height:28px;border-radius:50%;background:#fff;border:1px solid #d9d9d9;color:rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">2</div>
            <div style="width:1px;background:#e8e8e8;flex:1;margin-top:4px"></div>
          </div>
          <div style="padding-bottom:20px">
            <div style="font-size:14px;color:rgba(0,0,0,.45)">物流公司</div>
            <div style="font-size:12px;color:rgba(0,0,0,.45);margin-top:2px">请选择物流公司</div>
          </div>
        </div>
        <div style="display:flex;gap:12px">
          <div style="display:flex;flex-direction:column;align-items:center">
            <div style="width:28px;height:28px;border-radius:50%;background:#fff;border:1px solid #d9d9d9;color:rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">3</div>
          </div>
          <div>
            <div style="font-size:14px;color:rgba(0,0,0,.45)">确认订单</div>
            <div style="font-size:12px;color:rgba(0,0,0,.45);margin-top:2px">请确认订单信息</div>
          </div>
        </div>
      </div>`,
      prompt:`设计垂直步骤条：
- 垂直排列，节点 28px 圆形
- 已完成：蓝色 #1677ff 底白字
- 未完成：白底灰边灰字
- 节点间 1px 灰色竖线连接
- 每步标题 14px + 描述 12px 灰色
- 整体风格：Ant Design 垂直 Steps`
    },
    {
      cat: 'steps', sort: 4,
      name: '迷你步骤条',
      desc: '紧凑小尺寸。',
      tags: ['桌面端', '步骤', '紧凑'],
      preview: `<div style="background:#fff;padding:20px">
        <div style="display:flex;align-items:center;gap:0;max-width:400px">
          <div style="width:20px;height:20px;border-radius:50%;background:#1677ff;color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px">1</div>
          <div style="flex:1;height:2px;background:#1677ff"></div>
          <div style="width:20px;height:20px;border-radius:50%;background:#1677ff;color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px">2</div>
          <div style="flex:1;height:2px;background:#e8e8e8"></div>
          <div style="width:20px;height:20px;border-radius:50%;background:#fff;border:1px solid #d9d9d9;color:rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;font-size:10px">3</div>
        </div>
      </div>`,
      prompt:`设计迷你步骤条：
- 节点 20px 圆形，紧凑排列
- 连接线 2px
- 整体风格：紧凑步骤条`
    },

    /* ============================================================
       折叠面板 Collapse（collapse）
    ============================================================ */
    {
      cat: 'collapse', sort: 1,
      name: 'antd 折叠面板',
      desc: '可展开/收起。',
      tags: ['桌面端', '折叠', 'antd'],
      preview: `<div style="background:#fff;border:1px solid #e8e8e8;border-radius:8px;max-width:400px;overflow:hidden">
        <div style="padding:12px 16px;border-bottom:1px solid #e8e8e8;display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:14px;font-weight:500">这是面板标题</span>
          <span style="color:rgba(0,0,0,.45)">▴</span>
        </div>
        <div style="padding:12px 16px;border-bottom:1px solid #e8e8e8;font-size:13px;color:rgba(0,0,0,.65)">
          面板内容可以折叠
        </div>
        <div style="padding:12px 16px;display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:14px;font-weight:500">面板标题</span>
          <span style="color:rgba(0,0,0,.45)">▾</span>
        </div>
      </div>`,
      prompt:`设计 antd 折叠面板：
- 整体白底 1px #e8e8e8 边框，圆角 8px
- 面板标题 14px 加粗 + 右侧箭头（展开 ▴ / 收起 ▾）
- 面板内容 13px 灰色
- 面板间 1px 分割线
- 整体风格：Ant Design Collapse`
    },
    {
      cat: 'collapse', sort: 2,
      name: '手风琴效果',
      desc: '同时只展开一个。',
      tags: ['桌面端', '手风琴', '折叠'],
      preview: `<div style="background:#fff;border:1px solid #e8e8e8;border-radius:8px;max-width:400px;overflow:hidden">
        <div style="padding:12px 16px;border-bottom:1px solid #e8e8e8;display:flex;justify-content:space-between;align-items:center;background:#fafafa">
          <span style="font-size:14px">什么是 Vue？</span>
          <span style="color:#1677ff">−</span>
        </div>
        <div style="padding:12px 16px;border-bottom:1px solid #e8e8e8;font-size:13px;color:rgba(0,0,0,.65);line-height:1.6">
          Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。
        </div>
        <div style="padding:12px 16px;border-bottom:1px solid #e8e8e8;display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:14px">如何安装 Vue？</span>
          <span style="color:rgba(0,0,0,.45)">+</span>
        </div>
        <div style="padding:12px 16px;display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:14px">Vue 的优势是什么？</span>
          <span style="color:rgba(0,0,0,.45)">+</span>
        </div>
      </div>`,
      prompt:`设计手风琴折叠面板：
- 展开的面板：灰底 #fafafa + 蓝色减号 −
- 收起的面板：白底 + 灰色加号 +
- 整体风格：FAQ 手风琴`
    },
    {
      cat: 'collapse', sort: 3,
      name: '移动端筛选折叠',
      desc: '商品筛选面板。',
      tags: ['移动端', '筛选', '折叠'],
      preview: `<div style="background:#fff;padding:16px;max-width:300px">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #f0f0f0">
          <span style="font-size:14px;font-weight:500">品牌</span>
          <span style="color:#ff2442">收起 ▴</span>
        </div>
        <div style="padding:12px 0;display:flex;gap:8px;flex-wrap:wrap">
          <span style="padding:4px 12px;background:#f5f5f5;border-radius:4px;font-size:12px">全部</span>
          <span style="padding:4px 12px;background:#ff2442;color:#fff;border-radius:4px;font-size:12px">苹果</span>
          <span style="padding:4px 12px;background:#f5f5f5;border-radius:4px;font-size:12px">华为</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #f0f0f0">
          <span style="font-size:14px;font-weight:500">价格</span>
          <span style="color:#999">展开 ▾</span>
        </div>
      </div>`,
      prompt:`设计移动端筛选折叠面板：
- 标题 14px 加粗 + 右侧展开/收起文字
- 展开内容：标签按钮组
- 选中标签：红底白字 #ff2442
- 未选中标签：灰底 #f5f5f5
- 整体风格：小红书/淘宝筛选面板`
    },
    {
      cat: 'collapse', sort: 4,
      name: '嵌套折叠',
      desc: '多层级折叠。',
      tags: ['桌面端', '嵌套', '折叠'],
      preview: `<div style="background:#fff;border:1px solid #e8e8e8;border-radius:8px;max-width:400px;overflow:hidden">
        <div style="padding:12px 16px;border-bottom:1px solid #e8e8e8;display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:14px;font-weight:500">父级菜单</span>
          <span style="color:rgba(0,0,0,.45)">▾</span>
        </div>
        <div style="padding:12px 16px;background:#fafafa">
          <div style="padding:8px 16px;font-size:13px;color:rgba(0,0,0,.65)">子菜单一</div>
          <div style="padding:8px 16px;font-size:13px;color:rgba(0,0,0,.65)">子菜单二</div>
        </div>
      </div>`,
      prompt:`设计嵌套折叠面板：
- 父级展开后显示子菜单列表
- 子菜单区域灰底 #fafafa
- 整体风格：多级折叠菜单`
    },

    /* ============================================================
       警告提示 Alert（alert）
    ============================================================ */
    {
      cat: 'alert', sort: 1,
      name: 'antd 警告提示',
      desc: '四种类型提示。',
      tags: ['桌面端', 'Alert', 'antd'],
      preview: `<div style="padding:16px;max-width:400px;display:flex;flex-direction:column;gap:12px">
        <div style="padding:12px 16px;background:#e6f4ff;border:1px solid #91caff;border-radius:6px;font-size:14px;color:#1677ff">信息提示内容</div>
        <div style="padding:12px 16px;background:#f6ffed;border:1px solid #b7eb8f;border-radius:6px;font-size:14px;color:#52c41a">成功提示内容</div>
        <div style="padding:12px 16px;background:#fffbe6;border:1px solid #ffe58f;border-radius:6px;font-size:14px;color:#faad14">警告提示内容</div>
        <div style="padding:12px 16px;background:#fff2f0;border:1px solid #ffccc7;border-radius:6px;font-size:14px;color:#ff4d4f">错误提示内容</div>
      </div>`,
      prompt:`设计 antd 警告提示：
- 四种类型：
  - 信息：蓝底 #e6f4ff + 蓝边 #91caff + 蓝字 #1677ff
  - 成功：绿底 #f6ffed + 绿边 #b7eb8f + 绿字 #52c41a
  - 警告：黄底 #fffbe6 + 黄边 #ffe58f + 黄字 #faad14
  - 错误：红底 #fff2f0 + 红边 #ffccc7 + 红字 #ff4d4f
- padding 12px 16px，圆角 6px，14px 字号
- 整体风格：Ant Design Alert`
    },
    {
      cat: 'alert', sort: 2,
      name: '带图标警告',
      desc: '带图标和关闭按钮。',
      tags: ['桌面端', 'Alert', '图标'],
      preview: `<div style="padding:16px;max-width:400px">
        <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:#e6f4ff;border:1px solid #91caff;border-radius:6px">
          <span style="font-size:18px">ℹ️</span>
          <span style="flex:1;font-size:14px;color:#1677ff">系统将于今晚 22:00 进行维护升级</span>
          <span style="color:#1677ff;cursor:pointer">✕</span>
        </div>
      </div>`,
      prompt:`设计带图标的警告提示：
- 左侧图标 18px + 中间文字 + 右侧关闭按钮
- 信息类型：蓝底蓝边蓝字
- 整体风格：可关闭的 Alert`
    },
    {
      cat: 'alert', sort: 3,
      name: '顶部通知条',
      desc: '全宽顶部提示。',
      tags: ['桌面端', '通知', '顶部'],
      preview: `<div style="background:#fffbe6;padding:10px 24px;display:flex;align-items:center;gap:8px">
          <span style="font-size:16px">⚠️</span>
          <span style="font-size:13px;color:#faad14">您的版本过低，请尽快升级以获得最佳体验。</span>
          <span style="margin-left:auto;font-size:13px;color:#1677ff;cursor:pointer">立即升级</span>
      </div>`,
      prompt:`设计顶部通知条：
- 全宽顶部，黄底 #fffbe6
- 左侧警告图标 + 中间文字 + 右侧操作链接
- 整体风格：网站顶部通知条`
    },
    {
      cat: 'alert', sort: 4,
      name: '表单验证提示',
      desc: '输入框下方错误提示。',
      tags: ['表单', '错误', '验证'],
      preview: `<div style="padding:16px;max-width:300px">
        <label style="display:block;font-size:13px;color:rgba(0,0,0,.88);margin-bottom:4px">用户名</label>
        <div style="padding:8px 12px;border:1px solid #ff4d4f;border-radius:6px;font-size:14px">admin</div>
        <div style="display:flex;align-items:center;gap:4px;margin-top:4px">
          <span style="color:#ff4d4f;font-size:12px">⚠️</span>
          <span style="font-size:12px;color:#ff4d4f">用户名已被占用</span>
        </div>
      </div>`,
      prompt:`设计表单验证错误提示：
- 输入框红边 #ff4d4f
- 下方错误提示：红色 ⚠️ + 红色文字 12px
- 整体风格：表单验证错误提示`
    },

    /* ============================================================
       进度条 Progress（progress）
    ============================================================ */
    {
      cat: 'progress', sort: 1,
      name: 'antd 进度条',
      desc: '线性进度条。',
      tags: ['桌面端', '进度', 'antd'],
      preview: `<div style="padding:16px;max-width:400px;display:flex;flex-direction:column;gap:16px">
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="font-size:13px">进度</span>
            <span style="font-size:13px;color:rgba(0,0,0,.65)">30%</span>
          </div>
          <div style="height:8px;background:#f0f0f0;border-radius:4px;overflow:hidden">
            <div style="width:30%;height:100%;background:#1677ff;border-radius:4px"></div>
          </div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="font-size:13px">成功</span>
            <span style="font-size:13px;color:#52c41a">70%</span>
          </div>
          <div style="height:8px;background:#f0f0f0;border-radius:4px;overflow:hidden">
            <div style="width:70%;height:100%;background:#52c41a;border-radius:4px"></div>
          </div>
        </div>
      </div>`,
      prompt:`设计 antd 进度条：
- 高度 8px，背景 #f0f0f0，圆角 4px
- 已完成部分：蓝色 #1677ff / 绿色 #52c41a
- 上方：标签 13px + 百分比
- 整体风格：Ant Design Progress`
    },
    {
      cat: 'progress', sort: 2,
      name: '环形进度',
      desc: '圆形进度环。',
      tags: ['桌面端', '进度', '环形'],
      preview: `<div style="padding:16px;display:flex;gap:24px;align-items:center">
        <div style="position:relative;width:64px;height:64px">
          <svg width="64" height="64">
            <circle cx="32" cy="32" r="28" fill="none" stroke="#f0f0f0" stroke-width="6"/>
            <circle cx="32" cy="32" r="28" fill="none" stroke="#1677ff" stroke-width="6" stroke-dasharray="176" stroke-dashoffset="70" stroke-linecap="round" transform="rotate(-90 32 32)"/>
          </svg>
          <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:14px;font-weight:500">60%</div>
        </div>
        <div style="position:relative;width:64px;height:64px">
          <svg width="64" height="64">
            <circle cx="32" cy="32" r="28" fill="none" stroke="#f0f0f0" stroke-width="6"/>
            <circle cx="32" cy="32" r="28" fill="none" stroke="#52c41a" stroke-width="6" stroke-dasharray="176" stroke-dashoffset="17" stroke-linecap="round" transform="rotate(-90 32 32)"/>
          </svg>
          <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:14px;font-weight:500;color:#52c41a">90%</div>
        </div>
      </div>`,
      prompt:`设计环形进度条：
- 圆形尺寸 64×64，描边宽度 6px
- 背景环 #f0f0f0
- 进度环：蓝色 #1677ff / 绿色 #52c41a
- 中心显示百分比数字 14px
- 整体风格：Ant Design 环形 Progress`
    },
    {
      cat: 'progress', sort: 3,
      name: '上传进度',
      desc: '带文件信息和速度。',
      tags: ['上传', '进度', '文件'],
      preview: `<div style="padding:16px;max-width:360px;background:#fff;border:1px solid #e8e8e8;border-radius:8px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <span style="font-size:24px">📄</span>
          <div style="flex:1">
            <div style="font-size:13px">项目设计稿.sketch</div>
            <div style="font-size:11px;color:rgba(0,0,0,.45)">2.5MB / 5MB</div>
          </div>
          <span style="font-size:13px;color:#1677ff">50%</span>
        </div>
        <div style="height:6px;background:#f0f0f0;border-radius:3px;overflow:hidden;margin-bottom:8px">
          <div style="width:50%;height:100%;background:#1677ff;border-radius:3px"></div>
        </div>
        <div style="font-size:11px;color:rgba(0,0,0,.45)">传输中... 2.5MB/s</div>
      </div>`,
      prompt:`设计上传进度条：
- 文件图标 + 文件名 + 大小 + 百分比
- 进度条 6px 高
- 底部显示传输速度
- 整体风格：文件上传进度`
    },
    {
      cat: 'progress', sort: 4,
      name: '步骤进度',
      desc: '带状态标记。',
      tags: ['进度', '状态', '任务'],
      preview: `<div style="padding:16px;max-width:360px">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px">
          <span style="font-size:13px">任务进度</span>
          <span style="font-size:13px;color:#52c41a">已完成</span>
        </div>
        <div style="height:8px;background:#f0f0f0;border-radius:4px;overflow:hidden;position:relative">
          <div style="width:100%;height:100%;background:#52c41a;border-radius:4px"></div>
          <div style="position:absolute;right:0;top:-4px;width:16px;height:16px;background:#52c41a;border-radius:50%;border:2px solid #fff"></div>
        </div>
      </div>`,
      prompt:`设计完成状态进度条：
- 100% 绿色 #52c41a
- 右侧带白色边框的圆形标记
- 整体风格：任务完成进度`
    },

    /* ============================================================
       单选/复选 Choice（choice）
    ============================================================ */
    {
      cat: 'choice', sort: 1,
      name: 'antd 单选框',
      desc: '圆形单选。',
      tags: ['表单', '单选', 'antd'],
      preview: `<div style="padding:16px;display:flex;flex-direction:column;gap:12px">
        <div style="display:flex;align-items:center;gap:8px">
          <div style="width:16px;height:16px;border-radius:50%;border:1px solid #d9d9d9;display:flex;align-items:center;justify-content:center">
            <div style="width:8px;height:8px;border-radius:50%;background:#1677ff"></div>
          </div>
          <span style="font-size:14px">选项一</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="width:16px;height:16px;border-radius:50%;border:1px solid #d9d9d9"></div>
          <span style="font-size:14px;color:rgba(0,0,0,.65)">选项二</span>
        </div>
      </div>`,
      prompt:`设计 antd 单选框：
- 圆形 16×16，未选中灰边 #d9d9d9
- 选中：蓝色 #1677ff 外圈 + 内部 8px 蓝色圆点
- 文字 14px
- 整体风格：Ant Design Radio`
    },
    {
      cat: 'choice', sort: 2,
      name: 'antd 复选框',
      desc: '方形多选。',
      tags: ['表单', '复选', 'antd'],
      preview: `<div style="padding:16px;display:flex;flex-direction:column;gap:12px">
        <div style="display:flex;align-items:center;gap:8px">
          <div style="width:16px;height:16px;border-radius:3px;background:#1677ff;display:flex;align-items:center;justify-content:center">
            <span style="color:#fff;font-size:12px">✓</span>
          </div>
          <span style="font-size:14px">苹果</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="width:16px;height:16px;border-radius:3px;background:#1677ff;display:flex;align-items:center;justify-content:center">
            <span style="color:#fff;font-size:12px">✓</span>
          </div>
          <span style="font-size:14px">香蕉</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="width:16px;height:16px;border-radius:3px;border:1px solid #d9d9d9;background:#fff"></div>
          <span style="font-size:14px;color:rgba(0,0,0,.65">橘子</span>
        </div>
      </div>`,
      prompt:`设计 antd 复选框：
- 方形 16×16，圆角 3px
- 选中：蓝色 #1677ff 底 + 白色 ✓
- 未选中：白底灰边 #d9d9d9
- 整体风格：Ant Design Checkbox`
    },
    {
      cat: 'choice', sort: 3,
      name: '移动端单选',
      desc: '列表式单选。',
      tags: ['移动端', '单选', '列表'],
      preview: `<div style="background:#fff;border-radius:8px;overflow:hidden;max-width:300px">
        <div style="padding:14px 16px;border-bottom:1px solid #f0f0f0;display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:14px">男</span>
          <div style="width:20px;height:20px;border-radius:50%;border:2px solid #ff2442;display:flex;align-items:center;justify-content:center">
            <div style="width:10px;height:10px;border-radius:50%;background:#ff2442"></div>
          </div>
        </div>
        <div style="padding:14px 16px;display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:14px;color:#999">女</span>
          <div style="width:20px;height:20px;border-radius:50%;border:2px solid #ddd"></div>
        </div>
      </div>`,
      prompt:`设计移动端列表式单选：
- 每行左侧文字 + 右侧圆形单选按钮
- 选中：红色 #ff2442 外圈 + 内部红点
- 未选中：灰边
- 行间距 14px 16px
- 整体风格：iOS 设置页单选`
    },
    {
      cat: 'choice', sort: 4,
      name: '开关 Switch',
      desc: '拨动开关。',
      tags: ['表单', '开关', 'iOS'],
      preview: `<div style="padding:16px;display:flex;flex-direction:column;gap:16px">
        <div style="display:flex;align-items:center;justify-content:space-between;max-width:260px">
          <span style="font-size:14px">通知</span>
          <div style="width:48px;height:28px;border-radius:14px;background:#34c759;position:relative">
            <div style="position:absolute;right:2px;top:2px;width:24px;height:24px;background:#fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)"></div>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;max-width:260px">
          <span style="font-size:14px;color:#999">自动更新</span>
          <div style="width:48px;height:28px;border-radius:14px;background:#e5e5ea;position:relative">
            <div style="position:absolute;left:2px;top:2px;width:24px;height:24px;background:#fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)"></div>
          </div>
        </div>
      </div>`,
      prompt:`设计 iOS 开关：
- 宽 48px 高 28px，圆角 14px
- 开启：绿色 #34c759 底，滑块在右
- 关闭：灰色 #e5e5ea 底，滑块在左
- 滑块 24×24 白色圆形
- 整体风格：iOS Switch`
    },

    /* ============================================================
       标签 Tag（tag）
    ============================================================ */
    {
      cat: 'tag', sort: 1,
      name: 'antd 标签',
      desc: '彩色标签。',
      tags: ['桌面端', 'Tag', 'antd'],
      preview: `<div style="padding:16px;display:flex;gap:8px;flex-wrap:wrap">
        <span style="padding:2px 8px;background:#f5f5f5;border:1px solid #d9d9d9;border-radius:4px;font-size:12px">标签一</span>
        <span style="padding:2px 8px;background:#e6f4ff;border:1px solid #91caff;border-radius:4px;font-size:12px;color:#1677ff">标签二</span>
        <span style="padding:2px 8px;background:#f6ffed;border:1px solid #b7eb8f;border-radius:4px;font-size:12px;color:#52c41a">标签三</span>
        <span style="padding:2px 8px;background:#fffbe6;border:1px solid #ffe58f;border-radius:4px;font-size:12px;color:#faad14">标签四</span>
        <span style="padding:2px 8px;background:#fff2f0;border:1px solid #ffccc7;border-radius:4px;font-size:12px;color:#ff4d4f">标签五</span>
      </div>`,
      prompt:`设计 antd 标签：
- 五种颜色：
  - 默认：灰底灰边灰字
  - 蓝色：蓝底 #e6f4ff + 蓝边 #91caff + 蓝字 #1677ff
  - 绿色：绿底 #f6ffed + 绿边 #b7eb8f + 绿字 #52c41a
  - 黄色：黄底 #fffbe6 + 黄边 #ffe58f + 黄字 #faad14
  - 红色：红底 #fff2f0 + 红边 #ffccc7 + 红字 #ff4d4f
- padding 2px 8px，圆角 4px，12px 字号
- 整体风格：Ant Design Tag`
    },
    {
      cat: 'tag', sort: 2,
      name: '可关闭标签',
      desc: '带关闭按钮。',
      tags: ['桌面端', 'Tag', '可关闭'],
      preview: `<div style="padding:16px;display:flex;gap:8px;flex-wrap:wrap">
        <span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#e6f4ff;border:1px solid #91caff;border-radius:4px;font-size:12px;color:#1677ff">
          设计 <span style="cursor:pointer">✕</span>
        </span>
        <span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#f6ffed;border:1px solid #b7eb8f;border-radius:4px;font-size:12px;color:#52c41a">
          前端 <span style="cursor:pointer">✕</span>
        </span>
      </div>`,
      prompt:`设计可关闭标签：
- 标签右侧带 ✕ 关闭按钮
- 其他样式同 antd Tag
- 整体风格：可关闭的标签`
    },
    {
      cat: 'tag', sort: 3,
      name: '选择器标签',
      desc: '输入框中的标签。',
      tags: ['表单', 'Tag', '输入框'],
      preview: `<div style="padding:16px;max-width:360px">
        <div style="display:flex;flex-wrap:wrap;gap:6px;padding:6px;border:1px solid #d9d9d9;border-radius:6px">
          <span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#e6f4ff;border-radius:4px;font-size:12px;color:#1677ff">Vue <span>✕</span></span>
          <span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#e6f4ff;border-radius:4px;font-size:12px;color:#1677ff">React <span>✕</span></span>
          <span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#e6f4ff;border-radius:4px;font-size:12px;color:#1677ff">Nuxt <span>✕</span></span>
          <input style="flex:1;min-width:60px;border:none;outline:none;font-size:13px" placeholder="输入标签...">
        </div>
      </div>`,
      prompt:`设计选择器标签输入框：
- 输入框内显示已选标签（蓝色小标签）
- 标签可删除 ✕
- 右侧输入框可继续输入
- 整体风格：多选标签输入`
    },
    {
      cat: 'tag', sort: 4,
      name: '文章标签',
      desc: '文章底部标签。',
      tags: ['文章', 'Tag', '博客'],
      preview: `<div style="padding:16px">
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <span style="padding:3px 10px;background:#f5f5f5;border-radius:20px;font-size:12px;color:#666"># Vue</span>
          <span style="padding:3px 10px;background:#f5f5f5;border-radius:20px;font-size:12px;color:#666"># 前端</span>
          <span style="padding:3px 10px;background:#f5f5f5;border-radius:20px;font-size:12px;color:#666"># 教程</span>
        </div>
      </div>`,
      prompt:`设计文章标签：
- 胶囊形圆角 20px
- 灰底 #f5f5f5，灰字 #666
- 带 # 前缀
- 整体风格：博客文章标签`
    },

    /* ============================================================
       分页 Pagination（pagination）
    ============================================================ */
    {
      cat: 'pagination', sort: 1,
      name: 'antd 分页',
      desc: '标准分页。',
      tags: ['桌面端', '分页', 'antd'],
      preview: `<div style="padding:16px;display:flex;align-items:center;gap:8px">
        <span style="padding:4px 12px;border:1px solid #d9d9d9;border-radius:6px;font-size:13px;color:rgba(0,0,0,.25);cursor:not-allowed">‹</span>
        <span style="padding:4px 12px;border:1px solid #1677ff;border-radius:6px;font-size:13px;color:#1677ff;font-weight:500">1</span>
        <span style="padding:4px 12px;border:1px solid #d9d9d9;border-radius:6px;font-size:13px;cursor:pointer">2</span>
        <span style="padding:4px 12px;border:1px solid #d9d9d9;border-radius:6px;font-size:13px;cursor:pointer">3</span>
        <span style="padding:4px 12px;border:1px solid #d9d9d9;border-radius:6px;font-size:13px;cursor:pointer">4</span>
        <span style="padding:4px 12px;border:1px solid #d9d9d9;border-radius:6px;font-size:13px;cursor:pointer">5</span>
        <span style="padding:4px 12px;border:1px solid #d9d9d9;border-radius:6px;font-size:13px;cursor:pointer">›</span>
      </div>`,
      prompt:`设计 antd 分页：
- 每页数字按钮：13px，padding 4px 12px，1px 边框 #d9d9d9，圆角 6px
- 当前页：蓝边 #1677ff + 蓝字 + 加粗
- 其他页：灰边灰字
- 禁用页：灰色不可点击
- 整体风格：Ant Design Pagination`
    },
    {
      cat: 'pagination', sort: 2,
      name: '带总数分页',
      desc: '显示总数和每页条数。',
      tags: ['桌面端', '分页', '总数'],
      preview: `<div style="padding:16px;display:flex;align-items:center;gap:16px">
        <span style="font-size:13px;color:rgba(0,0,0,.65)">共 200 条</span>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="padding:4px 12px;border:1px solid #d9d9d9;border-radius:6px;font-size:13px">‹</span>
          <span style="padding:4px 12px;border:1px solid #1677ff;border-radius:6px;font-size:13px;color:#1677ff">1</span>
          <span style="padding:4px 12px;border:1px solid #d9d9d9;border-radius:6px;font-size:13px">2</span>
          <span style="padding:4px 12px;border:1px solid #d9d9d9;border-radius:6px;font-size:13px">›</span>
        </div>
        <span style="font-size:13px;color:rgba(0,0,0,.65)">10 条/页</span>
      </div>`,
      prompt:`设计带总数分页：
- 左侧：共 X 条
- 中间：分页按钮
- 右侧：每页 X 条
- 整体风格：后台表格分页`
    },
    {
      cat: 'pagination', sort: 3,
      name: '移动端加载更多',
      desc: '简单分页。',
      tags: ['移动端', '分页', '加载更多'],
      preview: `<div style="padding:16px;text-align:center">
        <div style="font-size:13px;color:#1677ff;cursor:pointer">加载更多 ↓</div>
        <div style="font-size:11px;color:#999;margin-top:4px">第 1 页 / 共 10 页</div>
      </div>`,
      prompt:`设计移动端加载更多：
- 居中蓝色文字"加载更多 ↓"
- 下方小字页码
- 整体风格：移动端列表分页`
    },
    {
      cat: 'pagination', sort: 4,
      name: '简洁分页',
      desc: '仅显示上下页。',
      tags: ['桌面端', '分页', '简洁'],
      preview: `<div style="padding:16px;display:flex;align-items:center;justify-content:space-between;max-width:300px">
        <span style="font-size:13px;color:#1677ff">← 上一页</span>
        <span style="font-size:13px;color:rgba(0,0,0,.65)">1 / 10</span>
        <span style="font-size:13px;color:#1677ff;cursor:pointer">下一页 →</span>
      </div>`,
      prompt:`设计简洁分页：
- 左：上一页链接
- 中：当前页/总页数
- 右：下一页链接
- 整体风格：博客/文章分页`
    },
  ]

  if (!fromSnapshot) for (const c of comps) {
    insertComp.run({
      cat: c.cat, name: c.name, desc: c.desc,
      tags: JSON.stringify(c.tags),
      preview: c.preview, prompt: c.prompt, sort: c.sort
    })
    console.log(`[seed] inserted ${comps.length} components`)
  }
}

export default db
