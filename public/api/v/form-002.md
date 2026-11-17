# Linear 命令面板输入（⌘K）

- 分类：表单输入（form）
- 分组：基础控件
- 风格标签：桌面端、快捷键、Linear、Material、antd、iOS、Dark、钉钉、Element、便当盒布局、拟物、扁平、赛博朋克、极简
- 页面：https://ui.vavagent.com/v/form-002/

## 设计说明

设计 Linear 风格命令面板（⌘K）：
- 居中悬浮卡片，白底，圆角 12px，阴影 0 10px 40px rgba(0,0,0,.15)
- 输入行：左侧 ⌘ 图标，中间输入框 15px，右侧 ESC 快捷键标签
- 下方命令列表：每行 14px padding 8px 16px
- 整体风格：Linear / Raycast 命令面板

## 一句话描述

Linear 命令面板输入（⌘K）：居中悬浮、大圆角、带快捷键提示。 风格 桌面端 / 快捷键 / Linear / Material

## 改造现有页面用的提示词

```text
把现有页面里的「Linear 命令面板输入（⌘K）」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计 Linear 风格命令面板（⌘K）：
- 居中悬浮卡片，白底，圆角 12px，阴影 0 10px 40px rgba(0,0,0,.15)
- 输入行：左侧 ⌘ 图标，中间输入框 15px，右侧 ESC 快捷键标签
- 下方命令列表：每行 14px padding 8px 16px
- 整体风格：Linear / Raycast 命令面板

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：桌面端 / 快捷键 / Linear / Material / antd / iOS
```

## 同分类其他变体

- shadcn/ui 输入框（/v/form-001/）
- iOS 搜索框（/v/form-003/）
- 登录表单（/v/form-004/）
- 开关 Toggle（/v/form-005/）
- 复选框（/v/form-006/）
- 下拉选择（/v/form-007/）