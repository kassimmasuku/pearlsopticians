import { motion } from "framer-motion";
import { CalendarCheck, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-phoropter.jpg";

const HeroSection = () => (
  <section id="home" className="relative min-h-screen flex items-end md:items-center overflow-hidden bg-[hsl(220_10%_92%)]">
    <motion.div
      className="absolute inset-0"
      initial={{ scale: 1.08, opacity: 0.7 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={heroImage}
        alt="Precision phoropter eye examination equipment at Pearls Opticians"
        className="h-full w-full object-cover object-center"
        fetchPriority="high"
      />
    </motion.div>

    {/* Soft wash for text contrast while keeping the phoropter crisp */}
    <div className="absolute inset-0 bg-gradient-to-r from-[hsl(230_20%_97%/0.88)] via-[hsl(230_20%_97%/0.35)] to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(230_20%_97%/0.75)] via-transparent to-[hsl(230_20%_97%/0.2)]" />

    <div className="container relative z-10 pb-24 pt-32 md:py-0">
      <div className="max-w-xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-muted-foreground font-body text-sm uppercase tracking-[0.2em] mb-4"
        >
          Harare, Zimbabwe
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-[1.05] mb-5"
        >
          Pearls Opticians
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md font-body leading-relaxed"
        >
          Clear vision starts here — expert exams and quality eyewear.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a href="#booking">
            <Button size="lg" className="gradient-teal text-primary-foreground gap-2 shadow-teal text-base px-8">
              <CalendarCheck size={18} /> Book Eye Exam
            </Button>
          </a>
          <a href="#services">
            <Button size="lg" variant="outline" className="gap-2 text-base px-8 bg-card/70 backdrop-blur-sm">
              View Services <ArrowRight size={18} />
            </Button>
          </a>
        </motion.div>
      </div>
    </div>

    <motion.a
      href="#services"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      aria-label="Scroll to services section"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={32} className="text-muted-foreground" />
      </motion.div>
    </motion.a>
  </section>
);

export default HeroSection;
