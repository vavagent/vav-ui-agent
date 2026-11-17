# antd 警告提示

- 分类：警告提示（alert）
- 分组：反馈与弹层
- 风格标签：桌面端、Alert、antd、iOS、Material、京东、Shopify、Bootstrap、Tailwind、3D立体、拟物、复古像素、扁平、极简
- 页面：https://ui.vavagent.com/v/alert-001/

## 设计说明

设计 antd 警告提示：
- 四种类型：
  - 信息：蓝底 #e6f4ff + 蓝边 #91caff + 蓝字 #1677ff
  - 成功：绿底 #f6ffed + 绿边 #b7eb8f + 绿字 #52c41a
  - 警告：黄底 #fffbe6 + 黄边 #ffe58f + 黄字 #faad14
  - 错误：红底 #fff2f0 + 红边 #ffccc7 + 红字 #ff4d4f
- padding 12px 16px，圆角 6px，14px 字号
- 整体风格：Ant Design Alert

## 一句话描述

antd 警告提示：四种类型提示。 风格 桌面端 / Alert / antd / iOS

## 改造现有页面用的提示词

```text
把现有页面里的「antd 警告提示」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计 antd 警告提示：
- 四种类型：
  - 信息：蓝底 #e6f4ff + 蓝边 #91caff + 蓝字 #1677ff
  - 成功：绿底 #f6ffed + 绿边 #b7eb8f + 绿字 #52c41a
  - 警告：黄底 #fffbe6 + 黄边 #ffe58f + 黄字 #faad14
  - 错误：红底 #fff2f0 + 红边 #ffccc7 + 红字 #ff4d4f
- padding 12px 16px，圆角 6px，14px 字号
- 整体风格：Ant Design Alert

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：桌面端 / Alert / antd / iOS / Material / 京东
```

## 同分类其他变体

- 带图标警告（/v/alert-002/）
- 顶部通知条（/v/alert-003/）
- 表单验证提示（/v/alert-004/）
- 信息提示条（/v/alert-005/）
- 警告提示条（/v/alert-006/）
- 成功提示条（/v/alert-007/）