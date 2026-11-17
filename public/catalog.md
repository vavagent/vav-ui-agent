# VAV UI-agent 组件视觉与提示词素材库

> 702 个组件变体 / 28 个分类，按组件类型分组；每个变体都有页面链接、风格标签和三种粒度的提示词。
> 单变体 Markdown：把 `/api/v/<slug>.md` 直接丢给 AI 即可。

## 导航与结构

### 导航菜单（nav，37 个）

- [Linear 风格顶部导航](/v/nav-001/) — 极简 SaaS 顶栏：白底、紧凑、黑色文字、当前项底部短下划线。（桌面端、SaaS、极简、Linear）
- [Vercel 控制台侧边栏](/v/nav-002/) — 纯黑底、等宽字体、精细图标、悬浮态高亮。（桌面端、后台、深色、Vercel）
- [Stripe 官网巨型菜单](/v/nav-003/) — hover 后展开多列白色面板，带柔和阴影和卡片。（桌面端、官网、复杂、Stripe）
- [iOS 风格移动端导航栏](/v/nav-004/) — 白底、大标题左对齐、右侧操作按钮。（移动端、iOS、App、顶栏）
- [小红书底部 Tab 栏](/v/nav-005/) — 白底、中间凸起发布按钮、选中态红色。（移动端、App、Tab、小红书）
- [Notion 文档树侧边栏](/v/nav-006/) — 可折叠、缩进层级、文档图标、悬浮态。（桌面端、后台、文档、Notion）
- [Apple 风格全屏菜单](/v/nav-007/) — 深色毛玻璃、大字居中、极简链接列表。（桌面端、品牌、创意、Apple）
- [shadcn/ui 风格 Tabs](/v/nav-008/) — 极简圆角、选中态白底灰边框。（桌面端、UI库、极简、shadcn）
- [GitHub 仓库面包屑](/v/nav-009/) — 带仓库图标、分支切换、相对时间。（桌面端、开发者、面包屑、GitHub）
- [Vercel 毛玻璃收缩导航](/v/nav-010/) — 滚动后从透明变毛玻璃白底。（桌面端、官网、动效、Vercel）
- [底部标签栏](/v/nav-011/) — App 底部导航（移动端、底部、Tab、玻璃拟态）
- [面包屑导航](/v/nav-012/) — 层级路径（面包屑、导航、层级、Linear）
- [下拉菜单导航](/v/nav-013/) — 悬停展开（下拉、菜单、悬停、Linear）
- [侧边树状菜单](/v/nav-014/) — 多级树形导航（树形、侧边、后台、玻璃拟态）
- [顶部 Logo 导航](/v/nav-015/) — 官网顶栏（导航、顶栏、官网、iOS）
- [展开式侧边栏](/v/nav-016/) — 可折叠菜单（导航、侧边、后台、极简）
- [图标侧边栏](/v/nav-017/) — 纯图标折叠栏（导航、图标、侧边、极简）
- [步骤导航条](/v/nav-018/) — 顶部流程进度（导航、步骤、流程、扁平）
- [搜索导航栏](/v/nav-019/) — 带搜索顶栏（导航、搜索、顶栏、Stripe）
- [分类横向导航](/v/nav-020/) — 标签式分类菜单（导航、分类、标签、GitHub）
- [抽屉菜单](/v/nav-021/) — 移动端侧滑菜单（导航、抽屉、移动端、antd）
- [悬浮快捷导航](/v/nav-022/) — 右侧悬浮入口（导航、悬浮、快捷、扁平）
- [品牌顶部菜单](/v/nav-023/) — Logo 居中官网菜单（导航、顶栏、官网、iOS）
- [暗黑侧边导航](/v/nav-024/) — 深色后台侧栏（导航、深色、侧边、Vercel）
- [横向滚动标签导航](/v/nav-025/) — 可滑动分类栏（导航、横向、滚动、移动端）
- [下拉 mega 菜单](/v/nav-026/) — 多列悬浮大菜单（导航、Mega、Stripe、antd）
- [图标文字侧边栏](/v/nav-027/) — 图标 + 文字导航项（导航、图标、侧边、小红书）
- [面包屑+返回混合](/v/nav-028/) — 返回键加路径（导航、面包屑、移动端、GitHub）
- [底部 App Tab 栏](/v/nav-029/) — 带角标底部导航（导航、底部、Tab、移动端）
- [二级展开侧栏](/v/nav-030/) — 可折叠子菜单（导航、二级、折叠、后台）
- [官网 Hero 导航](/v/nav-031/) — 透明浮层导航（导航、Hero、透明、antd）
- [竖向菜单分组](/v/nav-032/) — 分组标题菜单（导航、分组、侧边、Material）
- [可点选顶部导航](/v/nav-033/) — 点击菜单切换选中（Nav、交互、导航、极简）
- [Ant Design Pro 手风琴菜单](/v/nav-034/) — 标准后台多级菜单，选中项浅蓝底。（桌面端、后台、多级菜单、antd）
- [Linear 首页宫格入口](/v/nav-035/) — 桌面端首页用卡片当一级入口，带图标和描述。（桌面端、首页、卡片、Linear）
- [Stripe Onboarding 步骤条](/v/nav-036/) — 带圆形进度、当前项高亮品牌色。（桌面端、流程、Onboarding、Stripe）
- [Vercel 产品公告条](/v/nav-037/) — 顶部窄条 + 渐变文字 + CTA 链接。（桌面端、官网、营销、Vercel）

### 面包屑/步骤（breadcrumb，23 个）

- [GitHub 仓库面包屑](/v/breadcrumb-001/) — 带仓库图标、蓝色链接、分支胶囊。（桌面端、开发者、面包屑、antd）
- [Stripe Onboarding 步骤条](/v/breadcrumb-002/) — 圆形进度 + 连接线 + 标签。（流程、Onboarding、Stripe、antd）
- [带返回按钮的面包屑](/v/breadcrumb-003/) — 左箭头 + 层级链接。（移动端、导航、返回、antd）
- [Ant Design 步骤条](/v/breadcrumb-004/) — 带图标的横向步骤。（后台、流程、antd、GitHub）
- [带图标面包屑](/v/breadcrumb-005/) — 每项带小图标（面包屑、导航、antd、iOS）
- [移动端步骤条](/v/breadcrumb-006/) — App 内步骤指示（移动端、步骤、iOS、Material）
- [带下拉面包屑](/v/breadcrumb-007/) — 可展开选择（面包屑、下拉、导航、暗黑模式）
- [数字步骤条](/v/breadcrumb-008/) — 带数字圆形（步骤、数字、流程、暗黑模式）
- [首页图标面包屑](/v/breadcrumb-009/) — 带房子图标（Breadcrumb、图标、导航、玻璃拟态）
- [可回退面包屑](/v/breadcrumb-010/) — 返回上一级（Breadcrumb、返回、导航、扁平）
- [带首页图标路径](/v/breadcrumb-011/) — 图标面包屑（面包屑、图标、Notion、iOS）
- [当前页加粗路径](/v/breadcrumb-012/) — 强调当前层级（面包屑、强调、Vercel、新拟态）
- [移动端返回路径](/v/breadcrumb-013/) — App 返回导航（面包屑、移动端、返回、GitHub）
- [带操作下拉路径](/v/breadcrumb-014/) — 路径项可展开（面包屑、下拉、暗黑模式、极简）
- [深色背景面包屑](/v/breadcrumb-015/) — 暗黑顶栏路径（面包屑、暗黑模式、扁平、极简）
- [步骤型面包屑](/v/breadcrumb-016/) — 流程路径指示（面包屑、步骤、流程、暗黑模式）
- [多级深层路径](/v/breadcrumb-017/) — 深层级目录（面包屑、多层、目录、GitHub）
- [带图标末级路径](/v/breadcrumb-018/) — 末级带状态图标（面包屑、状态、扁平、Vercel）
- [可点击返回列表](/v/breadcrumb-019/) — 路径回退入口（面包屑、返回、列表、小红书）
- [可点击面包屑](/v/breadcrumb-020/) — 点击层级高亮（Breadcrumb、交互、导航、极简）
- [简洁面包屑](/v/breadcrumb-021/) — 文字层级导航（Breadcrumb、简洁、antd、Linear）
- [带图标面包屑](/v/breadcrumb-022/) — 首页图标前缀（Breadcrumb、图标、导航、iOS）
- [末尾省略面包屑](/v/breadcrumb-023/) — 长路径折叠（Breadcrumb、省略、导航、iOS）

### 布局栅格（layout，23 个）

- [经典后台三栏布局](/v/layout-001/) — 左侧边栏 + 主内容 + 右侧栏。（桌面端、后台、布局、Vercel）
- [卡片网格布局](/v/layout-002/) — 响应式网格，自动换行。（桌面端、内容、网格、Vercel）
- [居中内容区](/v/layout-003/) — 最大宽度居中，两侧留白。（桌面端、官网、居中、Vercel）
- [移动端单列布局](/v/layout-004/) — 通宽列表，无侧栏。（移动端、App、单列、Vercel）
- [左右分栏](/v/layout-005/) — 经典后台布局（布局、后台、antd、Vercel）
- [三栏布局](/v/layout-006/) — 文档站布局（布局、文档、Notion、暗黑模式）
- [顶部+内容](/v/layout-007/) — 官网布局（布局、官网、营销、暗黑模式）
- [卡片网格](/v/layout-008/) — Bento 布局（布局、便当盒、Bento、antd）
- [居中容器布局](/v/layout-009/) — 内容居中限宽（Layout、居中、内容、新拟态）
- [标签页布局](/v/layout-010/) — 顶部标签内容区（Layout、标签、内容、GitHub）
- [经典后台三栏](/v/layout-011/) — 侧栏+主区+右侧栏（布局、后台、三栏、antd）
- [顶栏+侧栏组合](/v/layout-012/) — 后台整体框架（布局、后台、框架、Vercel）
- [居中单栏内容](/v/layout-013/) — 文章阅读布局（布局、单栏、阅读、Vercel）
- [双栏对比布局](/v/layout-014/) — 左右等分双列（布局、双栏、对比、极简）
- [Hero+内容分块](/v/layout-015/) — 官网首页分段（布局、官网、Hero、Notion）
- [卡片网格布局](/v/layout-016/) — 响应式卡片墙（布局、网格、卡片、Vercel）
- [抽屉叠加布局](/v/layout-017/) — 主区+浮层抽屉（布局、抽屉、叠加、Stripe）
- [移动端单列布局](/v/layout-018/) — 手机纵向堆叠（布局、移动端、单列、iOS）
- [页脚贴底布局](/v/layout-019/) — Sticky Footer（布局、页脚、贴底、antd）
- [可折叠侧边栏](/v/layout-020/) — 按钮展开收起侧栏（Layout、交互、侧边栏、antd）
- [三栏后台布局](/v/layout-021/) — 侧栏+主区+副栏（Layout、三栏、后台、Tailwind）
- [双栏文档布局](/v/layout-022/) — 目录+正文（Layout、双栏、文档、Vercel）
- [Hero 区块布局](/v/layout-023/) — 大标题+副文案+按钮（Layout、Hero、官网、极简）

