# antd 折叠面板

- 分类：折叠面板（collapse）
- 分组：数据展示
- 风格标签：桌面端、折叠、antd、iOS、Notion、钉钉、Airbnb、Glassmorphism、Vuetify、玻璃拟态、插画、拟物、暗黑模式、便当盒布局、Linear、Tailwind
- 页面：https://ui.vavagent.com/v/collapse-001/

## 设计说明

设计 antd 折叠面板：
- 整体白底 1px #e8e8e8 边框，圆角 8px
- 面板标题 14px 加粗 + 右侧箭头（展开 ▴ / 收起 ▾）
- 面板内容 13px 灰色
- 面板间 1px 分割线
- 整体风格：Ant Design Collapse

## 一句话描述

antd 折叠面板：可展开/收起。 风格 桌面端 / 折叠 / antd / iOS

## 改造现有页面用的提示词

```text
把现有页面里的「antd 折叠面板」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计 antd 折叠面板：
- 整体白底 1px #e8e8e8 边框，圆角 8px
- 面板标题 14px 加粗 + 右侧箭头（展开 ▴ / 收起 ▾）
- 面板内容 13px 灰色
- 面板间 1px 分割线
- 整体风格：Ant Design Collapse

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：桌面端 / 折叠 / antd / iOS / Notion / 钉钉
```

## 同分类其他变体

- 手风琴效果（/v/collapse-002/）
- 移动端筛选折叠（/v/collapse-003/）
- 嵌套折叠（/v/collapse-004/）
- 手风琴面板（/v/collapse-005/）
- 侧边折叠目录（/v/collapse-006/）
- 可展开详情（/v/collapse-007/）