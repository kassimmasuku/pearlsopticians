"""Prepare medical-aid logos: transparent backgrounds, trim, optimize."""
from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "images" / "medical-aids"


def flood_knockout(im: Image.Image, *, dark: bool = True, threshold: int = 28) -> Image.Image:
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()

    def is_bg(x: int, y: int) -> bool:
        r, g, b, a = px[x, y]
        if a == 0:
            return True
        if dark:
            return r < threshold and g < threshold and b < threshold
        return r > 255 - threshold and g > 255 - threshold and b > 255 - threshold

    q: deque[tuple[int, int]] = deque()
    seen = [[False] * w for _ in range(h)]
    for start in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)):
        q.append(start)

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
    pad = 16
    canvas = Image.new("RGBA", (im.width + pad * 2, im.height + pad * 2), (0, 0, 0, 0))
    canvas.paste(im, (pad, pad), im)
    return canvas


def save(src: str, dest: str, *, dark: bool = True, max_edge: int = 720) -> None:
    path = ROOT / src
    out = ROOT / dest
    img = flood_knockout(Image.open(path), dark=dark)
    longest = max(img.size)
    if longest < 360:
        scale = 2
        img = img.resize((img.width * scale, img.height * scale), Image.Resampling.LANCZOS)
    elif longest > max_edge:
        ratio = max_edge / longest
        img = img.resize((int(img.width * ratio), int(img.height * ratio)), Image.Resampling.LANCZOS)
    img.save(out, "PNG", optimize=True)
    print(f"WROTE {out.name} {img.size}")


def copy_svg(src: str, dest: str) -> None:
    data = (ROOT / src).read_bytes()
    (ROOT / dest).write_bytes(data)
    print(f"COPIED {dest}")


def main() -> None:
    # Official SVGs
    copy_svg("cimas-official.svg", "cimas.svg")
    copy_svg("alliance-health-official.svg", "alliance-health.svg")

    # Dark / black background knockouts
    save("psmas.png", "psmas.png", dark=True)
    save("flimas.png", "fidelity.png", dark=False)
    save("generation-health.png", "generation-health.png", dark=True)
    save("cellmed-official.png", "cellmed.png", dark=True)
    save("ecosure-maisha.png", "ecosure-maisha.png", dark=True)
    save("bonvie.png", "bonvie.png", dark=True)
    save("quest.png", "quest.png", dark=False)  # navy card — keep as-is after light trim attempt

    # White AHFOZ / site cards
    save("first-mutual-ahfoz.jpg", "first-mutual.png", dark=False)
    save("fbc-ahfoz.jpg", "fbc-health.png", dark=False)
    save("masca-ahfoz.jpg", "masca.png", dark=False)
    save("varichem-ahfoz.jpg", "varichem.png", dark=False)

    # Quest has solid navy background — use as-is with padding trim only via dark=False won't work.
    # Re-save quest without knockout of navy: just resize/crop if needed.
    q = Image.open(ROOT / "quest.png").convert("RGBA")
    if max(q.size) > 720:
        ratio = 720 / max(q.size)
        q = q.resize((int(q.width * ratio), int(q.height * ratio)), Image.Resampling.LANCZOS)
    q.save(ROOT / "quest.png", "PNG", optimize=True)
    print(f"WROTE quest.png {q.size}")


if __name__ == "__main__":
    main()
