import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Phone,
  MessageCircle,
  Calendar,
  Filter,
  Glasses,
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BrandSlideshow from "@/components/BrandSlideshow";
import SeoHead from "@/components/SeoHead";
import { useBranchContact } from "@/components/BranchContactProvider";
import { seoByPath } from "@/data/seo";
import {
  eyewearFrames,
  type EyewearFrame,
  type FrameCategory,
  type FrameMaterial,
  type FrameShape,
} from "@/data/eyewearFrames";

const categories = ["All", "Men", "Women", "Unisex", "Kids"] as const;
const shapes = ["All", "Round", "Rectangle", "Aviator", "Cat Eye", "Square", "Oval", "Geometric"] as const;
const materials = ["All", "Metal", "Acetate", "Titanium", "TR90"] as const;

const FrameCatalog = () => {
  const { openContact } = useBranchContact();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedShape, setSelectedShape] = useState<string>("All");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("All");
  const [quickViewFrame, setQuickViewFrame] = useState<EyewearFrame | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = eyewearFrames.filter((f) => {
    if (selectedCategory !== "All" && f.category !== (selectedCategory as FrameCategory)) return false;
    if (selectedShape !== "All" && f.shape !== (selectedShape as FrameShape)) return false;
    if (selectedMaterial !== "All" && f.material !== (selectedMaterial as FrameMaterial)) return false;
    return true;
  });

  return (
    <>
      <SeoHead seo={seoByPath["/frames"]} />
      <Navbar />
      <main className="pt-20 md:pt-24 pb-20 bg-background min-h-screen">
        <section className="gradient-brand py-16 md:py-20">
          <div className="container text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Glasses className="mx-auto mb-4 text-primary-foreground" size={48} />
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
                Frame Catalog
              </h1>
              <p className="text-primary-foreground/80 max-w-xl mx-auto text-sm md:text-base">
                Browse our curated collection of prescription frames, sunglasses, and designer eyewear.
                Tap any frame to explore every available angle.
              </p>
            </motion.div>
          </div>
        </section>

        <BrandSlideshow />

        <div className="container py-10">
          <div className="md:hidden mb-4">
            <Button variant="outline" className="w-full gap-2" onClick={() => setShowFilters(!showFilters)}>
              <Filter size={16} /> {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          <div className={`${showFilters ? "block" : "hidden"} md:block mb-8 space-y-4`}>
            <FilterRow label="Category" options={categories} selected={selectedCategory} onChange={setSelectedCategory} />
            <FilterRow label="Shape" options={shapes} selected={selectedShape} onChange={setSelectedShape} />
            <FilterRow label="Material" options={materials} selected={selectedMaterial} onChange={setSelectedMaterial} />
          </div>

          <p className="text-muted-foreground text-sm mb-6">
            {filtered.length} frame{filtered.length !== 1 ? "s" : ""} found
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
            {filtered.map((frame, i) => (
              <FrameCard key={frame.id} frame={frame} index={i} onClick={() => setQuickViewFrame(frame)} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Glasses size={48} className="mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">No frames match your filters. Try adjusting your selection.</p>
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border py-3 px-4 flex items-center justify-center gap-2 md:gap-3">
          <a href="/#booking">
            <Button size="sm" className="gradient-teal text-primary-foreground gap-1.5 text-xs">
              <Calendar size={14} /> Book Eye Exam
            </Button>
          </a>
          <Button size="sm" variant="outline" className="gap-1.5 text-xs" onClick={() => openContact("whatsapp")}>
            <MessageCircle size={14} /> WhatsApp
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5 text-xs" onClick={() => openContact("call")}>
            <Phone size={14} /> Call
          </Button>
        </div>
      </main>

      <FrameDetailModal frame={quickViewFrame} onClose={() => setQuickViewFrame(null)} />
      <Footer />
      <WhatsAppButton />
    </>
  );
};

const FrameCard = ({
  frame,
  index,
  onClick,
}: {
  frame: EyewearFrame;
  index: number;
  onClick: () => void;
}) => (
  <motion.button
    type="button"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: Math.min(index * 0.03, 0.4) }}
    onClick={onClick}
    className="text-left bg-card rounded-xl overflow-hidden shadow-card cursor-pointer group hover:shadow-teal transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
  >
    <div className="aspect-[4/3] bg-white relative overflow-hidden">
      <img
        src={frame.image}
        alt={`${frame.name} - ${frame.brand} ${frame.shape} frames`}
        width={800}
        height={600}
        className="w-full h-full object-contain p-3 md:p-4 group-hover:scale-105 transition-transform duration-500"
        loading={index < 6 ? "eager" : "lazy"}
        decoding="async"
        {...(index === 0 ? { fetchPriority: "high" as const } : {})}
      />
      <span className="absolute top-2 left-2 text-[9px] md:text-[10px] font-semibold uppercase tracking-wider bg-primary text-primary-foreground px-1.5 py-0.5 md:px-2 rounded-full">
        {frame.category}
      </span>
      {frame.images.length > 1 && (
        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 text-[9px] md:text-[10px] font-medium bg-foreground/75 text-background px-1.5 py-0.5 rounded-full">
          <Images size={10} /> {frame.images.length}
        </span>
      )}
    </div>
    <div className="p-3 md:p-4">
      <p className="text-[10px] md:text-[11px] text-muted-foreground uppercase tracking-wider mb-0.5 md:mb-1">
        {frame.brand}
      </p>
      <h3 className="font-heading font-semibold text-foreground text-sm md:text-base mb-0.5 md:mb-1 truncate">
        {frame.name}
      </h3>
      <span className="text-muted-foreground text-[10px] md:text-xs">
        {frame.shape} · {frame.material}
      </span>
    </div>
  </motion.button>
);

const FrameDetailModal = ({
  frame,
  onClose,
}: {
  frame: EyewearFrame | null;
  onClose: () => void;
}) => {
  const { openContact } = useBranchContact();
  const [slide, setSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  useEffect(() => {
    setSlide(0);
  }, [frame?.id]);

  useEffect(() => {
    if (!frame) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [frame]);

  const count = frame?.images.length ?? 0;
  const goPrev = useCallback(() => {
    if (count < 2) return;
    setSlide((s) => (s - 1 + count) % count);
  }, [count]);
  const goNext = useCallback(() => {
    if (count < 2) return;
    setSlide((s) => (s + 1) % count);
  }, [count]);

  useEffect(() => {
    if (!frame) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [frame, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {frame && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-3 md:p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${frame.brand} ${frame.name}`}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-teal"
          >
            <div
              className="relative aspect-[4/3] md:aspect-[16/10] bg-white overflow-hidden rounded-t-2xl select-none touch-pan-y"
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0].clientX;
                touchDeltaX.current = 0;
              }}
              onTouchMove={(e) => {
                if (touchStartX.current == null) return;
                touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
              }}
              onTouchEnd={() => {
                if (Math.abs(touchDeltaX.current) > 50) {
                  if (touchDeltaX.current < 0) goNext();
                  else goPrev();
                }
                touchStartX.current = null;
                touchDeltaX.current = 0;
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={`${frame.id}-${slide}`}
                  src={frame.images[slide]}
                  alt={`${frame.name} — view ${slide + 1} of ${count}`}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 w-full h-full object-contain p-6 md:p-10"
                  draggable={false}
                />
              </AnimatePresence>

              <button
                type="button"
                onClick={onClose}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-card/95 shadow-sm flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <span className="absolute top-3 left-3 z-10 text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground px-3 py-1 rounded-full">
                {frame.category}
              </span>

              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-card/95 shadow-sm flex items-center justify-center hover:bg-accent transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-card/95 shadow-sm flex items-center justify-center hover:bg-accent transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>

                  <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
                    {frame.images.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSlide(i)}
                        aria-label={`Go to image ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === slide ? "w-5 bg-primary" : "w-1.5 bg-foreground/25 hover:bg-foreground/40"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {count > 1 && (
              <div className="flex gap-2 px-4 py-3 overflow-x-auto border-b border-border bg-accent/30">
                {frame.images.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSlide(i)}
                    className={`shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden bg-white border-2 transition-colors ${
                      i === slide ? "border-primary" : "border-transparent hover:border-primary/40"
                    }`}
                    aria-label={`Thumbnail ${i + 1}`}
                  >
                    <img src={src} alt="" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}

            <div className="p-5 md:p-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{frame.brand}</p>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3">{frame.name}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-accent text-accent-foreground px-2.5 py-1 rounded-full">{frame.shape}</span>
                <span className="text-xs bg-accent text-accent-foreground px-2.5 py-1 rounded-full">{frame.material}</span>
                <span className="text-xs bg-accent text-accent-foreground px-2.5 py-1 rounded-full">{frame.color}</span>
                {count > 1 && (
                  <span className="text-xs bg-accent text-accent-foreground px-2.5 py-1 rounded-full">
                    {count} angles
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{frame.description}</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <a href="/#booking" className="flex-1">
                  <Button className="w-full gradient-teal text-primary-foreground gap-2">
                    <Calendar size={16} /> Book Eye Exam
                  </Button>
                </a>
                <Button
                  variant="outline"
                  className="w-full gap-2 flex-1"
                  onClick={() => openContact("whatsapp")}
                >
                  <MessageCircle size={16} /> WhatsApp Us
                </Button>
                <Button variant="outline" className="gap-2" onClick={() => openContact("call")}>
                  <Phone size={16} /> Call
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FilterRow = ({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: readonly string[];
  selected: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
    <span className="text-xs md:text-sm font-medium text-foreground w-20 md:w-24 shrink-0">{label}:</span>
    {options.map((opt) => (
      <button
        key={opt}
        type="button"
        onClick={() => onChange(opt)}
        className={`text-[10px] md:text-xs px-2 md:px-3 py-1 md:py-1.5 rounded-full transition-colors ${
          selected === opt
            ? "bg-primary text-primary-foreground"
            : "bg-accent text-accent-foreground hover:bg-primary/10"
        }`}
      >
        {opt}
      </button>
    ))}
  </div>
);

export default FrameCatalog;
