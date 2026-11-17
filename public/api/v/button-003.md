# Stripe 渐变按钮

- 分类：按钮（button）
- 分组：基础控件
- 风格标签：桌面端、金融、Stripe、渐变、Material、antd、iOS、Linear、Vercel、小红书、shadcn、Awwwards、抖音、京东、玻璃拟态、新拟态、复古像素、3D立体、Mantine
- 页面：https://ui.vavagent.com/v/button-003/

## 设计说明

设计一个 Stripe 风格渐变按钮：
- 背景：线性渐变 90deg，#635bff → #00d4ff
- 文字白色，15px 字重 500，padding 12px 24px
- 圆角 20px（胶囊形）
- 阴影：0 4px 14px rgba(99,91,255,.3)
- hover 时阴影加深
- 整体风格：stripe.com 主 CTA 按钮

## 一句话描述

Stripe 渐变按钮：紫蓝渐变、圆角胶囊、阴影。 风格 桌面端 / 金融 / Stripe / 渐变

## 改造现有页面用的提示词

```text
把现有页面里的「Stripe 渐变按钮」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计一个 Stripe 风格渐变按钮：
- 背景：线性渐变 90deg，#635bff → #00d4ff
- 文字白色，15px 字重 500，padding 12px 24px
- 圆角 20px（胶囊形）
- 阴影：0 4px 14px rgba(99,91,255,.3)
- hover 时阴影加深
- 整体风格：stripe.com 主 CTA 按钮

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：桌面端 / 金融 / Stripe / 渐变 / Material / antd
```

## 同分类其他变体

- shadcn/ui 主按钮（/v/button-001/）
- Vercel 黑底按钮（/v/button-002/）
- iOS 蓝色系统按钮（/v/button-004/）
- 小红书红色胶囊按钮（/v/button-005/）
- 加载态按钮（/v/button-006/）
- 浮动操作按钮 FAB（/v/button-007/）