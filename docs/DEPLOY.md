# 部署记录（ui.vavagent.com）

线上实例：<https://ui.vavagent.com/> · 代码仓库：<https://github.com/vavagent/vav-ui-agent>

- 首次部署：2026-11-13 12:16–12:24（服务器端构建，Nuxt SSR + better-sqlite3 + Node 常驻）
- 改为本地构建：2026-11-13 13:05（版本 `20261113-1345`，服务器只解包 + 重启）
- 改为静态 SSG：2026-11-13 13:12（版本 `20261113-1430`，nginx 直接托管，**已停用 Node 服务**）
- 执行人：AI 助手（本地 Windows 工作站 → 47.104.100.227）
- 项目：VAV UI-agent（Nuxt 3 → `nuxt generate` 纯静态站点）

## 1. 访问地址

- 正式地址：<https://ui.vavagent.com/>
- `http://ui.vavagent.com/...` 一律 301 跳转到 HTTPS 同路径

## 2. 本地与远端路径

| 项目 | 路径 |
| --- | --- |
| 本地工作副本 | `D:\www\vavagent\vavagent_ui`（GitHub `vavagent/vav-ui-agent` 的 clone） |
| 发版脚本 | `scripts/deploy.py`（本地 `nuxt generate` → 上传 → 切软链接 → 探活，见第 7 节） |
| 构建产物 | `%TEMP%\ui-static-<版本>.tar.gz`，约 320KB（只含 `.output/public`） |
| 静态站点根 | `/clouddream/nginx-proxy-manage/data/static/ui`（容器内 `/data/static/ui`） |
| 当前版本目录 | `.../static/ui/releases/20261113-1430/`（约 3MB：`index.html`、`guide/`、`filter/`、`_payload.json`、`catalog.json`、`_nuxt/`） |
| 生效入口（软链接） | `.../static/ui/current` → `releases/20261113-1430` |
| 旧 SSR 目录（保留） | `/opt/vavagent-ui`（含 `releases/20261113-1345`、`releases/20261113-1230`、`data/ui.db`） |

## 3. 运行方式

**当前没有任何服务端进程**：页面由 nginx 直接读静态文件，`vavagent-ui.service` 已 `disable --now`（unit 文件保留，可随时重新启用）。

| 项目 | 值 |
| --- | --- |
| 静态托管 | nginx 容器 `nginx-app`，`root /data/static/ui/current` |
| 兜底路由 | `try_files $uri $uri/ /200.html`（未知路径返回 200.html，由前端接管） |
| 缓存 | `/_nuxt/*` 一年 immutable；`/catalog.json` 300 秒 |
| 压缩 | gzip 已开：首页 HTML 72KB → 11.6KB，payload 655KB → 157KB |
| Node 服务 | 已停用；`systemctl enable --now vavagent-ui` 可恢复 SSR 版本（需同时改回 nginx 反代） |

## 4. Nginx 与证书

| 项目 | 路径 / 值 |
| --- | --- |
| 站点配置 | `/clouddream/nginx-proxy-manage/data/nginx/custom/http.conf`（容器内 `/data/nginx/custom/http.conf`） |
| 静态化前备份（含 443 反代段） | `http.conf.bak.ui-static-20261113-131259` 等 `http.conf.bak.ui-*` |
| 证书 | 容器 `/etc/letsencrypt/live/ui.vavagent.com/fullchain.pem`、`privkey.pem` |
| 签发方式 | Let's Encrypt，HTTP-01 / webroot，签发 2026-11-13，到期 2027-02-11 |
| ACME 校验目录 | `/clouddream/nginx-proxy-manage/data/letsencrypt-webroot`（容器 `/data/letsencrypt-webroot`） |
| 续期 | 既有 cron 每日 03:15 `certbot renew --quiet --deploy-hook "nginx -s reload"` |

配置内容：

- 80 端口：`/.well-known/acme-challenge/` 走 webroot，其余 301 到 HTTPS；
- 443 端口：挂 `ui.vavagent.com` 证书，`root /data/static/ui/current`，`index.html` 优先，gzip、`X-Content-Type-Options`、`Referrer-Policy`、禁止 `/\.` 路径。

## 5. 验证结果（静态版）

