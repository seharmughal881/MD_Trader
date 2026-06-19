"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import type { GalleryItem } from "@/lib/types";
import type { SiteContent } from "@/lib/content";
import SectionHeading from "./SectionHeading";

const spanClass: Record<string, string> = {
  tall: "row-span-2",
  wide: "sm:col-span-2",
  normal: "",
};

function GalleryArt({
  from, to, title, imageUrl,
}: { from: string; to: string; title: string; imageUrl?: string | null }) {
  if (imageUrl) {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />
      </>
    );
  }
  return (
    <>
      <div
        className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        style={{
          background: `radial-gradient(120% 90% at 70% 20%, rgba(201,162,77,0.22), transparent 55%), linear-gradient(155deg, ${from}, ${to})`,
        }}
      />
      <div className="bg-grain absolute inset-0 opacity-20 mix-blend-overlay" />
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <span className="sr-only">{title}</span>
    </>
  );
}

export default function Gallery({ gallery, heading }: { gallery: GalleryItem[]; heading: SiteContent["gallery"] }) {
  const [index, setIndex] = useState<number | null>(null);

  if (gallery.length === 0) return null;

  const open = index !== null;
  const item = open ? gallery[index] : null;
  const go = (dir: number) =>
    setIndex((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length));

  return (
    <section id="gallery" className="section relative bg-onyx/40">
      <div className="container-luxe">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          highlight={heading.highlight}
          subtitle={heading.subtitle}
        />

        <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((g, i) => (
            <motion.button
              key={g.id}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: ([0.22, 1, 0.36, 1] as [number, number, number, number]) }}
              onClick={() => setIndex(i)}
              className={`group relative overflow-hidden rounded-2xl border border-gold/10 text-left ${spanClass[g.size]}`}
            >
              <GalleryArt from={g.from} to={g.to} title={g.title} imageUrl={g.imageUrl} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <span className="translate-y-3 text-[10px] uppercase tracking-[0.3em] text-gold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {g.category}
                </span>
                <p className="font-display translate-y-3 text-lg font-semibold text-cream opacity-90 transition-all duration-500 group-hover:translate-y-0">
                  {g.title}
                </p>
              </div>
              <span className="glass absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && item && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            onClick={() => setIndex(null)}
          >
            <div className="absolute inset-0 bg-ink/90 backdrop-blur-md" />
            <button
              onClick={() => setIndex(null)}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-cream hover:bg-gold/10"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              aria-label="Previous"
              className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-cream hover:bg-gold/10 sm:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); go(1); }}
              aria-label="Next"
              className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-cream hover:bg-gold/10 sm:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.figure
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-[5] w-full max-w-4xl overflow-hidden rounded-3xl"
            >
              <div className="relative aspect-[16/10]">
                <GalleryArt from={item.from} to={item.to} title={item.title} imageUrl={item.imageUrl} />
              </div>
              <figcaption className="glass flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-display text-xl font-semibold text-cream">{item.title}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">{item.category}</p>
                </div>
                <span className="text-sm text-ash">
                  {(index ?? 0) + 1} / {gallery.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
