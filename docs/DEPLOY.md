# 部署记录（ui.vavagent.com）

线上实例：<https://ui.vavagent.com/> · 代码仓库：<https://github.com/vavagent/vav-ui-agent>

- 首次部署：2026-11-13 12:16–12:24（服务器时间 CST）
- 执行人：AI 助手（本地 Windows 工作站 → 47.104.100.227）
- 项目：VAV UI-agent（Nuxt 3 SSR + better-sqlite3，UI 提示词素材库）

## 1. 访问地址

- 正式地址：<https://ui.vavagent.com/>
- `http://ui.vavagent.com/...` 一律 301 跳转到 HTTPS 同路径

## 2. 本地与远端路径

| 项目 | 路径 |
| --- | --- |
| 本地工作副本 | `D:\www\vavagent\vavagent_ui`（GitHub `vavagent/vav-ui-agent` 的 clone） |
| 上传用源码包 | `D:\www\vavagent\vav-ui-src.tar.gz`（不含 `.git` / `.github`） |
| 服务器应用根 | `/opt/vavagent-ui` |
| 版本目录 | `/opt/vavagent-ui/releases/20261113-1230/`（含 `node_modules`、`.output`，276MB） |
| 生效入口（软链接） | `/opt/vavagent-ui/current` → `releases/20261113-1230` |
| 持久化数据 | `/opt/vavagent-ui/data/ui.db`（WAL，首次启动自动建表并装载 702 条变体） |
| 快照副本（供生产进程读取） | `/opt/vavagent-ui/server/database/seed-snapshot.json` |

注意：`server/database/index.ts` 用 `process.cwd()` 定位 `data/` 和 `server/database/seed-snapshot.json`，所以 systemd 的 `WorkingDirectory` 必须是 `/opt/vavagent-ui`，而不是版本目录。

## 3. 运行方式

| 项目 | 值 |
| --- | --- |
| systemd 单元 | `/etc/systemd/system/vavagent-ui.service`（enabled，active） |
| 启动命令 | `/usr/local/bin/node /opt/vavagent-ui/current/.output/server/index.mjs` |
| 监听 | `172.17.0.1:3210`（只对 Docker 网桥开放，不直接暴露公网） |
| 环境变量 | `NODE_ENV=production`、`PORT=3210`、`HOST=172.17.0.1`、`NODE_OPTIONS=--max-old-space-size=600` |
| 重启策略 | `Restart=on-failure`，`RestartSec=3` |
| Node 版本 | v22.23.4（服务器 `/usr/local/bin/node`） |

## 4. Nginx 与证书

| 项目 | 路径 / 值 |
| --- | --- |
| 站点配置 | `/clouddream/nginx-proxy-manage/data/nginx/custom/http.conf`（容器内 `/data/nginx/custom/http.conf`） |
| 部署前备份（不含 ui 站点） | `http.conf.bak.ui-20261113-122054` |
| 切 HTTPS 前备份（含 80 段） | `http.conf.bak.ui-https-20261113-122152` |
| 证书 | 容器 `/etc/letsencrypt/live/ui.vavagent.com/fullchain.pem`、`privkey.pem` |
| 签发方式 | Let's Encrypt，HTTP-01 / webroot，签发 2026-11-13，到期 2027-02-11 |
| ACME 校验目录 | `/clouddream/nginx-proxy-manage/data/letsencrypt-webroot`（容器 `/data/letsencrypt-webroot`） |
| 续期 | 既有 cron 每日 03:15 `certbot renew --quiet --deploy-hook "nginx -s reload"`，新证书自动纳入 |

配置内容：

- 80 端口：`/.well-known/acme-challenge/` 走 webroot，其余 301 到 HTTPS；
- 443 端口：挂 `ui.vavagent.com` 证书，`proxy_pass http://172.17.0.1:3210`，带 `Host` / `X-Real-IP` / `X-Forwarded-For` / `X-Forwarded-Proto`，开启 gzip，`client_max_body_size 2m`，禁止 `/\.` 路径。

## 5. 验证结果

