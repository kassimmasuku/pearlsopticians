import type { EyewearFrame } from "./eyewearFrames";

import oakleyFront from "@/assets/frames/oakley-front.webp";
import oakleySide from "@/assets/frames/oakley-side.webp";
import chopardFront2 from "@/assets/frames/chopard-front-2.webp";
import chopardSide from "@/assets/frames/chopard-side.webp";
import montblancRect from "@/assets/frames/montblanc-rect.webp";
import montblancSquare from "@/assets/frames/montblanc-square.webp";
import montblancSide from "@/assets/frames/montblanc-side.webp";
import bvlgariGlam from "@/assets/frames/bvlgari-glam.webp";
import bvlgariSerpenti from "@/assets/frames/bvlgari-serpenti.webp";
import bvlgariSide from "@/assets/frames/bvlgari-side.webp";
import carreraTr90 from "@/assets/frames/carrera-tr90.webp";
import carreraSportSide from "@/assets/frames/carrera-sport-side.webp";
import tommyJeansFront from "@/assets/frames/tommy-jeans-front.webp";
import tommyJeans from "@/assets/frames/tommy-jeans.webp";
import tommyJeansSide from "@/assets/frames/tommy-jeans-side.webp";
import tommyJeans2 from "@/assets/frames/tommy-jeans-2.webp";
import celineFront from "@/assets/frames/celine-front.webp";
import celineSide from "@/assets/frames/celine-side.webp";
import bossFront from "@/assets/frames/boss-front.webp";
import bossSide from "@/assets/frames/boss-side.webp";
import gucciFront from "@/assets/frames/gucci-front.webp";
import gucciSide from "@/assets/frames/gucci-side.webp";
import pradaFront from "@/assets/frames/prada-front.webp";
import pradaSide from "@/assets/frames/prada-side.webp";

/** Original catalog frames. Each slider keeps one image per distinct angle. */
export const classicFrames: EyewearFrame[] = [
  {
    id: "classic-oakley-sport",
    name: "Oakley Sport",
    brand: "Oakley",
    category: "Men",
    shape: "Rectangle",
    material: "Metal",
    color: "Black",
    description: "Iconic Oakley sport frames with sleek black finish.",
    image: oakleyFront,
    images: [oakleyFront, oakleySide],
  },
  {
    id: "classic-chopard-executive",
    name: "Chopard Executive",
    brand: "Chopard",
    category: "Men",
    shape: "Rectangle",
    material: "Titanium",
    color: "Gold / Tortoise",
    description: "Luxury half-rim Chopard frames with gold and tortoise detailing.",
    image: chopardFront2,
    images: [chopardFront2, chopardSide],
  },
  {
    id: "classic-montblanc-classic",
    name: "Mont Blanc Classic",
    brand: "Mont Blanc",
    category: "Men",
    shape: "Rectangle",
    material: "TR90",
    color: "Dark Tortoise",
    description: "Refined Mont Blanc rectangular frames in rich dark tortoise.",
    image: montblancRect,
    images: [montblancRect],
  },
  {
    id: "classic-montblanc-square",
    name: "Mont Blanc Square",
    brand: "Mont Blanc",
    category: "Men",
    shape: "Square",
    material: "Acetate",
    color: "Brown",
    description: "Classic Mont Blanc square frames in polished brown.",
    image: montblancSquare,
    images: [montblancSquare, montblancSide],
  },
  {
    id: "classic-bvlgari-serpenti",
    name: "Bvlgari Serpenti",
    brand: "Bvlgari",
    category: "Women",
    shape: "Cat Eye",
    material: "Acetate",
    color: "Wine / Gold",
    description: "Luxurious Bvlgari frames with ornate gold Serpenti temple detailing.",
    image: bvlgariSerpenti,
    images: [bvlgariSerpenti, bvlgariGlam, bvlgariSide],
  },
  {
    id: "classic-carrera-sport",
    name: "Carrera Sport",
    brand: "Carrera",
    category: "Men",
    shape: "Rectangle",
    material: "Metal",
    color: "Gunmetal",
    description: "Sleek Carrera frames with textured temples.",
    image: carreraSportSide,
    images: [carreraSportSide, carreraTr90],
  },
  {
    id: "classic-tommy-jeans-classic",
    name: "Tommy Jeans Classic",
    brand: "Tommy Jeans",
    category: "Men",
    shape: "Rectangle",
    material: "Acetate",
    color: "Tortoise",
    description: "Classic Tommy Jeans tortoise frames with bold branding.",
    image: tommyJeans2,
    images: [tommyJeans2, tommyJeansSide, tommyJeansFront, tommyJeans],
  },
  {
    id: "classic-celine-tortoise",
    name: "Celine Tortoise",
    brand: "Celine",
    category: "Women",
    shape: "Square",
    material: "Acetate",
    color: "Tortoise",
    description: "Timeless Celine square frames in warm tortoise.",
    image: celineFront,
    images: [celineFront, celineSide],
  },
  {
    id: "classic-boss-executive",
    name: "Boss Executive",
    brand: "Boss",
    category: "Men",
    shape: "Square",
    material: "Acetate",
    color: "Dark Tortoise",
    description: "Hugo Boss square frames in rich dark tortoise.",
    image: bossFront,
    images: [bossFront, bossSide],
  },
  {
    id: "classic-gucci-grey",
    name: "Gucci Classic",
    brand: "Gucci",
    category: "Men",
    shape: "Rectangle",
    material: "Acetate",
    color: "Grey",
    description: "Clean Gucci rectangular frames in translucent grey with green-red stripe temples.",
    image: gucciFront,
    images: [gucciFront, gucciSide],
  },
  {
    id: "classic-prada-cateye",
    name: "Prada Cat Eye",
    brand: "Prada",
    category: "Women",
    shape: "Cat Eye",
    material: "Acetate",
    color: "Black",
    description: "Bold black Prada cat eye frames.",
    image: pradaFront,
    images: [pradaFront, pradaSide],
  },
];