### 页脚（footer，24 个）

- [Stripe 官网页脚](/v/footer-001/) — 多列链接 + 品牌色 + 法律信息。（桌面端、官网、Stripe、antd）
- [Vercel 极简页脚](/v/footer-002/) — 黑底白字、单行链接。（桌面端、极简、Vercel、antd）
- [后台页脚](/v/footer-003/) — 居中版权 + 版本号。（桌面端、后台、简洁、antd）
- [小红书 App 页脚](/v/footer-004/) — 底部 Tab + 版权。（移动端、App、版权、antd）
- [简洁页脚](/v/footer-005/) — 极简页脚（页脚、极简、官网、玻璃拟态）
- [多列页脚](/v/footer-006/) — 官网多列链接（页脚、官网、多列、Linear）
- [App 关于页脚](/v/footer-007/) — 移动端关于（页脚、移动端、关于、玻璃拟态）
- [订阅页脚](/v/footer-008/) — 带邮箱订阅（页脚、订阅、营销、Vercel）
- [深色官网页脚](/v/footer-009/) — 黑底多列链接（Footer、深色、官网、iOS）
- [App 下载页脚](/v/footer-010/) — 二维码下载（Footer、下载、App、玻璃拟态）
- [极简单行页脚](/v/footer-011/) — 版权单列（页脚、极简、Material、小红书）
- [三列链接页脚](/v/footer-012/) — 产品/资源/公司（页脚、多列、官网、Stripe）
- [深色版权页脚](/v/footer-013/) — 黑底底部信息（页脚、深色、版权、GitHub）
- [订阅邮件页脚](/v/footer-014/) — 邮箱注册入口（页脚、订阅、营销、扁平）
- [社交图标页脚](/v/footer-015/) — 社交链接图标（页脚、社交、图标、Material）
- [App 信息页脚](/v/footer-016/) — 版本与备案（页脚、App、信息、Linear）
- [链接列+品牌块](/v/footer-017/) — 左品牌右链接（页脚、品牌、链接、极简）
- [双行页脚](/v/footer-018/) — 链接行+版权行（页脚、双行、官网、Stripe）
- [极简图标+版权](/v/footer-019/) — 社交与版权混合（页脚、图标、版权、新拟态）
- [多列链接页脚](/v/footer-020/) — 四列站点导航（Footer、多列、官网、Vercel）
- [社交链接页脚](/v/footer-021/) — 图标社交入口（Footer、社交、链接、antd）
- [订阅入口页脚](/v/footer-022/) — 邮箱订阅表单（Footer、订阅、表单、Linear）
- [极简单行页脚](/v/footer-023/) — 单行版权信息（Footer、极简、单行、antd）
- [品牌标语页脚](/v/footer-024/) — Logo+标语+链接（Footer、品牌、官网、Tailwind）

### 标签页 Tabs（tabs，25 个）

- [antd Tabs](/v/tabs-001/) — 下划线式标签页。（桌面端、Tabs、antd、iOS）
- [卡片式 Tabs](/v/tabs-002/) — 带边框的卡片式标签。（桌面端、Tabs、卡片、antd）
- [iOS 底部 Tab](/v/tabs-003/) — App 底部导航标签。（移动端、Tab、iOS、antd）
- [垂直 Tabs](/v/tabs-004/) — 左侧垂直标签。（桌面端、Tabs、垂直、antd）
- [顶部下划线 Tabs](/v/tabs-005/) — Antd 风格标签页（Tabs、标签页、antd、Material）
- [卡片式 Tabs](/v/tabs-006/) — 带边框卡片标签（Tabs、卡片、标签页、Vercel）
- [侧边 Tabs](/v/tabs-007/) — 左侧竖向标签（Tabs、侧边、标签页、GitHub）
- [分段控制器](/v/tabs-008/) — iOS Segmented（Tabs、分段、iOS、Stripe）
- [可关闭标签](/v/tabs-009/) — 带关闭按钮（Tabs、关闭、后台、Vercel）
- [图标 Tabs](/v/tabs-010/) — 带图标的标签（Tabs、图标、标签页、antd）
- [下划线标签页](/v/tabs-011/) — antd 顶部 Tabs（Tabs、标签页、antd、极简）
- [卡片式标签页](/v/tabs-012/) — 边框卡片 Tabs（Tabs、卡片、标签页、极简）
- [侧边竖向 Tabs](/v/tabs-013/) — 左侧竖排标签（Tabs、侧边、标签页、Vercel）
- [分段控制器](/v/tabs-014/) — iOS 分段选择（Tabs、分段、iOS、Notion）
- [可关闭标签页](/v/tabs-015/) — 多页签关闭（Tabs、关闭、后台、Notion）
- [图标标签页](/v/tabs-016/) — 图标+文字标签（Tabs、图标、标签页、Notion）
- [数字角标标签](/v/tabs-017/) — 标签带计数（Tabs、角标、计数、Linear）
- [底部 Tab 导航](/v/tabs-018/) — App 底部标签（Tabs、底部、移动端、Vercel）
- [下拉式标签](/v/tabs-019/) — 标签溢出收纳（Tabs、下拉、溢出、antd）
- [可切换标签页](/v/tabs-020/) — 点击切换面板（Tabs、交互、标签页、antd）
- [可切换分段控制器](/v/tabs-021/) — iOS 分段交互（Tabs、交互、分段、iOS）
- [卡片式标签页](/v/tabs-022/) — 带边框卡片标签（Tabs、卡片、antd、Tailwind）
- [图标标签页](/v/tabs-023/) — 图标+文字标签（Tabs、图标、标签、antd）
- [底部标签栏](/v/tabs-024/) — 移动端底部导航（Tabs、底部、移动端、iOS）
- [下拉标签页](/v/tabs-025/) — 更多标签收纳（Tabs、下拉、标签、Tailwind）

### 步骤条 Steps（steps，23 个）

- [antd 水平步骤条](/v/steps-001/) — 表单流程步骤。（桌面端、步骤、antd、iOS）
- [移动端步骤条](/v/steps-002/) — 订单流程步骤。（移动端、步骤、订单、antd）
- [垂直步骤条](/v/steps-003/) — 带描述文字。（桌面端、步骤、垂直、antd）
- [迷你步骤条](/v/steps-004/) — 紧凑小尺寸。（桌面端、步骤、紧凑、antd）
- [横向步骤条](/v/steps-005/) — antd 横向步骤（Steps、步骤、antd、Tailwind）
- [竖向步骤条](/v/steps-006/) — 垂直步骤列表（Steps、竖向、流程、Material）
- [点式步骤](/v/steps-007/) — 小圆点指示器（Steps、圆点、移动端、Vercel）
- [带描述步骤](/v/steps-008/) — 节点带说明文字（Steps、描述、流程、Notion）
- [图标步骤](/v/steps-009/) — 图标替代数字（Steps、图标、流程、iOS）
- [只读进度步骤](/v/steps-010/) — 结果状态步骤（Steps、状态、结果、Tailwind）
- [横向步骤条](/v/steps-011/) — 数字节点步骤（Steps、步骤、antd、Material）
- [竖向时间线步骤](/v/steps-012/) — 垂直进度列表（Steps、竖向、时间线、小红书）
- [点式指示器](/v/steps-013/) — 轮播步骤圆点（Steps、圆点、移动端、antd）
- [带描述步骤](/v/steps-014/) — 节点说明文字（Steps、描述、流程、扁平）
- [图标步骤](/v/steps-015/) — 图标替代数字（Steps、图标、流程、Notion）
- [只读结果步骤](/v/steps-016/) — 状态清单步骤（Steps、状态、结果、antd）
- [圆形进度步骤](/v/steps-017/) — 带百分比圆环（Steps、环形、进度、Linear）
- [订单物流步骤](/v/steps-018/) — 配送状态节点（Steps、物流、订单、玻璃拟态）
- [极简横线步骤](/v/steps-019/) — 细线节点进度（Steps、极简、细线、Material）
- [可点击步骤条](/v/steps-020/) — 点击切换当前步（Steps、交互、流程、暗黑模式）
- [横向步骤条](/v/steps-021/) — 节点+连线（Steps、横向、流程、antd）
- [竖向步骤条](/v/steps-022/) — 纵向时间线（Steps、竖向、时间线、极简）
- [带描述步骤](/v/steps-023/) — 节点下补充说明（Steps、描述、流程、Vercel）

### 分页（pagination，23 个）

