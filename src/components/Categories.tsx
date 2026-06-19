"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Eye, ArrowRight, X, Check, Sparkles } from "lucide-react";
import type { Category } from "@/lib/types";
import type { SiteContent } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import Icon from "./Icon";

function CategoryArt({ c, className = "" }: { c: Category; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {c.imageUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.imageUrl}
            alt={c.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            style={{
              background: `radial-gradient(110% 80% at 75% 15%, ${c.accent}33, transparent 55%), linear-gradient(160deg, ${c.from}, ${c.to})`,
            }}
          />
          <div className="bg-grain absolute inset-0 opacity-20 mix-blend-overlay" />
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "34px 34px",
            }}
          />
          <Icon
            name={c.icon}
            className="absolute bottom-4 right-4 h-16 w-16 opacity-15"
            style={{ color: c.accent }}
            strokeWidth={1}
          />
        </>
      )}
    </div>
  );
}

export default function Categories({ categories, heading }: { categories: Category[]; heading: SiteContent["products"] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<Category | null>(null);

  const tags = useMemo(
    () => ["All", ...Array.from(new Set(categories.map((c) => c.tag)))],
    [categories]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories.filter((c) => {
      const matchTag = active === "All" || c.tag === active;
      const matchQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.tag.toLowerCase().includes(q) ||
        c.features.some((f) => f.toLowerCase().includes(q));
      return matchTag && matchQuery;
    });
  }, [query, active, categories]);

  return (
    <section id="products" className="section relative">
      <div className="container-luxe">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          highlight={heading.highlight}
          subtitle={heading.subtitle}
        />

        {/* Smart search + filters */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-5">
          <div className="group relative w-full">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ash transition-colors group-focus-within:text-gold" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Smart search — try “marble”, “shower”, “kitchen”…"
              className="glass w-full rounded-full py-4 pl-14 pr-12 text-sm text-cream outline-none transition-all placeholder:text-ash focus:border-gold/50"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2">
              <Sparkles className="h-4 w-4 text-gold/70" />
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  active === t
                    ? "btn-gold"
                    : "border border-gold/20 text-mist hover:border-gold/50 hover:text-cream"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((c) => (
              <motion.article
                key={c.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: ([0.22, 1, 0.36, 1] as [number, number, number, number]) }}
                className="group card-rise relative overflow-hidden rounded-3xl border border-gold/10 bg-charcoal"
              >
                <CategoryArt c={c} className="aspect-[5/4]" />

                {/* hover overlay actions */}
                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                  <span className="glass rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-gold">
                    {c.tag}
                  </span>
                  <button
                    onClick={() => setSelected(c)}
                    aria-label={`Quick view ${c.name}`}
                    className="glass flex h-10 w-10 translate-y-[-8px] items-center justify-center rounded-full text-cream opacity-0 transition-all duration-500 hover:text-gold group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-2xl font-semibold text-cream">{c.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-mist">{c.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.features.slice(0, 3).map((f) => (
                      <span
                        key={f}
                        className="rounded-full border border-gold/15 px-2.5 py-1 text-[11px] text-mist"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() => setSelected(c)}
                      className="flex items-center gap-1.5 rounded-full border border-gold/30 px-4 py-2 text-xs font-semibold text-cream transition-colors hover:bg-gold/10"
                    >
                      <Eye className="h-3.5 w-3.5" /> Quick View
                    </button>
                    <a
                      href="#contact"
                      className="group/btn flex items-center gap-1.5 text-xs font-semibold text-gold"
                    >
                      Learn More
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-mist">
            {categories.length === 0
              ? "Our collections are being curated. Please check back soon."
              : `No collections match “${query}”. Try a different search.`}
          </p>
        )}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-ink/80 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: ([0.22, 1, 0.36, 1] as [number, number, number, number]) }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative z-10 grid w-full max-w-3xl overflow-hidden rounded-3xl md:grid-cols-2"
            >
              <CategoryArt c={selected} className="min-h-56 md:min-h-full" />
              <div className="p-7 md:p-9">
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-cream hover:bg-gold/10"
                >
                  <X className="h-4 w-4" />
                </button>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                  {selected.tag}
                </span>
                <h3 className="font-display mt-3 text-3xl font-semibold text-cream">
                  {selected.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{selected.desc}</p>
                <ul className="mt-5 grid grid-cols-2 gap-2">
                  {selected.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-cream">
                      <Check className="h-4 w-4 text-gold" /> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  onClick={() => setSelected(null)}
                  className="btn-gold mt-7 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold"
                >
                  Enquire About {selected.name}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
