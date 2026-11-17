# 下拉选择

- 分类：表单输入（form）
- 分组：基础控件
- 风格标签：桌面端、选择、表单、antd、iOS、Material、Linear、Neumorphism、Airbnb、Tailwind、便当盒布局、复古像素、玻璃拟态、新粗野主义、极简
- 页面：https://ui.vavagent.com/v/form-007/

## 设计说明

设计一个下拉选择框：
- 标签 13px，下方 margin-bottom 4px
- 选择框：padding 8px 12px，1px #d1d5db 边框，圆角 6px，14px
- 右侧下拉箭头 ▾ 灰色
- 整体风格：通用表单下拉

## 一句话描述

下拉选择：带下拉箭头、可选中。 风格 桌面端 / 选择 / 表单 / antd

## 改造现有页面用的提示词

```text
把现有页面里的「下拉选择」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计一个下拉选择框：
- 标签 13px，下方 margin-bottom 4px
- 选择框：padding 8px 12px，1px #d1d5db 边框，圆角 6px，14px
- 右侧下拉箭头 ▾ 灰色
- 整体风格：通用表单下拉

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：桌面端 / 选择 / 表单 / antd / iOS / Material
```

## 同分类其他变体

- shadcn/ui 输入框（/v/form-001/）
- Linear 命令面板输入（⌘K）（/v/form-002/）
- iOS 搜索框（/v/form-003/）
- 登录表单（/v/form-004/）
- 开关 Toggle（/v/form-005/）
- 复选框（/v/form-006/）