- [antd 分页](/v/pagination-001/) — 标准分页。（桌面端、分页、antd、GitHub）
- [带总数分页](/v/pagination-002/) — 显示总数和每页条数。（桌面端、分页、总数、antd）
- [移动端加载更多](/v/pagination-003/) — 简单分页。（移动端、分页、加载更多、antd）
- [简洁分页](/v/pagination-004/) — 仅显示上下页。（桌面端、分页、简洁、antd）
- [标准分页](/v/pagination-005/) — 基础分页器（Pagination、分页、antd、iOS）
- [简洁分页](/v/pagination-006/) — 仅上一页下一页（Pagination、简洁、移动端、Tailwind）
- [带总数分页](/v/pagination-007/) — 显示总数和页大小（Pagination、总数、后台、Stripe）
- [无限滚动加载](/v/pagination-008/) — 滚动加载更多（Pagination、滚动、加载、Notion）
- [跳动页码分组](/v/pagination-009/) — 带省略页码（Pagination、页码、省略、Stripe）
- [跳页输入](/v/pagination-010/) — 输入页码跳转（Pagination、跳页、输入、Vercel）
- [标准分页器](/v/pagination-011/) — 基础页码分页（Pagination、分页、antd、新拟态）
- [简洁翻页](/v/pagination-012/) — 上一页下一页（Pagination、简洁、移动端、Tailwind）
- [带总数分页](/v/pagination-013/) — 总数+页大小（Pagination、总数、后台、Vercel）
- [无限滚动加载](/v/pagination-014/) — 滚动加载更多（Pagination、滚动、加载、极简）
- [省略页码分组](/v/pagination-015/) — 首页当前末页（Pagination、页码、省略、iOS）
- [跳页输入](/v/pagination-016/) — 输入页码跳转（Pagination、跳页、输入、Linear）
- [紧凑小圆分页](/v/pagination-017/) — 圆点页码（Pagination、紧凑、圆点、antd）
- [单页禁用分页](/v/pagination-018/) — 只有一页状态（Pagination、禁用、状态、antd）
- [加载更多按钮](/v/pagination-019/) — 按钮触底加载（Pagination、按钮、加载、Stripe）
- [可切换页码](/v/pagination-020/) — 点击页码高亮（Pagination、交互、分页、antd）
- [带总数分页](/v/pagination-021/) — 总数+页码+页大小（Pagination、总数、后台、极简）
- [简洁翻页按钮](/v/pagination-022/) — 仅上下页（Pagination、简洁、移动端、Linear）
- [圆点分页指示器](/v/pagination-023/) — 小圆点页码（Pagination、圆点、轮播、扁平）

### 目录导航（toc，23 个）

- [文档站右侧目录](/v/toc-001/) — 当前章节高亮，点击跳转。（桌面端、文档、目录、Notion）
- [GitHub Wiki 目录](/v/toc-002/) — 带序号、可折叠。（桌面端、Wiki、目录、Notion）
- [移动端文章目录](/v/toc-003/) — 底部弹出、章节列表。（移动端、文章、目录、Notion）
- [锚点导航](/v/toc-004/) — 顶部锚点、滚动高亮。（桌面端、官网、锚点、Notion）
- [文章目录](/v/toc-005/) — 右侧大纲 TOC（TOC、目录、文档、暗黑模式）
- [章节导航](/v/toc-006/) — 顶部章节锚点（TOC、章节、导航、Stripe）
- [嵌套目录树](/v/toc-007/) — 多级树形目录（TOC、树形、嵌套、antd）
- [目录计数](/v/toc-008/) — 带章节编号（TOC、编号、章节、antd）
- [当前阅读高亮目录](/v/toc-009/) — 滚动联动大纲（TOC、高亮、滚动、小红书）
- [折叠章节目录](/v/toc-010/) — 可展开收起（TOC、折叠、目录、antd）
- [右侧大纲目录](/v/toc-011/) — 文档章节导航（TOC、大纲、文档、Stripe）
- [嵌套树形目录](/v/toc-012/) — 多级文档树（TOC、树形、嵌套、antd）
- [编号章节目录](/v/toc-013/) — 数字编号大纲（TOC、编号、章节、Material）
- [折叠侧边目录](/v/toc-014/) — 可收起章节（TOC、折叠、侧边、新拟态）
- [阅读进度高亮](/v/toc-015/) — 滚动联动大纲（TOC、高亮、滚动、暗黑模式）
- [锚点横排目录](/v/toc-016/) — 顶部章节锚点（TOC、锚点、横向、玻璃拟态）
- [带子标题目录](/v/toc-017/) — 两级大纲项（TOC、子标题、两级、玻璃拟态）
- [目录计数项](/v/toc-018/) — 带条目数量（TOC、计数、列表、antd）
- [深色文档大纲](/v/toc-019/) — 暗色侧边目录（TOC、深色、文档、iOS）
- [可点选目录](/v/toc-020/) — 点击章节高亮（TOC、交互、目录、极简）
- [多级目录](/v/toc-021/) — 层级缩进目录（TOC、多级、目录、antd）
- [锚点目录](/v/toc-022/) — 右侧浮动目录（TOC、锚点、文档、Linear）
- [目录计数](/v/toc-023/) — 目录带条目数（TOC、计数、目录、antd）

## 基础控件

### 按钮（button，33 个）

- [shadcn/ui 主按钮](/v/button-001/) — 白底灰边框，hover 浅灰底，极简。（桌面端、极简、shadcn、小红书）
- [Vercel 黑底按钮](/v/button-002/) — 纯黑填充、无阴影、紧凑。（桌面端、SaaS、Vercel、极简）
- [Stripe 渐变按钮](/v/button-003/) — 紫蓝渐变、圆角胶囊、阴影。（桌面端、金融、Stripe、渐变）
- [iOS 蓝色系统按钮](/v/button-004/) — #007AFF、圆角、紧凑。（移动端、iOS、原生、antd）
- [小红书红色胶囊按钮](/v/button-005/) — 品牌红、圆角胶囊、居中。（移动端、电商、小红书、antd）
- [加载态按钮](/v/button-006/) — 按钮内带 spinner 旋转。（交互、加载态、通用、antd）
- [浮动操作按钮 FAB](/v/button-007/) — 圆形、右下悬浮、阴影。（移动端、Material、悬浮、antd）
- [GitHub 绿色合并按钮](/v/button-008/) — 绿色填充、圆角、带图标。（桌面端、开发者、GitHub、antd）
- [渐变按钮](/v/button-009/) — 彩色渐变按钮（渐变、桌面端、营销、Vercel）
- [图标按钮](/v/button-010/) — 带图标按钮（图标、桌面端、通用、antd）
- [浮动按钮](/v/button-011/) — 右下角悬浮按钮（浮动、移动端、FAB、扁平）
- [文字按钮](/v/button-012/) — 无背景纯文字（文字、极简、通用、antd）
- [大主按钮](/v/button-013/) — 大型 CTA 按钮（按钮、主按钮、营销、antd）
- [危险按钮](/v/button-014/) — 红色删除按钮（按钮、危险、删除、antd）
- [虚线按钮](/v/button-015/) — 虚线边框按钮（按钮、虚线、次要、Material）
- [禁用按钮](/v/button-016/) — 不可点击状态（按钮、禁用、状态、扁平）
- [分段按钮](/v/button-017/) — 按钮组（按钮、分组、分段、antd）
- [圆形按钮](/v/button-018/) — 圆形图标按钮（按钮、圆形、图标、Linear）
- [暗黑模式按钮](/v/button-019/) — 深色背景按钮（按钮、暗黑模式、深色、Vercel）
- [加载按钮](/v/button-020/) — 带 spinner 按钮（按钮、加载、状态、Vercel）
- [次级按钮](/v/button-021/) — 白底灰边按钮（按钮、次级、通用、iOS）
- [大圆角胶囊按钮](/v/button-022/) — 全圆角按钮（按钮、胶囊、潮流、Tailwind）
- [描边幽灵按钮](/v/button-023/) — 透明背景幽灵（按钮、幽灵、描边、Notion）
- [图标后置按钮](/v/button-024/) — 文字在左图标在右（按钮、图标、导航、antd）
- [迷你按钮](/v/button-025/) — 小尺寸按钮（按钮、迷你、紧凑、扁平）
- [渐变边框按钮](/v/button-026/) — 彩色描边按钮（按钮、渐变、潮流、GitHub）
- [绿色成功按钮](/v/button-027/) — 确认通过按钮（按钮、成功、绿色、Linear）
- [文字链接按钮](/v/button-028/) — 链接样式按钮（按钮、链接、文字、极简）
- [方形按钮](/v/button-029/) — 直角按钮（按钮、方形、复古、Linear）
- [悬浮添加按钮](/v/button-030/) — FAB 深色按钮（按钮、FAB、悬浮、Notion）
- [可加载提交按钮](/v/button-031/) — 点击进入加载态（按钮、交互、加载、Linear）
- [可切换分段按钮](/v/button-032/) — 按钮组单选（按钮、交互、分段、antd）
- [数字步进器](/v/button-033/) — 加减按钮增减（按钮、交互、步进器、antd）

### 表单输入（form，36 个）

