"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0, transition: { duration: 0.7, ease: ([0.22, 1, 0.36, 1] as [number, number, number, number]) } }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: ([0.22, 1, 0.36, 1] as [number, number, number, number]) }}
            className="relative flex h-28 w-28 items-center justify-center"
          >
            <motion.span
              className="absolute inset-0 rounded-full border border-gold/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.span
              className="absolute inset-2 rounded-full border-t-2 border-gold"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <span className="font-display text-3xl font-bold text-gold-gradient">MD</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-7 text-center"
          >
            <p className="font-display text-lg tracking-[0.3em] text-cream">MD TRADERS</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.4em] text-ash">
              Where Luxury Meets Quality
            </p>
          </motion.div>

          <motion.div
            className="mt-8 h-px w-40 overflow-hidden bg-graphite"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
