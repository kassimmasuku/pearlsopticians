import { motion } from "framer-motion";
import { MapPin, Eye, Users, Phone } from "lucide-react";
import { branches } from "@/data/branches";

const features = [
  { icon: Users, label: "Experienced Optometry Team" },
  { icon: Eye, label: "Modern Diagnostic Equipment" },
  { icon: MapPin, label: "Three Harare Locations" },
];

const AboutSection = () => (
  <section id="about" className="pt-10 pb-20 md:pt-12 md:pb-28 bg-background">
    <div className="container">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
            Your Trusted Eye Care Partner in Harare
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-8">
            Pearls Opticians pairs modern technology with a warm, patient-centred approach to help you achieve your best vision — from routine exams to quality eyewear.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-3 p-3 rounded-lg bg-accent">
                <f.icon size={20} className="text-accent-foreground shrink-0" />
                <span className="text-sm font-medium text-accent-foreground">{f.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-start gap-3"
        >
          <MapPin className="text-primary shrink-0 mt-1" size={22} />
          <div>
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-2">Our Locations</h3>
            <p className="text-muted-foreground font-body leading-relaxed">
              Visit any of our three Harare branches for expert eye care and quality eyewear.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {branches.map((b, i) => (
          <motion.article
            key={b.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-accent rounded-2xl p-5 md:p-6 flex flex-col"
          >
            <h4 className="font-heading text-lg font-semibold text-foreground mb-3">{b.name}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3 whitespace-pre-line flex-1">
              {b.addressMultiline}
            </p>
            <a
              href={b.telHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mb-4"
            >
              <Phone size={16} className="shrink-0" />
              {b.tel}
            </a>
            <div className="rounded-xl overflow-hidden border border-border">
              <iframe
                title={`${b.name} Location`}
                src={b.embedUrl}
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