- [shadcn/ui 输入框](/v/form-001/) — 白底灰边框，focus 黑边框。（桌面端、极简、shadcn、Material）
- [Linear 命令面板输入（⌘K）](/v/form-002/) — 居中悬浮、大圆角、带快捷键提示。（桌面端、快捷键、Linear、Material）
- [iOS 搜索框](/v/form-003/) — 圆角胶囊、浅灰底、放大镜图标。（移动端、iOS、搜索、Material）
- [登录表单](/v/form-004/) — 邮箱 + 密码 + 提交按钮，垂直排列。（桌面端、认证、表单、antd）
- [开关 Toggle](/v/form-005/) — iOS 风格绿色滑块。（移动端、开关、iOS、antd）
- [复选框](/v/form-006/) — 带勾选框 + 标签，支持半选态。（桌面端、多选、表单、antd）
- [下拉选择](/v/form-007/) — 带下拉箭头、可选中。（桌面端、选择、表单、antd）
- [多行文本域](/v/form-008/) — 带 resize 手柄、自动高度感。（桌面端、文本、表单、antd）
- [搜索框](/v/form-009/) — 带按钮搜索框（搜索、输入框、通用、Vercel）
- [登录表单](/v/form-010/) — 账号密码登录（登录、表单、认证、扁平）
- [短信验证码](/v/form-011/) — 带发送按钮（手机、验证码、移动端、扁平）
- [多行文本框](/v/form-012/) — textarea（文本、多行、输入、暗黑模式）
- [单选按钮组](/v/form-013/) — Radio 单选（表单、单选、antd、扁平）
- [复选框组](/v/form-014/) — Checkbox 多选（表单、多选、antd、极简）
- [开关 Switch](/v/form-015/) — 开关切换（表单、开关、iOS、Vercel）
- [下拉选择器](/v/form-016/) — Select 下拉（表单、下拉、选择、antd）
- [数字输入框](/v/form-017/) — 带加减按钮（表单、数字、步进、antd）
- [标签输入框](/v/form-018/) — 多选标签（表单、标签、多选、antd）
- [星级评分](/v/form-019/) — Rating 评分（表单、评分、星级、antd）
- [滑块输入](/v/form-020/) — Range 滑杆（表单、滑块、范围、暗黑模式）
- [密码可见切换](/v/form-021/) — 带眼睛图标输入（表单、密码、输入、Notion）
- [带前缀标签输入框](/v/form-022/) — 前缀图标输入（表单、输入框、前缀、Stripe）
- [选择器下拉](/v/form-023/) — 表单 Select（表单、下拉、选择、小红书）
- [日期输入框](/v/form-024/) — 日期选择输入（表单、日期、输入、极简）
- [开关组设置项](/v/form-025/) — 多行开关表单（表单、开关、设置、极简）
- [单选按钮卡片组](/v/form-026/) — 选项卡片单选（表单、单选、卡片、antd）
- [表单错误状态](/v/form-027/) — 红色校验输入（表单、错误、校验、Stripe）
- [表单成功状态](/v/form-028/) — 绿色校验输入（表单、成功、校验、扁平）
- [多列注册表单](/v/form-029/) — 两列信息表单（表单、注册、多列、极简）
- [富文本编辑器占位](/v/form-030/) — 编辑工具栏（表单、编辑器、文本、新拟态）
- [可拨动开关组](/v/form-031/) — Switch 点击切换（表单、交互、开关、iOS）
- [可点选单选框](/v/form-032/) — Radio 单选交互（表单、交互、单选、antd）
- [可勾选复选框](/v/form-033/) — Checkbox 多选交互（表单、交互、多选、扁平）
- [可点击星级评分](/v/form-034/) — Rating 交互（表单、交互、评分、Tailwind）
- [可拖动滑块](/v/form-035/) — Range 滑杆交互（表单、交互、滑块、antd）
- [表单校验反馈](/v/form-036/) — 提交时红框提示（表单、交互、校验、antd）

### 日期日历（calendar，23 个）

- [月历组件](/v/calendar-001/) — 标准月历、日期格子。（桌面端、日期、日历、antd）
- [日期范围选择](/v/calendar-002/) — 开始日期到结束日期高亮。（桌面端、日期、范围、antd）
- [移动端日期选择](/v/calendar-003/) — 底部滚轮选择。（移动端、日期、滚轮、antd）
- [日历带事件标记](/v/calendar-004/) — 日期下方小圆点标记事件。（日历、事件、提醒、antd）
- [月历视图](/v/calendar-005/) — 标准月日历（Calendar、日历、月历、Linear）
- [日程日历](/v/calendar-006/) — 带事件标记（Calendar、日程、事件、暗黑模式）
- [日期选择器](/v/calendar-007/) — 弹出日期面板（Calendar、选择、日期、antd）
- [周日历](/v/calendar-008/) — 周视图安排（Calendar、周视图、安排、扁平）
- [日期范围选择](/v/calendar-009/) — 双月范围面板（Calendar、范围、选择、antd）
- [迷你日历](/v/calendar-010/) — 小尺寸月历（Calendar、迷你、小组件、Vercel）
- [标准月历视图](/v/calendar-011/) — 月日历网格（Calendar、日历、月历、新拟态）
- [日程事件日历](/v/calendar-012/) — 日期内事件标记（Calendar、日程、事件、新拟态）
- [日期选择器](/v/calendar-013/) — 弹出日期面板（Calendar、选择、日期、Tailwind）
- [周日历视图](/v/calendar-014/) — 周安排网格（Calendar、周视图、安排、玻璃拟态）
- [日期范围选择](/v/calendar-015/) — 开始结束日期（Calendar、范围、选择、Tailwind）
- [迷你日历小组件](/v/calendar-016/) — 小尺寸月历（Calendar、迷你、小组件、Linear）
- [节日标记日历](/v/calendar-017/) — 节假日标注（Calendar、节日、标记、暗黑模式）
- [待办日程列表](/v/calendar-018/) — 日历旁待办（Calendar、待办、日程、玻璃拟态）
- [月份切换器](/v/calendar-019/) — 年月选择（Calendar、月份、切换、Tailwind）
- [可点选日期](/v/calendar-020/) — 点击日期高亮（Calendar、交互、日期、极简）
- [月历事件标记](/v/calendar-021/) — 日期内彩色事件（Calendar、事件、月历、antd）
- [迷你日历组件](/v/calendar-022/) — 小尺寸月历（Calendar、迷你、小组件、antd）
- [今日日程列表](/v/calendar-023/) — 按时间排列日程（Calendar、日程、列表、Linear）

### 下拉框（dropdown，25 个）

- [shadcn/ui 下拉菜单](/v/dropdown-001/) — 触发按钮 + 垂直菜单、分割线。（桌面端、菜单、shadcn、antd）
- [下拉选择框](/v/dropdown-002/) — 带选中值、可清空。（表单、选择、下拉、antd）
- [级联下拉](/v/dropdown-003/) — 鼠标移入二级展开。（桌面端、多级、菜单、antd）
- [移动端底部 Action Sheet](/v/dropdown-004/) — 从底部弹出、多选项。（移动端、菜单、底部、antd）
- [基础下拉菜单](/v/dropdown-005/) — 点击展开菜单（Dropdown、下拉、菜单、极简）
- [分组下拉](/v/dropdown-006/) — 菜单分组（Dropdown、分组、菜单、扁平）
- [搜索下拉](/v/dropdown-007/) — 可搜索下拉（Dropdown、搜索、选择、Tailwind）
- [级联下拉](/v/dropdown-008/) — 多层级联动（Dropdown、级联、联动、玻璃拟态）
- [头像下拉菜单](/v/dropdown-009/) — 用户菜单（Dropdown、用户、菜单、Material）
- [更多操作菜单](/v/dropdown-010/) — 三点更多（Dropdown、更多、操作、Linear）
- [基础操作下拉](/v/dropdown-011/) — 点击展开菜单（Dropdown、下拉、菜单、暗黑模式）
- [分组下拉菜单](/v/dropdown-012/) — 菜单分组标题（Dropdown、分组、菜单、扁平）
- [可搜索下拉](/v/dropdown-013/) — 输入过滤选项（Dropdown、搜索、选择、暗黑模式）
- [级联联动下拉](/v/dropdown-014/) — 多层级选择（Dropdown、级联、联动、Linear）
- [头像用户菜单](/v/dropdown-015/) — 账号下拉（Dropdown、用户、菜单、极简）
- [更多操作菜单](/v/dropdown-016/) — 三点更多（Dropdown、更多、操作、小红书）
- [带图标菜单项](/v/dropdown-017/) — 图标+文字菜单（Dropdown、图标、菜单、antd）
- [选项勾选下拉](/v/dropdown-018/) — 菜单项带勾选（Dropdown、勾选、菜单、Vercel）
- [深色菜单浮层](/v/dropdown-019/) — 暗黑下拉（Dropdown、深色、菜单、玻璃拟态）
- [可展开操作菜单](/v/dropdown-020/) — 点击展开收起（Dropdown、交互、菜单、暗黑模式）
- [可展开用户菜单](/v/dropdown-021/) — 账号下拉交互（Dropdown、交互、用户、Tailwind）
- [带图标菜单项](/v/dropdown-022/) — 图标+文字菜单（Dropdown、图标、菜单、Vercel）
- [分组下拉菜单](/v/dropdown-023/) — 菜单分组标题（Dropdown、分组、菜单、极简）
- [可搜索下拉](/v/dropdown-024/) — 输入过滤选项（Dropdown、搜索、选择、Vercel）
- [级联联动下拉](/v/dropdown-025/) — 多层级选择（Dropdown、级联、联动、极简）

### 徽标 Badge（badge，23 个）

- [数字徽标](/v/badge-001/) — 红色圆点 + 数字。（通知、Badge、通用、antd）
- [状态标签](/v/badge-002/) — 彩色背景 + 文字。（状态、标签、通用、antd）
- [头像角标](/v/badge-003/) — 头像右下角在线状态。（头像、在线、社交、antd）
- [新品/热卖标签](/v/badge-004/) — 商品角标。（电商、商品、标签、antd）
- [数字徽标](/v/badge-005/) — 未读数角标（Badge、徽标、角标、Vercel）
- [圆点徽标](/v/badge-006/) — 状态小红点（Badge、圆点、状态、GitHub）
- [状态徽标](/v/badge-007/) — 文本状态标记（Badge、状态、文本、Material）
- [大数字徽标](/v/badge-008/) — 购物车数量（Badge、购物车、数量、极简）
- [计数徽标上限](/v/badge-009/) — 99+ 角标（Badge、计数、上限、扁平）
- [状态文字徽标](/v/badge-010/) — 文字徽章（Badge、文字、徽章、Vercel）
- [数字未读徽标](/v/badge-011/) — 消息角标（Badge、未读、角标、暗黑模式）
- [圆点状态徽标](/v/badge-012/) — 小红点提醒（Badge、圆点、状态、Linear）
- [在线状态标记](/v/badge-013/) — 彩色状态点（Badge、状态、在线、极简）
- [购物车数量徽标](/v/badge-014/) — 电商角标（Badge、购物车、数量、iOS）
- [99+ 上限徽标](/v/badge-015/) — 溢出计数（Badge、计数、上限、Vercel）
- [等级文字徽章](/v/badge-016/) — PRO/VIP 标记（Badge、文字、等级、暗黑模式）
- [头像状态角标](/v/badge-017/) — 头像在线点（Badge、头像、状态、antd）
- [计数统计徽标](/v/badge-018/) — 菜单项数量（Badge、计数、菜单、Linear）
- [轮廓徽章](/v/badge-019/) — 描边状态标记（Badge、轮廓、描边、GitHub）
- [可清除未读角标](/v/badge-020/) — 点击角标消失（Badge、交互、角标、iOS）
- [数字未读角标](/v/badge-021/) — 红色计数徽章（Badge、计数、antd、极简）
- [在线状态点](/v/badge-022/) — 彩色状态圆点（Badge、状态、圆点、极简）
- [文字等级徽标](/v/badge-023/) — 彩色文字标签（Badge、等级、文字、antd）

