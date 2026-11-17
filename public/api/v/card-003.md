# Stripe 功能卡片

- 分类：卡片（card）
- 分组：基础控件
- 风格标签：桌面端、官网、Stripe、antd、iOS、小红书、Linear、Notion、Vercel、抖音、飞书、B站、拟物、扁平、3D立体、极简、赛博朋克、Chakra、Figma、Airbnb、Spotify、知乎、掘金、双色调、颗粒渐变、手绘、霓虹发光、故障风
- 页面：https://ui.vavagent.com/v/card-003/

## 设计说明

设计 Stripe 风格功能卡片：
- 2 列网格，卡片背景 #f6f9fc，圆角 8px，padding 20px
- 顶部 32×32 圆角图标（品牌色）
- 标题 15px 字重 600 #1a1f36
- 描述 13px 灰色 #6b7280
- hover 时阴影加深
- 整体风格：stripe.com 功能展示卡片

## 一句话描述

Stripe 功能卡片：左侧图标 + 标题 + 描述，hover 阴影。 风格 桌面端 / 官网 / Stripe / antd

## 改造现有页面用的提示词

```text
把现有页面里的「Stripe 功能卡片」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计 Stripe 风格功能卡片：
- 2 列网格，卡片背景 #f6f9fc，圆角 8px，padding 20px
- 顶部 32×32 圆角图标（品牌色）
- 标题 15px 字重 600 #1a1f36
- 描述 13px 灰色 #6b7280
- hover 时阴影加深
- 整体风格：stripe.com 功能展示卡片

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：桌面端 / 官网 / Stripe / antd / iOS / 小红书
```

## 同分类其他变体

- Linear 任务卡片（/v/card-001/）
- Notion 文档卡片（/v/card-002/）
- 小红书笔记卡片（/v/card-004/）
- GitHub 仓库卡片（/v/card-005/）
- 统计数据卡片（/v/card-006/）
- 商品卡片（/v/card-007/）