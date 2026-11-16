import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { eyewearFrames, type EyewearFrame } from "@/data/eyewearFrames";

const EyewearSection = () => {
  const [active, setActive] = useState<EyewearFrame | null>(null);

  return (
    <section id="eyewear" className="py-20 md:py-28 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary font-body text-sm uppercase tracking-widest mb-3">Our Collection</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Eyewear &amp; Frames</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Discover our curated selection of prescription lenses, sunglasses, and designer frames.
            Tap a frame to explore every available angle.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {eyewearFrames.map((frame, i) => (
            <motion.button
              key={frame.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.02, 0.35) }}
              onClick={() => setActive(frame)}
              className="text-left bg-card rounded-xl overflow-hidden shadow-card group hover:shadow-teal transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="aspect-[4/3] bg-white relative overflow-hidden">
                <img
                  src={frame.image}
                  alt={`${frame.name} - ${frame.brand}`}
                  className="w-full h-full object-contain p-3 md:p-4 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {frame.images.length > 1 && (
                  <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 text-[9px] md:text-[10px] font-medium bg-foreground/75 text-background px-1.5 py-0.5 rounded-full">
                    <Images size={10} /> {frame.images.length}
                  </span>
                )}
              </div>
              <div className="p-2.5 md:p-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider truncate">{frame.brand}</p>
                <h3 className="font-heading font-semibold text-foreground text-xs md:text-sm truncate">{frame.name}</h3>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link to="/frames">
            <Button size="lg" className="gradient-teal text-primary-foreground gap-2 shadow-teal text-base px-8">
              View Full Catalog <ArrowRight size={18} />
            </Button>
          </Link>
        </motion.div>
      </div>

      <FrameSliderModal frame={active} onClose={() => setActive(null)} />
    </section>
  );
};

const FrameSliderModal = ({
  frame,
  onClose,
}: {
  frame: EyewearFrame | null;
  onClose: () => void;
}) => {
  const [slide, setSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  useEffect(() => {
    setSlide(0);
  }, [frame?.id]);

  useEffect(() => {
    if (!frame) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
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
              className="relative aspect-[4/3] md:aspect-[16/10] bg-white overflow-hidden rounded-t-2xl select-none"
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

              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-card/95 shadow-sm flex items-center justify-center hover:bg-accent transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-card/95 shadow-sm flex items-center justify-center hover:bg-accent transition-colors"
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

            <div className="p-5 md:p-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{frame.brand}</p>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">{frame.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{frame.description}</p>
              <Link to="/frames" onClick={onClose}>
                <Button className="gradient-teal text-primary-foreground gap-2">
                  View in Catalog <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EyewearSection;
