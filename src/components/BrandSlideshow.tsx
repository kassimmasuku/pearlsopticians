import { motion } from "framer-motion";

import oakleyLogo from "@/assets/brands/oakley.png";
import chopardLogo from "@/assets/brands/chopard.png";
import montblancLogo from "@/assets/brands/montblanc.png";
import bvlgariLogo from "@/assets/brands/bvlgari.png";
import carreraLogo from "@/assets/brands/carrera.png";
import tommyLogo from "@/assets/brands/tommy-jeans.png";
import raybanLogo from "@/assets/brands/rayban.png";
import gucciLogo from "@/assets/brands/gucci.png";
import pradaLogo from "@/assets/brands/prada.png";
import versaceLogo from "@/assets/brands/versace.png";
import diorLogo from "@/assets/brands/dior.png";
import tomfordLogo from "@/assets/brands/tomford.png";
import bossLogo from "@/assets/brands/boss.png";
import celineLogo from "@/assets/brands/celine.png";

const brands = [
  { name: "Oakley", logo: oakleyLogo },
  { name: "Chopard", logo: chopardLogo },
  { name: "Mont Blanc", logo: montblancLogo },
  { name: "Bvlgari", logo: bvlgariLogo },
  { name: "Carrera", logo: carreraLogo },
  { name: "Tommy Jeans", logo: tommyLogo },
  { name: "Ray-Ban", logo: raybanLogo },
  { name: "Gucci", logo: gucciLogo },
  { name: "Prada", logo: pradaLogo },
  { name: "Versace", logo: versaceLogo },
  { name: "Dior", logo: diorLogo },
  { name: "Tom Ford", logo: tomfordLogo },
  { name: "Boss", logo: bossLogo },
  { name: "Celine", logo: celineLogo },
];

const BrandSlideshow = () => (
  <section className="py-10 bg-secondary overflow-hidden">
    <div className="container mb-4">
      <p className="text-center text-muted-foreground text-sm uppercase tracking-widest">Brands We Carry</p>
    </div>
    <div className="relative">
      <motion.div
        className="flex gap-8 md:gap-12 items-center whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        {[...brands, ...brands].map((brand, i) => (
          <div
            key={`${brand.name}-${i}`}
            className="shrink-0 flex items-center justify-center h-20 w-40 md:h-28 md:w-56"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="max-h-full max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default BrandSlideshow;