| 检查项 | 结果 |
| --- | --- |
| `https://ui.vavagent.com/` | 200，163800 字节，HTTP/2 |
| `/guide` `/filter` | 200 / 200 |
| 证书校验（系统 CA） | `ssl_verify_result=0`，`CN=ui.vavagent.com`，SAN 仅该域名 |
| HTTP → HTTPS | 301 → `https://ui.vavagent.com/` |
| API | `/api/categories` 200（四大分组 JSON），`/api/components?cat=nav` 200（返回 Linear 风格变体） |
| 数据装载 | 启动日志 `[seed] snapshot inserted 702 components` |
| 其他站点未受影响 | www 200、vavagent.com 301、me 200、stats 303，证书校验均为 0 |
| 服务开机自启 | `systemctl is-enabled` = enabled，`is-active` = active |

## 6. 回退方法

以下命令均以 root 在宿主机执行；改配置后必须 `nginx -t` 通过再 reload。

1. **内容回退到上一版**（即时生效，需重启服务）

```sh
ln -sfn releases/<旧版本号> /opt/vavagent-ui/current
systemctl restart vavagent-ui
```

2. **只退回 80 段（去掉 HTTPS）**

```sh
cd /clouddream/nginx-proxy-manage/data/nginx/custom
cp -p http.conf.bak.ui-https-20261113-122152 http.conf
docker exec nginx-app nginx -t && docker exec nginx-app nginx -s reload
```

3. **彻底撤掉 ui 站点**

```sh
cd /clouddream/nginx-proxy-manage/data/nginx/custom
cp -p http.conf.bak.ui-20261113-122054 http.conf
docker exec nginx-app nginx -t && docker exec nginx-app nginx -s reload
systemctl disable --now vavagent-ui
docker exec nginx-app certbot delete --cert-name ui.vavagent.com
rm -rf /opt/vavagent-ui
```

注意：删 `/opt/vavagent-ui` 会连 `data/ui.db` 一起删掉，库里的增量数据（如果在页面上新增过变体）需要先导出。

## 7. 下次发版步骤

1. 本地改代码（`D:\www\vavagent\vavagent_ui`），需要时同步推到 GitHub。
2. 打源码包（排除 `.git`/`.github`）：

```powershell
cd D:\www\vavagent\vavagent_ui
tar -czf D:\www\vavagent\vav-ui-src.tar.gz --exclude=.git --exclude=.github .
```

3. 上传到服务器 `/tmp/vav-ui-src.tar.gz`，在服务器上构建（不要在 Windows 上构建，`better-sqlite3` 等原生模块平台不同）：

```sh
V=$(date +%Y%m%d-%H%M)
mkdir -p /opt/vavagent-ui/releases/$V
tar -xzf /tmp/vav-ui-src.tar.gz -C /opt/vavagent-ui/releases/$V
cp /opt/vavagent-ui/releases/$V/server/database/seed-snapshot.json /opt/vavagent-ui/server/database/seed-snapshot.json
cd /opt/vavagent-ui/releases/$V
NODE_OPTIONS=--max-old-space-size=1024 npm ci --no-audit --no-fund
npm run build
ln -sfn releases/$V /opt/vavagent-ui/current
systemctl restart vavagent-ui
```

4. 验证 `curl -s -o /dev/null -w '%{http_code}' https://ui.vavagent.com/`，正常后旧版本目录可保留一版再删。

排障提示：机器只有 2 核 / 1.9GB 内存（另有 1GB swap），构建时不要同时跑别的 Node 构建；`npm ci` 会为 `better-sqlite3` 下载 Linux 预编译包，需要外网。

## 8. 数据说明

- 线上库独立于仓库：仓库里的 `seed-snapshot.json` 只用于**空库首次装载**；线上新增/修改的变体只存在 `data/ui.db`。
- 如需把线上数据回流到仓库，导出 `components` 表为 JSON 覆盖 `seed-snapshot.json` 再提交。
- 备份建议：`sqlite3 /opt/vavagent-ui/data/ui.db ".backup /root/backup/ui-$(date +%F).db"`（WAL 下不要直接 cp 主文件）。
