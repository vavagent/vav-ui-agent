# Linear 任务卡片

- 分类：卡片（card）
- 分组：基础控件
- 风格标签：桌面端、SaaS、Linear、小红书、antd、iOS、Notion、Vercel、Airbnb、Tailwind、微信、拟物、扁平、极简、便当盒布局、玻璃拟态、Chakra、Figma、Spotify、知乎、掘金、双色调、颗粒渐变、手绘、霓虹发光、故障风
- 页面：https://ui.vavagent.com/v/card-001/

## 设计说明

设计 Linear 风格任务卡片：
- 白底，1px #e5e7eb 边框，圆角 8px
- 左侧 3px 优先级色条（P0 红色 #ff6b6b）
- 顶部标签：优先级标签（红底）+ 类型标签（蓝底），11px 圆角 4px
- 标题 14px 字重 500，下方 12px 灰色元信息
- padding 14px 16px
- 整体风格：Linear 任务列表卡片

## 一句话描述

Linear 任务卡片：白底、紧凑、左侧优先级条、标签。 风格 桌面端 / SaaS / Linear / 小红书

## 改造现有页面用的提示词

```text
把现有页面里的「Linear 任务卡片」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计 Linear 风格任务卡片：
- 白底，1px #e5e7eb 边框，圆角 8px
- 左侧 3px 优先级色条（P0 红色 #ff6b6b）
- 顶部标签：优先级标签（红底）+ 类型标签（蓝底），11px 圆角 4px
- 标题 14px 字重 500，下方 12px 灰色元信息
- padding 14px 16px
- 整体风格：Linear 任务列表卡片

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：桌面端 / SaaS / Linear / 小红书 / antd / iOS
```

## 同分类其他变体

- Notion 文档卡片（/v/card-002/）
- Stripe 功能卡片（/v/card-003/）
- 小红书笔记卡片（/v/card-004/）
- GitHub 仓库卡片（/v/card-005/）
- 统计数据卡片（/v/card-006/）
- 商品卡片（/v/card-007/）