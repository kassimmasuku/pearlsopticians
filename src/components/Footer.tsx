import { Facebook, Instagram, MessageCircle, Mail, Phone } from "lucide-react";
import { useBranchContact } from "@/components/BranchContactProvider";
import { branches } from "@/data/branches";
import logo from "@/assets/logo.png";

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.3 0 .59.04.86.13V9.4a6.33 6.33 0 0 0-.86-.08A6.34 6.34 0 0 0 3.11 15.66 6.34 6.34 0 0 0 9.45 22a6.34 6.34 0 0 0 6.34-6.34V8.73a8.18 8.18 0 0 0 4.78 1.52V6.84a4.85 4.85 0 0 1-.98-.15z" />
  </svg>
);

const footerServices = [
  "Comprehensive Eye Exams",
  "Prescription Glasses",
  "Vision Testing",
  "Eye Health Consultation",
  "Children's Eye Exams",
  "Frame Selection & Styling",
  "Lens Replacement",
] as const;

const socialLinkClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-foreground/10 text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-md";

const Footer = () => {
  const { openContact } = useBranchContact();

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container py-14 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <a href="/" className="inline-flex items-center gap-3 mb-5 group">
              <img
                src={logo}
                alt="Pearls Opticians Logo"
                className="h-14 w-auto brightness-200 transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </a>
            <h3 className="font-heading text-xl md:text-2xl font-semibold text-primary-foreground mb-3">
              Pearls Opticians
            </h3>
            <p className="text-primary-foreground/65 font-body text-sm leading-relaxed max-w-sm">
              Pearls Opticians pairs modern technology with a warm, patient-centred approach to help you
              achieve your best vision — from routine exams to quality eyewear across our Harare branches.
            </p>
          </div>

          {/* Our Services */}
          <div className="lg:col-span-2">
            <h4 className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/50 mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {footerServices.map((service) => (
                <li key={service}>
                  <a
                    href="/#services"
                    className="text-primary-foreground/70 text-sm font-body hover:text-primary transition-colors duration-200"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/50 mb-4">
              Contact Information
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:info@pearlsopticians.co.zw"
                className="inline-flex items-start gap-2.5 text-sm text-primary-foreground/70 hover:text-primary transition-colors duration-200"
              >
                <Mail size={16} className="mt-0.5 shrink-0 text-primary" />
                <span className="font-body break-all">info@pearlsopticians.co.zw</span>
              </a>

              <ul className="space-y-3.5">
                {branches.map((branch) => (
                  <li key={branch.name} className="text-sm">
                    <p className="font-body font-medium text-primary-foreground/90 mb-1">{branch.name}</p>
                    <p className="font-body text-primary-foreground/55 leading-relaxed mb-1.5">
                      {branch.address}
                    </p>
                    <a
                      href={branch.telHref}
                      className="inline-flex items-center gap-1.5 text-primary-foreground/70 hover:text-primary transition-colors duration-200"
                    >
                      <Phone size={14} className="text-primary shrink-0" />
                      <span className="font-body">{branch.tel}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Connect */}
          <div className="lg:col-span-3">
            <h4 className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/50 mb-4">
              Connect With Us
            </h4>
            <p className="text-primary-foreground/60 font-body text-sm leading-relaxed mb-5 max-w-xs">
              Follow Pearls Opticians for eyewear updates, eye-care tips and branch news.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.facebook.com/pearlsopticians/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={socialLinkClass}
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/pearls_opticians_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @pearls_opticians_"
                className={socialLinkClass}
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@Pearls_Opticians"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok @Pearls_Opticians"
                className={socialLinkClass}
              >
                <TikTokIcon size={18} />
              </a>
              <button
                type="button"
                onClick={() => openContact("whatsapp")}
                aria-label="WhatsApp"
                className={socialLinkClass}
              >
                <MessageCircle size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-primary-foreground/40 text-xs font-body">
            © {new Date().getFullYear()} Pearls Opticians (Pvt) Ltd. All rights reserved.
          </p>
          <p className="text-primary-foreground/35 text-xs font-body">
            Professional eye care in Harare, Zimbabwe
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
