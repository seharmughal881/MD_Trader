"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import type { BusinessInfo } from "@/lib/types";

export default function WhatsAppFloat({ business }: { business: BusinessInfo }) {
  const [show, setShow] = useState(false);
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(() => setBubble(true), 4000);
    const t2 = setTimeout(() => setBubble(false), 11000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  const href = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
    "Hi MD Traders! I'd like to know more about your products."
  )}`;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-6 right-6 z-[55] flex items-end gap-3"
        >
          <AnimatePresence>
            {bubble && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                className="glass mb-1 hidden max-w-[200px] rounded-2xl rounded-br-none p-3 pr-8 text-sm text-cream sm:block"
              >
                <button
                  onClick={() => setBubble(false)}
                  className="absolute right-2 top-2 text-ash hover:text-cream"
                  aria-label="Dismiss"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                👋 Need help choosing? Chat with us now!
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] transition-transform hover:scale-110 animate-[pulse-glow_2.8s_ease-in-out_infinite]"
          >
            <MessageCircle className="h-7 w-7" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
