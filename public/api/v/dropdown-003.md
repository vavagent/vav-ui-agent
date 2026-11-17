# 级联下拉

- 分类：下拉框（dropdown）
- 分组：基础控件
- 风格标签：桌面端、多级、菜单、antd、shadcn、iOS、Linear、Bootstrap、Awwwards、飞书、拟物、新粗野主义、3D立体、扁平、材料、Notion、Vercel、Radix
- 页面：https://ui.vavagent.com/v/dropdown-003/

## 设计说明

设计级联下拉菜单：
- 一级菜单项右侧带 › 箭头，hover 时右侧弹出二级
- 菜单项 13px，padding 6px 10px
- 整体风格：桌面应用菜单栏

## 一句话描述

级联下拉：鼠标移入二级展开。 风格 桌面端 / 多级 / 菜单 / antd

## 改造现有页面用的提示词

```text
把现有页面里的「级联下拉」改成这个观感，只改样式，不重写。

技术栈：按我项目现有的（Vue / Quasar 或 React / Tailwind 均可），不要升级版本，不要引入新依赖。

参照描述：
设计级联下拉菜单：
- 一级菜单项右侧带 › 箭头，hover 时右侧弹出二级
- 菜单项 13px，padding 6px 10px
- 整体风格：桌面应用菜单栏

约束：
1. props 名称、数据字段、组件层级一律不动，只调整布局 / 间距 / 字号 / 颜色 / 圆角 / 阴影
2. 需要动效时用项目已有能力降级实现，不新增动画库
3. 先给 2-3 个方向（每个方向改了什么、风险在哪），我确认后再出代码
4. 出代码时给完整单文件版本，不要给 diff
验收：功能不变，构建能过。风格关键词：桌面端 / 多级 / 菜单 / antd / shadcn / iOS
```

## 同分类其他变体

- shadcn/ui 下拉菜单（/v/dropdown-001/）
- 下拉选择框（/v/dropdown-002/）
- 移动端底部 Action Sheet（/v/dropdown-004/）
- 基础下拉菜单（/v/dropdown-005/）
- 分组下拉（/v/dropdown-006/）
- 搜索下拉（/v/dropdown-007/）