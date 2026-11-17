import oakleyLogo from "@/assets/brands/oakley.webp";
import chopardLogo from "@/assets/brands/chopard.webp";
import montblancLogo from "@/assets/brands/montblanc.webp";
import bvlgariLogo from "@/assets/brands/bvlgari.webp";
import carreraLogo from "@/assets/brands/carrera.webp";
import tommyLogo from "@/assets/brands/tommy-jeans.webp";
import raybanLogo from "@/assets/brands/rayban.webp";
import gucciLogo from "@/assets/brands/gucci.webp";
import pradaLogo from "@/assets/brands/prada.webp";
import versaceLogo from "@/assets/brands/versace.webp";
import diorLogo from "@/assets/brands/dior.webp";
import tomfordLogo from "@/assets/brands/tomford.webp";
import bossLogo from "@/assets/brands/boss.webp";
import celineLogo from "@/assets/brands/celine.webp";

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

const LogoCard = ({
  name,
  logo,
  className = "",
}: {
  name: string;
  logo: string;
  className?: string;
}) => (
  <div
    className={`flex h-20 w-36 shrink-0 items-center justify-center sm:w-40 md:h-28 md:w-56 ${className}`}
  >
    <img
      src={logo}
      alt={name}
      width={224}
      height={112}
      className="max-h-full max-w-full object-contain opacity-70 transition-opacity hover:opacity-100"
      /* Eager: lazy + CSS/transform marquees leave off-screen logos unloaded on mobile */
      loading="eager"
      decoding="async"
      draggable={false}
    />
  </div>
);

/**
 * Brand logo strip:
 * - Mobile: native horizontal swipe/scroll so every logo is reachable
 * - md+: seamless infinite marquee (CSS) matching the previous desktop look
 */
const BrandSlideshow = () => (
  <section className="bg-secondary py-10">
    <div className="container mb-4">
      <p className="text-center text-sm uppercase tracking-widest text-muted-foreground">
        Brands We Carry
      </p>
    </div>

    {/* Mobile / small tablet — swipeable track */}
    <div className="md:hidden">
      <div
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
        aria-label="Frame brands"
      >
        {brands.map((brand) => (
          <LogoCard
            key={brand.name}
            name={brand.name}
            logo={brand.logo}
            className="snap-center"
          />
        ))}
      </div>
    </div>

    {/* Desktop / large tablet — infinite marquee */}
    <div className="relative hidden overflow-hidden md:block" aria-label="Frame brands">
      <div className="flex w-max animate-brand-marquee items-center gap-12 hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[...brands, ...brands].map((brand, i) => (
          <LogoCard key={`${brand.name}-${i}`} name={brand.name} logo={brand.logo} />
        ))}
      </div>
    </div>
  </section>
);

export default BrandSlideshow;
