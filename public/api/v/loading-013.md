# 全屏加载遮罩

- 分类：加载态/空态（loading）
- 分组：反馈与弹层
- 风格标签：Loading、全屏、遮罩、Tailwind、Linear、iOS、Material、GitHub、极简
- 页面：https://ui.vavagent.com/v/loading-013/

## 设计说明

设计全屏加载遮罩：半透明遮罩 + 居中 spinner 与文字。

## 一句话描述

全屏加载遮罩：页面加载遮罩 风格 Loading / 全屏 / 遮罩 / Tailwind

## 改造现有页面用的提示词

```text
把现有页面里的「全屏加载遮罩」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计全屏加载遮罩：半透明遮罩 + 居中 spinner 与文字。

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：Loading / 全屏 / 遮罩 / Tailwind / Linear / iOS
```

## 同分类其他变体

- Linear 骨架屏（/v/loading-001/）
- iOS 菊花（/v/loading-002/）
- 空状态（/v/loading-003/）
- 按钮加载态（/v/loading-004/）
- 骨架屏（/v/loading-005/）
- 按钮加载（/v/loading-006/）