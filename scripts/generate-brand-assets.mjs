/**
 * Generate Pearls Opticians favicons + OG/social image from the official logo.
 * Usage: node scripts/generate-brand-assets.mjs [source.png]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const DEFAULT_SRC = path.join(root, "brand-source", "pearls-opticians-logo.png");

const srcArg = process.argv[2];
const src = srcArg ? path.resolve(srcArg) : DEFAULT_SRC;

if (!fs.existsSync(src)) {
  console.error("Source logo not found:", src);
  process.exit(1);
}

const publicDir = path.join(root, "public");
const imagesDir = path.join(publicDir, "images");
const iconsDir = path.join(publicDir, "icons");
fs.mkdirSync(imagesDir, { recursive: true });
fs.mkdirSync(iconsDir, { recursive: true });

const BRAND_BLUE = { r: 38, g: 38, b: 148, alpha: 1 }; // sampled from logo (#262694)

const meta = await sharp(src).metadata();
console.log(`Source: ${meta.width}x${meta.height} ${meta.format}`);

// Master brand square kept for structured data / logo URL
const brandSquare = path.join(imagesDir, "pearls-opticians-brand.png");
await sharp(src).resize(1024, 1024, { fit: "cover" }).png().toFile(brandSquare);

/** Crop to the eye/pearl mark only so tiny favicons stay recognizable. */
async function iconMark(size) {
  const w = meta.width || 1024;
  const h = meta.height || 1024;
  // Upper mark region (white square + orbital eye), excluding wordmark.
  const cropSize = Math.round(Math.min(w, h) * 0.46);
  const cropLeft = Math.round((w - cropSize) / 2);
  const cropTop = Math.round(h * 0.1);

  return sharp(src)
    .extract({ left: cropLeft, top: cropTop, width: cropSize, height: cropSize })
    .resize(size, size, { fit: "cover" })
    .png();
}

async function fullSquare(size) {
  return sharp(src).resize(size, size, { fit: "cover" }).png();
}

// PNG favicons / touch icons
const pngTargets = [
  { file: path.join(publicDir, "favicon-16x16.png"), size: 16, mark: true },
  { file: path.join(publicDir, "favicon-32x32.png"), size: 32, mark: true },
  { file: path.join(publicDir, "favicon-48x48.png"), size: 48, mark: true },
  { file: path.join(publicDir, "apple-touch-icon.png"), size: 180, mark: false },
  { file: path.join(iconsDir, "icon-192.png"), size: 192, mark: false },
  { file: path.join(iconsDir, "icon-512.png"), size: 512, mark: false },
];

for (const t of pngTargets) {
  const pipeline = t.mark ? await iconMark(t.size) : await fullSquare(t.size);
  await pipeline.toFile(t.file);
  console.log("Wrote", path.relative(root, t.file));
}

// favicon.ico — pack 16/32/48 PNGs (modern ICO with PNG payloads)
const icoPngs = await Promise.all(
  [16, 32, 48].map(async (size) => {
    const buf = await (await iconMark(size)).toBuffer();
    return { size, buf };
  }),
);

function buildIco(entries) {
  const count = entries.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const dir = [];
  const bodies = [];

  for (const { size, buf } of entries) {
    dir.push({
      width: size >= 256 ? 0 : size,
      height: size >= 256 ? 0 : size,
      bytes: buf.length,
      offset,
    });
    bodies.push(buf);
    offset += buf.length;
  }

  const out = Buffer.alloc(offset);
  // ICONDIR
  out.writeUInt16LE(0, 0); // reserved
  out.writeUInt16LE(1, 2); // type = icon
  out.writeUInt16LE(count, 4);

  let dirOffset = 6;
  for (const d of dir) {
    out.writeUInt8(d.width, dirOffset);
    out.writeUInt8(d.height, dirOffset + 1);
    out.writeUInt8(0, dirOffset + 2); // color palette
    out.writeUInt8(0, dirOffset + 3); // reserved
    out.writeUInt16LE(1, dirOffset + 4); // color planes
    out.writeUInt16LE(32, dirOffset + 6); // bits per pixel
    out.writeUInt32LE(d.bytes, dirOffset + 8);
    out.writeUInt32LE(d.offset, dirOffset + 12);
    dirOffset += 16;
  }

  let bodyOffset = headerSize;
  for (const buf of bodies) {
    buf.copy(out, bodyOffset);
    bodyOffset += buf.length;
  }
  return out;
}

const icoPath = path.join(publicDir, "favicon.ico");
fs.writeFileSync(icoPath, buildIco(icoPngs));
console.log("Wrote", path.relative(root, icoPath));

// Social OG image 1200×630 — brand blue canvas with centered logo
const ogPath = path.join(imagesDir, "og-default.jpg");
const ogW = 1200;
const ogH = 630;
const logoSize = 420;
const logoBuf = await sharp(src)
  .resize(logoSize, logoSize, { fit: "contain", background: BRAND_BLUE })
  .png()
  .toBuffer();

await sharp({
  create: {
    width: ogW,
    height: ogH,
    channels: 3,
    background: { r: BRAND_BLUE.r, g: BRAND_BLUE.g, b: BRAND_BLUE.b },
  },
})
  .composite([
    {
      input: logoBuf,
      left: Math.round((ogW - logoSize) / 2),
      top: Math.round((ogH - logoSize) / 2),
    },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(ogPath);
console.log("Wrote", path.relative(root, ogPath));

// Web manifest
const manifest = {
  name: "Pearls Opticians",
  short_name: "Pearls Opticians",
  description:
    "Professional eye care and quality eyewear at Pearls Opticians in Harare, Zimbabwe.",
  start_url: "/",
  display: "standalone",
  background_color: "#262694",
  theme_color: "#262694",
  icons: [
    {
      src: "/icons/icon-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any maskable",
    },
    {
      src: "/icons/icon-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable",
    },
  ],
};
fs.writeFileSync(
  path.join(publicDir, "site.webmanifest"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log("Wrote public/site.webmanifest");
console.log("Done.");
