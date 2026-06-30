"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-navy text-slate-300 dark:bg-black/95 dark:text-slate-400 border-t border-white/5 py-16 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-navy-light/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Company Intro Column */}
        <div className="space-y-6">
          <Link href="#home" onClick={(e) => handleNavClick(e, "#home")} className="flex items-center gap-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-white/5 p-1 border border-white/10">
              <Image src="/logo.png" alt="AS NEXTGEN" fill className="object-contain p-1" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-wider text-white">
                A/S NEXT<span className="text-gold">GEN</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-gold font-bold -mt-1">
                Pvt Ltd
              </span>
            </div>
          </Link>

          <p className="text-sm leading-relaxed text-slate-400">
            Turning Dreams Into Digital Reality. We build high-performance web applications, mobile apps, and engineer future-proof solutions.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://www.instagram.com/a_s_nextgen_pvt_ltd_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="p-3 bg-white/5 hover:bg-gold/10 hover:text-gold border border-white/10 hover:border-gold/30 rounded-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://x.com/asnextgen"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter) Profile"
              className="p-3 bg-white/5 hover:bg-gold/10 hover:text-gold border border-white/10 hover:border-gold/30 rounded-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              <FaXTwitter size={18} />
            </a>
            <a
              href="https://wa.me/36302694207"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Contact"
              className="p-3 bg-white/5 hover:bg-gold/10 hover:text-gold border border-white/10 hover:border-gold/30 rounded-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-6">
          <h4 className="font-display font-semibold text-white tracking-wider text-sm uppercase relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-gold">
            Navigation
          </h4>
          <ul className="space-y-3.5 text-sm">
            <li>
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, "#home")}
                className="hover:text-gold transition-colors duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#opportunities"
                onClick={(e) => handleNavClick(e, "#opportunities")}
                className="hover:text-gold transition-colors duration-200"
              >
                Student Opportunities
              </a>
            </li>
            <li>
              <a
                href="#career"
                onClick={(e) => handleNavClick(e, "#career")}
                className="hover:text-gold transition-colors duration-200"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, "#projects")}
                className="hover:text-gold transition-colors duration-200"
              >
                Upcoming Projects
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, "#about")}
                className="hover:text-gold transition-colors duration-200"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="hover:text-gold transition-colors duration-200"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info (Hungary) */}
        <div className="space-y-6">
          <h4 className="font-display font-semibold text-white tracking-wider text-sm uppercase relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-gold">
            Global Headquarters
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
              <span>Őcsény, Reptér, 7143 (Hungary)</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-gold shrink-0" />
              <a href="tel:+36302694207" className="hover:text-gold transition-colors">
                +36 302694207
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-gold shrink-0" />
              <a href="mailto:asnextgenpvtltd@gmail.com" className="hover:text-gold transition-colors truncate">
                asnextgenpvtltd@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info (India) */}
        <div className="space-y-6">
          <h4 className="font-display font-semibold text-white tracking-wider text-sm uppercase relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-gold">
            Indian Branch
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
              <span>Tiruchirappalli, Tamil Nadu (India)</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-gold shrink-0" />
              <a href="tel:+917339011916" className="hover:text-gold transition-colors">
                +91 7339011916
              </a>
            </li>
            <li className="p-3 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-gold">Office Hours</span>
              <span className="text-[11px] text-slate-400">Mon - Fri: 09:00 AM - 06:00 PM CET</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <span>© 2026 AS NEXTGEN Pvt Ltd. All Rights Reserved.</span>
        <div className="flex items-center gap-6">
          <Link href="#about" onClick={(e) => handleNavClick(e, "#about")} className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#about" onClick={(e) => handleNavClick(e, "#about")} className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
