# antd 进度条

- 分类：进度条（progress）
- 分组：反馈与弹层
- 风格标签：桌面端、进度、antd、iOS、Linear、Fluent、微信、Vuetify、Glassmorphism、插画、扁平、复古像素、暗黑模式、Vercel
- 页面：https://ui.vavagent.com/v/progress-001/

## 设计说明

设计 antd 进度条：
- 高度 8px，背景 #f0f0f0，圆角 4px
- 已完成部分：蓝色 #1677ff / 绿色 #52c41a
- 上方：标签 13px + 百分比
- 整体风格：Ant Design Progress

## 一句话描述

antd 进度条：线性进度条。 风格 桌面端 / 进度 / antd / iOS

## 改造现有页面用的提示词

```text
把现有页面里的「antd 进度条」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计 antd 进度条：
- 高度 8px，背景 #f0f0f0，圆角 4px
- 已完成部分：蓝色 #1677ff / 绿色 #52c41a
- 上方：标签 13px + 百分比
- 整体风格：Ant Design Progress

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：桌面端 / 进度 / antd / iOS / Linear / Fluent
```

## 同分类其他变体

- 环形进度（/v/progress-002/）
- 上传进度（/v/progress-003/）
- 步骤进度（/v/progress-004/）
- 线性进度条（/v/progress-005/）
- 环形进度（/v/progress-006/）
- 步骤进度（/v/progress-007/）