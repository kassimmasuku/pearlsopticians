import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Experienced eye care professionals",
  "Quality eyewear and precision lenses",
  "Friendly, patient-centred service",
  "Three convenient Harare locations",
  "Modern eye testing equipment",
  "Affordable pricing options",
];

const WhyChooseSection = () => (
  <section className="py-20 md:py-28 bg-secondary">
    <div className="container">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-primary font-body text-sm uppercase tracking-widest mb-3">Why Us</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-10">
            Why Choose Pearls Opticians
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 text-left">
          {benefits.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 p-4 rounded-lg bg-card shadow-card"
            >
              <CheckCircle2 size={20} className="text-primary shrink-0" />
              <span className="text-foreground font-medium text-sm">{b}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseSection;
