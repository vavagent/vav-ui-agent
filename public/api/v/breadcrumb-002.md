# Stripe Onboarding 步骤条

- 分类：面包屑/步骤（breadcrumb）
- 分组：导航与结构
- 风格标签：流程、Onboarding、Stripe、antd、GitHub、Linear、微信、Atlassian、美团、Skeuomorphism、材料、复古像素、扁平、便当盒布局、Tailwind
- 页面：https://ui.vavagent.com/v/breadcrumb-002/

## 设计说明

设计 Stripe 风格步骤条：
- 横向三步，每步 28×28 圆形
- 已完成：品牌紫 #635bff 底 + 白色对勾
- 当前步骤：紫底白字，下方文字加粗
- 未到达：灰底 #e5e7eb + 灰色数字
- 连接线：已完成段紫色，未完成段灰色
- 整体风格：Stripe 注册流程

## 一句话描述

Stripe Onboarding 步骤条：圆形进度 + 连接线 + 标签。 风格 流程 / Onboarding / Stripe / antd

## 改造现有页面用的提示词

```text
把现有页面里的「Stripe Onboarding 步骤条」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计 Stripe 风格步骤条：
- 横向三步，每步 28×28 圆形
- 已完成：品牌紫 #635bff 底 + 白色对勾
- 当前步骤：紫底白字，下方文字加粗
- 未到达：灰底 #e5e7eb + 灰色数字
- 连接线：已完成段紫色，未完成段灰色
- 整体风格：Stripe 注册流程

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：流程 / Onboarding / Stripe / antd / GitHub / Linear
```

## 同分类其他变体

- GitHub 仓库面包屑（/v/breadcrumb-001/）
- 带返回按钮的面包屑（/v/breadcrumb-003/）
- Ant Design 步骤条（/v/breadcrumb-004/）
- 带图标面包屑（/v/breadcrumb-005/）
- 移动端步骤条（/v/breadcrumb-006/）
- 带下拉面包屑（/v/breadcrumb-007/）