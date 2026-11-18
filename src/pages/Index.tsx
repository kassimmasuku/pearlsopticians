import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import BookingSection from "@/components/BookingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import EyeHealthFactsSection from "@/components/EyeHealthFactsSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import MedicalAidPartnersSection from "@/components/MedicalAidPartnersSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SeoHead from "@/components/SeoHead";
import { seoByPath } from "@/data/seo";

const Index = () => (
  <>
    <SeoHead seo={seoByPath["/"]} />
    <Navbar />
    <HeroSection />
    <ServicesSection />
    <MedicalAidPartnersSection />
    <TestimonialsSection />
    <EyeHealthFactsSection />
    <BookingSection />
    <WhyChooseSection />
    <ContactSection />
    <Footer />
    <WhatsAppButton />
  </>
);

export default Index;
