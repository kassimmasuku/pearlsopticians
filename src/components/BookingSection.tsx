import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useBranchContact } from "@/components/BranchContactProvider";
import { branches } from "@/data/branches";

const BookingSection = () => {
  const { toast } = useToast();
  const { openContact } = useBranchContact();
  const [form, setForm] = useState({ name: "", phone: "", email: "", branch: "", date: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.branch) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }

    const selectedBranch = branches.find((b) => b.name === form.branch);
    if (!selectedBranch) {
      toast({ title: "Please select a valid branch", variant: "destructive" });
      return;
    }

    const lines = [
      "Eye Exam Appointment Request",
      "",
      `Branch: ${selectedBranch.name}`,
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.email.trim() ? `Email: ${form.email.trim()}` : null,
      form.date ? `Preferred date: ${form.date}` : null,
      form.message.trim() ? `Message: ${form.message.trim()}` : null,
    ].filter(Boolean);

    const whatsappUrl = `${selectedBranch.whatsappHref}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    toast({
      title: "Opening WhatsApp…",
      description: `Your appointment request is ready to send to ${selectedBranch.name}.`,
    });
    setForm({ name: "", phone: "", email: "", branch: "", date: "", message: "" });
  };

  return (
    <section id="booking" className="py-20 md:py-28 gradient-teal">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <CalendarCheck size={40} className="text-primary-foreground/80 mb-4" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
              Book an Eye Exam
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-md">
              Schedule your comprehensive eye examination today. Our team is ready to help you see the world clearly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 gap-2"
                onClick={() => openContact("call")}
              >
                <Phone size={16} /> Call a Branch
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 gap-2"
                onClick={() => openContact("whatsapp")}
              >
                <MessageCircle size={16} /> WhatsApp Us
              </Button>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-6 md:p-8 shadow-card space-y-4"
          >
            <Input
              placeholder="Full Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
              required
            />
            <Input
              placeholder="Phone Number *"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              maxLength={20}
              required
            />
            <Input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={255}
            />
            <Select
              value={form.branch || undefined}
              onValueChange={(branch) => setForm({ ...form, branch })}
            >
              <SelectTrigger aria-label="Preferred branch">
                <SelectValue placeholder="Preferred Branch *" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((b) => (
                  <SelectItem key={b.name} value={b.name}>
                    {b.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <Textarea
              placeholder="Message (optional)"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={500}
              rows={3}
            />
            <Button type="submit" className="w-full gradient-teal text-primary-foreground text-base" size="lg">
              Request Appointment
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