### 单选/复选（choice，24 个）

- [antd 单选框](/v/choice-001/) — 圆形单选。（表单、单选、antd、Material）
- [antd 复选框](/v/choice-002/) — 方形多选。（表单、复选、antd、Material）
- [移动端单选](/v/choice-003/) — 列表式单选。（移动端、单选、列表、antd）
- [开关 Switch](/v/choice-004/) — 拨动开关。（表单、开关、iOS、antd）
- [单选卡片](/v/choice-005/) — 可选选项卡（Choice、单选、卡片、Linear）
- [双列单选](/v/choice-006/) — 图标选项（Choice、图标、选择、Linear）
- [开关选择](/v/choice-007/) — Switch 选项（Choice、开关、选择、iOS）
- [星级选择](/v/choice-008/) — 评分选择器（Choice、评分、星级、antd）
- [九宫格选项](/v/choice-009/) — 图标网格选择（Choice、网格、选择、扁平）
- [价格档位选择](/v/choice-010/) — 月付/年付切换（Choice、价格、切换、Vercel）
- [单选卡片组](/v/choice-011/) — 可选方案卡片（Choice、单选、卡片、玻璃拟态）
- [图标双列选项](/v/choice-012/) — 图标+标题选项（Choice、图标、选择、iOS）
- [开关选择项](/v/choice-013/) — Switch 选项（Choice、开关、选择、Material）
- [星级评分选择](/v/choice-014/) — Rating 选择器（Choice、评分、星级、玻璃拟态）
- [九宫格选项](/v/choice-015/) — 图标网格选择（Choice、网格、选择、antd）
- [价格档位切换](/v/choice-016/) — 月付年付切换（Choice、价格、切换、GitHub）
- [复选框多选](/v/choice-017/) — Checkbox 选择（Choice、多选、复选、极简）
- [单选按钮组](/v/choice-018/) — Radio 选择（Choice、单选、按钮、Vercel）
- [颜色色块选择](/v/choice-019/) — 主题色选择（Choice、颜色、选择、GitHub）
- [可选方案卡片](/v/choice-020/) — 卡片单选交互（Choice、交互、卡片、扁平）
- [方案选择卡片](/v/choice-021/) — 三档方案单选（Choice、卡片、价格、极简）
- [图标双列选项](/v/choice-022/) — 图标+标题选项（Choice、图标、选择、antd）
- [主题色块选择](/v/choice-023/) — 圆形颜色单选（Choice、颜色、选择、Vercel）
- [数量与小计联动](/v/choice-024/) — 选档位更新金额（Choice、交互、价格、极简）

### 卡片（card，31 个）

- [Linear 任务卡片](/v/card-001/) — 白底、紧凑、左侧优先级条、标签。（桌面端、SaaS、Linear、小红书）
- [Notion 文档卡片](/v/card-002/) — 封面图 + 标题 + 描述 + 作者头像。（桌面端、文档、Notion、小红书）
- [Stripe 功能卡片](/v/card-003/) — 左侧图标 + 标题 + 描述，hover 阴影。（桌面端、官网、Stripe、antd）
- [小红书笔记卡片](/v/card-004/) — 竖图 + 标题 + 作者 + 点赞数。（移动端、内容、小红书、antd）
- [GitHub 仓库卡片](/v/card-005/) — 仓库名 + 描述 + 星标/语言。（桌面端、开发者、GitHub、antd）
- [统计数据卡片](/v/card-006/) — 大数字 + 标签 + 趋势箭头。（桌面端、Dashboard、数据、antd）
- [商品卡片](/v/card-007/) — 图 + 标题 + 价格 + 销量。（移动端、电商、商品、antd）
- [用户资料卡片](/v/card-008/) — 头像 + 名字 + 简介 + 操作按钮。（桌面端、社交、个人页、antd）
- [博客文章卡片](/v/card-009/) — 图文卡片（博客、文章、内容、暗黑模式）
- [商品卡片](/v/card-010/) — 电商商品卡（电商、商品、卡片、极简）
- [设置卡片](/v/card-011/) — 设置项卡片（设置、后台、列表、扁平）
- [统计卡片](/v/card-012/) — 数据统计卡（数据、统计、后台、玻璃拟态）
- [用户资料卡](/v/card-013/) — 个人名片（卡片、用户、名片、小红书）
- [功能特性卡](/v/card-014/) — 营销特性卡（卡片、特性、营销、Linear）
- [代码片段卡](/v/card-015/) — 代码展示卡（卡片、代码、开发者、极简）
- [评价卡片](/v/card-016/) — 用户 testimonial（卡片、评价、 testimonials、Material）
- [标签卡片](/v/card-017/) — 带标签封面卡（卡片、标签、内容、Vercel）
- [价格卡片](/v/card-018/) — 定价方案卡（卡片、价格、定价、Material）
- [小工具卡片](/v/card-019/) — 入口图标卡（卡片、入口、工具、Vercel）
- [通知卡片](/v/card-020/) — 消息通知卡（卡片、通知、消息、Stripe）
- [深色数据卡片](/v/card-021/) — 暗黑统计卡（卡片、深色、统计、暗黑模式）
- [列表条目卡片](/v/card-022/) — 可点击条目卡（卡片、列表、后台、iOS）
- [封面大图卡片](/v/card-023/) — 宽幅图文卡（卡片、封面、内容、Linear）
- [步骤引导卡片](/v/card-024/) — 新手引导卡（卡片、引导、新手、玻璃拟态）
- [图标特性网格卡](/v/card-025/) — 三列特性卡（卡片、特性、营销、Material）
- [商品详情卡](/v/card-026/) — 价格购买卡（卡片、商品、电商、Vercel）
- [评论卡片](/v/card-027/) — 用户评论卡（卡片、评论、社交、Tailwind）
- [空状态卡片](/v/card-028/) — 带插画空卡（卡片、空态、占位、玻璃拟态）
- [紧凑列表卡片](/v/card-029/) — 横向信息行（卡片、紧凑、列表、Linear）
- [玻璃拟态卡片](/v/card-030/) — 毛玻璃背景卡（卡片、玻璃拟态、潮流、新拟态）
- [可收藏卡片](/v/card-031/) — 心形收藏切换（Card、交互、收藏、iOS）

### 列表（list，23 个）

- [Linear 任务列表行](/v/list-001/) — 紧凑行、优先级条、标签、元信息。（桌面端、SaaS、Linear、小红书）
- [iOS 设置列表](/v/list-002/) — 图标 + 标题 + 右箭头。（移动端、iOS、设置、小红书）
- [聊天列表](/v/list-003/) — 头像 + 名字 + 最后消息 + 时间。（移动端、社交、聊天、antd）
- [通知列表](/v/list-004/) — 图标 + 标题 + 描述 + 时间。（移动端、通知、列表、antd）
- [聊天列表](/v/list-005/) — 消息列表（列表、聊天、社交、极简）
- [设置列表](/v/list-006/) — iOS 设置项（列表、设置、iOS、antd）
- [文件列表](/v/list-007/) — 文件管理列表（列表、文件、GitHub、小红书）
- [搜索历史](/v/list-008/) — 搜索记录（列表、搜索、历史、Material）
- [横向卡片列表](/v/list-009/) — 横向滚动卡片（List、横向、卡片、Notion）
- [带图标的列表项](/v/list-010/) — 图标 + 文字列表（List、图标、列表、暗黑模式）
- [聊天消息列表](/v/list-011/) — 会话列表（List、聊天、社交、新拟态）
- [设置列表](/v/list-012/) — iOS 设置项（List、设置、iOS、antd）
- [文件列表](/v/list-013/) — 文件管理行（List、文件、GitHub、Vercel）
- [搜索历史标签](/v/list-014/) — 历史记录云（List、搜索、历史、玻璃拟态）
- [带图标条目列表](/v/list-015/) — 图标信息行（List、图标、列表、Tailwind）
- [横向卡片列表](/v/list-016/) — 横向滚动卡（List、横向、卡片、GitHub）
- [紧凑信息行列表](/v/list-017/) — 左右对齐行（List、紧凑、信息、Notion）
- [评论列表](/v/list-018/) — 楼中楼评论（List、评论、社交、扁平）
- [步骤进度列表](/v/list-019/) — 状态时间线（List、步骤、时间线、Linear）
- [可选中列表](/v/list-020/) — 点击条目高亮（List、交互、选中、Vercel）
- [图文列表](/v/list-021/) — 左图右文（List、图文、移动端、扁平）
- [分隔线列表](/v/list-022/) — 纵向条目分割（List、分隔线、极简、Tailwind）
- [双列卡片列表](/v/list-023/) — 网格卡片条目（List、网格、卡片、antd）

### 筛选面板（filter，23 个）

- [移动端多层菜单筛选面板](/v/filter-001/) — 电商/内容 App 标配：左侧一级分类 tab，右侧二级选项网格，底部确定/重置。（移动端、电商、筛选、抽屉）
- [顶部筛选栏](/v/filter-002/) — 列表顶部筛选（Filter、筛选、列表、暗黑模式）
- [侧边筛选面板](/v/filter-003/) — 左侧筛选条件（Filter、侧边、面板、Notion）
- [价格区间筛选](/v/filter-004/) — 价格滑块筛选（Filter、价格、区间、小红书）
- [标签筛选](/v/filter-005/) — 标签云筛选（Filter、标签、云、Vercel）
- [多选筛选面板](/v/filter-006/) — 复选框条件筛选（Filter、多选、面板、暗黑模式）
- [排序选择](/v/filter-007/) — 排序方式下拉（Filter、排序、选择、暗黑模式）
- [已选条件标签](/v/filter-008/) — 筛选条件回显（Filter、标签、回显、antd）
- [折叠筛选器](/v/filter-009/) — 高级筛选折叠（Filter、折叠、高级、玻璃拟态）
- [搜索建议筛选](/v/filter-010/) — 输入联想筛选（Filter、联想、搜索、Notion）
- [顶部筛选条](/v/filter-011/) — 下拉+搜索横排（Filter、顶部、搜索、GitHub）
- [侧边条件面板](/v/filter-012/) — 左侧筛选列表（Filter、侧边、面板、GitHub）
- [价格区间输入](/v/filter-013/) — 最低最高价格（Filter、价格、区间、Stripe）
- [标签云筛选](/v/filter-014/) — 标签点选过滤（Filter、标签、云、Tailwind）
- [多选复选面板](/v/filter-015/) — 复选条件多选（Filter、多选、复选、Vercel）
- [已选条件回显](/v/filter-016/) — 条件标签可删（Filter、回显、标签、Material）
- [排序方式选择](/v/filter-017/) — 排序下拉切换（Filter、排序、选择、小红书）
- [高级筛选折叠](/v/filter-018/) — 折叠展开条件（Filter、折叠、高级、扁平）
- [搜索建议过滤](/v/filter-019/) — 输入联想结果（Filter、联想、搜索、Linear）
- [可重置筛选条件](/v/filter-020/) — 选项单选与重置（Filter、交互、筛选、暗黑模式）
- [侧边筛选面板](/v/filter-021/) — 多组筛选条件（Filter、面板、后台、iOS）
- [标签条件筛选](/v/filter-022/) — 多选标签条件（Filter、标签、筛选、antd）
- [价格范围筛选](/v/filter-023/) — 双输入区间（Filter、范围、电商、Vercel）

