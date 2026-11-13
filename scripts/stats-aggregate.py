#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把 nginx 埋点日志汇总成 stats.json（服务器 cron 每 5 分钟跑一次）。

日志格式（log_format vav_ui）：
    ISO时间 \t ev \t cat \t name \t q \t path \t IPv4 \t UA

统计口径：
- pv：页面访问次数（路由变化即 +1）
- uv：按天用 sha1(日期+IP) 去重，只存哈希，不落原始 IP
- cats / copies / searches / tags / paths：按事件计数
- 只保留最近 60 天；日志读完即清空，避免无限增长
"""
import json
import os
import sys
from datetime import datetime, timedelta, timezone
from hashlib import sha1
from pathlib import Path
from urllib.parse import unquote_plus

LOG = Path("/clouddream/nginx-proxy-manage/data/logs/ui-collect.log")
STATE = Path("/clouddream/nginx-proxy-manage/data/static/ui/live/stats.json")
RETENTION_DAYS = 60
CST = timezone(timedelta(hours=8))


def blank_day() -> dict:
    return {"pv": 0, "ips": [], "cats": {}, "copies": {}, "searches": {}, "tags": {}, "paths": {}}


def bump(d: dict, key: str, name: str, n: int = 1) -> None:
    if not name:
        return
    d[key][name] = d[key].get(name, 0) + n


def load_state() -> dict:
    if STATE.exists():
        try:
            return json.loads(STATE.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            pass
    return {"updated_at": None, "days": {}}


def main() -> None:
    state = load_state()
    days = state.setdefault("days", {})
    parsed = 0

    if LOG.exists():
        with LOG.open("r", encoding="utf-8", errors="replace") as fh:
            for line in fh:
                parts = line.rstrip("\n").split("\t")
                if len(parts) < 7:
                    continue
                ts, ev, cat, name, q, path, ip = parts[:7]
                cat, name, q, path = (unquote_plus(v) for v in (cat, name, q, path))
                try:
                    # nginx 的 $time_iso8601 形如 2026-11-13T10:27:09+00:00（容器 UTC）
                    dt = datetime.strptime(ts[:19], "%Y-%m-%dT%H:%M:%S") + timedelta(hours=8)
                    day = dt.date().isoformat()
                except ValueError:
                    continue
                d = days.setdefault(day, blank_day())
                parsed += 1

                if ev == "pv":
                    d["pv"] += 1
                    h = sha1(f"{day}|{ip}".encode()).hexdigest()[:12]
                    if h not in d["ips"]:
                        d["ips"].append(h)
                    bump(d, "paths", path)
                elif ev == "cat":
                    bump(d, "cats", cat)
                elif ev == "copy":
                    bump(d, "copies", name)
                elif ev == "tag":
                    bump(d, "tags", name)
                elif ev == "search":
                    bump(d, "searches", q)

        LOG.write_text("", encoding="utf-8")

    # 清理过期数据
    cutoff = (datetime.now(CST).date() - timedelta(days=RETENTION_DAYS)).isoformat()
    for day in list(days.keys()):
        if day < cutoff:
            days.pop(day)

    state["updated_at"] = datetime.now(CST).isoformat(timespec="seconds")
    STATE.parent.mkdir(parents=True, exist_ok=True)
    tmp = STATE.with_suffix(".tmp")
    tmp.write_text(json.dumps(state, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    os.replace(tmp, STATE)
    STATE.chmod(0o644)

    print(f"[stats] parsed {parsed} lines, days={len(days)}, updated_at={state['updated_at']}")


if __name__ == "__main__":
    main()
