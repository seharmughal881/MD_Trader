import type { Service } from "@/lib/types";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Icon from "./Icon";

export default function Services({ services }: { services: Service[] }) {
  if (services.length === 0) return null;
  return (
    <section id="services" className="section relative">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="What We Offer"
          title="End-to-End Luxury"
          highlight="Services"
          subtitle="More than products — a complete, white-glove journey from first idea to finished space."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-gold/10 bg-charcoal/50 p-8 transition-all duration-500 hover:border-gold/30">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/5 blur-2xl transition-all duration-500 group-hover:bg-gold/10" />
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-charcoal text-gold transition-all duration-500 group-hover:scale-110 group-hover:border-gold/60">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <h3 className="font-display relative mt-6 text-xl font-semibold text-cream">
                  {s.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-mist">{s.desc}</p>
                <span className="font-display absolute bottom-5 right-6 text-5xl font-bold text-gold/5 transition-colors duration-500 group-hover:text-gold/10">
                  0{i + 1}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
