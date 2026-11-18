/**
 * Shared WebP imports with optional responsive variants.
 * Dimensions match the generated main WebP files from scripts/optimize-images.mjs.
 */
import hero from "@/assets/hero-phoropter.webp";
import hero768 from "@/assets/hero-phoropter-768.webp";
import hero1280 from "@/assets/hero-phoropter-1280.webp";

export type ResponsiveImage = {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
};

export const heroPhoropter: ResponsiveImage = {
  src: hero,
  srcSet: `${hero768} 768w, ${hero1280} 1280w, ${hero} 1920w`,
  sizes: "100vw",
  width: 1920,
  height: 1920,
};
