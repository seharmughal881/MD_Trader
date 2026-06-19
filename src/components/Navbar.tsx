"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { navLinks } from "@/lib/data";
import type { BusinessInfo } from "@/lib/types";

export default function Navbar({ business }: { business: BusinessInfo }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: ([0.22, 1, 0.36, 1] as [number, number, number, number]), delay: 1.9 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass py-3 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)]" : "bg-transparent py-5"
        }`}
      >
        <nav className="container-luxe flex items-center justify-between">
          <a href="#home" className="group flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/40 bg-charcoal font-display text-lg font-bold text-gold-gradient transition-transform duration-500 group-hover:scale-105">
              MD
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-semibold tracking-wide text-cream">
                MD Traders
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-ash">
                Luxury Living
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative text-sm font-medium text-mist transition-colors hover:text-cream"
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${business.phoneHref}`}
              className="flex items-center gap-2 text-sm font-medium text-mist transition-colors hover:text-gold"
            >
              <Phone className="h-4 w-4" />
              {business.phone}
            </a>
            <a
              href="#contact"
              className="btn-gold rounded-full px-6 py-2.5 text-sm font-semibold"
            >
              Free Consultation
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 text-cream lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] lg:hidden"
          >
            <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-charcoal p-7"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-semibold text-gold-gradient">MD Traders</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 text-cream"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="mt-10 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-graphite/60 py-4 font-display text-2xl text-cream transition-colors hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-3">
                <a
                  href={`tel:${business.phoneHref}`}
                  className="btn-ghost flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold"
                >
                  <Phone className="h-4 w-4" /> {business.phone}
                </a>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="btn-gold rounded-full py-3 text-center text-sm font-semibold"
                >
                  Get Free Consultation
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