| 检查项 | 结果 |
| --- | --- |
| `https://ui.vavagent.com/` | 200，72649 字节 HTML，已含预渲染的分类/标签/卡片内容 |
| `/guide` `/filter` | 301 → `/guide/`、`/filter/`，200 |
| `/catalog.json` | 200，657948 字节 `application/json` |
| `/_payload.json` | 200，654881 字节，gzip 后 156767 字节 |
| gzip | 首页 HTML 72KB → 11589 字节 |
| 交互（浏览器实测） | 切分类 33 张卡片、`q=渐变&tag=Linear` 3 张、教程页正常 |
| 停止 Node 服务后 | 首页 / 教程页仍 200，`node` 进程数为 0 |
| 证书校验 | `CN=ui.vavagent.com`，SAN 仅该域名 |
| 其他站点未受影响 | www 200、vavagent.com 301、me 200、stats 303 |

## 6. 回退方法

以下命令均以 root 在宿主机执行；改 nginx 配置后必须 `nginx -t` 通过再 reload。

1. **回退到上一版静态内容**（即时生效，无需 reload）

```sh
ls -1dt /clouddream/nginx-proxy-manage/data/static/ui/releases/
ln -sfn releases/<旧版本号> /clouddream/nginx-proxy-manage/data/static/ui/current
```

2. **回到旧的 SSR 版本（Nuxt Node 服务）**

```sh
cd /clouddream/nginx-proxy-manage/data/nginx/custom
cp -p http.conf.bak.ui-static-20261113-131259 http.conf   # 恢复 443 反代段
docker exec nginx-app nginx -t && docker exec nginx-app nginx -s reload
systemctl enable --now vavagent-ui                        # 启动 /opt/vavagent-ui/current
curl -s -o /dev/null -w '%{http_code}\n' http://172.17.0.1:3210/
```

3. **彻底撤掉 ui 站点**

```sh
cd /clouddream/nginx-proxy-manage/data/nginx/custom
cp -p http.conf.bak.ui-20261113-122054 http.conf          # 不含 ui 段
docker exec nginx-app nginx -t && docker exec nginx-app nginx -s reload
systemctl disable vavagent-ui
docker exec nginx-app certbot delete --cert-name ui.vavagent.com
rm -rf /clouddream/nginx-proxy-manage/data/static/ui /opt/vavagent-ui
```

注意：删 `/opt/vavagent-ui` 会连 `data/ui.db` 一起删掉。

## 7. 发版方式：本地生成静态站，服务器只放文件

线上不跑构建、不跑 Node：本地 `nuxt generate` 出静态文件，`scp`/上传到服务器切软链接即可。入口脚本：`scripts/deploy.py`。

```powershell
cd D:\www\vavagent\vavagent_ui
python scripts\deploy.py                 # 生成 + 打包 + 上传 + 切版本 + 探活（失败自动回滚）
python scripts\deploy.py --skip-build    # 复用现有 .output/public，只发布
python scripts\deploy.py --dry-run       # 只生成和打包，观察产物大小
```

脚本做的事：

1. 缺 `node_modules` 时先 `npm ci`，然后 `npm run generate`；
2. `scripts/make-catalog.mjs` 把 `server/database/seed-snapshot.json` 导出成 `public/catalog.json`（28 分类 / 702 变体 / 643KB），构建期由 `server/api/catalog.get.ts` 读取后写进 `_payload.json`；
3. 校验 `.output/public/index.html` 里确实有预渲染内容（没有就中止，避免发出空壳页面）；
4. 打包 `.output/public` 为 tar.gz（约 320KB，比 SSR 的 1.6MB 小一个量级）；
5. 上传 `/tmp` → 解包到 `.../static/ui/releases/<版本>` → 切 `current` 软链接；
6. 探活 `https://ui.vavagent.com/`（200 且含「导航菜单」），失败自动把软链接指回上一版；
7. 只保留最近 3 个静态版本。

**为什么 scp 就够了**：静态站没有原生库、没有 Node 依赖，产物就是一堆文本文件，传输层用 `scp` / `tar` / `rsync` 都行。`deploy.py` 剩下的价值只有三件事：统一构建入口、原子切换（软链接）、探活失败自动回滚。想手动发也可以：

```sh
V=$(date +%Y%m%d-%H%M)
scp ui-static-$V.tar.gz root@47.104.100.227:/tmp/
ssh root@47.104.100.227 "mkdir -p /clouddream/nginx-proxy-manage/data/static/ui/releases/$V && \
  tar -xzf /tmp/ui-static-$V.tar.gz -C /clouddream/nginx-proxy-manage/data/static/ui/releases/$V && \
  ln -sfn releases/$V /clouddream/nginx-proxy-manage/data/static/ui/current"
```

排障提示：

