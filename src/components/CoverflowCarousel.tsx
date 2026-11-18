import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CoverflowTheme = {
  panel: string;
  blobA: string;
  blobB: string;
  blobC: string;
  accent: string;
  text: string;
  muted: string;
};

export type CoverflowSlide = {
  id: string;
  category: string;
  title: string;
  summary: string;
  theme: CoverflowTheme;
};

const AUTOPLAY_MS = 7000;
const SWIPE_THRESHOLD = 56;

const wrapIndex = (index: number, length: number) => {
  const mod = index % length;
  return mod < 0 ? mod + length : mod;
};

const getRelativeOffset = (index: number, active: number, length: number) => {
  let diff = index - active;
  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;
  return diff;
};

/** x is relative to the slide width; -50% keeps left:50% cards centered. */
const slideStyle = (offset: number, reduceMotion: boolean, compact: boolean) => {
  const abs = Math.abs(offset);
  if (abs > 2) {
    return {
      x: `calc(-50% + ${offset * (compact ? 78 : 70)}%)`,
      scale: 0.55,
      opacity: 0,
      rotateY: 0,
      zIndex: 0,
    };
  }

  const sideShift = compact ? 42 + (abs - 1) * 22 : 52 + (abs - 1) * 26;
  const x =
    offset === 0
      ? "-50%"
      : offset > 0
        ? `calc(-50% + ${sideShift}%)`
        : `calc(-50% - ${sideShift}%)`;
  const scale = offset === 0 ? 1 : abs === 1 ? (compact ? 0.84 : 0.8) : 0.66;
  const opacity = offset === 0 ? 1 : abs === 1 ? (compact ? 0.58 : 0.7) : 0.36;
  const rotateY = reduceMotion || compact ? 0 : offset * -16;
  const y = offset === 0 ? 0 : abs === 1 ? (compact ? 14 : 22) : 40;

  return {
    x,
    y,
    scale,
    opacity,
    rotateY,
    zIndex: 30 - abs * 10,
  };
};

const AbstractBackdrop = ({
  theme,
  active,
}: {
  theme: CoverflowTheme;
  active: boolean;
}) => (
  <div className={`absolute inset-0 bg-gradient-to-br ${theme.panel}`} aria-hidden="true">
    <motion.div
      className={`absolute -left-[18%] -top-[28%] h-[70%] w-[70%] rounded-[42%] ${theme.blobA} blur-2xl`}
      animate={
        active
          ? { x: [0, 18, -8, 0], y: [0, -14, 10, 0], rotate: [0, 8, -4, 0] }
          : { x: 0, y: 0, rotate: 0 }
      }
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className={`absolute -bottom-[30%] -right-[16%] h-[75%] w-[75%] rounded-[46%] ${theme.blobB} blur-3xl`}
      animate={
        active
          ? { x: [0, -16, 10, 0], y: [0, 12, -18, 0], rotate: [0, -6, 5, 0] }
          : { x: 0, y: 0, rotate: 0 }
      }
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className={`absolute left-[28%] top-[18%] h-[42%] w-[42%] rounded-full ${theme.blobC} blur-xl`}
      animate={active ? { scale: [1, 1.08, 0.96, 1], opacity: [0.55, 0.8, 0.5, 0.55] } : { scale: 1 }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.22),transparent_55%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_90%,rgba(15,23,42,0.28),transparent_50%)]" />
  </div>
);

