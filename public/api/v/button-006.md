# 加载态按钮

- 分类：按钮（button）
- 分组：基础控件
- 风格标签：交互、加载态、通用、antd、iOS、Material、Linear、Vercel、小红书、shadcn、Dark、Neumorphism、Vuetify、微信、材料、极简、暗黑模式、复古像素、Mantine
- 页面：https://ui.vavagent.com/v/button-006/

## 设计说明

设计一个加载态按钮：
- 按钮内左侧一个 14×14 spinner：2px 白色圆环，顶部缺口（border-top-color: transparent）
- 旋转动画 1s linear infinite
- 按钮文案"加载中"，14px
- 整体禁用态感，opacity 可降到 0.8
- 整体风格：通用表单提交按钮

## 一句话描述

加载态按钮：按钮内带 spinner 旋转。 风格 交互 / 加载态 / 通用 / antd

## 改造现有页面用的提示词

```text
把现有页面里的「加载态按钮」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计一个加载态按钮：
- 按钮内左侧一个 14×14 spinner：2px 白色圆环，顶部缺口（border-top-color: transparent）
- 旋转动画 1s linear infinite
- 按钮文案"加载中"，14px
- 整体禁用态感，opacity 可降到 0.8
- 整体风格：通用表单提交按钮

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：交互 / 加载态 / 通用 / antd / iOS / Material
```

## 同分类其他变体

- shadcn/ui 主按钮（/v/button-001/）
- Vercel 黑底按钮（/v/button-002/）
- Stripe 渐变按钮（/v/button-003/）
- iOS 蓝色系统按钮（/v/button-004/）
- 小红书红色胶囊按钮（/v/button-005/）
- 浮动操作按钮 FAB（/v/button-007/）