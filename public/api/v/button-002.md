# Vercel 黑底按钮

- 分类：按钮（button）
- 分组：基础控件
- 风格标签：桌面端、SaaS、Vercel、极简、小红书、Material、antd、iOS、Linear、shadcn、Atlassian、Vuetify、Dribbble、字节、拟物、新粗野主义、扁平、3D立体、黏土、Mantine
- 页面：https://ui.vavagent.com/v/button-002/

## 设计说明

设计 Vercel 风格按钮组：
- 主按钮：纯黑 #000 填充，白字，padding 10px 18px，圆角 6px，14px 字重 500
- 次按钮：白底，1px 边框 #e5e7eb，黑字
- 无阴影、无渐变、无圆角超过 6px
- 整体风格：vercel.com 按钮，紧凑、开发者工具感

## 一句话描述

Vercel 黑底按钮：纯黑填充、无阴影、紧凑。 风格 桌面端 / SaaS / Vercel / 极简

## 改造现有页面用的提示词

```text
把现有页面里的「Vercel 黑底按钮」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计 Vercel 风格按钮组：
- 主按钮：纯黑 #000 填充，白字，padding 10px 18px，圆角 6px，14px 字重 500
- 次按钮：白底，1px 边框 #e5e7eb，黑字
- 无阴影、无渐变、无圆角超过 6px
- 整体风格：vercel.com 按钮，紧凑、开发者工具感

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：桌面端 / SaaS / Vercel / 极简 / 小红书 / Material
```

## 同分类其他变体

- shadcn/ui 主按钮（/v/button-001/）
- Stripe 渐变按钮（/v/button-003/）
- iOS 蓝色系统按钮（/v/button-004/）
- 小红书红色胶囊按钮（/v/button-005/）
- 加载态按钮（/v/button-006/）
- 浮动操作按钮 FAB（/v/button-007/）