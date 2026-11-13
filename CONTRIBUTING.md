# 贡献指南

这个仓库的核心资产是**组件变体和提示词**，所以内容贡献比代码贡献更重要。下面分两类说明。

## 一、新增一个组件变体（最常见）

1. 在 `server/database/seed-snapshot.json` 的 `components` 数组里追加一项：

```json
{
  "cat": "button",
  "name": "Linear 风格主按钮",
  "desc": "深色实心主按钮，用于表单提交。",
  "tags": "[\"桌面端\",\"Linear\",\"极简\",\"深色\"]",
  "preview": "<button style=\"...\">保存</button>",
  "prompt": "设计一个 Linear 风格主按钮：\n- 高度 36px，圆角 6px，横向 padding 14px\n- 背景 #5e6ad2，hover 提亮到 #6e79dc\n- 14px 字号，字重 500，白色文字\n- 整体风格：Linear 官网按钮",
  "sort": 12
}
```

字段约定：

| 字段 | 要求 |
| --- | --- |
| `cat` | 必须对应 `categories` 里的 `slug`，否则页面上看不到 |
| `name` | 「风格 + 组件类型」，控制在 15 字内，同分类内不重复 |
| `desc` | 一句话说清适用场景 |
| `tags` | JSON **字符串**（不是数组），至少带 1 个风格/产品标签，方便筛选命中 |
| `preview` | 可独立渲染的 HTML 片段；内联样式优先，不依赖外部 CSS/JS |
| `prompt` | 见下方质量标准 |
| `sort` | 同分类内排序，取同类现有值之间的数（如 8.5） |

2. 同步更新本地库：删除 `data/ui.db`（含 `-shm`、`-wal`）后重启 `npm run dev`，会自动按新快照重建。
3. 提交前自查：`preview` 在页面里能正常渲染、`tags` 能被筛选弹窗命中、`prompt` 排版无乱码。

> 只改 `data/ui.db` 不提交快照，属于「个人本地数据」，别人克隆后看不到，PR 不会合并。

## 二、提示词质量标准

页面上给的公式：

```
组件类型 + 具体参数（颜色 / 尺寸 / 圆角 / 间距）+ 参考风格（哪个产品）+ 状态（hover / active / disabled）
```

合格提示词至少覆盖 4 个具体维度（颜色值、尺寸、圆角/间距、交互状态），末尾一行写清参考产品。反例：「做个好看的按钮」——这种不收。

## 三、代码与样式贡献

- 技术栈固定：Nuxt 3 + Vue 3 + TypeScript + better-sqlite3，不引入 UI 框架或 Tailwind（会与现有 CSS 变量体系冲突）。
- 页面状态统一走 URL query（`cat` / `q` / `tag`），新功能不要另起一套全局状态。
- 样式优先复用 `assets/css/main.css` 里的 CSS 变量（`--accent`、`--border`、`--radius-sm` 等）。
- 提交前确保 `npm run build` 能过。

## 四、提交与 PR

- 分支：`feat/xxx`、`fix/xxx`、`content/新增按钮变体`。
- 提交信息用中文或英文均可，前缀建议 `feat:` / `fix:` / `docs:` / `content:` / `chore:`。
- PR 描述里贴一张改动后的预览截图或说明新增了哪些变体，评审会快很多。
- 一个 PR 只做一件事：不要把「新增 10 个变体」和「重构样式」混在一起。

## 五、Issue

- 缺组件：写清分类 + 想要的风格（例如「表格需要 Stripe Dashboard 那种紧凑行高」）。
- 提示词不准：贴出组件名 + 你期望的修正点。
- 样式/功能 bug：贴浏览器版本 + 复现步骤 + 截图。