## 反馈与弹层

### 弹窗/抽屉（modal，25 个）

- [shadcn/ui 对话框](/v/modal-001/) — 居中卡片、标题、描述、操作按钮。（桌面端、弹窗、shadcn、antd）
- [iOS 底部抽屉](/v/modal-002/) — 从底部滑出、圆角顶部、拖拽指示条。（移动端、iOS、抽屉、antd）
- [居中确认弹窗](/v/modal-003/) — 标题 + 图标 + 按钮。（移动端、确认、弹窗、antd）
- [侧边滑出抽屉](/v/modal-004/) — 从右侧滑出、全高。（桌面端、抽屉、后台、antd）
- [确认删除弹窗](/v/modal-005/) — 危险操作确认（弹窗、确认、删除、antd）
- [表单弹窗](/v/modal-006/) — 带输入框弹窗（弹窗、表单、编辑、Linear）
- [分享弹窗](/v/modal-007/) — 多渠道分享（弹窗、分享、移动端、扁平）
- [图片预览弹窗](/v/modal-008/) — 大图预览（弹窗、图片、预览、antd）
- [大图预览弹窗](/v/modal-009/) — 图片灯箱（Modal、图片、灯箱、Material）
- [抽屉弹窗](/v/modal-010/) — 右侧滑出面板（Modal、抽屉、面板、iOS）
- [基础居中弹窗](/v/modal-011/) — 默认对话框（Modal、弹窗、antd、Linear）
- [危险确认弹窗](/v/modal-012/) — 删除二次确认（Modal、确认、危险、GitHub）
- [表单编辑弹窗](/v/modal-013/) — 带输入字段（Modal、表单、编辑、antd）
- [底部分享面板](/v/modal-014/) — App 分享抽屉（Modal、分享、移动端、暗黑模式）
- [图片灯箱弹窗](/v/modal-015/) — 大图预览（Modal、图片、灯箱、Vercel）
- [右侧抽屉弹窗](/v/modal-016/) — 滑出侧边面板（Modal、抽屉、面板、Stripe）
- [消息通知弹窗](/v/modal-017/) — 公告横幅弹窗（Modal、通知、公告、Linear）
- [小尺寸提示弹窗](/v/modal-018/) — 轻量确认框（Modal、轻量、提示、Notion）
- [全屏模态弹窗](/v/modal-019/) — 占据整屏弹层（Modal、全屏、移动端、Notion）
- [可关闭提示弹窗](/v/modal-020/) — 点击遮罩关闭（Modal、交互、关闭、antd）
- [可开关侧边抽屉](/v/modal-021/) — 按钮打开遮罩关闭（Modal、交互、抽屉、iOS）
- [确认对话框](/v/modal-022/) — 危险操作确认（Modal、确认、危险、Vercel）
- [表单弹窗](/v/modal-023/) — 弹窗内嵌表单（Modal、表单、弹窗、Tailwind）
- [信息提示弹窗](/v/modal-024/) — 只读结果展示（Modal、信息、提示、极简）
- [大图预览弹窗](/v/modal-025/) — 灯箱预览（Modal、灯箱、预览、Tailwind）

### Toast/提示（toast，23 个）

- [shadcn/ui Toast](/v/toast-001/) — 右下角卡片、图标 + 标题 + 描述。（桌面端、提示、shadcn、antd）
- [iOS 顶部通知横幅](/v/toast-002/) — 从顶部滑下、毛玻璃。（移动端、iOS、通知、antd）
- [成功提示](/v/toast-003/) — 居中浮层、绿色对勾。（交互、成功、提示、antd）
- [错误提示](/v/toast-004/) — 红色、带警告图标。（交互、错误、提示、antd）
- [成功提示](/v/toast-005/) — 绿色成功 Toast（Toast、成功、反馈、Material）
- [错误提示](/v/toast-006/) — 红色错误 Toast（Toast、错误、反馈、极简）
- [加载中 Toast](/v/toast-007/) — 带加载动画（Toast、加载、反馈、小红书）
- [顶部通知条](/v/toast-008/) — 顶部滑入提示（Toast、通知、顶部、antd）
- [顶部滑入通知](/v/toast-009/) — 顶部横幅 Toast（Toast、顶部、通知、新拟态）
- [居中纯文字 Toast](/v/toast-010/) — 极简黑底 Toast（Toast、居中、极简、扁平）
- [成功提示 Toast](/v/toast-011/) — 绿色成功反馈（Toast、成功、反馈、新拟态）
- [错误提示 Toast](/v/toast-012/) — 红色错误反馈（Toast、错误、反馈、antd）
- [警告提示 Toast](/v/toast-013/) — 黄色警告反馈（Toast、警告、反馈、GitHub）
- [信息提示 Toast](/v/toast-014/) — 蓝色信息反馈（Toast、信息、反馈、antd）
- [居中黑底 Toast](/v/toast-015/) — 极简纯文字提示（Toast、居中、极简、Material）
- [顶部滑入通知](/v/toast-016/) — 横幅通知条（Toast、顶部、通知、Stripe）
- [加载中 Toast](/v/toast-017/) — 带转圈提示（Toast、加载、反馈、Stripe）
- [可关闭通知条](/v/toast-018/) — 带关闭按钮（Toast、关闭、通知、小红书）
- [底部操作反馈](/v/toast-019/) — App 底部 Toast（Toast、底部、移动端、antd）
- [触发式轻提示](/v/toast-020/) — 点击弹出自动消失（Toast、交互、提示、antd）
- [成功短提示](/v/toast-021/) — 顶部黑色 Toast（Toast、成功、iOS、antd）
- [错误 Toast](/v/toast-022/) — 红色错误浮层（Toast、错误、反馈、iOS）
- [加载中 Toast](/v/toast-023/) — 转圈等待提示（Toast、加载、反馈、antd）

### 气泡 Popover（popover，23 个）

- [shadcn/ui Popover](/v/popover-001/) — hover 弹出、带小箭头。（桌面端、气泡、shadcn、antd）
- [用户名片气泡](/v/popover-002/) — hover 用户头像弹出资料卡。（社交、用户、气泡、shadcn）
- [提示气泡（Tooltip）](/v/popover-003/) — 纯文字、小号、深色底。（提示、Tooltip、通用、shadcn）
- [移动端分享气泡](/v/popover-004/) — hover 按钮弹出分享选项。（移动端、分享、气泡、shadcn）
- [文字气泡](/v/popover-005/) — Hover 提示气泡（Popover、气泡、提示、暗黑模式）
- [卡片气泡](/v/popover-006/) — 带标题内容气泡（Popover、卡片、气泡、Linear）
- [确认气泡](/v/popover-007/) — 气泡内确认操作（Popover、确认、气泡、玻璃拟态）
- [用户名片气泡](/v/popover-008/) — 悬停用户头像卡片（Popover、用户、名片、iOS）
- [输入框提示气泡](/v/popover-009/) — 表单校验气泡（Popover、校验、表单、极简）
- [图表悬浮提示](/v/popover-010/) — Hover 数据卡（Popover、图表、悬浮、Linear）
- [文字气泡提示](/v/popover-011/) — Hover Tooltip（Popover、气泡、提示、iOS）
- [卡片气泡](/v/popover-012/) — 标题内容气泡卡（Popover、卡片、气泡、Notion）
- [确认操作气泡](/v/popover-013/) — 气泡内确认（Popover、确认、气泡、Tailwind）
- [用户名片气泡](/v/popover-014/) — 头像悬停卡片（Popover、用户、名片、antd）
- [表单校验气泡](/v/popover-015/) — 错误提示气泡（Popover、校验、表单、Vercel）
- [图表悬浮提示](/v/popover-016/) — 数据悬浮卡（Popover、图表、悬浮、小红书）
- [快捷操作气泡](/v/popover-017/) — 悬浮快捷菜单（Popover、操作、菜单、玻璃拟态）
- [深色浮层气泡](/v/popover-018/) — 暗色提示层（Popover、深色、提示、antd）
- [说明文案气泡](/v/popover-019/) — 字段帮助说明（Popover、说明、帮助、新拟态）
- [可开关气泡说明](/v/popover-020/) — 点击显示隐藏气泡（Popover、交互、气泡、暗黑模式）
- [卡片式气泡](/v/popover-021/) — 图文说明气泡（Popover、卡片、说明、Linear）
- [确认操作气泡](/v/popover-022/) — 气泡内确认按钮（Popover、确认、操作、扁平）
- [列表选项气泡](/v/popover-023/) — 气泡内菜单列表（Popover、菜单、列表、Vercel）

### 警告提示（alert，23 个）

