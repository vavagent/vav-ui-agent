# shadcn/ui 对话框

- 分类：弹窗/抽屉（modal）
- 分组：反馈与弹层
- 风格标签：桌面端、弹窗、shadcn、antd、iOS、小红书、京东、Dark、Element、微信、材料、便当盒布局、赛博朋克、拟物、Stripe、GitHub、新拟态、Vercel、Tailwind
- 页面：https://ui.vavagent.com/v/modal-001/

## 设计说明

设计 shadcn/ui 风格对话框：
- 半透明黑底 rgba(0,0,0,.4) 遮罩
- 居中卡片白底，圆角 12px，padding 24px，阴影 0 20px 60px
- 标题 17px 加粗，描述 14px 灰色
- 底部右侧：次要按钮（灰边框）+ 危险按钮（红色 #ef4444）
- 整体风格：shadcn/ui Alert Dialog

## 一句话描述

shadcn/ui 对话框：居中卡片、标题、描述、操作按钮。 风格 桌面端 / 弹窗 / shadcn / antd

## 改造现有页面用的提示词

```text
把现有页面里的「shadcn/ui 对话框」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计 shadcn/ui 风格对话框：
- 半透明黑底 rgba(0,0,0,.4) 遮罩
- 居中卡片白底，圆角 12px，padding 24px，阴影 0 20px 60px
- 标题 17px 加粗，描述 14px 灰色
- 底部右侧：次要按钮（灰边框）+ 危险按钮（红色 #ef4444）
- 整体风格：shadcn/ui Alert Dialog

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：桌面端 / 弹窗 / shadcn / antd / iOS / 小红书
```

## 同分类其他变体

- iOS 底部抽屉（/v/modal-002/）
- 居中确认弹窗（/v/modal-003/）
- 侧边滑出抽屉（/v/modal-004/）
- 确认删除弹窗（/v/modal-005/）
- 表单弹窗（/v/modal-006/）
- 分享弹窗（/v/modal-007/）