# vav-ui-agent MCP server

把素材库的 702 个 UI 变体接到 Cursor / Claude Code / VS Code 里：一句话找参照，找到后取它的改造模板，而不是让模型凭记忆画界面。

**零依赖**：只用 Node 内置模块，不装任何 npm 包，不需要 API key。

## 五个工具

| 工具 | 作用 | 返回 |
| --- | --- | --- |
| `search` | 按关键词 / 风格标签 / 分类收窄范围 | 名称、slug、标签、一句话、链接（不含代码） |
| `get_inspiration` | 按标签 + 项目技术栈打分重排 | 相关度降序的候选 |
| `get_variant` | 取单个变体的 Markdown | 设计说明 + 一句话 + 改造模板 + 相关变体 |
| `get_catalog` | 取全库目录 | 702 个变体按分类列出 |
| `list_categories` | 列分类与数量 | 28 个分类 |

推荐顺序：`search` / `get_inspiration` 收窄 → 人眼确认 → `get_variant` 取一个。别一上来就 `get_catalog`，73KB 塞进上下文没必要。

## 配置

数据默认从 `https://ui.vavagent.com` 拉（带 10 分钟磁盘缓存，缓存目录 `~/.cache/vav-ui-mcp`）。

### Cursor

`~/.cursor/mcp.json` 或项目内 `.cursor/mcp.json`：

```json
{
  "mcpServers": {
    "vav-ui-agent": {
      "command": "node",
      "args": ["D:/www/vavagent/vavagent_ui/mcp/server.mjs"]
    }
  }
}
```

### Claude Code

```bash
claude mcp add vav-ui-agent -- node /path/to/vavagent_ui/mcp/server.mjs
```

### VS Code（Copilot / Continue）

```json
{
  "servers": {
    "vav-ui-agent": {
      "type": "stdio",
      "command": "node",
      "args": ["/path/to/vavagent_ui/mcp/server.mjs"]
    }
  }
}
```

### 离线 / 仓库内直读

已经有仓库副本时，让 server 直接读本地产物，不走网络：

```json
{
  "mcpServers": {
    "vav-ui-agent": {
      "command": "node",
      "args": ["/path/to/vavagent_ui/mcp/server.mjs"],
      "env": { "VAV_UI_LOCAL_DIR": "/path/to/vavagent_ui/public" }
    }
  }
}
```

`VAV_UI_LOCAL_DIR` 需要先跑过一次 `npm run generate`（要 `public/search.json`、`public/catalog.md`、`public/api/v/*.md`）。
自建站点时可用 `VAV_UI_BASE` 指向自己的域名。

## 用起来长什么样

配好之后，在对话框里直接说：

```text
用 vav-ui-agent 搜一下适合做 SaaS 定价区的卡片，Linear 或 Vercel 风格，
先给我 3 个候选（名称 + 一句话 + 链接），我选完你再取那个的完整提示词。
```

模型会依次调 `search` → 你确认 → `get_variant`，拿到「改造模板」后按里面的约束改你现有的页面。

想省事一点也可以把它写死成固定流程：

```text
找参照时按这个顺序：先 search 收窄到 3 个，再 get_inspiration 按我项目（Vue + Quasar，
antd 风格）重排，停下来等我确认，我说取哪个你再 get_variant，一次只取一个。
```

## 自检

```bash
node mcp/server.mjs
```

从 stdin 逐行喂 JSON-RPC 即可（MCP stdio 传输就是一行一个 JSON）：

```json
{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{}}}
{"jsonrpc":"2.0","id":2,"method":"tools/list"}
{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"search","arguments":{"query":"侧边栏","tags":["Linear"],"limit":3}}}
```
