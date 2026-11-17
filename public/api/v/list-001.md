# Linear 任务列表行

- 分类：列表（list）
- 分组：基础控件
- 风格标签：桌面端、SaaS、Linear、小红书、antd、iOS、GitHub、Bootstrap、Glassmorphism、Vuetify、Airbnb、插画、玻璃拟态、材料、拟物、Slack、Discord、Dropbox、Vercel
- 页面：https://ui.vavagent.com/v/list-001/

## 设计说明

设计 Linear 风格任务列表：
- 每行：左侧勾选框 + 标题 + 优先级标签 + 头像
- 左侧 3px 优先级色条（P0 红 / P1 橙）
- 行高 40px，padding 10px 14px
- 1px #f3f4f6 分割线
- 整体风格：Linear 任务列表

## 一句话描述

Linear 任务列表行：紧凑行、优先级条、标签、元信息。 风格 桌面端 / SaaS / Linear / 小红书

## 改造现有页面用的提示词

```text
把现有页面里的「Linear 任务列表行」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计 Linear 风格任务列表：
- 每行：左侧勾选框 + 标题 + 优先级标签 + 头像
- 左侧 3px 优先级色条（P0 红 / P1 橙）
- 行高 40px，padding 10px 14px
- 1px #f3f4f6 分割线
- 整体风格：Linear 任务列表

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：桌面端 / SaaS / Linear / 小红书 / antd / iOS
```

## 同分类其他变体

- iOS 设置列表（/v/list-002/）
- 聊天列表（/v/list-003/）
- 通知列表（/v/list-004/）
- 聊天列表（/v/list-005/）
- 设置列表（/v/list-006/）
- 文件列表（/v/list-007/）