/** Brand-aligned abstract palettes — cycle for distinct slide identities. */
export const COVERFLOW_THEMES: CoverflowTheme[] = [
  {
    panel: "from-[#1e2a78] via-[#2f4fbf] to-[#5ec8f0]",
    blobA: "bg-[#7dd3fc]/35",
    blobB: "bg-[#312e81]/40",
    blobC: "bg-white/15",
    accent: "bg-white/90",
    text: "text-white",
    muted: "text-white/80",
  },
  {
    panel: "from-[#0f766e] via-[#0891b2] to-[#bae6fd]",
    blobA: "bg-[#67e8f9]/30",
    blobB: "bg-[#134e4a]/45",
    blobC: "bg-white/20",
    accent: "bg-white/90",
    text: "text-white",
    muted: "text-white/80",
  },
  {
    panel: "from-[#1e3a8a] via-[#2563eb] to-[#93c5fd]",
    blobA: "bg-[#bfdbfe]/35",
    blobB: "bg-[#1e40af]/40",
    blobC: "bg-white/15",
    accent: "bg-white/90",
    text: "text-white",
    muted: "text-white/80",
  },
  {
    panel: "from-[#164e63] via-[#0e7490] to-[#a5f3fc]",
    blobA: "bg-[#22d3ee]/25",
    blobB: "bg-[#083344]/50",
    blobC: "bg-white/18",
    accent: "bg-cyan-100",
    text: "text-white",
    muted: "text-cyan-50/85",
  },
  {
    panel: "from-[#312e81] via-[#4338ca] to-[#a5b4fc]",
    blobA: "bg-[#c7d2fe]/30",
    blobB: "bg-[#1e1b4b]/45",
    blobC: "bg-white/12",
    accent: "bg-indigo-100",
    text: "text-white",
    muted: "text-indigo-100/85",
  },
  {
    panel: "from-[#0c4a6e] via-[#0369a1] to-[#7dd3fc]",
    blobA: "bg-[#38bdf8]/28",
    blobB: "bg-[#082f49]/48",
    blobC: "bg-white/16",
    accent: "bg-sky-100",
    text: "text-white",
    muted: "text-sky-50/85",
  },
  {
    panel: "from-[#1e3a5f] via-[#2563a8] to-[#93c5fd]",
    blobA: "bg-[#60a5fa]/30",
    blobB: "bg-[#172554]/50",
    blobC: "bg-white/14",
    accent: "bg-blue-50",
    text: "text-white",
    muted: "text-blue-50/85",
  },
  {
    panel: "from-[#134e4a] via-[#0f766e] to-[#5eead4]",
    blobA: "bg-[#2dd4bf]/28",
    blobB: "bg-[#042f2e]/48",
    blobC: "bg-white/18",
    accent: "bg-teal-50",
    text: "text-white",
    muted: "text-teal-50/90",
  },
  {
    panel: "from-[#1e1b4b] via-[#3730a3] to-[#818cf8]",
    blobA: "bg-[#a5b4fc]/32",
    blobB: "bg-[#312e81]/42",
    blobC: "bg-white/12",
    accent: "bg-indigo-50",
    text: "text-white",
    muted: "text-indigo-100/85",
  },
  {
    panel: "from-[#0f172a] via-[#1e40af] to-[#38bdf8]",
    blobA: "bg-[#7dd3fc]/25",
    blobB: "bg-[#1e3a8a]/45",
    blobC: "bg-white/15",
    accent: "bg-slate-100",
    text: "text-white",
    muted: "text-slate-100/85",
  },
  {
    panel: "from-[#14532d] via-[#15803d] to-[#86efac]",
    blobA: "bg-[#4ade80]/25",
    blobB: "bg-[#052e16]/45",
    blobC: "bg-white/18",
    accent: "bg-emerald-50",
    text: "text-white",
    muted: "text-emerald-50/90",
  },
  {
    panel: "from-[#172554] via-[#1d4ed8] to-[#67e8f9]",
    blobA: "bg-[#22d3ee]/28",
    blobB: "bg-[#1e3a8a]/42",
    blobC: "bg-white/16",
    accent: "bg-cyan-50",
    text: "text-white",
    muted: "text-cyan-50/85",
  },
];

type CoverflowCarouselProps = {
  slides: CoverflowSlide[];
  ariaLabel: string;
  itemLabel?: string;
  renderExpanded?: (slide: CoverflowSlide, index: number) => ReactNode;
  expandLabel?: string;
  collapseLabel?: string;
  autoplayMs?: number;
  className?: string;
};

