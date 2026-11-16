from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path("public/images/medical-aids")
OPT = Path(r"C:\Users\Kassim Masuku\Downloads\optinova-eyecare-main\public\images\medical-aids")


def knockout(im: Image.Image, threshold: int = 52) -> Image.Image:
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()

    def is_bg(x: int, y: int) -> bool:
        r, g, b, a = px[x, y]
        return a > 0 and r < threshold and g < threshold and b < threshold

    q: deque[tuple[int, int]] = deque()
    seen = [[False] * w for _ in range(h)]
    for x in range(w):
        q.append((x, 0))
        q.append((x, h - 1))
    for y in range(h):
        q.append((0, y))
        q.append((w - 1, y))

    while q:
        x, y = q.popleft()
        if x < 0 or y < 0 or x >= w or y >= h or seen[y][x]:
            continue
        seen[y][x] = True
        if not is_bg(x, y):
            continue
        px[x, y] = (0, 0, 0, 0)
        q.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))

    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    pad = 14
    canvas = Image.new("RGBA", (im.width + pad * 2, im.height + pad * 2), (0, 0, 0, 0))
    canvas.paste(im, (pad, pad), im)
    return canvas


def report(path: Path) -> None:
    im = Image.open(path).convert("RGBA")
    print(path.name, im.size, "corner", im.getpixel((0, 0)), "alpha_zero%", round(sum(1 for p in im.getdata() if p[3] == 0) / (im.width * im.height) * 100, 1))


# Restore originals then knockout
jobs = [
    (OPT / "psmas.png", ROOT / "psmas.png"),
    (ROOT / "generation-health.png", ROOT / "generation-health.png"),  # may already be processed
]

# Re-fetch originals that need black knockout
import urllib.request

ua = {"User-Agent": "Mozilla/5.0"}


def fetch(url: str, dest: Path) -> None:
    req = urllib.request.Request(url, headers=ua)
    with urllib.request.urlopen(req, timeout=45) as r, open(dest, "wb") as f:
        f.write(r.read())
    print("FETCHED", dest.name, dest.stat().st_size)


fetch("https://generationhealth.co.zw/wp-content/uploads/2025/07/GH-Logo-1.png", ROOT / "_raw_generation.png")
fetch("https://cellgroup.co.zw/wp-content/uploads/2025/11/cellmed-logo.png", ROOT / "_raw_cellmed.png")
fetch("https://ecosurehealth.co.zw/wp-content/uploads/2025/12/EcoSure-Health-Logo-.png", ROOT / "_raw_ecosure.png")
fetch("https://bonvie.co.zw/wp-content/uploads/2024/07/logoBonvie.png", ROOT / "_raw_bonvie.png")
fetch("https://fidelitylife.co.zw/wp-content/uploads/2026/04/FLIMAS_png.png", ROOT / "_raw_fidelity.png")

# PSMAS from Optinova source
raw_psmas = OPT / "psmas.png"

pairs = [
    (raw_psmas, ROOT / "psmas.png", 45),
    (ROOT / "_raw_generation.png", ROOT / "generation-health.png", 55),
    (ROOT / "_raw_cellmed.png", ROOT / "cellmed.png", 45),
    (ROOT / "_raw_ecosure.png", ROOT / "ecosure-maisha.png", 55),
    (ROOT / "_raw_bonvie.png", ROOT / "bonvie.png", 55),
    (ROOT / "_raw_fidelity.png", ROOT / "fidelity.png", 40),  # white bg — use white knockout
]

for src, dest, thr in pairs:
    im = Image.open(src)
    if dest.name == "fidelity.png":
        # white background knockout
        im = im.convert("RGBA")
        w, h = im.size
        px = im.load()
        q = deque()
        seen = [[False] * w for _ in range(h)]
        for x in range(w):
            q.extend(((x, 0), (x, h - 1)))
        for y in range(h):
            q.extend(((0, y), (w - 1, y)))
        while q:
            x, y = q.popleft()
            if x < 0 or y < 0 or x >= w or y >= h or seen[y][x]:
                continue
            seen[y][x] = True
            r, g, b, a = px[x, y]
            if a > 0 and r > 255 - thr and g > 255 - thr and b > 255 - thr:
                px[x, y] = (0, 0, 0, 0)
                q.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))
        bbox = im.getbbox()
        if bbox:
            im = im.crop(bbox)
        pad = 14
        canvas = Image.new("RGBA", (im.width + pad * 2, im.height + pad * 2), (0, 0, 0, 0))
        canvas.paste(im, (pad, pad), im)
    else:
        canvas = knockout(im, threshold=thr)
    if max(canvas.size) > 720:
        ratio = 720 / max(canvas.size)
        canvas = canvas.resize((int(canvas.width * ratio), int(canvas.height * ratio)), Image.Resampling.LANCZOS)
    canvas.save(dest, "PNG", optimize=True)
    report(dest)
