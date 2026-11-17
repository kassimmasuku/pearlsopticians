/**
 * Shared WebP imports with optional responsive variants (Prompt 09).
 * Dimensions match the generated main WebP files from scripts/optimize-images.mjs.
 */
import hero from "@/assets/hero-phoropter.webp";
import hero768 from "@/assets/hero-phoropter-768.webp";
import hero1280 from "@/assets/hero-phoropter-1280.webp";

import eyeAnatomy from "@/assets/eye-facts/01-eye-anatomy.webp";
import eyeAnatomy480 from "@/assets/eye-facts/01-eye-anatomy-480.webp";
import glaucoma from "@/assets/eye-facts/02-glaucoma.webp";
import glaucoma480 from "@/assets/eye-facts/02-glaucoma-480.webp";
import glaucoma800 from "@/assets/eye-facts/02-glaucoma-800.webp";
import uvWear from "@/assets/eye-facts/03-uv-wear.webp";
import uvWear480 from "@/assets/eye-facts/03-uv-wear-480.webp";
import uvWear800 from "@/assets/eye-facts/03-uv-wear-800.webp";
import childExam from "@/assets/eye-facts/04-child-eye-exam.webp";
import childExam480 from "@/assets/eye-facts/04-child-eye-exam-480.webp";
import childExam800 from "@/assets/eye-facts/04-child-eye-exam-800.webp";
import digitalStrain from "@/assets/eye-facts/05-digital-strain.webp";
import digitalStrain480 from "@/assets/eye-facts/05-digital-strain-480.webp";
import digitalStrain800 from "@/assets/eye-facts/05-digital-strain-800.webp";
import tearFilm from "@/assets/eye-facts/06-tear-film.webp";
import tearFilm480 from "@/assets/eye-facts/06-tear-film-480.webp";
import tearFilm800 from "@/assets/eye-facts/06-tear-film-800.webp";
import diabetes from "@/assets/eye-facts/07-diabetes.webp";
import diabetes480 from "@/assets/eye-facts/07-diabetes-480.webp";
import diabetes800 from "@/assets/eye-facts/07-diabetes-800.webp";
import brainPathway from "@/assets/eye-facts/08-brain-pathway.webp";
import brainPathway480 from "@/assets/eye-facts/08-brain-pathway-480.webp";
import brainPathway800 from "@/assets/eye-facts/08-brain-pathway-800.webp";
import lenses from "@/assets/eye-facts/09-lenses.webp";
import lenses480 from "@/assets/eye-facts/09-lenses-480.webp";
import lenses800 from "@/assets/eye-facts/09-lenses-800.webp";
import warning from "@/assets/eye-facts/10-warning-signs.webp";
import warning480 from "@/assets/eye-facts/10-warning-signs-480.webp";
import warning800 from "@/assets/eye-facts/10-warning-signs-800.webp";
import nightVision from "@/assets/eye-facts/11-night-vision.webp";
import nightVision480 from "@/assets/eye-facts/11-night-vision-480.webp";
import nightVision800 from "@/assets/eye-facts/11-night-vision-800.webp";
import nutrition from "@/assets/eye-facts/12-nutrition.webp";
import nutrition480 from "@/assets/eye-facts/12-nutrition-480.webp";
import nutrition800 from "@/assets/eye-facts/12-nutrition-800.webp";

export type ResponsiveImage = {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
};

const cardSizes =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 400px";

const r = (
  src: string,
  width: number,
  height: number,
  parts: { url: string; w: number }[],
  sizes = cardSizes,
): ResponsiveImage => ({
  src,
  srcSet: [...parts.map((p) => `${p.url} ${p.w}w`), `${src} ${width}w`].join(", "),
  sizes,
  width,
  height,
});

export const heroPhoropter: ResponsiveImage = {
  src: hero,
  srcSet: `${hero768} 768w, ${hero1280} 1280w, ${hero} 1920w`,
  sizes: "100vw",
  width: 1920,
  height: 1920,
};

export const eyeFactImages = {
  eyeAnatomy: r(eyeAnatomy, 640, 595, [{ url: eyeAnatomy480, w: 480 }]),
  glaucoma: r(glaucoma, 1200, 768, [
    { url: glaucoma480, w: 480 },
    { url: glaucoma800, w: 800 },
  ]),
  uvWear: r(uvWear, 1200, 800, [
    { url: uvWear480, w: 480 },
    { url: uvWear800, w: 800 },
  ]),
  childExam: r(childExam, 1200, 1497, [
    { url: childExam480, w: 480 },
    { url: childExam800, w: 800 },
  ]),
  digitalStrain: r(digitalStrain, 1200, 800, [
    { url: digitalStrain480, w: 480 },
    { url: digitalStrain800, w: 800 },
  ]),
  tearFilm: r(tearFilm, 1200, 1200, [
    { url: tearFilm480, w: 480 },
    { url: tearFilm800, w: 800 },
  ]),
  diabetes: r(diabetes, 1024, 768, [
    { url: diabetes480, w: 480 },
    { url: diabetes800, w: 800 },
  ]),
  brainPathway: r(brainPathway, 1200, 626, [
    { url: brainPathway480, w: 480 },
    { url: brainPathway800, w: 800 },
  ]),
  lenses: r(lenses, 1200, 945, [
    { url: lenses480, w: 480 },
    { url: lenses800, w: 800 },
  ]),
  warning: r(warning, 1200, 900, [
    { url: warning480, w: 480 },
    { url: warning800, w: 800 },
  ]),
  nightVision: r(nightVision, 1000, 666, [
    { url: nightVision480, w: 480 },
    { url: nightVision800, w: 800 },
  ]),
  nutrition: r(nutrition, 1000, 666, [
    { url: nutrition480, w: 480 },
    { url: nutrition800, w: 800 },
  ]),
} as const;
