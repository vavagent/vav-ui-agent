# 用户名片气泡

- 分类：气泡 Popover（popover）
- 分组：反馈与弹层
- 风格标签：Popover、用户、名片、iOS、Tailwind、扁平、小红书、GitHub、暗黑模式、antd
- 页面：https://ui.vavagent.com/v/popover-008/

## 设计说明

设计用户名片气泡：
- 头像 + 名字 + 职位 + 关注按钮
- 整体风格：GitHub 用户卡片 Popover

## 一句话描述

用户名片气泡：悬停用户头像卡片 风格 Popover / 用户 / 名片 / iOS

## 改造现有页面用的提示词

```text
把现有页面里的「用户名片气泡」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计用户名片气泡：
- 头像 + 名字 + 职位 + 关注按钮
- 整体风格：GitHub 用户卡片 Popover

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：Popover / 用户 / 名片 / iOS / Tailwind / 扁平
```

## 同分类其他变体

- shadcn/ui Popover（/v/popover-001/）
- 用户名片气泡（/v/popover-002/）
- 提示气泡（Tooltip）（/v/popover-003/）
- 移动端分享气泡（/v/popover-004/）
- 文字气泡（/v/popover-005/）
- 卡片气泡（/v/popover-006/）