#!/usr/bin/env python3
"""VAV UI-agent：本地构建 → 上传 → 切版本（服务器只负责运行，不做构建）

用法（在 D:\\www\\vavagent\\vavagent_ui 下）：
    python scripts/deploy.py                # 构建并发布
    python scripts/deploy.py --skip-build   # 用现有 .output 直接发布
    python scripts/deploy.py --version 20261113-1340

为什么需要替换原生库：better-sqlite3 是 C++ 扩展，Windows 编出来的
better_sqlite3.node 在 Linux 上加载会报 invalid ELF header。这里在打包前
把它替换成官方 node-v127-linux-x64 预编译包（Node 22 = ABI 127）。
"""

import argparse, os, shutil, subprocess, sys, tarfile, tempfile, time, urllib.request
from pathlib import Path

import paramiko

ROOT = Path(__file__).resolve().parents[1]
ENV_FILE = ROOT.parent / "ssh.env"
APP_DIR = "/opt/vavagent-ui"
SERVICE = "vavagent-ui"
INTERNAL_URL = "http://172.17.0.1:3210/"
PUBLIC_URL = "https://ui.vavagent.com/"

BSQ3_VERSION = "11.10.0"   # 与 package-lock.json 保持一致
NODE_ABI = "127"          # Node 22
PREBUILD_URL = (
    f"https://github.com/WiseLibs/better-sqlite3/releases/download/v{BSQ3_VERSION}/"
    f"better-sqlite3-v{BSQ3_VERSION}-node-v{NODE_ABI}-linux-x64.tar.gz"
)
CACHE_DIR = Path(os.environ.get("LOCALAPPDATA", tempfile.gettempdir())) / "vav-ui-deploy-cache"


def log(msg):
    print(f"[deploy] {msg}", flush=True)


def run(cmd, cwd=ROOT, env=None):
    log("$ " + " ".join(str(c) for c in cmd))
    full_env = os.environ.copy()
    if env:
        full_env.update(env)
    shell = os.name == "nt" and cmd[0] in ("npm", "npx", "node")
    if shell:
        cmd = ["cmd", "/c"] + [str(c) for c in cmd]
    r = subprocess.run(cmd, cwd=str(cwd), env=full_env)
    if r.returncode != 0:
        sys.exit(f"命令失败：{cmd}")


def load_ssh():
    cfg = {}
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            cfg[k.strip()] = v.strip()
    for k in ("SSH_HOST", "SSH_USER", "SSH_PASSWORD"):
        if not cfg.get(k):
            sys.exit(f"{ENV_FILE} 缺少 {k}")
    return cfg


def ensure_prebuild():
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    archive = CACHE_DIR / Path(PREBUILD_URL).name
    target = CACHE_DIR / "better_sqlite3.node"
    if target.exists():
        log(f"缓存命中：{target}")
        return target
    if not archive.exists():
        log(f"下载 Linux 预编译包：{archive.name}")
        urllib.request.urlretrieve(PREBUILD_URL, archive)
    with tarfile.open(archive) as tf:
        members = [m for m in tf.getmembers() if m.name.endswith("better_sqlite3.node")]
        if not members:
            sys.exit("预编译包里找不到 better_sqlite3.node")
        member = members[0]
        with tf.extractfile(member) as src, open(target, "wb") as dst:
            shutil.copyfileobj(src, dst)
    log(f"解出 {target}（{target.stat().st_size} 字节）")
    return target


def build():
    if not (ROOT / "node_modules").exists():
        run(["npm", "ci", "--no-audit", "--no-fund"])
    run(["npm", "run", "build"])
    out = ROOT / ".output" / "server" / "index.mjs"
    if not out.exists():
        sys.exit("构建没有产出 .output/server/index.mjs")


def swap_native():
    linux_node = ensure_prebuild()
    dest = ROOT / ".output" / "server" / "node_modules" / "better-sqlite3" / "build" / "Release" / "better_sqlite3.node"
    if not dest.parent.exists():
        sys.exit(f"输出里没有 better-sqlite3：{dest.parent}")
    shutil.copy2(linux_node, dest)
    log(f"已替换为 Linux 原生库：{dest}（{dest.stat().st_size} 字节）")


