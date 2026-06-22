import { prisma } from "@/lib/db";
import { Package, Images, Quote, Sparkles, ArrowRight, Plus, AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  let products = 0, gallery = 0, testimonials = 0, services = 0;
  let dbError = false;
  try {
    [products, gallery, testimonials, services] = await Promise.all([
      prisma.category.count(),
      prisma.galleryItem.count(),
      prisma.testimonial.count(),
      prisma.service.count(),
    ]);
  } catch {
    dbError = true;
  }

  const cards = [
    { label: "Products", count: products, href: "/admin/products", icon: Package },
    { label: "Gallery Items", count: gallery, href: "/admin/gallery", icon: Images },
    { label: "Testimonials", count: testimonials, href: "/admin/testimonials", icon: Quote },
    { label: "Services", count: services, href: "/admin/services", icon: Sparkles },
  ];

  const total = products + gallery + testimonials + services;

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-cream">Welcome back 👋</h1>
        <p className="mt-1 text-sm text-mist">Manage everything that appears on your website from here.</p>
      </header>

      {dbError && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-amber-200">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">Database not connected</p>
            <p className="mt-1 text-sm text-amber-200/80">
              Set a <code className="rounded bg-ink/40 px-1.5 py-0.5">DATABASE_URL</code> environment
              variable (a cloud Postgres like Neon) in your Vercel project and run the migration.
              Until then, the admin panel can&apos;t read or save content.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <a
            key={c.label}
            href={c.href}
            className="group glass rounded-2xl p-6 transition-all hover:border-gold/40"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 bg-charcoal text-gold">
                <c.icon className="h-5 w-5" />
              </span>
              <ArrowRight className="h-4 w-4 text-ash transition-transform group-hover:translate-x-1 group-hover:text-gold" />
            </div>
            <p className="font-display mt-4 text-4xl font-bold text-gold-gradient">{c.count}</p>
            <p className="mt-1 text-sm text-mist">{c.label}</p>
          </a>
        ))}
      </div>

      {total === 0 && (
        <div className="mt-8 rounded-2xl border border-gold/20 bg-charcoal/40 p-6">
          <h2 className="font-display text-xl font-semibold text-cream">Your website is empty</h2>
          <p className="mt-2 max-w-2xl text-sm text-mist">
            Start by adding products, gallery images, testimonials and services — they will appear on
            the live website instantly. Prefer a quick start? Run{" "}
            <code className="rounded bg-ink px-1.5 py-0.5 text-gold">npm run db:seed</code> in the
            terminal to load ready-made luxury starter content.
          </p>
        </div>
      )}

      <div className="mt-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ash">Quick actions</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/admin/products" className="btn-gold flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
            <Plus className="h-4 w-4" /> Add Product
          </a>
          <a href="/admin/gallery" className="btn-ghost flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
            <Plus className="h-4 w-4" /> Add Gallery Image
          </a>
          <a href="/admin/business" className="btn-ghost flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
            Edit Business Info
          </a>
        </div>
      </div>
    </div>
  );
}
