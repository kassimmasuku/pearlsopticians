import fs from "fs";

const files = [
  "src/data/classicFrames.ts",
  "src/data/eyewearFrames.ts",
  "src/data/team.ts",
  "src/components/BrandSlideshow.tsx",
  "src/components/ServicesSection.tsx",
  "src/components/TipsSection.tsx",
  "src/components/EyewearSection.tsx",
];

for (const f of files) {
  let t = fs.readFileSync(f, "utf8");
  const before = t;
  t = t.replace(/@\/assets\/((?!logo\.png)[^"']+)\.(jpe?g|png)/g, "@/assets/$1.webp");
  if (t !== before) {
    fs.writeFileSync(f, t);
    console.log("updated", f);
  } else {
    console.log("unchanged", f);
  }
}
