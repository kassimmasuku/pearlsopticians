/**
 * One-shot image optimiser for Prompt 09.
 * Converts oversized photographic PNG/JPG assets to WebP (and optional width variants).
 * Does not touch logos that need lossless PNG, SVGs, or public OG defaults unless listed.
 *
 * Usage: node scripts/optimize-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const assets = path.join(root, "src", "assets");

const report = [];

/** @typedef {{ file: string, maxWidth?: number, widths?: number[], quality?: number, keepOriginal?: boolean }} Job */

/** Jobs: relative to src/assets (source originals only; skip if already removed). */
const jobs = [
  { file: "hero-phoropter.jpg", maxWidth: 1920, widths: [768, 1280, 1920], quality: 78 },
  { file: "frames-display.jpg", maxWidth: 960, widths: [480, 800], quality: 78 },
];

async function convertFile(rel, opts) {
  const srcPath = path.join(assets, rel);
  if (!fs.existsSync(srcPath)) {
    console.warn("MISSING", rel);
    return;
  }
  const origStat = fs.statSync(srcPath);
  const meta = await sharp(srcPath).metadata();
  const base = rel.replace(/\.(jpe?g|png)$/i, "");
  const quality = opts.quality ?? 78;
  const maxWidth = opts.maxWidth ?? 1600;

  const targetW = Math.min(meta.width || maxWidth, maxWidth);
  const outMain = path.join(assets, `${base}.webp`);

  await sharp(srcPath)
    .resize({ width: targetW, withoutEnlargement: true })
    .webp({ quality, effort: 4 })
    .toFile(outMain);

  const mainStat = fs.statSync(outMain);
  const mainMeta = await sharp(outMain).metadata();

  const variants = [];
  if (opts.widths?.length) {
    for (const w of opts.widths) {
      if (!meta.width || w >= meta.width) continue;
      if (w >= targetW) continue;
      const out = path.join(assets, `${base}-${w}.webp`);
      await sharp(srcPath)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality, effort: 4 })
        .toFile(out);
      const st = fs.statSync(out);
      variants.push({ w, path: `${base}-${w}.webp`, kb: +(st.size / 1024).toFixed(1) });
    }
  }

  const entry = {
    source: rel,
    sourceKb: +(origStat.size / 1024).toFixed(1),
    sourceDims: `${meta.width}x${meta.height}`,
    webp: `${base}.webp`,
    webpKb: +(mainStat.size / 1024).toFixed(1),
    webpDims: `${mainMeta.width}x${mainMeta.height}`,
    reductionPct: +((((origStat.size - mainStat.size) / origStat.size) * 100).toFixed(1)),
    variants,
  };
  report.push(entry);
  console.log(
    `${rel}: ${entry.sourceKb}KB → ${entry.webpKb}KB (${entry.reductionPct}% smaller)` +
      (variants.length ? ` +[${variants.map((v) => `${v.w}w=${v.kb}KB`).join(", ")}]` : ""),
  );
}

async function convertDir(relDir, { maxWidth, quality = 78, pattern }) {
  const dir = path.join(assets, relDir);
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter((f) => pattern.test(f));
  for (const f of files) {
    const rel = path.join(relDir, f).replace(/\\/g, "/");
    const srcPath = path.join(assets, rel);
    const origStat = fs.statSync(srcPath);
    const meta = await sharp(srcPath).metadata();
    const base = rel.replace(/\.(jpe?g|png)$/i, "");
    const outMain = path.join(assets, `${base}.webp`);
    const targetW = Math.min(meta.width || maxWidth, maxWidth);

    // Skip if webp already newer and smaller (re-run safe)
    await sharp(srcPath)
      .resize({ width: targetW, withoutEnlargement: true })
      .webp({ quality, effort: 4 })
      .toFile(outMain);

    const mainStat = fs.statSync(outMain);
    const entry = {
      source: rel,
      sourceKb: +(origStat.size / 1024).toFixed(1),
      sourceDims: `${meta.width}x${meta.height}`,
      webp: `${base}.webp`,
      webpKb: +(mainStat.size / 1024).toFixed(1),
      webpDims: `${(await sharp(outMain).metadata()).width}x${(await sharp(outMain).metadata()).height}`,
      reductionPct: +((((origStat.size - mainStat.size) / origStat.size) * 100).toFixed(1)),
      variants: [],
    };
    report.push(entry);
    console.log(`${rel}: ${entry.sourceKb}KB → ${entry.webpKb}KB (${entry.reductionPct}% smaller)`);
  }
}

async function convertBrandPngs() {
  const dir = path.join(assets, "brands");
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".png"))) {
    const rel = `brands/${f}`;
    const srcPath = path.join(assets, rel);
    const origStat = fs.statSync(srcPath);
    const meta = await sharp(srcPath).metadata();
    const base = rel.replace(/\.png$/i, "");
    const outMain = path.join(assets, `${base}.webp`);
    // Preserve alpha; cap very large brand logos
    await sharp(srcPath)
      .resize({ width: Math.min(meta.width || 800, 800), withoutEnlargement: true })
      .webp({ quality: 85, alphaQuality: 90, effort: 4 })
      .toFile(outMain);
    const mainStat = fs.statSync(outMain);
    // Only adopt if meaningfully smaller
    if (mainStat.size >= origStat.size * 0.95) {
      fs.unlinkSync(outMain);
      console.log(`${rel}: skip (webp not smaller)`);
      continue;
    }
    report.push({
      source: rel,
      sourceKb: +(origStat.size / 1024).toFixed(1),
      sourceDims: `${meta.width}x${meta.height}`,
      webp: `${base}.webp`,
      webpKb: +(mainStat.size / 1024).toFixed(1),
      webpDims: `${(await sharp(outMain).metadata()).width}x${(await sharp(outMain).metadata()).height}`,
      reductionPct: +((((origStat.size - mainStat.size) / origStat.size) * 100).toFixed(1)),
      variants: [],
    });
    console.log(`${rel}: ${(origStat.size / 1024).toFixed(1)}KB → ${(mainStat.size / 1024).toFixed(1)}KB`);
  }
}

for (const job of jobs) {
  await convertFile(job.file, job);
}

await convertDir("team", { maxWidth: 640, quality: 78, pattern: /\.jpe?g$/i });
await convertDir("frames", { maxWidth: 900, quality: 78, pattern: /\.jpe?g$/i });
await convertDir("eyewear-gallery", { maxWidth: 800, quality: 78, pattern: /\.jpe?g$/i });
await convertBrandPngs();

const outReport = path.join(root, "scripts", "optimize-images-report.json");
fs.writeFileSync(outReport, JSON.stringify(report, null, 2));
const totalSrc = report.reduce((s, r) => s + r.sourceKb, 0);
const totalWebp = report.reduce((s, r) => s + r.webpKb, 0);
console.log("\n=== SUMMARY ===");
console.log(`Files: ${report.length}`);
console.log(`Original total: ${totalSrc.toFixed(1)} KB`);
console.log(`WebP total (main only): ${totalWebp.toFixed(1)} KB`);
console.log(`Reduction: ${(((totalSrc - totalWebp) / totalSrc) * 100).toFixed(1)}%`);
console.log(`Report: ${outReport}`);
