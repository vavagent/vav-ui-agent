#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
VAV UI-agent 发版脚本（静态 SSG 模式）

本地做的事：npm run generate → 打包 .output/public → 上传 → 切 current 软链接 → 探活
服务器只做：解包 + 切换软链接，没有任何构建，也不再需要 Node 常驻进程。

用法：
    python scripts/deploy.py                 # 构建 + 发布
    python scripts/deploy.py --skip-build     # 复用已有 .output/public 只发布
    python scripts/deploy.py --dry-run        # 只构建和打包，不上传

依赖：pip install paramiko
配置：读 D:\\www\\vavagent\\ssh.env（SSH_HOST / SSH_USER / SSH_PASSWORD / 可选 SSH_PORT）
"""
from __future__ import annotations

import argparse
import os
import subprocess
import sys
import tarfile
import time
import urllib.request
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / ".output" / "public"
ENV_FILE = Path(r"D:\www\vavagent\ssh.env")

STATIC_ROOT = "/clouddream/nginx-proxy-manage/data/static/ui"
KEEP_RELEASES = 3
HEALTH_URL = "https://ui.vavagent.com/"
HEALTH_MARK = "导航菜单"


def load_env() -> dict:
    cfg = {}
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        cfg[k.strip()] = v.strip()
    return cfg


def run(cmd: list[str], cwd: Path | None = None) -> None:
    print(f"[run] {' '.join(cmd)}")
    subprocess.run(cmd, cwd=str(cwd or ROOT), check=True, shell=False)


def build() -> None:
    if not (ROOT / "node_modules").exists():
        run(["npm", "ci"])
    run(["npm", "run", "generate"])


def verify_dist() -> None:
    index = DIST / "index.html"
    catalog = DIST / "catalog.json"
    if not index.exists():
        sys.exit("构建产物缺失：.output/public/index.html")
    if not catalog.exists():
        sys.exit("构建产物缺失：.output/public/catalog.json")
    html = index.read_text(encoding="utf-8", errors="ignore")
    if HEALTH_MARK not in html:
        sys.exit("index.html 里没有预渲染内容，说明构建期没取到数据")
    print(f"[ok] index.html {len(html)//1024} KB / catalog.json {catalog.stat().st_size//1024} KB")


def pack(version: str) -> Path:
    art = Path(os.environ.get("TEMP", "/tmp")) / f"ui-static-{version}.tar.gz"
    if art.exists():
        art.unlink()
    with tarfile.open(art, "w:gz") as tf:
        for item in sorted(DIST.iterdir()):
            tf.add(item, arcname=item.name)
    print(f"[ok] 打包 {art.name} {art.stat().st_size//1024} KB")
    return art


def connect(cfg: dict):
    import paramiko

    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(
        cfg["SSH_HOST"],
        int(cfg.get("SSH_PORT", "22")),
        username=cfg["SSH_USER"],
        password=cfg["SSH_PASSWORD"],
        timeout=20,
    )
    return client


def ssh(client, cmd: str) -> tuple[int, str, str]:
    stdin, stdout, stderr = client.exec_command(cmd, timeout=120)
    out = stdout.read().decode("utf-8", "replace")
    err = stderr.read().decode("utf-8", "replace")
    code = stdout.channel.recv_exit_status()
    return code, out, err


def deploy(cfg: dict, version: str, artifact: Path) -> bool:
    client = connect(cfg)
    try:
        sftp = client.open_sftp()
        remote_art = f"/tmp/ui-static-{version}.tar.gz"
        sftp.put(str(artifact), remote_art)
        print(f"[ok] 上传 {remote_art} {artifact.stat().st_size//1024} KB")
        sftp.close()

        code, out, err = ssh(client, f"readlink -f {STATIC_ROOT}/current || true")
        prev = out.strip() if code == 0 else ""
        print(f"[info] 当前版本：{prev or '无'}")

        script = (
            f"set -e; V={version}; ART={remote_art}; ROOT={STATIC_ROOT}; "
            'mkdir -p "$ROOT/releases/$V"; rm -rf "$ROOT/releases/$V"; mkdir -p "$ROOT/releases/$V"; '
            'tar -xzf "$ART" -C "$ROOT/releases/$V"; rm -f "$ART"; '
            'ln -sfn "releases/$V" "$ROOT/current"; '
            'ls -1dt "$ROOT"/releases/*/ | tail -n +{keep} | xargs -r rm -rf; '.format(keep=KEEP_RELEASES + 1)
            + 'echo switched=$(readlink "$ROOT/current")'
        )
        code, out, err = ssh(client, script)
        if code != 0:
            print(f"[error] 远端部署失败：{err.strip() or out.strip()}")
            return False
        print(f"[ok] 已切换 {out.strip()}")

        if health_check():
            print("[ok] 线上探活通过")
            return True

        print("[warn] 探活失败，回滚软链接")
        if prev:
            ssh(client, f'ln -sfn "{prev}" {STATIC_ROOT}/current')
            print(f"[warn] 已回滚到 {prev}")
        return False
    finally:
        client.close()


def health_check(tries: int = 3) -> bool:
    for i in range(tries):
        try:
            req = urllib.request.Request(HEALTH_URL, headers={"User-Agent": "vav-deploy/1.0"})
            with urllib.request.urlopen(req, timeout=10) as resp:
                body = resp.read().decode("utf-8", "ignore")
            if resp.status == 200 and HEALTH_MARK in body:
                return True
            print(f"[health] 第 {i+1} 次异常：status={resp.status}")
        except Exception as exc:  # noqa: BLE001
            print(f"[health] 第 {i+1} 次异常：{exc}")
        time.sleep(3)
    return False


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--skip-build", action="store_true", help="复用已有 .output/public")
    ap.add_argument("--dry-run", action="store_true", help="只构建打包，不发布")
    args = ap.parse_args()

    if not args.skip_build:
        build()
    verify_dist()

    version = datetime.now().strftime("%Y%m%d-%H%M")
    artifact = pack(version)
    if args.dry_run:
        print(f"[dry-run] 产物：{artifact}")
        return

    ok = deploy(load_env(), version, artifact)
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
