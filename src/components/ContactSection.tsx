import { motion } from "framer-motion";
import { Phone, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { branches } from "@/data/branches";

const ContactSection = () => (
  <section id="contact" className="py-20 md:py-28 bg-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-primary font-body text-sm uppercase tracking-widest mb-3">Get In Touch</p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Contact Us</h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto font-body">
          Reach any of our Harare branches by phone or visit us in person.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 flex flex-col items-center text-center"
      >
        <h3 className="font-heading text-xl font-semibold text-foreground mb-5">Pearls Opticians (Pvt) Ltd</h3>
        <a
          href="mailto:info@pearlsopticians.co.zw"
          className="group inline-flex max-w-full items-center gap-3.5 rounded-xl border border-border bg-card px-5 py-3.5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-primary transition-colors duration-300 group-hover:gradient-teal group-hover:text-primary-foreground">
            <Mail size={18} />
          </span>
          <span className="min-w-0 text-left">
            <span className="mb-0.5 block font-body text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Email Us
            </span>
            <span className="block truncate font-body text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary sm:text-base">
              info@pearlsopticians.co.zw
            </span>
          </span>
        </a>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {branches.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl p-5 shadow-card space-y-3"
          >
            <h4 className="font-heading text-lg font-semibold text-primary">{b.name}</h4>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-primary mt-1 shrink-0" />
              <p className="text-muted-foreground text-sm">{b.address}</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-primary shrink-0" />
              <a href={b.telHref} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                {b.tel}
              </a>
            </div>
            <div className="flex gap-2 pt-1">
              <a href={b.telHref}>
                <Button size="sm" className="gradient-teal text-primary-foreground gap-1.5 text-xs">
                  <Phone size={12} /> Call
                </Button>
              </a>
              <a href={b.mapUrl} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                  <MapPin size={12} /> Directions
                </Button>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ContactSection;