- [antd 警告提示](/v/alert-001/) — 四种类型提示。（桌面端、Alert、antd、iOS）
- [带图标警告](/v/alert-002/) — 带图标和关闭按钮。（桌面端、Alert、图标、antd）
- [顶部通知条](/v/alert-003/) — 全宽顶部提示。（桌面端、通知、顶部、antd）
- [表单验证提示](/v/alert-004/) — 输入框下方错误提示。（表单、错误、验证、antd）
- [信息提示条](/v/alert-005/) — 蓝色 Info Alert（Alert、信息、提示、Stripe）
- [警告提示条](/v/alert-006/) — 黄色 Warning（Alert、警告、提示、antd）
- [成功提示条](/v/alert-007/) — 绿色 Success（Alert、成功、提示、Vercel）
- [错误提示条](/v/alert-008/) — 红色 Error（Alert、错误、提示、Material）
- [可关闭提示条](/v/alert-009/) — 带关闭按钮（Alert、关闭、提示、暗黑模式）
- [行内提示](/v/alert-010/) — 嵌入表单提示（Alert、行内、表单、扁平）
- [信息提示条](/v/alert-011/) — 蓝色 Info（Alert、信息、提示、Vercel）
- [警告提示条](/v/alert-012/) — 黄色 Warning（Alert、警告、提示、极简）
- [成功提示条](/v/alert-013/) — 绿色 Success（Alert、成功、提示、玻璃拟态）
- [错误提示条](/v/alert-014/) — 红色 Error（Alert、错误、提示、Vercel）
- [可关闭提示条](/v/alert-015/) — 带关闭按钮（Alert、关闭、提示、极简）
- [行内校验提示](/v/alert-016/) — 表单下方文字（Alert、行内、表单、antd）
- [顶部公告条](/v/alert-017/) — 网站公告横幅（Alert、公告、横幅、antd）
- [无描述简洁提示](/v/alert-018/) — 单行短提示（Alert、简洁、单行、扁平）
- [深色警示条](/v/alert-019/) — 暗底警告横幅（Alert、深色、警示、极简）
- [可关闭警告条](/v/alert-020/) — 点击叉号收起（Alert、交互、关闭、暗黑模式）
- [成功反馈条](/v/alert-021/) — 绿色成功提示（Alert、成功、antd、极简）
- [错误反馈条](/v/alert-022/) — 红色错误提示（Alert、错误、antd、Tailwind）
- [信息提示条](/v/alert-023/) — 蓝色说明提示（Alert、信息、antd、iOS）

### 进度条（progress，24 个）

- [antd 进度条](/v/progress-001/) — 线性进度条。（桌面端、进度、antd、iOS）
- [环形进度](/v/progress-002/) — 圆形进度环。（桌面端、进度、环形、antd）
- [上传进度](/v/progress-003/) — 带文件信息和速度。（上传、进度、文件、antd）
- [步骤进度](/v/progress-004/) — 带状态标记。（进度、状态、任务、antd）
- [线性进度条](/v/progress-005/) — 基础 Progress（Progress、进度、antd、极简）
- [环形进度](/v/progress-006/) — Circular 圆环（Progress、环形、数据、小红书）
- [步骤进度](/v/progress-007/) — 分阶段进度（Progress、步骤、流程、Tailwind）
- [彩色渐变进度](/v/progress-008/) — 渐变色进度条（Progress、渐变、潮流、antd）
- [迷你进度条](/v/progress-009/) — 细线进度（Progress、迷你、轻量、扁平）
- [分步彩色进度](/v/progress-010/) — 多色进度条（Progress、多色、进度、antd）
- [不确定进度](/v/progress-011/) — indeterminate 流光（Progress、动画、加载、Vercel）
- [线性进度条](/v/progress-012/) — 基础 Progress（Progress、进度、antd、玻璃拟态）
- [环形进度](/v/progress-013/) — 圆环 Circular（Progress、环形、数据、新拟态）
- [分步阶段进度](/v/progress-014/) — 分段阶段条（Progress、步骤、流程、Tailwind）
- [渐变进度条](/v/progress-015/) — 彩色渐变条（Progress、渐变、潮流、Vercel）
- [迷你细线进度](/v/progress-016/) — 监控迷你条（Progress、迷你、轻量、扁平）
- [多色分段进度](/v/progress-017/) — 多段彩色条（Progress、多色、进度、Vercel）
- [不确定流光条](/v/progress-018/) — indeterminate（Progress、动画、加载、Tailwind）
- [仪表盘进度](/v/progress-019/) — 半圆仪表（Progress、仪表盘、半圆、GitHub）
- [带状态文案进度](/v/progress-020/) — 进度+状态说明（Progress、文案、状态、Vercel）
- [可推进进度条](/v/progress-021/) — 按钮累加进度（Progress、交互、进度、扁平）
- [双色分段进度](/v/progress-022/) — 已完成/进行中（Progress、分段、双色、antd）
- [环形百分比](/v/progress-023/) — 圆环进度（Progress、环形、数据、antd）
- [文字描述进度](/v/progress-024/) — 标题+百分比+条（Progress、文案、后台、antd）

### 加载态/空态（loading，23 个）

- [Linear 骨架屏](/v/loading-001/) — 灰条占位、模拟内容结构。（桌面端、骨架屏、Linear、Vercel）
- [iOS 菊花](/v/loading-002/) — 旋转圆圈。（移动端、加载、iOS、Linear）
- [空状态](/v/loading-003/) — 插画 + 标题 + 描述 + 操作按钮。（空态、引导、通用、Linear）
- [按钮加载态](/v/loading-004/) — 按钮内 spinner。（交互、按钮、加载、Linear）
- [骨架屏](/v/loading-005/) — 内容加载骨架（加载、骨架屏、antd、iOS）
- [按钮加载](/v/loading-006/) — 按钮 loading 状态（加载、按钮、状态、小红书）
- [空状态](/v/loading-007/) — 无数据空态（空态、空数据、反馈、Vercel）
- [页面加载](/v/loading-008/) — 全屏加载（加载、全屏、页面、玻璃拟态）
- [全屏加载遮罩](/v/loading-009/) — 页面加载遮罩（Loading、全屏、遮罩、Vercel）
- [点阵加载](/v/loading-010/) — 跳动圆点动画（Loading、点阵、动画、Notion）
- [基础转圈加载](/v/loading-011/) — Spinner 加载（Loading、转圈、基础、Vercel）
- [骨架屏加载](/v/loading-012/) — 内容占位骨架（Loading、骨架屏、内容、antd）
- [全屏加载遮罩](/v/loading-013/) — 页面加载遮罩（Loading、全屏、遮罩、Tailwind）
- [按钮加载态](/v/loading-014/) — 按钮内 spinner（Loading、按钮、状态、Material）
- [空数据状态](/v/loading-015/) — 空态占位插画（Loading、空态、占位、Vercel）
- [点阵跳动加载](/v/loading-016/) — 三个跳动圆点（Loading、点阵、动画、Notion）
- [进度条加载](/v/loading-017/) — 顶部加载条（Loading、进度条、顶部、极简）
- [表格加载骨架](/v/loading-018/) — 行骨架占位（Loading、表格、骨架、玻璃拟态）
- [错误重试状态](/v/loading-019/) — 加载失败空态（Loading、错误、重试、Tailwind）
- [可切换加载态](/v/loading-020/) — 骨架与内容切换（Loading、交互、骨架屏、Vercel）
- [全屏转圈加载](/v/loading-021/) — 居中 Spinner（Loading、转圈、极简、Tailwind）
- [按钮内加载态](/v/loading-022/) — 按钮内嵌 Spinner（Loading、按钮、antd、iOS）
- [卡片骨架屏](/v/loading-023/) — 内容占位骨架（Loading、骨架屏、列表、Linear）

## 数据展示

### 表格（table，25 个）

- [GitHub 风格表格](/v/table-001/) — 斑马纹、悬浮高亮。（桌面端、开发者、表格、antd）
- [数据表格](/v/table-002/) — 带排序、操作列。（桌面端、后台、数据、antd）
- [简单键值表](/v/table-003/) — 左标签右值。（详情、通用、表格、antd）
- [移动端卡片列表](/v/table-004/) — 每行一张卡片。（移动端、列表、表格、antd）
- [简洁表格](/v/table-005/) — 基础数据表格（表格、数据、antd、暗黑模式）
- [带操作列表格](/v/table-006/) — 带编辑删除（表格、操作、后台、antd）
- [移动端表格](/v/table-007/) — 卡片式列表（表格、移动端、列表、iOS）
- [空表格](/v/table-008/) — 无数据空表格（表格、空态、空数据、antd）
- [斑马纹表格](/v/table-009/) — 交替行底色（Table、斑马纹、数据、Tailwind）
- [可勾选表格](/v/table-010/) — 带复选框行（Table、勾选、选择、GitHub）
- [基础数据表格](/v/table-011/) — 简洁列表格（Table、数据、antd、暗黑模式）
- [带操作列表格](/v/table-012/) — 编辑删除操作（Table、操作、后台、暗黑模式）
- [斑马纹表格](/v/table-013/) — 交替行底色（Table、斑马纹、数据、antd）
- [可勾选表格](/v/table-014/) — 行复选批量选（Table、勾选、选择、GitHub）
- [移动端卡片列表](/v/table-015/) — 卡片式行（Table、移动端、列表、极简）
- [空数据表格](/v/table-016/) — 无数据占位（Table、空态、空数据、Linear）
- [数值对齐表格](/v/table-017/) — 金额右对齐（Table、数值、对齐、Linear）
- [缩略图表格](/v/table-018/) — 带头像/图标的行（Table、缩略图、列表、Vercel）
- [可展开行表格](/v/table-019/) — 行内展开详情（Table、展开、详情、Notion）
- [可选中数据行](/v/table-020/) — 点击行高亮（Table、交互、选中、暗黑模式）
- [斑马纹表格](/v/table-021/) — 隔行底色（Table、斑马纹、后台、Linear）
- [紧凑数据表格](/v/table-022/) — 高密度行（Table、紧凑、后台、扁平）
- [带操作列表格](/v/table-023/) — 行内操作按钮（Table、操作、后台、极简）
- [可排序数据表](/v/table-024/) — 点表头升降序（Table、交互、排序、Tailwind）
- [可搜索过滤表](/v/table-025/) — 输入关键字过滤行（Table、交互、筛选、扁平）

### 图表（chart，23 个）

