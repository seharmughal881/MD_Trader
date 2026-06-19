export default function BrandMarquee({ title, brands }: { title: string; brands: string[] }) {
  if (brands.length === 0) return null;
  const row = [...brands, ...brands];
  return (
    <section className="border-y border-gold/10 bg-onyx/60 py-8">
      <div className="container-luxe">
        <p className="mb-6 text-center text-[11px] uppercase tracking-[0.35em] text-ash">
          {title}
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-[marquee_38s_linear_infinite] gap-14">
            {row.map((brand, i) => (
              <span
                key={i}
                className="font-display whitespace-nowrap text-xl font-semibold tracking-wide text-mist/60 transition-colors hover:text-gold"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
