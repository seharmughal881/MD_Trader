"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/lib/types";
import SectionHeading from "./SectionHeading";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const count = testimonials.length;

  const paginate = useCallback((d: number) => {
    setDir(d);
    setIndex((i) => (count === 0 ? 0 : (i + d + count) % count));
  }, [count]);

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paginate, count]);

  if (count === 0) return null;

  const t = testimonials[Math.min(index, count - 1)];

  return (
    <section className="section relative overflow-hidden">
      <div className="absolute right-0 top-1/4 h-[40vh] w-[40vh] rounded-full bg-gold/5 blur-[140px]" />
      <div className="container-luxe relative">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by"
          highlight="Discerning Clients"
          subtitle="Real experiences from homeowners and designers who trusted us with their spaces."
        />

        <div className="relative mx-auto mt-12 max-w-3xl">
          <Quote className="mx-auto h-12 w-12 text-gold/30" />

          <div className="relative min-h-[280px] sm:min-h-[240px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.5, ease: ([0.22, 1, 0.36, 1] as [number, number, number, number]) }}
                className="absolute inset-0 flex flex-col items-center text-center"
              >
                <div className="mt-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="font-display mt-6 text-xl leading-relaxed text-cream sm:text-2xl">
                  “{t.text}”
                </p>
                <div className="mt-7 flex items-center gap-3">
                  {t.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.imageUrl}
                      alt={t.name}
                      className="h-12 w-12 rounded-full border border-gold/40 object-cover"
                    />
                  ) : (
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-charcoal font-display text-sm font-semibold text-gold-gradient">
                      {t.initials || t.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  <div className="text-left">
                    <p className="font-semibold text-cream">{t.name}</p>
                    <p className="text-xs text-ash">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-cream transition-colors hover:bg-gold/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-7 bg-gold" : "w-2 bg-graphite hover:bg-gold/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-cream transition-colors hover:bg-gold/10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
