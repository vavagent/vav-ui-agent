# 统计数据卡片

- 分类：卡片（card）
- 分组：基础控件
- 风格标签：桌面端、Dashboard、数据、antd、iOS、小红书、Linear、Notion、Vercel、Dark、Atlassian、字节、美团、拟物、插画、新拟态、新粗野主义、3D立体、Chakra、Figma、Airbnb、Spotify、知乎、掘金、双色调、颗粒渐变、手绘、霓虹发光、故障风
- 页面：https://ui.vavagent.com/v/card-006/

## 设计说明

设计一组 Dashboard 统计卡片：
- 3 列网格，白底，1px #e5e7eb 边框，圆角 8px，padding 16px
- 顶部标签 12px 灰色 #9ca3af
- 大数字 24px 字重 700 #111827
- 底部趋势箭头：上涨绿色 #10b981，下跌红色 #ef4444
- 整体风格：通用 SaaS Dashboard 指标卡

## 一句话描述

统计数据卡片：大数字 + 标签 + 趋势箭头。 风格 桌面端 / Dashboard / 数据 / antd

## 改造现有页面用的提示词

```text
把现有页面里的「统计数据卡片」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计一组 Dashboard 统计卡片：
- 3 列网格，白底，1px #e5e7eb 边框，圆角 8px，padding 16px
- 顶部标签 12px 灰色 #9ca3af
- 大数字 24px 字重 700 #111827
- 底部趋势箭头：上涨绿色 #10b981，下跌红色 #ef4444
- 整体风格：通用 SaaS Dashboard 指标卡

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：桌面端 / Dashboard / 数据 / antd / iOS / 小红书
```

## 同分类其他变体

- Linear 任务卡片（/v/card-001/）
- Notion 文档卡片（/v/card-002/）
- Stripe 功能卡片（/v/card-003/）
- 小红书笔记卡片（/v/card-004/）
- GitHub 仓库卡片（/v/card-005/）
- 商品卡片（/v/card-007/）