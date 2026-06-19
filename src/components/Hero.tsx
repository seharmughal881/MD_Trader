"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone, Star } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: ([0.22, 1, 0.36, 1] as [number, number, number, number]), delay: 2.0 + i * 0.12 },
  }),
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Transform-only parallax — GPU-composited, cheap to animate.
  const yGlow = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yGlow2 = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Layered luxury background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-onyx via-ink to-ink" />
        <motion.div style={{ y: yGlow }} className="absolute left-1/2 top-[-10%] h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-gold/15 blur-[120px]" />
        <motion.div style={{ y: yGlow2 }} className="absolute bottom-[-20%] right-[-10%] h-[50vh] w-[50vh] rounded-full bg-gold-deep/10 blur-[120px]" />
        <div className="absolute left-[-10%] top-1/3 h-[40vh] w-[40vh] rounded-full bg-[#1c3b4a]/20 blur-[120px]" />
        {/* architectural line grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,162,77,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,77,0.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        <div className="bg-grain absolute inset-0 opacity-[0.15] mix-blend-overlay" />
      </div>

      <motion.div style={{ y: yContent, opacity: fade }} className="container-luxe grid items-center gap-12 pt-28 pb-16 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Copy */}
        <div>
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-medium tracking-wide text-gold"
          >
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
              ))}
            </span>
            Rated 4.9/5 by 10,000+ customers
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-display mt-6 text-[clamp(2.6rem,7vw,5.2rem)] font-bold leading-[1.04]"
          >
            Where <span className="text-gold-gradient">Luxury</span>
            <br />
            Meets <span className="text-gold-gradient">Quality</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-xl text-lg leading-relaxed text-mist"
          >
            Premium Tiles, Sanitary Ware & Modular Kitchen Solutions — curated for
            those who believe a home should feel as exceptional as it looks.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#products"
              className="btn-gold group flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold"
            >
              Explore Products
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="btn-ghost flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold"
            >
              <Phone className="h-4 w-4" />
              Get Free Consultation
            </a>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-12 flex flex-wrap gap-x-10 gap-y-4"
          >
            {[
              ["25+", "Years of Trust"],
              ["500+", "Projects Done"],
              ["100%", "Genuine Products"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-display text-3xl font-semibold text-gold-gradient">{v}</p>
                <p className="text-xs uppercase tracking-wider text-ash">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Visual showcase panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: ([0.22, 1, 0.36, 1] as [number, number, number, number]), delay: 2.2 }}
          className="relative hidden lg:block"
        >
          <div className="gold-border card-rise relative aspect-[4/5] overflow-hidden rounded-[2rem] glow-gold">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 90% at 70% 10%, rgba(201,162,77,0.22), transparent 55%), linear-gradient(160deg, #23211b, #0c0c0d)",
              }}
            />
            <div className="bg-grain absolute inset-0 opacity-20 mix-blend-overlay" />
            {/* Stylised showroom motif */}
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] text-gold/70">
                <span>Showroom</span>
                <span>2026</span>
              </div>
              <div className="space-y-3">
                {[90, 70, 55].map((w, i) => (
                  <div
                    key={i}
                    className="h-px bg-gradient-to-r from-gold/60 to-transparent"
                    style={{ width: `${w}%` }}
                  />
                ))}
                <p className="font-display pt-3 text-3xl font-semibold text-cream">
                  The Art of <span className="text-gold-gradient">Fine Living</span>
                </p>
                <p className="text-sm text-mist">
                  Step into our curated luxury showroom experience.
                </p>
              </div>
            </div>
          </div>

          {/* Floating glass stat card */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -left-8 bottom-16 rounded-2xl p-5"
          >
            <p className="font-display text-3xl font-bold text-gold-gradient">10K+</p>
            <p className="text-xs text-mist">Happy Customers</p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -right-6 top-16 rounded-2xl p-5"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
              ))}
            </div>
            <p className="mt-1 text-xs text-mist">Trusted Premium Brands</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-ash">Scroll</span>
        <div className="flex h-9 w-5 justify-center rounded-full border border-gold/40 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1 rounded-full bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}
