import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import tipEyeExam from "@/assets/tip-eye-exam.jpg";
import tipVisionTesting from "@/assets/tip-vision-testing.jpg";
import tipEyeglasses from "@/assets/tip-eyeglasses.jpg";
import tipEyeAnatomy from "@/assets/tip-eye-anatomy.jpg";
import tipScreenProtection from "@/assets/tip-screen-protection.jpg";
import tipSunglasses from "@/assets/tip-sunglasses.jpg";

const tips = [
  {
    img: tipVisionTesting,
    alt: "Precision optical camera lens representing clarity and accurate vision assessment",
    title: "Regular Eye Exams",
    text: "Schedule comprehensive eye exams at least once every two years, or annually if you wear corrective lenses.",
  },
  {
    img: tipScreenProtection,
    alt: "Bright computer workstation illustrating digital screen use and eye-strain awareness",
    title: "Screen Protection",
    text: "Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds to reduce digital eye strain.",
  },
  {
    img: tipEyeglasses,
    alt: "Round wooden eyeglass frames on a teal surface, highlighting prescription eyewear",
    title: "Signs You Need Glasses",
    text: "Frequent headaches, squinting, blurred vision, or difficulty seeing at night could mean it's time for an eye exam.",
  },
  {
    img: tipSunglasses,
    alt: "Reflective sunglasses resting on stone in bright sunlight for UV eye protection",
    title: "Healthy Vision Habits",
    text: "Eat a balanced diet rich in omega-3s, wear UV-protective sunglasses outdoors, and avoid smoking for long-term eye health.",
  },
];

const didYouKnowFacts = [
  "Regular eye exams can detect early signs of conditions like glaucoma, diabetes-related eye disease, and macular degeneration — often before symptoms appear.",
  "Your eyes can process about 36,000 pieces of information every hour.",
  "80% of vision problems worldwide are avoidable or even curable with early detection.",
  "Blue light from screens doesn't cause permanent eye damage, but it can contribute to digital eye strain and disrupt sleep patterns.",
  "The human eye can distinguish approximately 10 million different colours.",
  "Babies are born colour blind and develop full colour vision by around 6 months of age.",
  "Diabetes is one of the leading causes of blindness in adults — regular eye exams can catch it early.",
  "UV damage to your eyes is cumulative — wearing sunglasses from a young age protects against cataracts later in life.",
  "Reading in dim light won't damage your eyes, but it can cause temporary eye strain and fatigue.",
  "Your cornea is one of only two parts of the body with no blood supply — it gets oxygen directly from the air.",
  "Smoking doubles the risk of macular degeneration and increases cataract risk by up to 3 times.",
  "Children should have their first eye exam at 6 months old, then at age 3, and before starting school.",
  "Our eyes are about 1 inch across and weigh about 0.25 ounce.",
  "Our eyes remain the same size throughout life, whereas our nose and ears never stop growing.",
  "The human eye blinks an average of 4,200,000 times a year.",
  "Your eye is the fastest muscle in your body. Hence, the phrase: \"In the blink of an eye.\"",
  "The world's most common eye color is brown.",
  "We have two eyeballs in order to give us depth perception – comparing two images allows us to determine how far away an object is from us.",
  "All babies are colour blind at birth.",
  "About half of the human brain is dedicated to vision and seeing.",
  "People generally read 25% slower on screen than on paper.",
  "When you read or stare at a computer, you blink less often resulting in tired eyes.",
  "94% of visible premature-aging around the eyes is caused by UV damage.",
  "Our eyes are made up of over 2 million working parts.",
  "The eyeball weighs around 28 grams.",
  "The eye muscles are the most active muscles in the human body.",
  "While a fingerprint has 40 unique characteristics, an iris has 256. This is why retina scans are increasingly being used for security purposes.",
  "When working at a computer, you should follow the 20-20-20 rule – look at something twenty feet away from your computer every twenty minutes for twenty seconds.",
  "Red-eye in photos is caused by light from the flash bouncing off the capillaries in your eyes.",
  "If the human eye was a digital camera, it would have 576 megapixels.",
];

const extractHighlight = (fact: string): { value: number; suffix: string } | null => {
  const match = fact.match(/(\d[\d,]*(?:\.\d+)?)\s*(%|million|times)?/i);
  if (!match) return null;
  const value = parseFloat(match[1].replace(/,/g, ""));
  if (Number.isNaN(value)) return null;
  const suffix = match[2] ? (match[2].toLowerCase() === "million" ? "M" : match[2]) : "";
  return { value, suffix };
};

