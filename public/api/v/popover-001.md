# shadcn/ui Popover

- 分类：气泡 Popover（popover）
- 分组：反馈与弹层
- 风格标签：桌面端、气泡、shadcn、antd、iOS、Vuetify、Glassmorphism、美团、Fluent、赛博朋克、玻璃拟态、3D立体、暗黑模式、材料、Vercel、Linear
- 页面：https://ui.vavagent.com/v/popover-001/

## 设计说明

设计 shadcn/ui 风格 Popover：
- 触发按钮 hover 时弹出白色卡片
- 卡片：1px #e5e7eb 边框，圆角 8px，阴影 0 4px 12px
- 顶部小箭头（6px 三角）指向触发按钮
- 卡片内：标题 13px 加粗 + 描述 12px 灰色
- 整体风格：shadcn/ui Popover

## 一句话描述

shadcn/ui Popover：hover 弹出、带小箭头。 风格 桌面端 / 气泡 / shadcn / antd

## 改造现有页面用的提示词

```text
把现有页面里的「shadcn/ui Popover」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计 shadcn/ui 风格 Popover：
- 触发按钮 hover 时弹出白色卡片
- 卡片：1px #e5e7eb 边框，圆角 8px，阴影 0 4px 12px
- 顶部小箭头（6px 三角）指向触发按钮
- 卡片内：标题 13px 加粗 + 描述 12px 灰色
- 整体风格：shadcn/ui Popover

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：桌面端 / 气泡 / shadcn / antd / iOS / Vuetify
```

## 同分类其他变体

- 用户名片气泡（/v/popover-002/）
- 提示气泡（Tooltip）（/v/popover-003/）
- 移动端分享气泡（/v/popover-004/）
- 文字气泡（/v/popover-005/）
- 卡片气泡（/v/popover-006/）
- 确认气泡（/v/popover-007/）