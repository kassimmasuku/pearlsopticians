import { useCallback, useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Baby,
  Eye,
  Glasses,
  HeartPulse,
  ScanEye,
  Sparkles,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import framesDisplay from "@/assets/frames-display.webp";

type Service = {
  id: string;
  title: string;
  desc: string;
  detail: string[];
  icon: LucideIcon;
};

/** Brand-blue gradient accents — lighter sky → primary → deep brand blue */
const BLUE_GRAD =
  "from-[hsl(220_62%_62%)] via-[hsl(var(--primary))] to-[hsl(var(--brand-dark))]";
const BLUE_RING_SHADOW =
  "shadow-[0_14px_36px_-16px_hsl(var(--primary)/0.28)] group-hover:shadow-[0_18px_44px_-14px_hsl(var(--primary)/0.38)]";
const BLUE_HUB_SHADOW = "shadow-[0_18px_50px_-20px_hsl(var(--primary)/0.32)]";
const BLUE_CONIC =
  "conic-gradient(from 0deg, hsl(220 62% 68%), hsl(220 70% 50%), hsl(238 44% 41%), hsl(240 55% 25%), hsl(220 70% 50%), hsl(220 62% 68%))";

const services: Service[] = [
  {
    id: "comprehensive-exams",
    title: "Comprehensive Eye Exams",
    desc: "Thorough vision and eye health assessments using modern diagnostic equipment.",
    detail: [
      "A comprehensive eye exam at Pearls Opticians goes beyond a basic vision check. Our team assesses how clearly you see and reviews the overall health of your eyes using modern diagnostic equipment.",
      "Whether you need an updated prescription, a routine check-up or peace of mind about changes in your vision, we take time to understand your needs and explain your results clearly.",
      "Regular examinations help you stay comfortable in daily life and support early awareness of eye health concerns.",
    ],
    icon: Eye,
  },
  {
    id: "prescription-glasses",
    title: "Prescription Glasses",
    desc: "Precision-crafted lenses tailored to your unique prescription needs.",
    detail: [
      "Once your prescription is confirmed, we help you choose lenses and frames that suit your lifestyle — from everyday wear to work, driving and outdoor use.",
      "Our dispensing team focuses on precise fitting so your glasses feel comfortable and deliver clear, reliable vision.",
      "We guide you through practical lens options available in store, always matching recommendations to your prescription and how you use your glasses.",
    ],
    icon: Glasses,
  },
  {
    id: "vision-testing",
    title: "Vision Testing",
    desc: "Advanced visual acuity testing for adults and children of all ages.",
    detail: [
      "Vision testing at Pearls Opticians measures how well you see at different distances and helps identify the correction you may need.",
      "We welcome adults and children, adapting the experience so each patient feels at ease throughout the assessment.",
      "Clear results and practical guidance help you understand your vision and the next steps for eyewear or follow-up care.",
    ],
    icon: ScanEye,
  },
  {
    id: "eye-health",
    title: "Eye Health Consultation",
    desc: "In-depth consultations on eye conditions, prevention and treatment options.",
    detail: [
      "Our eye health consultations give you space to discuss symptoms, existing conditions and concerns about your vision.",
      "We explain findings in plain language and outline practical options for prevention, monitoring and care available through our practice.",
      "If further attention is needed, our team helps you understand the recommended next steps with clarity and care.",
    ],
    icon: HeartPulse,
  },
  {
    id: "childrens-exams",
    title: "Children's Eye Exams",
    desc: "Gentle, child-friendly eye examinations to support healthy visual development.",
    detail: [
      "Children's eye exams at Pearls Opticians are designed to feel calm, friendly and age-appropriate.",
      "Early assessment supports healthy visual development and helps families notice concerns before they affect learning or comfort at school.",
      "Our team works patiently with younger patients and keeps parents informed throughout the visit.",
    ],
    icon: Baby,
  },
  {
    id: "frame-styling",
    title: "Frame Selection & Styling",
    desc: "Explore our curated range of designer and everyday frames to match your style.",
    detail: [
      "Choosing frames should feel enjoyable. We help you explore designer and everyday styles that complement your face shape, colouring and personality.",
      "From classic shapes to contemporary designs, our curated collection offers options for every preference and budget range available in store.",
      "Our team assists with fit, comfort and finishing details so your new frames look polished and feel right from day one.",
    ],
    icon: Sparkles,
  },
];

/** Clock positions for six orbiting nodes (degrees), starting at top. */
const ORBIT_ANGLES = [-90, -30, 30, 90, 150, 210];

const ServicesSection = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const titleId = useId();
  const active = services.find((s) => s.id === activeId) ?? null;

  const close = useCallback(() => setActiveId(null), []);

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Defer focus so the dialog is mounted
    const t = window.setTimeout(() => {
      document.getElementById(titleId)?.focus();
    }, 30);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [activeId, close, titleId]);

  return (
    <section id="services" className="relative overflow-hidden bg-[#fbfbfc] py-14 md:py-20 lg:py-16 xl:py-20">
      {/* Soft optical backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img
          src={framesDisplay}
          alt=""
          width={1600}
          height={1000}
          className="h-full w-full object-cover object-center opacity-[0.38] saturate-[0.9] brightness-[1.08]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/88 via-white/72 to-white/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2)_0%,transparent_68%)]" />
      </div>

      <div className="container relative z-10">
        {/* Desktop / large tablet circular composition */}
        <div
          className="relative mx-auto hidden aspect-square w-full max-w-[720px] lg:block xl:max-w-[780px]"
          aria-label="Our services"
        >
          {/* Soft orbit guide */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
            aria-hidden="true"
          />

          {/* Central hub — position wrapper kept free of motion transforms */}
          <div className="absolute left-1/2 top-1/2 z-20 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 xl:h-[248px] xl:w-[248px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.86 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full w-full items-center justify-center"
            >
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-br ${BLUE_GRAD} p-[2.5px] ${BLUE_HUB_SHADOW}`}
              >
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-border/50 bg-white px-8 text-center">
                  <p className="font-heading text-[1.45rem] font-bold leading-tight tracking-tight text-foreground xl:text-[1.65rem]">
                    OUR SERVICES
                  </p>
                  <p className="mt-2.5 max-w-[10.5rem] font-body text-[0.8125rem] leading-relaxed text-muted-foreground xl:text-sm">
                    Expert Eye Care Under One Roof
                  </p>
                </div>
              </div>
              <motion.div
                className="pointer-events-none absolute inset-[-6px] rounded-full border border-transparent"
                style={{
                  background: BLUE_CONIC,
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  padding: "1.5px",
                  opacity: 0.4,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              />
            </motion.div>
          </div>

          {/* Orbiting services */}
          {services.map((service, i) => {
            const angle = (ORBIT_ANGLES[i] * Math.PI) / 180;
            const radius = 37.5;
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;
            return (
              <div
                key={service.id}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    delay: 0.28 + i * 0.08,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ServiceCircle
                    service={service}
                    size="desktop"
                    onOpen={() => setActiveId(service.id)}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Mobile / tablet compact layout */}
        <div className="lg:hidden" aria-label="Our services">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-10 flex max-w-[220px] flex-col items-center sm:max-w-[240px]"
          >
            <div
              className={`w-full rounded-full bg-gradient-to-br ${BLUE_GRAD} p-[2.5px] shadow-[0_16px_40px_-18px_hsl(var(--primary)/0.3)]`}
            >
              <div className="flex aspect-square w-full flex-col items-center justify-center rounded-full border border-border/50 bg-white px-6 text-center">
                <p className="font-heading text-xl font-bold leading-tight text-foreground sm:text-2xl">
                  OUR SERVICES
                </p>
                <p className="mt-2 font-body text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  Expert Eye Care Under One Roof
                </p>
              </div>
            </div>
          </motion.div>

          <div className="mx-auto grid max-w-lg grid-cols-2 gap-4 sm:max-w-2xl sm:gap-6 md:max-w-3xl md:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="flex justify-center"
              >
                <ServiceCircle
                  service={service}
                  size="mobile"
                  onOpen={() => setActiveId(service.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Service detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-foreground/35 backdrop-blur-[2px]"
              aria-label="Close service details"
              onClick={close}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              className="relative z-10 max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-border/70 bg-white p-6 shadow-2xl sm:p-8"
            >
              <div className={`mb-5 h-1.5 w-24 rounded-full bg-gradient-to-r ${BLUE_GRAD}`} />
              <div className="mb-4 flex items-start gap-4">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${BLUE_GRAD} p-[2px]`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full border border-border/50 bg-white">
                    <active.icon className="h-6 w-6 text-foreground" strokeWidth={1.6} />
                  </div>
                </div>
                <div className="min-w-0 flex-1 pr-8">
                  <h3
                    id={titleId}
                    tabIndex={-1}
                    className="font-heading text-2xl font-bold leading-snug text-foreground outline-none"
                  >
                    {active.title}
                  </h3>
                  <p className="mt-1 font-body text-sm text-muted-foreground">{active.desc}</p>
                </div>
              </div>

              <div className="space-y-3 font-body text-sm leading-relaxed text-foreground/85 sm:text-[0.95rem]">
                {active.detail.map((para) => (
                  <p key={para.slice(0, 28)}>{para}</p>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#booking">
                  <Button className="gradient-teal text-primary-foreground" onClick={close}>
                    Book Eye Exam
                  </Button>
                </a>
                <Button variant="outline" onClick={close}>
                  Close
                </Button>
              </div>

              <button
                type="button"
                onClick={close}
                className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ServiceCircle = ({
  service,
  size,
  onOpen,
}: {
  service: Service;
  size: "desktop" | "mobile";
  onOpen: () => void;
}) => {
  const Icon = service.icon;
  const dim =
    size === "desktop"
      ? "h-[168px] w-[168px] xl:h-[184px] xl:w-[184px]"
      : "h-[158px] w-[158px] sm:h-[172px] sm:w-[172px]";

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ scale: 1.045, y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      className={`group relative ${dim} rounded-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
      aria-label={`Learn more about ${service.title}`}
    >
      <span
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${BLUE_GRAD} p-[2.5px] transition-shadow duration-300 ${BLUE_RING_SHADOW}`}
      >
        <span className="flex h-full w-full flex-col items-center justify-center rounded-full border border-border/50 bg-white px-4 text-center">
          <Icon className="mb-2 h-6 w-6 text-foreground sm:h-7 sm:w-7" strokeWidth={1.55} />
          <span className="font-heading text-[0.78rem] font-semibold leading-tight text-foreground sm:text-[0.85rem]">
            {service.title}
          </span>
          <span className="mt-1.5 line-clamp-3 font-body text-[0.62rem] leading-snug text-muted-foreground sm:text-[0.68rem]">
            {service.desc}
          </span>
          <span
            className={`mt-2.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${BLUE_GRAD} text-primary-foreground shadow-sm transition-transform duration-300 group-hover:rotate-45`}
            aria-hidden="true"
          >
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
          </span>
        </span>
      </span>
    </motion.button>
  );
};

export default ServicesSection;