const CountUpNumber = ({
  value,
  suffix,
  active,
  reduceMotion,
}: {
  value: number;
  suffix: string;
  active: boolean;
  reduceMotion: boolean;
}) => {
  const [display, setDisplay] = useState(reduceMotion ? value : 0);
  const decimals = String(value).includes(".") ? 2 : 0;

  useEffect(() => {
    if (!active) {
      setDisplay(reduceMotion ? value : 0);
      return;
    }
    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const duration = 1100;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value, reduceMotion]);

  const formatted =
    value >= 1000
      ? Math.round(display).toLocaleString()
      : decimals
        ? display.toFixed(decimals)
        : Math.round(display).toString();

  return (
    <span className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
};

const ease = [0.22, 1, 0.36, 1] as const;

const TipsSection = () => {
  const [currentFact, setCurrentFact] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.28 });
  const reduceMotion = useReducedMotion();

  const nextFact = useCallback(() => {
    setCurrentFact((prev) => (prev + 1) % didYouKnowFacts.length);
  }, []);

  const prevFact = useCallback(() => {
    setCurrentFact((prev) => (prev - 1 + didYouKnowFacts.length) % didYouKnowFacts.length);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion || !inView) return;
    const interval = setInterval(nextFact, 5800);
    return () => clearInterval(interval);
  }, [nextFact, paused, reduceMotion, inView]);

  const highlight = useMemo(() => extractHighlight(didYouKnowFacts[currentFact]), [currentFact]);
  const progress = ((currentFact + 1) / didYouKnowFacts.length) * 100;

  return (
    <section id="tips" className="py-20 md:py-28 bg-background">
      <div className="container">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary font-body text-sm uppercase tracking-widest mb-3">Eye Health Education</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Eye Care Tips</h2>
        </motion.div>

        {/* Supporting educational visuals */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mb-8 md:mb-10 grid grid-cols-2 gap-3 md:gap-4"
        >
          <div className="group relative overflow-hidden rounded-2xl aspect-[16/10] bg-muted shadow-card">
            <img
              src={tipEyeExam}
              alt="Close-up of precision optical microscope equipment used in vision science"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[hsl(240_40%_8%/0.45)] via-transparent to-transparent" />
            <p className="absolute bottom-3 left-3 right-3 font-body text-[10px] md:text-xs uppercase tracking-[0.16em] text-primary-foreground/95">
              Eye examination
            </p>
          </div>
          <div className="group relative overflow-hidden rounded-2xl aspect-[16/10] bg-muted shadow-card">
            <img
              src={tipEyeAnatomy}
              alt="Round sunglasses with reflective teal lenses on a clean studio background"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[hsl(240_40%_8%/0.45)] via-transparent to-transparent" />
            <p className="absolute bottom-3 left-3 right-3 font-body text-[10px] md:text-xs uppercase tracking-[0.16em] text-primary-foreground/95">
              Optical clarity
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-14 md:mb-20">
          {tips.map((t, i) => (
            <motion.article
              key={t.title}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease }}
              className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-teal"
            >
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={t.img}
                  alt={t.alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5 md:p-6">
                <h3 className="font-heading text-base md:text-lg font-semibold text-foreground mb-2">{t.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{t.text}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Did You Know — CSS / typography only */}
        <motion.div
          ref={sectionRef}
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="relative"
        >
          <div className="mb-7 md:mb-9 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5, ease }}
            >
              <p className="text-primary font-body text-xs uppercase tracking-[0.22em] mb-2">Insights</p>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Did You Know?</h3>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18, duration: 0.5, ease }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-10 bg-primary/30" />
              <p className="text-xs text-muted-foreground font-medium tabular-nums tracking-wide">
                {String(currentFact + 1).padStart(2, "0")}
                <span className="mx-1.5 text-border">/</span>
                {String(didYouKnowFacts.length).padStart(2, "0")}
              </p>
            </motion.div>
          </div>

          <article className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition-all duration-500 hover:shadow-teal hover:-translate-y-0.5">
            {/* Ambient CSS shapes */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 gradient-teal-soft opacity-50" />
              <div
                className={`absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl ${
                  reduceMotion ? "" : "animate-[pulse_7s_ease-in-out_infinite]"
                }`}
              />
              <div
                className={`absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-sky/15 blur-3xl ${
                  reduceMotion ? "" : "animate-[pulse_9s_ease-in-out_infinite_reverse]"
                }`}
              />
              <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-[0.04]">
                <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground" />
                <div className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground" />
                <div className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground" />
              </div>
              <motion.p
                aria-hidden
                animate={
                  reduceMotion
                    ? undefined
                    : { y: [0, -10, 0], opacity: [0.04, 0.07, 0.04] }
                }
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-2 top-6 select-none font-heading text-[4.5rem] md:text-[7rem] font-bold leading-none tracking-tighter text-foreground/5"
              >
                DYK
              </motion.p>
            </div>

            <div className="relative grid gap-0 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)]">
              {/* Stat / visual column */}
              <div className="relative flex flex-col justify-center border-b border-border/50 p-7 md:border-b-0 md:border-r md:p-10 lg:p-12">
                <motion.div
                  key={`eyebrow-${currentFact}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="mb-6 flex items-center gap-3"
                >
                  <span className="h-px w-8 bg-primary" />
                  <span className="font-body text-[11px] uppercase tracking-[0.24em] text-primary">
                    Fact {currentFact + 1}
                  </span>
                </motion.div>

                <AnimatePresence mode="wait">
                  {highlight ? (
                    <motion.div
                      key={`stat-${currentFact}`}
                      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -16, scale: 0.98 }}
                      transition={{ duration: 0.5, ease }}
                      className="relative"
                    >
                      <p className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold leading-none tracking-tight text-foreground">
                        <CountUpNumber
                          value={highlight.value}
                          suffix={highlight.suffix}
                          active={inView}
                          reduceMotion={!!reduceMotion}
                        />
                      </p>
                      <motion.div
                        initial={reduceMotion ? false : { scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.25, duration: 0.55, ease }}
                        className="mt-5 h-1 w-16 origin-left rounded-full gradient-teal"
                      />
                      <p className="mt-4 max-w-[12rem] font-body text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Key figure from this insight
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`nostat-${currentFact}`}
                      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                      transition={{ duration: 0.45, ease }}
                      className="relative py-2"
                    >
                      <p className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-[0.95] tracking-tight text-primary/90">
                        Did
                        <br />
                        You
                        <br />
                        Know?
                      </p>
                      <div className="mt-6 flex gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/25" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Radial progress */}
                <div className="mt-10 hidden md:block">
                  <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-primary/10">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full gradient-teal"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.45, ease }}
                    />
                    {!reduceMotion && (
                      <motion.div
                        key={`sweep-${currentFact}-${paused}-${inView}`}
                        className="absolute inset-y-0 left-0 rounded-full bg-primary/35"
                        initial={{ width: "0%" }}
                        animate={{ width: paused || !inView ? "0%" : "100%" }}
                        transition={{ duration: paused || !inView ? 0 : 5.8, ease: "linear" }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Fact copy column */}
              <div className="relative flex flex-col justify-between p-7 md:p-10 lg:p-12">
                <div className="min-h-[160px] md:min-h-[200px] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentFact}
                      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -14 }}
                      transition={{ duration: 0.45, ease, delay: reduceMotion ? 0 : 0.05 }}
                      className="font-heading text-lg md:text-xl lg:text-2xl text-foreground leading-snug md:leading-relaxed"
                    >
                      {didYouKnowFacts[currentFact]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={prevFact}
                      className="rounded-full border border-border bg-background/80 px-4 py-2 text-xs font-medium text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-accent hover:text-primary"
                      aria-label="Previous fact"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={nextFact}
                      className="rounded-full border border-border bg-background/80 px-4 py-2 text-xs font-medium text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-accent hover:text-primary"
                      aria-label="Next fact"
                    >
                      Next
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5" aria-hidden>
                    {Array.from({ length: Math.min(8, didYouKnowFacts.length) }).map((_, i) => {
                      const activeIndex = currentFact % 8;
                      return (
                        <motion.span
                          key={i}
                          animate={{
                            width: i === activeIndex ? 18 : 6,
                            opacity: i === activeIndex ? 1 : 0.35,
                          }}
                          transition={{ duration: 0.3 }}
                          className="h-1.5 rounded-full bg-primary"
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </motion.div>
      </div>
    </section>
  );
};

export default TipsSection;