const CoverflowCarousel = ({
  slides,
  ariaLabel,
  itemLabel = "fact",
  renderExpanded,
  expandLabel = "Read more",
  collapseLabel = "Hide details",
  autoplayMs = AUTOPLAY_MS,
  className = "",
}: CoverflowCarouselProps) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [compact, setCompact] = useState(false);
  const reduceMotion = useReducedMotion();
  const dragStartX = useRef<number | null>(null);
  const sectionInView = useRef(true);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const count = slides.length;
  const goTo = useCallback(
    (index: number) => {
      setShowDetail(false);
      setActive(wrapIndex(index, count));
    },
    [count],
  );
  const next = useCallback(() => {
    setShowDetail(false);
    setActive((current) => wrapIndex(current + 1, count));
  }, [count]);
  const prev = useCallback(() => {
    setShowDetail(false);
    setActive((current) => wrapIndex(current - 1, count));
  }, [count]);

  useEffect(() => {
    if (paused || reduceMotion || showDetail) return;
    const id = window.setInterval(() => {
      if (!sectionInView.current) return;
      next();
    }, autoplayMs);
    return () => window.clearInterval(id);
  }, [next, paused, reduceMotion, showDetail, autoplayMs]);

  useEffect(() => {
    const node = stageRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        sectionInView.current = entry.isIntersecting;
      },
      { threshold: 0.25 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const onPointerDown = (e: ReactPointerEvent) => {
    dragStartX.current = e.clientX;
    setPaused(true);
  };

  const onPointerUp = (e: ReactPointerEvent) => {
    if (dragStartX.current == null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) >= SWIPE_THRESHOLD) {
      if (delta < 0) next();
      else prev();
    }
    setPaused(false);
  };

  const onPointerCancel = () => {
    dragStartX.current = null;
    setPaused(false);
  };

  if (count === 0) return null;

  return (
    <div
      ref={stageRef}
      className={`relative mx-auto w-full max-w-[1400px] px-0 sm:px-4 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="relative h-[420px] touch-pan-y select-none sm:h-[460px] md:h-[520px] lg:h-[560px]"
        style={{ perspective: reduceMotion ? undefined : 1400 }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
      >
        {slides.map((slide, index) => {
          const offset = getRelativeOffset(index, active, count);
          const abs = Math.abs(offset);
          if (abs > 2) return null;
          const style = slideStyle(offset, !!reduceMotion, compact);
          const isActive = offset === 0;

          return (
            <motion.article
              key={slide.id}
              className="absolute left-1/2 top-0 h-full w-[min(88vw,520px)] overflow-hidden rounded-[1.75rem] border border-white/25 shadow-[0_28px_80px_-28px_rgba(15,23,42,0.55)] md:w-[min(70vw,640px)] lg:w-[min(58vw,720px)]"
              style={{ transformStyle: "preserve-3d" }}
              initial={false}
              animate={style}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 28,
                mass: 0.9,
              }}
              onClick={() => {
                if (!isActive) goTo(index);
              }}
              aria-hidden={!isActive}
            >
              <AbstractBackdrop theme={slide.theme} active={isActive && !reduceMotion} />

              <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12">
                <div className={`min-h-0 ${showDetail && isActive ? "overflow-y-auto pr-1" : ""}`}>
                  <motion.p
                    key={`${slide.id}-cat-${isActive}`}
                    initial={reduceMotion || !isActive ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className={`mb-4 inline-flex rounded-full px-3 py-1 font-body text-[10px] uppercase tracking-[0.2em] sm:text-[11px] ${
                      isActive ? "bg-white/20 text-white" : "bg-black/15 text-white/80"
                    }`}
                  >
                    {slide.category}
                  </motion.p>

                  <AnimatePresence mode="wait">
                    {isActive ? (
                      <motion.div
                        key={`${slide.id}-copy`}
                        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <h3
                          className={`font-heading text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-[2.65rem] ${slide.theme.text}`}
                        >
                          {slide.title}
                        </h3>
                        <p
                          className={`mt-4 max-w-xl font-body text-sm leading-relaxed sm:text-base md:text-lg ${slide.theme.muted}`}
                        >
                          {slide.summary}
                        </p>

                        <AnimatePresence>
                          {showDetail && renderExpanded && (
                            <motion.div
                              initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
                              className="mt-4 max-w-xl overflow-hidden"
                            >
                              {renderExpanded(slide, index)}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ) : (
                      <div className="pt-2">
                        <h3 className="font-heading text-xl font-bold text-white/90 sm:text-2xl">
                          {slide.title}
                        </h3>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {isActive && (
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {renderExpanded && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDetail((v) => !v);
                        }}
                        className="rounded-full border border-white/35 bg-white/15 px-4 py-2 font-body text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/25"
                      >
                        {showDetail ? collapseLabel : expandLabel}
                      </button>
                    )}
                    <span className="font-body text-xs tabular-nums tracking-wide text-white/70">
                      {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                    </span>
                  </div>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 px-4 md:mt-8">
        <button
          type="button"
          onClick={prev}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-white text-foreground shadow-sm transition hover:border-primary/40 hover:bg-accent"
          aria-label={`Previous ${itemLabel}`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex max-w-[min(70vw,28rem)] flex-wrap items-center justify-center gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to ${itemLabel} ${i + 1}: ${slide.title}`}
              aria-current={i === active ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-7 bg-primary" : "w-2 bg-primary/25 hover:bg-primary/45"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-white text-foreground shadow-sm transition hover:border-primary/40 hover:bg-accent"
          aria-label={`Next ${itemLabel}`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CoverflowCarousel;
