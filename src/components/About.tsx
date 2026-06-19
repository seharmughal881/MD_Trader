import { strengths } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Icon from "./Icon";

export default function About() {
  return (
    <section id="about" className="section relative">
      <div className="container-luxe">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Visual */}
          <Reveal>
            <div className="relative">
              <div className="gold-border card-rise relative aspect-square overflow-hidden rounded-[2rem]">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(100% 80% at 20% 20%, rgba(201,162,77,0.18), transparent 60%), linear-gradient(160deg, #1d1d22, #0a0a0b)",
                  }}
                />
                <div className="bg-grain absolute inset-0 opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold/70">
                    Est. 2001
                  </span>
                  <div>
                    <p className="font-display text-4xl font-semibold leading-tight text-cream">
                      A Legacy of <span className="text-gold-gradient">Refined Taste</span>
                    </p>
                    <p className="mt-3 max-w-sm text-sm text-mist">
                      Two decades of bringing global luxury home — one exceptional
                      surface at a time.
                    </p>
                  </div>
                </div>
              </div>
              {/* floating accent card */}
              <div className="glass absolute -bottom-6 -right-4 hidden rounded-2xl p-5 sm:block">
                <p className="font-display text-3xl font-bold text-gold-gradient">A+</p>
                <p className="text-xs text-mist">Quality Promise</p>
              </div>
            </div>
          </Reveal>

          {/* Copy + strengths */}
          <div>
            <SectionHeading
              eyebrow="About MD Traders"
              title="Crafting Spaces That"
              highlight="Inspire"
              center={false}
              subtitle="At MD Traders, we believe luxury is in the details. We bring together the world's finest tiles, sanitary ware and modular solutions — paired with expert guidance — to turn everyday spaces into statements of elegance."
            />

            <div className="mt-10 space-y-4">
              {strengths.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <div className="group flex items-start gap-4 rounded-2xl border border-transparent p-3 transition-colors hover:border-gold/20 hover:bg-charcoal/40">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-charcoal text-gold transition-all duration-500 group-hover:scale-105 group-hover:border-gold/60">
                      <Icon name={s.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-cream">{s.title}</h3>
                      <p className="text-sm leading-relaxed text-mist">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
