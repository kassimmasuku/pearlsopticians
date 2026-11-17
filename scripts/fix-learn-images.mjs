import fs from "fs";

const f = "src/pages/LearnAboutEyes.tsx";
let t = fs.readFileSync(f, "utf8");

const map = {
  imgGlaucoma: "eyeFactImages.glaucoma",
  imgUv: "eyeFactImages.uvWear",
  imgChildExam: "eyeFactImages.childExam",
  imgDigitalStrain: "eyeFactImages.digitalStrain",
  imgTearFilm: "eyeFactImages.tearFilm",
  imgDiabetes: "eyeFactImages.diabetes",
  imgBrainPathway: "eyeFactImages.brainPathway",
  imgLenses: "eyeFactImages.lenses",
  imgWarning: "eyeFactImages.warning",
  imgNight: "eyeFactImages.nightVision",
  imgNutrition: "eyeFactImages.nutrition",
};

for (const [k, v] of Object.entries(map)) {
  t = t.replaceAll(`img: ${k}`, `img: ${v}`);
}

t = t.replace(
  /src=\{topic\.img\}\r?\n(\s*)alt=\{topic\.alt\}/,
  "src={topic.img.src}\n$1srcSet={topic.img.srcSet}\n$1sizes={topic.img.sizes}\n$1width={topic.img.width}\n$1height={topic.img.height}\n$1alt={topic.alt}",
);

t = t.replace(
  /(className=\{`\$\{[\s\S]*?\}`\}\r?\n\s*)loading="lazy"(\r?\n\s*\/>)/,
  '$1loading="lazy"\n                        decoding="async"$2',
);

fs.writeFileSync(f, t);
console.log("remaining old refs", /(imgGlaucoma|imgDiabetes|eye-facts\/.*\.(jpg|png))/.test(t));