def pack(version):
    tmp = Path(tempfile.gettempdir()) / f"vav-ui-build-{version}.tar.gz"
    if tmp.exists():
        tmp.unlink()
    run(["tar", "-czf", str(tmp), "-C", str(ROOT), ".output"])
    log(f"产物 {tmp}（{tmp.stat().st_size / 1024 / 1024:.1f} MB）")
    return tmp


def connect(cfg):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(cfg["SSH_HOST"], int(cfg.get("SSH_PORT", "22")),
                   username=cfg["SSH_USER"], password=cfg["SSH_PASSWORD"], timeout=20)
    return client


def exec_cmd(client, cmd, timeout=120, check=True):
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout)
    out = stdout.read().decode("utf-8", "replace")
    err = stderr.read().decode("utf-8", "replace")
    rc = stdout.channel.recv_exit_status()
    if check and rc != 0:
        sys.exit(f"远程命令失败（{rc}）：{cmd}\n{out}\n{err}")
    return out, err, rc


def deploy(cfg, artifact, version):
    client = connect(cfg)
    try:
        sftp = client.open_sftp()
        remote_tmp = f"/tmp/{artifact.name}"
        log(f"上传 → {remote_tmp}")
        sftp.put(str(artifact), remote_tmp)
        seed = ROOT / "server" / "database" / "seed-snapshot.json"
        log("上传快照 → 应用根 server/database/")
        exec_cmd(client, f"mkdir -p {APP_DIR}/server/database {APP_DIR}/data {APP_DIR}/releases")
        sftp.put(str(seed), f"{APP_DIR}/server/database/seed-snapshot.json")
        sftp.close()

        prev, _, _ = exec_cmd(client, f"readlink -f {APP_DIR}/current || true", check=False)
        prev = prev.strip()
        log(f"当前版本：{prev or '（无）'}")

        exec_cmd(client, f"rm -rf {APP_DIR}/releases/{version} && mkdir -p {APP_DIR}/releases/{version} && "
                         f"tar -xzf {remote_tmp} -C {APP_DIR}/releases/{version} && rm -f {remote_tmp}")
        exec_cmd(client, f"ln -sfn releases/{version} {APP_DIR}/current && systemctl restart {SERVICE}")
        time.sleep(4)

        code, _, _ = exec_cmd(client, f"curl -s -o /dev/null -w '%{{http_code}}' {INTERNAL_URL}", check=False)
        log(f"内网探活：{code.strip()}")
        if code.strip() != "200":
            log("新版本探活失败，开始回滚")
            if prev:
                exec_cmd(client, f"ln -sfn {prev} {APP_DIR}/current && systemctl restart {SERVICE}")
            sys.exit("发布失败，已回滚到上一版本")

        pub, _, _ = exec_cmd(client, f"curl -s -o /dev/null -w '%{{http_code}}' {PUBLIC_URL}", check=False)
        log(f"公网探活：{pub.strip()}")

        # keep last 3 releases
        out, _, _ = exec_cmd(client, f"ls -1dt {APP_DIR}/releases/*/ | tail -n +4", check=False)
        for line in out.splitlines():
            old = line.strip()
            if old and not prev.endswith(old.rstrip("/")):
                exec_cmd(client, f"rm -rf {old}", check=False)
                log(f"清理旧版本 {old}")
        log(f"发布完成：{PUBLIC_URL}（版本 {version}）")
    finally:
        client.close()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--skip-build", action="store_true")
    ap.add_argument("--version", default=None)
    args = ap.parse_args()

    version = args.version or time.strftime("%Y%m%d-%H%M")
    if not args.skip_build:
        build()
    swap_native()
    artifact = pack(version)
    deploy(load_ssh(), artifact, version)


if __name__ == "__main__":
    main()
