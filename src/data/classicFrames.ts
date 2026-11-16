import type { EyewearFrame } from "./eyewearFrames";

import oakleyFront from "@/assets/frames/oakley-front.jpg";
import oakleySide from "@/assets/frames/oakley-side.jpg";
import chopardFront from "@/assets/frames/chopard-front.jpg";
import chopardFront2 from "@/assets/frames/chopard-front-2.jpg";
import chopardSide from "@/assets/frames/chopard-side.jpg";
import chopardExecSide from "@/assets/frames/chopard-executive-side.jpg";
import montblancRect from "@/assets/frames/montblanc-rect.jpg";
import montblancFront from "@/assets/frames/montblanc-front.jpg";
import montblancSquare from "@/assets/frames/montblanc-square.jpg";
import montblancSide from "@/assets/frames/montblanc-side.jpg";
import bvlgariGlam from "@/assets/frames/bvlgari-glam.jpg";
import bvlgariFront from "@/assets/frames/bvlgari-front.jpg";
import bvlgariSerpenti from "@/assets/frames/bvlgari-serpenti.jpg";
import bvlgariSide from "@/assets/frames/bvlgari-side.jpg";
import carreraTr90 from "@/assets/frames/carrera-tr90.jpg";
import carreraFront from "@/assets/frames/carrera-front.jpg";
import carreraSportSide from "@/assets/frames/carrera-sport-side.jpg";
import carreraSide from "@/assets/frames/carrera-side.jpg";
import tommyJeansFront from "@/assets/frames/tommy-jeans-front.jpg";
import tommyJeans from "@/assets/frames/tommy-jeans.jpg";
import tommyJeansSide from "@/assets/frames/tommy-jeans-side.jpg";
import tommyJeans2 from "@/assets/frames/tommy-jeans-2.jpg";
import celineFront from "@/assets/frames/celine-front.jpg";
import celineFront2 from "@/assets/frames/celine-front-2.jpg";
import celineSide from "@/assets/frames/celine-side.jpg";
import celineSide2 from "@/assets/frames/celine-side-2.jpg";
import bossFront from "@/assets/frames/boss-front.jpg";
import bossFront2 from "@/assets/frames/boss-front-2.jpg";
import bossSide from "@/assets/frames/boss-side.jpg";
import bossSide2 from "@/assets/frames/boss-side-2.jpg";
import gucciFront from "@/assets/frames/gucci-front.jpg";
import gucciFront2 from "@/assets/frames/gucci-front-2.jpg";
import gucciSide from "@/assets/frames/gucci-side.jpg";
import gucciSide2 from "@/assets/frames/gucci-side-2.jpg";
import pradaFront from "@/assets/frames/prada-front.jpg";
import pradaFront2 from "@/assets/frames/prada-front-2.jpg";
import pradaSide from "@/assets/frames/prada-side.jpg";
import pradaSide2 from "@/assets/frames/prada-side-2.jpg";
import carrera9738Gallery from "@/assets/eyewear-gallery/frame-026.jpg";
import oakleyOx8027Gallery from "@/assets/eyewear-gallery/frame-063.jpg";

/** Original catalog frames. Duplicate angles of the same design are grouped into one product. */
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
    images: [oakleyFront, oakleySide, oakleyOx8027Gallery],
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
    images: [chopardFront2, chopardFront, chopardExecSide, chopardSide],
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
    images: [montblancRect, montblancFront],
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
    id: "classic-bvlgari-glam",
    name: "Bvlgari Glam",
    brand: "Bvlgari",
    category: "Women",
    shape: "Cat Eye",
    material: "Acetate",
    color: "Fuchsia Pink",
    description: "Bold fuchsia Bvlgari cat eye frames with gold stud accents.",
    image: bvlgariGlam,
    images: [bvlgariGlam, bvlgariFront],
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
    images: [bvlgariSerpenti, bvlgariSide],
  },
  {
    id: "classic-carrera-flex",
    name: "Carrera Flex",
    brand: "Carrera",
    category: "Men",
    shape: "Rectangle",
    material: "TR90",
    color: "Matte Black",
    description: "Lightweight Carrera TR90 frames with matte black finish, model 9738.",
    image: carreraTr90,
    images: [carreraTr90, carreraFront, carrera9738Gallery],
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
    images: [carreraSportSide, carreraSide],
  },
  {
    id: "classic-tommy-jeans-urban",
    name: "Tommy Jeans Urban",
    brand: "Tommy Jeans",
    category: "Men",
    shape: "Rectangle",
    material: "Acetate",
    color: "Amber / Black",
    description: "Trendy Tommy Jeans frames with signature flag branding.",
    image: tommyJeansFront,
    images: [tommyJeansFront, tommyJeans],
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
    image: tommyJeansSide,
    images: [tommyJeansSide, tommyJeans2],
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
    images: [celineFront, celineFront2, celineSide, celineSide2],
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
    images: [bossFront, bossFront2, bossSide, bossSide2],
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
    images: [gucciFront, gucciFront2, gucciSide, gucciSide2],
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
    images: [pradaFront, pradaFront2, pradaSide, pradaSide2],
  },
];
