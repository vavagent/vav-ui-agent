# antd 分页

- 分类：分页（pagination）
- 分组：导航与结构
- 风格标签：桌面端、分页、antd、GitHub、Material、B站、抖音、Dribbble、暗黑模式、拟物、便当盒布局、极简、3D立体、Stripe、扁平、Vercel
- 页面：https://ui.vavagent.com/v/pagination-001/

## 设计说明

设计 antd 分页：
- 每页数字按钮：13px，padding 4px 12px，1px 边框 #d9d9d9，圆角 6px
- 当前页：蓝边 #1677ff + 蓝字 + 加粗
- 其他页：灰边灰字
- 禁用页：灰色不可点击
- 整体风格：Ant Design Pagination

## 一句话描述

antd 分页：标准分页。 风格 桌面端 / 分页 / antd / GitHub

## 改造现有页面用的提示词

```text
把现有页面里的「antd 分页」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计 antd 分页：
- 每页数字按钮：13px，padding 4px 12px，1px 边框 #d9d9d9，圆角 6px
- 当前页：蓝边 #1677ff + 蓝字 + 加粗
- 其他页：灰边灰字
- 禁用页：灰色不可点击
- 整体风格：Ant Design Pagination

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：桌面端 / 分页 / antd / GitHub / Material / B站
```

## 同分类其他变体

- 带总数分页（/v/pagination-002/）
- 移动端加载更多（/v/pagination-003/）
- 简洁分页（/v/pagination-004/）
- 标准分页（/v/pagination-005/）
- 简洁分页（/v/pagination-006/）
- 带总数分页（/v/pagination-007/）