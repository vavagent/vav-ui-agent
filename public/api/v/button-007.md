# 浮动操作按钮 FAB

- 分类：按钮（button）
- 分组：基础控件
- 风格标签：移动端、Material、悬浮、antd、iOS、Linear、Vercel、小红书、shadcn、Bootstrap、飞书、Atlassian、字节、新粗野主义、3D立体、暗黑模式、材料
- 页面：https://ui.vavagent.com/v/button-007/

## 设计说明

设计一个 Material 风格浮动操作按钮（FAB）：
- 圆形 56×56px，#007AFF 底白字
- 位置：右下角，right 16px bottom 16px
- 阴影：0 4px 12px rgba(0,122,255,.4)
- 内部 + 号 24px 居中
- hover 时放大 1.05
- 整体风格：Material Design FAB

## 一句话描述

浮动操作按钮 FAB：圆形、右下悬浮、阴影。 风格 移动端 / Material / 悬浮 / antd

## 改造现有页面用的提示词

```text
把现有页面里的「浮动操作按钮 FAB」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计一个 Material 风格浮动操作按钮（FAB）：
- 圆形 56×56px，#007AFF 底白字
- 位置：右下角，right 16px bottom 16px
- 阴影：0 4px 12px rgba(0,122,255,.4)
- 内部 + 号 24px 居中
- hover 时放大 1.05
- 整体风格：Material Design FAB

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：移动端 / Material / 悬浮 / antd / iOS / Linear
```

## 同分类其他变体

- shadcn/ui 主按钮（/v/button-001/）
- Vercel 黑底按钮（/v/button-002/）
- Stripe 渐变按钮（/v/button-003/）
- iOS 蓝色系统按钮（/v/button-004/）
- 小红书红色胶囊按钮（/v/button-005/）
- 加载态按钮（/v/button-006/）