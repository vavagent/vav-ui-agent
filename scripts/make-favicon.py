# -*- coding: utf-8 -*-
"""生成站点 favicon：蓝紫渐变圆角方块 + 白色 V，与页面左上角 logo 一致。

产出（public/ 下，会随 nuxt generate 一起发布）：
    favicon.ico            16/32/48 多尺寸
    favicon-32x32.png
    apple-touch-icon.png   180×180
    icon-192.png icon-512.png
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public"
OUT.mkdir(exist_ok=True)

BASE = 1024           # 超采样画布
RADIUS_RATIO = 0.22   # 圆角半径
C1 = (94, 106, 210)   # #5e6ad2
C2 = (123, 134, 232)  # #7b86e8
FONT_CANDIDATES = [
    r"C:\Windows\Fonts\segoeuib.ttf",
    r"C:\Windows\Fonts\arialbd.ttf",
    r"C:\Windows\Fonts\msyhbd.ttc",
]


def gradient(size: int) -> Image.Image:
    img = Image.new("RGB", (size, size), C1)
    px = img.load()
    for y in range(size):
        for x in range(size):
            t = (x + y) / (2 * (size - 1))
            px[x, y] = (
                round(C1[0] + (C2[0] - C1[0]) * t),
                round(C1[1] + (C2[1] - C1[1]) * t),
                round(C1[2] + (C2[2] - C1[2]) * t),
            )
    return img


def build_master() -> Image.Image:
    grad = gradient(BASE)
    mask = Image.new("L", (BASE, BASE), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, BASE - 1, BASE - 1), radius=int(BASE * RADIUS_RATIO), fill=255
    )
    icon = Image.new("RGBA", (BASE, BASE), (0, 0, 0, 0))
    icon.paste(grad, (0, 0), mask)

    font = None
    for path in FONT_CANDIDATES:
        try:
            font = ImageFont.truetype(path, int(BASE * 0.62))
            break
        except OSError:
            continue
    if font is None:
        raise RuntimeError("找不到可用粗体字体")

    draw = ImageDraw.Draw(icon)
    box = draw.textbbox((0, 0), "V", font=font)
    w, h = box[2] - box[0], box[3] - box[1]
    draw.text(
        ((BASE - w) / 2 - box[0], (BASE - h) / 2 - box[1] - BASE * 0.01),
        "V",
        font=font,
        fill=(255, 255, 255, 255),
    )
    return icon


def main() -> None:
    master = build_master()

    master.resize((512, 512), Image.LANCZOS).save(OUT / "icon-512.png")
    master.resize((192, 192), Image.LANCZOS).save(OUT / "icon-192.png")
    master.resize((180, 180), Image.LANCZOS).save(OUT / "apple-touch-icon.png")
    master.resize((32, 32), Image.LANCZOS).save(OUT / "favicon-32x32.png")

    ico = master.resize((256, 256), Image.LANCZOS)
    ico.save(OUT / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (256, 256)])

    print("generated:", ", ".join(sorted(p.name for p in OUT.glob("*icon*"))))


if __name__ == "__main__":
    main()
