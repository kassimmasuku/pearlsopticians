import { motion } from "framer-motion";
import heroEyeExam from "@/assets/hero-eye-exam.jpg";
import eyewearCollection from "@/assets/eyewear-collection.jpg";
import heroPhoropter from "@/assets/hero-phoropter.jpg";
import serviceConsultation from "@/assets/service-consultation.jpg";
import serviceChildren from "@/assets/service-children.jpg";
import framesDisplay from "@/assets/frames-display.jpg";
import serviceLenses from "@/assets/service-lenses.jpg";

const services = [
  {
    img: heroEyeExam,
    title: "Comprehensive Eye Exams",
    desc: "Thorough vision and eye health assessments using modern diagnostic equipment.",
  },
  {
    img: eyewearCollection,
    title: "Prescription Glasses",
    desc: "Precision-crafted lenses tailored to your unique prescription needs.",
  },
  {
    img: heroPhoropter,
    title: "Vision Testing",
    desc: "Advanced visual acuity testing for adults and children of all ages.",
  },
  {
    img: serviceConsultation,
    title: "Eye Health Consultation",
    desc: "In-depth consultations on eye conditions, prevention, and treatment options.",
  },
  {
    img: serviceChildren,
    title: "Children's Eye Exams",
    desc: "Gentle, child-friendly eye examinations to support healthy visual development.",
  },
  {
    img: framesDisplay,
    title: "Frame Selection & Styling",
    desc: "Curated range of designer and everyday frames to match your style.",
  },
  {
    img: serviceLenses,
    title: "Lens Replacement",
    desc: "Professional replacement of damaged, outdated or worn-out lenses to restore clear and comfortable vision.",
  },
];

const ServicesSection = () => (
  <section id="services" className="py-20 md:py-28 bg-secondary">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-primary font-body text-sm uppercase tracking-widest mb-3">What We Offer</p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Our Services</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {services.map((s, i) => (
          <motion.article
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="group overflow-hidden rounded-2xl bg-card shadow-card hover:shadow-teal transition-shadow duration-300"
          >
            <div className="aspect-[16/10] overflow-hidden bg-muted">
              <img
                src={s.img}
                alt={s.title}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-5 md:p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