- [柱状图](/v/chart-001/) — 简单垂直柱状图。（数据、图表、柱状、Linear）
- [折线图](/v/chart-002/) — 趋势线。（数据、图表、折线、Linear）
- [环形进度](/v/chart-003/) — 圆形百分比。（数据、进度、环形、Linear）
- [数据看板布局](/v/chart-004/) — 多指标卡片 + 图表。（Dashboard、数据、布局、Linear）
- [柱状图](/v/chart-005/) — 简单柱状图（图表、柱状图、数据、Linear）
- [折线图](/v/chart-006/) — 趋势折线图（图表、折线图、趋势、暗黑模式）
- [饼图](/v/chart-007/) — 简单饼图（图表、饼图、占比、玻璃拟态）
- [仪表盘](/v/chart-008/) — 完成率仪表盘（图表、仪表盘、进度、Vercel）
- [面积折线图](/v/chart-009/) — 带填充面积（Chart、面积图、趋势、iOS）
- [横向条形图](/v/chart-010/) — 横向进度条式（Chart、条形图、对比、小红书）
- [基础柱状图](/v/chart-011/) — 简单柱形对比（Chart、柱状图、数据、Linear）
- [折线趋势图](/v/chart-012/) — 走势折线（Chart、折线图、趋势、GitHub）
- [面积折线图](/v/chart-013/) — 填充面积趋势（Chart、面积图、趋势、Linear）
- [环形进度图](/v/chart-014/) — 圆环占比（Chart、环形、占比、Stripe）
- [饼图占比](/v/chart-015/) — 多色饼图（Chart、饼图、占比、极简）
- [横向条形图](/v/chart-016/) — 类别对比条（Chart、条形图、对比、Notion）
- [仪表盘](/v/chart-017/) — 完成率仪表（Chart、仪表盘、进度、极简）
- [多系列折线图](/v/chart-018/) — 双线对比（Chart、折线图、多系列、antd）
- [迷你趋势图](/v/chart-019/) — 内嵌 sparkline（Chart、迷你、趋势、新拟态）
- [可点图例显隐](/v/chart-020/) — 点击图例隐藏系列（Chart、交互、图例、极简）
- [柱状图](/v/chart-021/) — 纵向柱形对比（Chart、柱状图、数据、antd）
- [折线趋势图](/v/chart-022/) — SVG 折线走势（Chart、折线图、趋势、Tailwind）
- [环形占比图](/v/chart-023/) — 甜甜圈分类占比（Chart、环形图、占比、Linear）

### 头像/标签（avatar，23 个）

- [用户头像](/v/avatar-001/) — 圆形、带状态点。（用户、头像、社交、antd）
- [头像组](/v/avatar-002/) — 多个头像重叠。（团队、头像、社交、antd）
- [标签 Badge](/v/avatar-003/) — 小标签、彩色。（标签、Badge、通用、antd）
- [头像下拉](/v/avatar-004/) — 头像 + 名字 + 下拉箭头。（用户、导航、后台、antd）
- [大头像](/v/avatar-005/) — 个人中心大头像（头像、个人页、用户、Material）
- [头像组](/v/avatar-006/) — 多人头像堆叠（头像、团队、多人、Linear）
- [字母头像](/v/avatar-007/) — 文字占位头像（头像、占位、默认、iOS）
- [头像带在线状态](/v/avatar-008/) — 带在线状态点（头像、在线、状态、玻璃拟态）
- [图片头像](/v/avatar-009/) — 真实图片头像（Avatar、图片、用户、antd）
- [方形头像](/v/avatar-010/) — 圆角方形头像（Avatar、方形、卡片、暗黑模式）
- [大头像资料卡](/v/avatar-011/) — 个人中心头像（Avatar、个人页、用户、Linear）
- [头像组堆叠](/v/avatar-012/) — 多人头像叠放（Avatar、团队、多人、antd）
- [字母占位头像](/v/avatar-013/) — 文字首字母（Avatar、占位、默认、antd）
- [在线状态头像](/v/avatar-014/) — 带状态点（Avatar、在线、状态、iOS）
- [方形头像](/v/avatar-015/) — 圆角方形头像（Avatar、方形、卡片、Vercel）
- [图片头像](/v/avatar-016/) — 真实图片裁剪（Avatar、图片、用户、Stripe）
- [大小尺寸头像](/v/avatar-017/) — 多规格头像（Avatar、尺寸、规格、GitHub）
- [文字带头像名单](/v/avatar-018/) — 头像+名字列表（Avatar、名单、列表、antd）
- [团队头像墙](/v/avatar-019/) — 网格头像排列（Avatar、团队、网格、Stripe）
- [可展开头像菜单](/v/avatar-020/) — 头像点击展开（Avatar、交互、菜单、暗黑模式）
- [多人头像堆叠](/v/avatar-021/) — 重叠群成员（Avatar、堆叠、群组、iOS）
- [带头像在线点](/v/avatar-022/) — 头像加状态（Avatar、状态、在线、Tailwind）
- [头像名片](/v/avatar-023/) — 头像加简介（Avatar、名片、个人页、iOS）

### 折叠面板（collapse，23 个）

- [antd 折叠面板](/v/collapse-001/) — 可展开/收起。（桌面端、折叠、antd、iOS）
- [手风琴效果](/v/collapse-002/) — 同时只展开一个。（桌面端、手风琴、折叠、antd）
- [移动端筛选折叠](/v/collapse-003/) — 商品筛选面板。（移动端、筛选、折叠、antd）
- [嵌套折叠](/v/collapse-004/) — 多层级折叠。（桌面端、嵌套、折叠、antd）
- [手风琴面板](/v/collapse-005/) — Accordion 折叠（Collapse、折叠、手风琴、极简）
- [侧边折叠目录](/v/collapse-006/) — 文档大纲折叠（Collapse、目录、文档、antd）
- [可展开详情](/v/collapse-007/) — 列表展开详情（Collapse、详情、列表、Tailwind）
- [多面板同时展开](/v/collapse-008/) — 非手风琴模式（Collapse、面板、多选、Notion）
- [图片折叠说明](/v/collapse-009/) — 图文折叠面板（Collapse、图文、面板、极简）
- [嵌套折叠](/v/collapse-010/) — 面板内套面板（Collapse、嵌套、层级、Vercel）
- [手风琴面板](/v/collapse-011/) — FAQ 折叠面板（Collapse、折叠、手风琴、antd）
- [文档大纲折叠](/v/collapse-012/) — 侧边目录折叠（Collapse、目录、文档、Material）
- [列表展开详情](/v/collapse-013/) — 条目展开说明（Collapse、详情、列表、暗黑模式）
- [多面板同时展开](/v/collapse-014/) — 非手风琴模式（Collapse、面板、多选、Material）
- [图文折叠面板](/v/collapse-015/) — 图文说明展开（Collapse、图文、面板、GitHub）
- [嵌套折叠面板](/v/collapse-016/) — 面板内套面板（Collapse、嵌套、层级、暗黑模式）
- [设置项折叠分组](/v/collapse-017/) — 设置分组折叠（Collapse、设置、分组、GitHub）
- [深色折叠面板](/v/collapse-018/) — 暗黑折叠块（Collapse、深色、面板、Notion）
- [手风琴单展开](/v/collapse-019/) — 互斥展开面板（Collapse、手风琴、互斥、Material）
- [可折叠手风琴](/v/collapse-020/) — 点击展开收起（Collapse、交互、手风琴、antd）
- [基础手风琴](/v/collapse-021/) — 单组折叠面板（Collapse、手风琴、antd、扁平）
- [嵌套折叠面板](/v/collapse-022/) — 二级子项折叠（Collapse、嵌套、层级、极简）
- [无边框折叠](/v/collapse-023/) — 极简分隔式（Collapse、无边框、极简、Vercel）

### 标签 Tag（tag，25 个）

- [antd 标签](/v/tag-001/) — 彩色标签。（桌面端、Tag、antd、iOS）
- [可关闭标签](/v/tag-002/) — 带关闭按钮。（桌面端、Tag、可关闭、antd）
- [选择器标签](/v/tag-003/) — 输入框中的标签。（表单、Tag、输入框、antd）
- [文章标签](/v/tag-004/) — 文章底部标签。（文章、Tag、博客、antd）
- [彩色标签](/v/tag-005/) — 基础 Tag（Tag、标签、antd、Linear）
- [可关闭标签](/v/tag-006/) — 带删除按钮（Tag、关闭、标签、iOS）
- [状态标签](/v/tag-007/) — 状态徽章（Tag、状态、徽章、Tailwind）
- [连线标签](/v/tag-008/) — 带边框线条标签（Tag、边框、标签、Notion）
- [大号标签](/v/tag-009/) — 文章分类标签（Tag、大号、分类、暗黑模式）
- [图标标签](/v/tag-010/) — 带图标的标签（Tag、图标、标签、iOS）
- [大号黑色标签](/v/tag-011/) — 强调标签（Tag、黑色、强调、antd）
- [基础彩色标签](/v/tag-012/) — 多色 Tag（Tag、标签、antd、极简）
- [可关闭标签](/v/tag-013/) — 带删除按钮（Tag、关闭、标签、扁平）
- [状态徽章标签](/v/tag-014/) — 状态圆点标签（Tag、状态、徽章、Tailwind）
- [描边轮廓标签](/v/tag-015/) — 边框线条标签（Tag、边框、标签、极简）
- [大号分类标签](/v/tag-016/) — 文章分类标签（Tag、大号、分类、antd）
- [图标标签](/v/tag-017/) — 带图标标签（Tag、图标、标签、暗黑模式）
- [等级强调标签](/v/tag-018/) — HOT/NEW 角标（Tag、黑色、强调、Linear）
- [数字计数标签](/v/tag-019/) — 标签带数量（Tag、计数、标签、Material）
- [渐变背景标签](/v/tag-020/) — 彩色渐变标签（Tag、渐变、潮流、antd）
- [可点选筛选标签](/v/tag-021/) — 标签单选切换（Tag、交互、筛选、Linear）
- [可关闭标签](/v/tag-022/) — 带删除按钮（Tag、关闭、标签、antd）
- [状态胶囊标签](/v/tag-023/) — 圆点状态标签（Tag、状态、胶囊、iOS）
- [大号分类标签](/v/tag-024/) — 文章分类入口（Tag、大号、分类、Linear）
- [渐变背景标签](/v/tag-025/) — 彩色渐变标签（Tag、渐变、潮流、antd）
