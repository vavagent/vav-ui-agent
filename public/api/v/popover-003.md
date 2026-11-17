# 提示气泡（Tooltip）

- 分类：气泡 Popover（popover）
- 分组：反馈与弹层
- 风格标签：提示、Tooltip、通用、shadcn、antd、iOS、Skeuomorphism、Dribbble、Neumorphism、京东、赛博朋克、插画、拟物、扁平、材料、GitHub、Material、小红书、Vercel
- 页面：https://ui.vavagent.com/v/popover-003/

## 设计说明

设计 Tooltip 提示气泡：
- 深色底 #111827 白字，12px
- padding 6px 10px，圆角 4px
- 顶部小三角指向触发元素
- 纯文字，无按钮
- 整体风格：通用 Tooltip

## 一句话描述

提示气泡（Tooltip）：纯文字、小号、深色底。 风格 提示 / Tooltip / 通用 / shadcn

## 改造现有页面用的提示词

```text
把现有页面里的「提示气泡（Tooltip）」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计 Tooltip 提示气泡：
- 深色底 #111827 白字，12px
- padding 6px 10px，圆角 4px
- 顶部小三角指向触发元素
- 纯文字，无按钮
- 整体风格：通用 Tooltip

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：提示 / Tooltip / 通用 / shadcn / antd / iOS
```

## 同分类其他变体

- shadcn/ui Popover（/v/popover-001/）
- 用户名片气泡（/v/popover-002/）
- 移动端分享气泡（/v/popover-004/）
- 文字气泡（/v/popover-005/）
- 卡片气泡（/v/popover-006/）
- 确认气泡（/v/popover-007/）