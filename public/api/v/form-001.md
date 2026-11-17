# shadcn/ui 输入框

- 分类：表单输入（form）
- 分组：基础控件
- 风格标签：桌面端、极简、shadcn、Material、antd、iOS、Linear、支付宝、Dribbble、Element、Tailwind、材料、暗黑模式、赛博朋克、便当盒布局、新拟态
- 页面：https://ui.vavagent.com/v/form-001/

## 设计说明

设计 shadcn/ui 风格输入框：
- 标签 14px 字重 500，下方 margin-bottom 6px
- 输入框：白底，1px 边框 #e5e7eb，圆角 6px，padding 8px 12px，14px
- focus 态：边框变黑 #111827
- placeholder 灰色 #9ca3af
- 整体风格：shadcn/ui 默认表单输入

## 一句话描述

shadcn/ui 输入框：白底灰边框，focus 黑边框。 风格 桌面端 / 极简 / shadcn / Material

## 改造现有页面用的提示词

```text
把现有页面里的「shadcn/ui 输入框」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计 shadcn/ui 风格输入框：
- 标签 14px 字重 500，下方 margin-bottom 6px
- 输入框：白底，1px 边框 #e5e7eb，圆角 6px，padding 8px 12px，14px
- focus 态：边框变黑 #111827
- placeholder 灰色 #9ca3af
- 整体风格：shadcn/ui 默认表单输入

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：桌面端 / 极简 / shadcn / Material / antd / iOS
```

## 同分类其他变体

- Linear 命令面板输入（⌘K）（/v/form-002/）
- iOS 搜索框（/v/form-003/）
- 登录表单（/v/form-004/）
- 开关 Toggle（/v/form-005/）
- 复选框（/v/form-006/）
- 下拉选择（/v/form-007/）