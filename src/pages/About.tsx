import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { seoByPath } from "@/data/seo";

const About = () => (
  <>
    <SeoHead seo={seoByPath["/about"]} />
    <Navbar />
    <main className="pt-20 md:pt-24 bg-background min-h-screen">
      <div className="container pt-6 md:pt-8 pb-2">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Button asChild variant="ghost" className="gap-2 text-muted-foreground hover:text-primary -ml-2 mb-6">
            <Link to="/">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </Button>
          <p className="text-primary font-body text-sm uppercase tracking-widest mb-3">Our Practice</p>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
            About Pearls Opticians
          </h1>
        </motion.div>
      </div>
      <AboutSection />
      <TeamSection />
    </main>
    <Footer />
    <WhatsAppButton />
  </>
);

export default About;
