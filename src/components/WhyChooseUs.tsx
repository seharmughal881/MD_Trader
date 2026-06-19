import type { SiteContent } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Counter from "./Counter";
import Icon from "./Icon";

export default function WhyChooseUs({ content }: { content: SiteContent["why"] }) {
  const { stats, reasons: whyChoose } = content;
  return (
    <section className="section relative overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[40vh] w-[80vw] -translate-x-1/2 rounded-full bg-gold/5 blur-[140px]" />
      <div className="container-luxe relative">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          highlight={content.highlight}
          subtitle={content.subtitle}
        />

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="glass card-rise rounded-2xl p-6 text-center sm:p-8">
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-charcoal text-gold">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <p className="font-display text-4xl font-bold text-gold-gradient sm:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm tracking-wide text-mist">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Reasons */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyChoose.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-gold/10 bg-charcoal/40 p-6 transition-all duration-500 hover:border-gold/30 hover:bg-charcoal">
                <Icon
                  name={w.icon}
                  className="h-7 w-7 text-gold transition-transform duration-500 group-hover:scale-110"
                />
                <h3 className="font-display mt-4 text-lg font-semibold text-cream">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
