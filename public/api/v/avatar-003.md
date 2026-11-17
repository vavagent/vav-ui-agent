# 标签 Badge

- 分类：头像/标签（avatar）
- 分组：数据展示
- 风格标签：标签、Badge、通用、antd、iOS、GitHub、支付宝、Atlassian、Glassmorphism、黏土、复古像素、拟物、扁平、极简、Tailwind
- 页面：https://ui.vavagent.com/v/avatar-003/

## 设计说明

设计一组状态标签 Badge：
- 12px 字号，padding 2px 10px，圆角 4px
- 默认：蓝底 #eff6ff + 蓝字 #2563eb
- 成功：绿底 #dcfce7 + 绿字 #16a34a
- 警告：黄底 #fef3c7 + 黄字 #d97706
- 错误：红底 #fef2f2 + 红字 #ef4444
- 整体风格：通用状态标签

## 一句话描述

标签 Badge：小标签、彩色。 风格 标签 / Badge / 通用 / antd

## 改造现有页面用的提示词

```text
把现有页面里的「标签 Badge」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计一组状态标签 Badge：
- 12px 字号，padding 2px 10px，圆角 4px
- 默认：蓝底 #eff6ff + 蓝字 #2563eb
- 成功：绿底 #dcfce7 + 绿字 #16a34a
- 警告：黄底 #fef3c7 + 黄字 #d97706
- 错误：红底 #fef2f2 + 红字 #ef4444
- 整体风格：通用状态标签

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：标签 / Badge / 通用 / antd / iOS / GitHub
```

## 同分类其他变体

- 用户头像（/v/avatar-001/）
- 头像组（/v/avatar-002/）
- 头像下拉（/v/avatar-004/）
- 大头像（/v/avatar-005/）
- 头像组（/v/avatar-006/）
- 字母头像（/v/avatar-007/）