# 信息提示 Toast

- 分类：Toast/提示（toast）
- 分组：反馈与弹层
- 风格标签：Toast、信息、反馈、antd、Notion、Linear、Stripe、新拟态、扁平、极简
- 页面：https://ui.vavagent.com/v/toast-014/

## 设计说明

设计信息 Toast：蓝底蓝边 + 信息图标 + 说明文字。

## 一句话描述

信息提示 Toast：蓝色信息反馈 风格 Toast / 信息 / 反馈 / antd

## 改造现有页面用的提示词

```text
把现有页面里的「信息提示 Toast」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计信息 Toast：蓝底蓝边 + 信息图标 + 说明文字。

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：Toast / 信息 / 反馈 / antd / Notion / Linear
```

## 同分类其他变体

- shadcn/ui Toast（/v/toast-001/）
- iOS 顶部通知横幅（/v/toast-002/）
- 成功提示（/v/toast-003/）
- 错误提示（/v/toast-004/）
- 成功提示（/v/toast-005/）
- 错误提示（/v/toast-006/）