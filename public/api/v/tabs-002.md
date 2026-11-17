# 卡片式 Tabs

- 分类：标签页 Tabs（tabs）
- 分组：导航与结构
- 风格标签：桌面端、Tabs、卡片、antd、iOS、shadcn、Linear、微信、Neumorphism、字节、插画、便当盒布局、3D立体、暗黑模式、Tailwind、玻璃拟态
- 页面：https://ui.vavagent.com/v/tabs-002/

## 设计说明

设计卡片式 Tabs：
- 标签带边框 1px #d9d9d9，圆角 6px（仅顶部圆角）
- 当前标签：白底 + 加粗黑色
- 其他标签：灰底 #fafafa + 灰色文字
- 内容区带边框，圆角 6px（仅底部圆角）
- 整体风格：Ant Design 卡片式 Tabs

## 一句话描述

卡片式 Tabs：带边框的卡片式标签。 风格 桌面端 / Tabs / 卡片 / antd

## 改造现有页面用的提示词

```text
把现有页面里的「卡片式 Tabs」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计卡片式 Tabs：
- 标签带边框 1px #d9d9d9，圆角 6px（仅顶部圆角）
- 当前标签：白底 + 加粗黑色
- 其他标签：灰底 #fafafa + 灰色文字
- 内容区带边框，圆角 6px（仅底部圆角）
- 整体风格：Ant Design 卡片式 Tabs

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：桌面端 / Tabs / 卡片 / antd / iOS / shadcn
```

## 同分类其他变体

- antd Tabs（/v/tabs-001/）
- iOS 底部 Tab（/v/tabs-003/）
- 垂直 Tabs（/v/tabs-004/）
- 顶部下划线 Tabs（/v/tabs-005/）
- 卡片式 Tabs（/v/tabs-006/）
- 侧边 Tabs（/v/tabs-007/）