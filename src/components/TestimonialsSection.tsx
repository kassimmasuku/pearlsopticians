import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "Sisa Nyahangare", text: "Good Service. Thank you for my sons glasses. Very Efficient and good quality", rating: 5 },
  { name: "Mercy", text: "Customer Service yenyu is good next to non very efficient", rating: 5 },
  { name: "Evelyn Manzini", text: "I enjoyed your service", rating: 5 },
];

const TestimonialsSection = () => (
  <section className="py-20 md:py-28 bg-secondary">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-primary font-body text-sm uppercase tracking-widest mb-3">Testimonials</p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">What Our Patients Say</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-6 shadow-card"
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: r.rating }).map((_, j) => (
                <Star key={j} size={16} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">"{r.text}"</p>
            <p className="font-body font-semibold text-foreground text-sm">{r.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
