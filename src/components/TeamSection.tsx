import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { teamMembers, type TeamMember } from "@/data/team";

const TeamSection = () => {
  const [selected, setSelected] = useState<TeamMember | null>(null);

  return (
    <section id="team" className="py-20 md:py-28 bg-secondary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <p className="text-primary font-body text-sm uppercase tracking-widest mb-3">Our People</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            The dedicated professionals behind Pearls Opticians — committed to clear vision and exceptional care across Harare.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {teamMembers.map((member, i) => (
            <motion.button
              key={member.id}
              type="button"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.45 }}
              onClick={() => setSelected(member)}
              className="group text-left overflow-hidden rounded-2xl bg-card shadow-card border border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={member.image}
                  alt={member.name}
                  width={640}
                  height={800}
                  className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-3.5 md:p-4">
                <h3 className="font-heading text-sm md:text-base font-semibold text-foreground leading-snug mb-1">
                  {member.name}
                </h3>
                <p className="text-[11px] md:text-xs text-muted-foreground font-body leading-relaxed">
                  {member.title}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-md sm:max-w-lg p-0 gap-0 overflow-hidden rounded-2xl border-border">
          {selected && (
            <>
              <div className="aspect-[5/4] sm:aspect-[16/11] overflow-hidden bg-muted">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <DialogHeader className="px-6 pt-5 pb-6 text-left space-y-2">
                <DialogTitle className="font-heading text-2xl text-foreground">
                  {selected.name}
                </DialogTitle>
                <DialogDescription className="text-sm font-medium text-primary font-body">
                  {selected.title}
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TeamSection;
