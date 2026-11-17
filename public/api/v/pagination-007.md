# 带总数分页

- 分类：分页（pagination）
- 分组：导航与结构
- 风格标签：Pagination、总数、后台、Stripe、antd、玻璃拟态、Material、Notion、iOS、暗黑模式、极简、Tailwind
- 页面：https://ui.vavagent.com/v/pagination-007/

## 设计说明

设计带总数分页：
- 左侧总数 + 右侧页码 + 页大小选择
- 整体风格：后台表格分页

## 一句话描述

带总数分页：显示总数和页大小 风格 Pagination / 总数 / 后台 / Stripe

## 改造现有页面用的提示词

```text
把现有页面里的「带总数分页」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计带总数分页：
- 左侧总数 + 右侧页码 + 页大小选择
- 整体风格：后台表格分页

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：Pagination / 总数 / 后台 / Stripe / antd / 玻璃拟态
```

## 同分类其他变体

- antd 分页（/v/pagination-001/）
- 带总数分页（/v/pagination-002/）
- 移动端加载更多（/v/pagination-003/）
- 简洁分页（/v/pagination-004/）
- 标准分页（/v/pagination-005/）
- 简洁分页（/v/pagination-006/）