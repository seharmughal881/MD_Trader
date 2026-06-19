import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            <span className="h-px w-8 bg-gold/60" />
            {eyebrow}
            {center && <span className="h-px w-8 bg-gold/60" />}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className="font-display mt-5 text-3xl leading-tight font-semibold sm:text-4xl md:text-5xl">
          {title} {highlight && <span className="text-gold-gradient">{highlight}</span>}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-mist">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
