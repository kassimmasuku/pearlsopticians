import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { medicalAids } from "@/data/medicalAids";

const MedicalAidPartnersSection = () => (
  <section id="medical-aids" className="py-20 md:py-28 bg-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-12 md:mb-14"
      >
        <p className="text-primary font-body text-sm uppercase tracking-widest mb-3 inline-flex items-center justify-center gap-2">
          <ShieldCheck size={14} className="text-primary" />
          Medical Aid Partners
        </p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
          Medical Aids We Accept
        </h2>
        <p className="text-muted-foreground font-body text-sm md:text-base">
          Present your medical aid card at any Pearls Opticians branch. We work with leading schemes across Zimbabwe.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {medicalAids.map((aid, i) => (
          <motion.div
            key={aid.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.04, 0.4) }}
            title={aid.name}
            className="group flex h-[7.25rem] sm:h-32 items-center justify-center rounded-xl border border-border/80 bg-card px-4 py-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
          >
            <img
              src={aid.logo}
              alt={aid.alt}
              loading="lazy"
              decoding="async"
              className="max-h-[4.5rem] sm:max-h-[5.25rem] w-auto max-w-full object-contain opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-[1.03]"
            />
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 md:mt-12 text-center font-heading text-xl md:text-2xl font-semibold text-foreground"
      >
        And many others
      </motion.p>
      <p className="mt-2 text-center text-sm text-muted-foreground font-body">
        Not sure if your scheme is covered? Contact your nearest branch and our team will assist you.
      </p>
    </div>
  </section>
);

export default MedicalAidPartnersSection;
