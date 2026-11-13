# 开源发布流程（Open Source Playbook）

这份文档记录「VAV UI-agent」从本地项目变成公开仓库的完整流程，以及后续维护约定。可以直接当作同类项目的模板复用。

## 0. 当前状态

| 事项 | 状态 |
| --- | --- |
| 敏感信息与产物自检 | ✅ 已完成（见第 1 节） |
| `.gitignore` / `LICENSE` / `README` / `CONTRIBUTING` / `CHANGELOG` | ✅ 已补齐 |
| 本地 Git 仓库初始化 + 首次提交 | ✅ 已完成（`main` 分支） |
| 创建 GitHub 远程仓库 | ✅ [vavagent/vav-ui-agent](https://github.com/vavagent/vav-ui-agent)（Public） |
| 首次推送 + About / Topics 设置 | ✅ 已完成（`main` 分支，9 个 topics，SSH 部署密钥） |
| CI 构建检查 | ✅ 已通过（`.github/workflows/ci.yml`：`npm ci` + `npm run build`） |
| 打 tag / 发布 Release | ⏳ 建议下一个动作（见第 6 节） |

## 1. 开源前自检清单

开源不是「把文件夹传上去」，先确认三件事：**没有泄露、没有冗余、别人能跑起来**。

### 1.1 敏感信息

- [x] 全量扫描源码中的 `http://`、`token`、`secret`、`password`、`localhost`、内网地址：源码只有一处首页 GitHub 链接占位（`https://github.com`），无密钥、无账号、无内部域名。
- [x] 环境变量文件：确认不存在 `.env`、`.env.local`（`.gitignore` 已兜底）。
- [ ] 提交前用 `git ls-files` 复查一次将要公开的文件清单，确认没有日志、数据库导出、私人截图混进来。

### 1.2 排除构建与运行产物

仓库只保留源码与种子数据，以下内容已写入 `.gitignore`：

| 排除项 | 原因 |
| --- | --- |
| `node_modules/` | 依赖，`npm install` 可重建 |
| `.nuxt/`、`.output/`、`dist/`、`.cache/` | Nuxt 构建产物 |
| `data/*.db`、`*.db-shm`、`*.db-wal` | 运行时生成的 SQLite 库，首次启动自动重建 |
| `.data/` | Nitro 运行时存储 |
| `*.bak` | 例如 `index.static.html.bak` 这类历史备份，不该进版本库 |
| `.env` / `.env.*` | 环境变量 |

保留的「必要资产」：`server/database/seed-snapshot.json`（700+ 条数据的唯一来源）、`home.png` / `modal.png`（README 截图）。

### 1.3 数据与版权

- 700+ 条组件变体、提示词、预览 HTML 均为项目自建内容，可以随 MIT 许可公开。
- 提示词里出现的 Linear、Vercel、Ant Design、小红书等名称只用于**描述风格取向**，不含其商标、图标、设计稿原件。README 末尾已声明「与这些公司无关联」。
- `LICENSE` 里的版权人是 `VAV UI-agent`（占位）。如果希望署名到个人或公司，把 `Copyright (c) 2026 VAV UI-agent` 改成真实主体即可，注意受雇期间的作品归属问题要先确认。

### 1.4 能不能跑起来

- [x] `npm run dev` 端口固定 3210，`package.json` 脚本与 README 一致。
- [x] 空库可自动建表 + 装载快照，克隆后无需手动导数据。
- [ ] 建议在干净目录里 `git clone` 一次自己的仓库 + `npm install` + `npm run dev` 走一遍，确认没有依赖本机残留文件（尤其是 `data/ui.db`）。

## 2. 本地仓库（已完成）

```bash
git init -b main
git add -A
git commit -m "feat: 初始化 VAV UI-agent UI 提示词素材库"
```

查看这次提交到底包含了什么：

```bash
git ls-files
```

如果发现该忽略的没忽略，修 `.gitignore` 后执行：

```bash
git rm -r --cached .
git add -A
git commit -m "chore: 修正 .gitignore"
```

## 3. 创建 GitHub 远程仓库

### 方式 A：网页建仓（最稳）

1. 打开 https://github.com/new
2. Repository name 填 `vav-ui-agent`（或你喜欢的名字）
3. 选择 Public
4. **不要**勾选 "Add a README / .gitignore / license"（本地已有，勾了会产生冲突提交）
5. 创建后拿到地址，例如 `https://github.com/<你的用户名>/vav-ui-agent.git`

### 方式 B：GitHub CLI

本机当前没有安装 `gh`，需要先装：

```powershell
winget install --id GitHub.cli -e
```

重开终端后登录并建仓、推送一步到位：

```bash
gh auth login
gh repo create vav-ui-agent --public --source=. --remote=origin --push
```

### 方式 C：已经有仓库

跳过建仓，直接第 4 节，把 `origin` 指向已有仓库。

## 4. 关联远程并推送

本次已经配置好（仓库内配置，不是全局）：

| 配置 | 值 |
| --- | --- |
| `user.name` | `vavagent` |
| `user.email` | GitHub noreply 地址（`<id>+vavagent@users.noreply.github.com`），避免公开真实邮箱 |
| `origin` | `git@github.com:vavagent/vav-ui-agent.git`（SSH） |
| `core.sshCommand` | `ssh -i ~/.ssh/id_ed25519_vav_ui -o IdentitiesOnly=yes` |

鉴权用的是单独生成的 SSH 部署密钥 `id_ed25519_vav_ui`，公钥已添加到账号的 SSH keys（标题 `vav-ui-agent push key`）。换机器时重新生成一对、把公钥加到 GitHub 即可，不需要密码或 token。

如果以后要换成自己习惯的身份或 HTTPS 方式，按下面命令重配：

```bash
git config --local user.name "你的名字"
git config --local user.email "你的邮箱"
git commit --amend --reset-author --no-edit    # 只改作者，不改内容

git remote set-url origin https://github.com/<你的用户名>/vav-ui-agent.git
git push -u origin main
```

HTTPS 推送会弹浏览器授权（Git Credential Manager）；用 SSH 则保持 `git@github.com:<你的用户名>/vav-ui-agent.git`，并确保对应公钥已添加到 GitHub。

## 5. 仓库设置（推上去之后 10 分钟内做完）

- [x] **About**：Description 填一句话——「28 类 UI 组件 / 700+ 个可直接复制的 AI 提示词变体，按分类和产品风格整理」。
- [x] **Topics**：`ui` `design-system` `prompt-engineering` `nuxt` `vue` `ai` `sqlite` `component-library` `design-inspiration`
- [ ] **Social preview**：上传一张 1280×640 的图（可以用 `home.png` 裁切），分享到群里/推特时有卡片。
- [x] **Issues**：已开启；建议补标签 `good first issue`、`content`（新增组件变体属于内容贡献，门槛低）。
- [ ] **Discussions**：可选开启，用于收集「想要哪个分类」这类开放讨论。
- [ ] **分支保护**：`main` 设为 Require PR + 至少 1 approval（单人项目可只保留 Require PR，防手滑直推）。
- [x] **Actions**：已加最小 CI（`.github/workflows/ci.yml`），只跑 `npm ci` + `npm run build`，最新一次运行已通过。
- [x] **首页 GitHub 链接**：`pages/index.vue` 顶部导航已指向 `https://github.com/vavagent/vav-ui-agent`。

### 关于线上部署（重要）

项目是 SSR + better-sqlite3 单文件库，**不适合 GitHub Pages 静态托管**，也不适合无持久磁盘的 Serverless：

- GitHub Pages 只能托管静态文件，跑不了 Node 服务和 native 模块；
- Vercel / Netlify 这类函数的文件系统是临时的，写入 `data/ui.db` 不会持久，每次冷启动都会重建（只读场景勉强可用，改数据就丢）。

推荐：一台 VPS / Docker 容器 + 挂载 `data/` 卷，或使用带持久磁盘的托管平台。若要长期运营，后续可以把数据存储换成 Postgres 或 Turso（libSQL），只留一层数据访问接口。

## 6. 首次发布 Release

```bash
git tag -a v0.1.0 -m "v0.1.0 首个开源版本"
git push origin v0.1.0
```

在 GitHub 的 Releases 页面基于 `v0.1.0` 创建 Release，说明直接取 `CHANGELOG.md` 的 `0.1.0` 段落，勾选 "Set as the latest release"。

版本约定（语义化版本）：

| 变动 | 版本位 | 例子 |
| --- | --- | --- |
| 新增组件分类 / 大量变体 | MINOR | 0.1.0 → 0.2.0 |
| 修提示词、改样式、修 bug | PATCH | 0.2.0 → 0.2.1 |
| 破坏性变更（数据表结构、路由） | MAJOR | 1.0.0 起 |

## 7. 后续维护节奏

- **内容型 PR 优先**：新增变体只需要「改快照 + 提供预览 HTML + 提示词符合公式」，评审成本低，适合拉人参与。
- **Issue 模板**：可选加 `.github/ISSUE_TEMPLATE/`，分「缺某个组件」「提示词不准」「样式问题」三类，避免 issue 里全是"能不能加个 X"。
- **数据一致性**：任何通过页面/直连库新增的组件，都要同步回 `seed-snapshot.json`，否则别人克隆后看不到。
- **发版节奏**：攒够一批内容再发 PATCH/MINOR，不必每次提交都发版。
- **README 常更新**：截图（`home.png` / `modal.png`）换成最新界面，首屏图决定别人点不点进来。

## 8. 常见坑

1. **`better-sqlite3` 安装失败**：Windows 需要 VS Build Tools；Node 版本过新可能没有预编译二进制，README 已要求 Node >= 20，遇到报错优先降到 LTS。
2. **快照不生效**：`seed-snapshot.json` 只在空库时装载，老库改了快照不会变，删 `data/ui.db` 重建。
3. **误提交数据库**：`data/ui.db` 一旦进了历史，即使后来 ignore 也会留在提交里，只能 `git rm --cached` 后重写历史或换新仓库。
4. **`.bak` 文件**：`index.static.html.bak` 是早期静态原型，已在 ignore 里，不要提交。
5. **推送被拒**：`remote: Repository not found` 多为地址拼错或没有该仓库权限；`Permission denied (publickey)` 是 SSH key 未配置。
6. **`npm ci` 报锁文件不一致 / CI 报 `Cannot find native binding`**：在已有 `node_modules` 时重建锁文件，会丢掉 Linux 等平台的原生可选依赖（oxc、lightningcss、rollup），并可能漏掉 cac / commander 这类冲突版本的嵌套副本。正确做法：把 `node_modules` 移开 → 删掉 `package-lock.json` → 跑一次真实 `npm install` → 提交新锁文件。本项目 CI 就是按这个方式修好的（见提交历史 #2–#4）。
7. **SSH 密钥带口令**：`ssh-keygen -N ""` 在 PowerShell 里容易把 `-N` 传成字面 `""`，导致密钥实际有口令、非交互推送报 `Permission denied (publickey)`；需要时用 `cmd /c` 生成，或用 `ssh-keygen -p` 清掉口令。
