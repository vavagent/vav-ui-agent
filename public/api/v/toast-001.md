# shadcn/ui Toast

- 分类：Toast/提示（toast）
- 分组：反馈与弹层
- 风格标签：桌面端、提示、shadcn、antd、iOS、Linear、Element、Shopify、Tailwind、钉钉、3D立体、扁平、黏土、插画、赛博朋克、Vercel
- 页面：https://ui.vavagent.com/v/toast-001/

## 设计说明

设计 shadcn/ui 风格 Toast：
- 右下角定位，白底卡片，1px #e5e7eb 边框，圆角 8px
- 左侧 20px 圆形绿色对勾图标
- 标题 14px 字重 500，描述 13px 灰色
- 阴影 0 4px 12px rgba(0,0,0,.1)
- 整体风格：shadcn/ui Toast

## 一句话描述

shadcn/ui Toast：右下角卡片、图标 + 标题 + 描述。 风格 桌面端 / 提示 / shadcn / antd

## 改造现有页面用的提示词

```text
把现有页面里的「shadcn/ui Toast」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计 shadcn/ui 风格 Toast：
- 右下角定位，白底卡片，1px #e5e7eb 边框，圆角 8px
- 左侧 20px 圆形绿色对勾图标
- 标题 14px 字重 500，描述 13px 灰色
- 阴影 0 4px 12px rgba(0,0,0,.1)
- 整体风格：shadcn/ui Toast

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：桌面端 / 提示 / shadcn / antd / iOS / Linear
```

## 同分类其他变体

- iOS 顶部通知横幅（/v/toast-002/）
- 成功提示（/v/toast-003/）
- 错误提示（/v/toast-004/）
- 成功提示（/v/toast-005/）
- 错误提示（/v/toast-006/）
- 加载中 Toast（/v/toast-007/）