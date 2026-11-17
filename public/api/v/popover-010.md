# 图表悬浮提示

- 分类：气泡 Popover（popover）
- 分组：反馈与弹层
- 风格标签：Popover、图表、悬浮、Linear、Tailwind、Notion、小红书、GitHub、暗黑模式、极简、扁平
- 页面：https://ui.vavagent.com/v/popover-010/

## 设计说明

设计图表悬浮提示：Hover 图表节点显示深色数据卡片。

## 一句话描述

图表悬浮提示：Hover 数据卡 风格 Popover / 图表 / 悬浮 / Linear

## 改造现有页面用的提示词

```text
把现有页面里的「图表悬浮提示」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计图表悬浮提示：Hover 图表节点显示深色数据卡片。

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：Popover / 图表 / 悬浮 / Linear / Tailwind / Notion
```

## 同分类其他变体

- shadcn/ui Popover（/v/popover-001/）
- 用户名片气泡（/v/popover-002/）
- 提示气泡（Tooltip）（/v/popover-003/）
- 移动端分享气泡（/v/popover-004/）
- 文字气泡（/v/popover-005/）
- 卡片气泡（/v/popover-006/）