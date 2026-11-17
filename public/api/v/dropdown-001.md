# shadcn/ui 下拉菜单

- 分类：下拉框（dropdown）
- 分组：基础控件
- 风格标签：桌面端、菜单、shadcn、antd、iOS、Linear、Vuetify、钉钉、Dark、玻璃拟态、新拟态、复古像素、材料、3D立体、Tailwind、Radix
- 页面：https://ui.vavagent.com/v/dropdown-001/

## 设计说明

设计 shadcn/ui 风格下拉菜单：
- 触发按钮：白底 1px #e5e7eb 边框，圆角 6px，13px
- 弹出菜单：白底，1px 边框，圆角 6px，阴影 0 4px 12px
- 菜单项 13px，padding 6px 10px
- 危险操作红色 #ef4444
- 分割线 1px #f3f4f6
- 整体风格：shadcn/ui Dropdown Menu

## 一句话描述

shadcn/ui 下拉菜单：触发按钮 + 垂直菜单、分割线。 风格 桌面端 / 菜单 / shadcn / antd

## 改造现有页面用的提示词

```text
把现有页面里的「shadcn/ui 下拉菜单」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计 shadcn/ui 风格下拉菜单：
- 触发按钮：白底 1px #e5e7eb 边框，圆角 6px，13px
- 弹出菜单：白底，1px 边框，圆角 6px，阴影 0 4px 12px
- 菜单项 13px，padding 6px 10px
- 危险操作红色 #ef4444
- 分割线 1px #f3f4f6
- 整体风格：shadcn/ui Dropdown Menu

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：桌面端 / 菜单 / shadcn / antd / iOS / Linear
```

## 同分类其他变体

- 下拉选择框（/v/dropdown-002/）
- 级联下拉（/v/dropdown-003/）
- 移动端底部 Action Sheet（/v/dropdown-004/）
- 基础下拉菜单（/v/dropdown-005/）
- 分组下拉（/v/dropdown-006/）
- 搜索下拉（/v/dropdown-007/）