- 服务器只有 2 核 / 1.9GB 内存，静态化后这台机器不再需要 Node 和构建，压力只剩 nginx；
- 静态版没有 API 了（`/api/*` 不存在），前端所有筛选在浏览器本地完成；
- `deploy.py` 读取 `D:\www\vavagent\ssh.env` 里的服务器地址与密码，该文件在仓库外，不要提交。

## 8. 数据说明

- **内容在构建时固化**：`public/catalog.json` 来自 `server/database/seed-snapshot.json`，页面内容随版本走。改数据必须重新构建发版，线上不会再实时读库。
- 旧的 `data/ui.db` 只留在 `/opt/vavagent-ui` 作为 SSR 回退用，静态站不读它。
- 如果将来要在页面上编辑内容，需要恢复 SSR（或加一层写入 API 后再重建静态站）。

### 8.1 构建产物清单

| 产物 | 说明 |
| --- | --- |
| `public/catalog.json` | 首页全量数据（约 727KB），含 `slug` / `prompt` / `prompt_short` / `preview_html` |
| `public/search.json` | 精简索引（约 175KB），给 AI 或脚本按标签/关键词筛 |
| `public/catalog.md` | 全库目录 Markdown |
| `public/api/v/<slug>.json` | 单变体完整数据（含 `prompt_refactor`、`related`） |
| `public/api/v/<slug>.md` | 单变体 Markdown，直接丢给 AI 即可 |
| `.output/public/v/<slug>/index.html` | 702 个详情页，构建期逐个预渲染（`nuxt.config.ts` 从 catalog.json 生成路由） |

详情页取数走双路径：构建期 `/api/variant?slug=...`（`server/api/variant.get.ts` 读本地文件），运行时 `/api/v/<slug>.json`。

nginx 侧新增一条规则，保证 Markdown 的 MIME 正确，否则部分 agent 会把它当二进制：

```nginx
location ~* \.md$ {
    default_type text/markdown;
}
```

（已写入 `http.conf`，备份 `http.conf.bak.ui-md-20261117`。）

## 9. 访问统计（自带埋点，无第三方）

链路：前端 `track()` → `GET /collect.gif?ev=...` → nginx 写日志 → 服务器 cron 汇总 → `/stats.json` → `/stats` 看板。

| 项目 | 值 |
| --- | --- |
| 前端埋点 | `composables/useTrack.ts`（`track(event, params)`）、`plugins/track.client.ts`（PV，仅 path 变化才计） |
| 采集端点 | nginx `location = /collect.gif`，写 `/data/logs/ui-collect.log`，返回 204 |
| 日志格式 | `log_format vav_ui`：`ISO时间 \t ev \t cat \t name \t q \t path \t IP \t UA` |
| 汇总脚本 | `scripts/stats-aggregate.py`，服务器上装在 `/usr/local/bin/vav-ui-stats.py` |
| 汇总周期 | cron `*/5 * * * *`，日志读完即清空 |
| 输出 | `/clouddream/nginx-proxy-manage/data/static/ui/live/stats.json`（nginx `location = /stats.json`） |
| 看板 | <https://ui.vavagent.com/stats>（`pages/stats.vue`） |
| 数据保留 | 最近 60 天 |

事件口径：

| 事件 | 触发 | 记录字段 |
| --- | --- | --- |
| `pv` | 路由 path 变化（首屏一次） | path、cat、q |
| `cat` | 左侧切分类 | cat |
| `tag` | 点风格标签 / 风格弹窗选择 | name=标签 |
| `search` | 搜索框输入停止 800ms 后 | q |
| `view` | 卡片进入视口（滚动扫描，每个变体每页只记一次） | cat、name=变体名 |
| `copy` | 点「复制」提示词 | cat、name=变体名 |

隐私：日志里只保留原始 IP 用于当天 UV 去重，汇总时立刻替换成 `sha1(日期|IP)` 前 12 位，原始 IP 随日志清空丢弃；不使用 Cookie、不接第三方统计。

常用操作：

```sh
# 手动汇总一次
python3 /usr/local/bin/vav-ui-stats.py

# 清空统计（看板归零）
truncate -s 0 /clouddream/nginx-proxy-manage/data/logs/ui-collect.log
echo '{"updated_at":null,"days":{}}' > /clouddream/nginx-proxy-manage/data/static/ui/live/stats.json

# 看采集是否在工作
tail -5 /clouddream/nginx-proxy-manage/data/logs/ui-collect.log
crontab -l | grep vav-ui-stats
```

改埋点格式时注意：nginx 的 `$arg_*` 是 URL 编码值，汇总脚本用 `unquote_plus` 解码。

