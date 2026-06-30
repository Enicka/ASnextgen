"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, ArrowRight, ShieldCheck } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "Student Opportunities", href: "#opportunities" },
  { name: "Career", href: "#career" },
  { name: "Upcoming Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar({ onApplyClick }: { onApplyClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure themed components are only rendered on client to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of navbar
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

  if (!mounted) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg border-b border-border py-3"
            : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Brand */}
          <Link href="#home" onClick={(e) => handleNavClick(e, "#home")} className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-navy dark:bg-white/5 p-1 transition-transform group-hover:scale-110 duration-300">
              <Image
                src="/logo.png"
                alt="AS NEXTGEN Logo"
                fill
                sizes="40px"
                className="object-contain p-1"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg tracking-wider text-navy dark:text-white flex items-center">
                A/S NEXT<span className="text-gold">GEN</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-semibold -mt-1">
                Pvt Ltd
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative text-sm font-semibold tracking-wide text-navy/80 hover:text-navy dark:text-white/80 dark:hover:text-white transition-colors duration-200 py-2 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-full border border-border bg-card text-foreground hover:bg-muted transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} className="text-gold" /> : <Moon size={18} className="text-navy" />}
            </motion.button>

            {/* Premium CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onApplyClick}
              className="relative overflow-hidden px-5 py-2.5 rounded-full bg-navy text-white dark:bg-gold dark:text-black font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 border border-transparent dark:border-gold-hover hover:border-gold/40 flex items-center gap-2 group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-navy-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              Apply Internship
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 duration-300" />
            </motion.button>
          </div>

          {/* Mobile Actions Container (Drawer menu button + Theme toggle) */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full border border-border bg-card text-foreground cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} className="text-gold" /> : <Moon size={16} className="text-navy" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-border bg-card text-foreground cursor-pointer"
              aria-label="Open navigation drawer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Side Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-4/5 max-w-sm z-50 bg-white dark:bg-black shadow-2xl border-l border-border px-8 py-10 flex flex-col justify-between lg:hidden"
            >
              <div>
                {/* Header inside drawer */}
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8">
                      <Image src="/logo.png" alt="AS NEXTGEN" fill className="object-contain" />
                    </div>
                    <span className="font-display font-extrabold text-md text-navy dark:text-white">
                      A/S NEXT<span className="text-gold">GEN</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg border border-border text-foreground hover:bg-muted"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Vertical Links List */}
                <nav className="flex flex-col gap-5">
                  {navItems.map((item, idx) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: idx * 0.05 + 0.1 }
                      }}
                      className="text-lg font-bold tracking-wide text-navy/80 hover:text-navy dark:text-white/80 dark:hover:text-white transition-colors duration-200 border-b border-muted pb-3 flex justify-between items-center group"
                    >
                      {item.name}
                      <ArrowRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </motion.a>
                  ))}
                </nav>
              </div>

              {/* Bottom Drawer Actions */}
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onApplyClick();
                  }}
                  className="w-full py-3.5 rounded-full bg-navy text-white dark:bg-gold dark:text-black font-semibold text-center shadow-lg transition-transform hover:scale-[1.02] flex justify-center items-center gap-2"
                >
                  Apply Internship
                  <ArrowRight size={16} />
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                  <ShieldCheck size={12} className="text-gold" /> Secure & Certified
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
