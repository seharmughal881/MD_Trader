import { ArrowUp, Phone, Mail, MapPin } from "lucide-react";
import { navLinks } from "@/lib/data";
import type { BusinessInfo, Category } from "@/lib/types";
import Icon from "./Icon";

export default function Footer({
  business,
  categories,
}: {
  business: BusinessInfo;
  categories: Category[];
}) {
  return (
    <footer className="relative overflow-hidden border-t border-gold/10 bg-onyx">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="container-luxe py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:pr-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/40 bg-charcoal font-display text-lg font-bold text-gold-gradient">
                MD
              </span>
              <span className="font-display text-xl font-semibold text-cream">MD Traders</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-mist">
              Where luxury meets quality. Premium tiles, sanitary ware, modular kitchens and
              turnkey interior solutions — crafted for exceptional homes.
            </p>
            <div className="mt-5 flex gap-3">
              {business.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-mist transition-all hover:border-gold/60 hover:text-gold"
                >
                  <Icon name={s.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-cream">Quick Links</h4>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-mist transition-colors hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display text-lg font-semibold text-cream">Our Products</h4>
            <ul className="mt-5 space-y-3">
              {(categories.length
                ? categories.map((c) => ({ key: c.id, name: c.name }))
                : [
                    "Luxury Tiles", "Sanitary Ware", "Bathroom Accessories",
                    "Showers & Faucets", "Modular Kitchens", "Interior Solutions",
                  ].map((name) => ({ key: name, name }))
              ).map((c) => (
                <li key={c.key}>
                  <a href="#products" className="text-sm text-mist transition-colors hover:text-gold">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-cream">Get In Touch</h4>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-sm text-mist">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {business.address}
              </li>
              <li>
                <a href={`tel:${business.phoneHref}`} className="flex items-center gap-3 text-sm text-mist hover:text-gold">
                  <Phone className="h-4 w-4 shrink-0 text-gold" />
                  {business.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="flex items-center gap-3 text-sm text-mist hover:text-gold">
                  <Mail className="h-4 w-4 shrink-0 text-gold" />
                  {business.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gold/10 pt-7 sm:flex-row">
          <p className="text-xs text-ash">
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p className="text-xs text-ash">
            Crafted with precision · Luxury · Elegance · 2026
          </p>
          <a
            href="#home"
            className="flex items-center gap-2 text-xs font-semibold text-gold transition-colors hover:text-gold-bright"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
