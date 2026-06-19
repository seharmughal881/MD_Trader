import { prisma } from "./db";

export type Heading = { eyebrow: string; title: string; highlight: string; subtitle: string };
export type IconText = { icon: string; title: string; desc: string };
export type Stat = { value: number; suffix: string; label: string; icon: string };
export type MiniStat = { value: string; label: string };

export type SiteContent = {
  brandsTitle: string;
  brands: string[];
  hero: {
    badge: string;
    titleTop: string;
    titleBottom: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: MiniStat[];
  };
  about: Heading & { strengths: IconText[] };
  why: Heading & { stats: Stat[]; reasons: IconText[] };
  products: Heading;
  gallery: Heading;
  testimonials: Heading;
  services: Heading;
  contact: Heading;
};

export const DEFAULT_CONTENT: SiteContent = {
  brandsTitle: "Authorised partner of the world's finest brands",
  brands: ["KOHLER", "JAQUAR", "GROHE", "RAK CERAMICS", "TOTO", "DURAVIT", "HANSGROHE", "SOMANY"],
  hero: {
    badge: "Rated 4.9/5 by 10,000+ customers",
    titleTop: "Where Luxury",
    titleBottom: "Meets Quality",
    subheadline:
      "Premium Tiles, Sanitary Ware & Modular Kitchen Solutions — curated for those who believe a home should feel as exceptional as it looks.",
    ctaPrimary: "Explore Products",
    ctaSecondary: "Get Free Consultation",
    stats: [
      { value: "25+", label: "Years of Trust" },
      { value: "500+", label: "Projects Done" },
      { value: "100%", label: "Genuine Products" },
    ],
  },
  about: {
    eyebrow: "About MD Traders",
    title: "Crafting Spaces That",
    highlight: "Inspire",
    subtitle:
      "At MD Traders, we believe luxury is in the details. We bring together the world's finest tiles, sanitary ware and modular solutions — paired with expert guidance — to turn everyday spaces into statements of elegance.",
    strengths: [
      { icon: "gem", title: "Premium Quality Products", desc: "Curated collections crafted from the finest materials, engineered for timeless durability." },
      { icon: "badge-check", title: "Trusted Brands", desc: "Authorised partner of the world's most respected names in tiles and sanitary ware." },
      { icon: "wrench", title: "Expert Installation Guidance", desc: "End-to-end technical support so every surface is fitted to flawless perfection." },
      { icon: "tag", title: "Affordable Luxury", desc: "Best-in-class pricing that brings world-class design within graceful reach." },
      { icon: "headset", title: "Professional Customer Service", desc: "A dedicated concierge team that treats every project as their own." },
    ],
  },
  why: {
    eyebrow: "Why Choose Us",
    title: "The MD Traders",
    highlight: "Difference",
    subtitle: "Numbers built on trust, and a promise we keep with every single project.",
    stats: [
      { value: 10000, suffix: "+", label: "Happy Customers", icon: "users" },
      { value: 500, suffix: "+", label: "Projects Completed", icon: "building-2" },
      { value: 100, suffix: "%", label: "Genuine Products", icon: "shield-check" },
      { value: 25, suffix: "+", label: "Years of Trust", icon: "award" },
    ],
    reasons: [
      { icon: "shield-check", title: "100% Genuine Products", desc: "Every piece is authentic, warranty-backed and brand-certified." },
      { icon: "trending-down", title: "Best Prices Guaranteed", desc: "Direct sourcing means luxury without the luxury markup." },
      { icon: "headset", title: "Expert Support", desc: "Specialists guide you from selection to final installation." },
      { icon: "truck", title: "On-Time Delivery", desc: "Careful logistics that protect your products and your schedule." },
    ],
  },
  products: { eyebrow: "Our Collections", title: "Explore Premium", highlight: "Categories", subtitle: "Six curated worlds of luxury — from Italian marble to bespoke modular kitchens. Search or filter to find your perfect match." },
  gallery: { eyebrow: "Our Work", title: "The Luxury", highlight: "Showroom Gallery", subtitle: "A glimpse into the spaces we've shaped — where premium materials meet meticulous craft." },
  testimonials: { eyebrow: "Testimonials", title: "Loved by", highlight: "Discerning Clients", subtitle: "Real experiences from homeowners and designers who trusted us with their spaces." },
  services: { eyebrow: "What We Offer", title: "End-to-End Luxury", highlight: "Services", subtitle: "More than products — a complete, white-glove journey from first idea to finished space." },
  contact: { eyebrow: "Get In Touch", title: "Let's Design Your", highlight: "Dream Space", subtitle: "Book a free consultation or drop by our showroom. Our specialists are ready to help." },
};

// Deep-merge stored partial content over defaults so missing keys never break.
function merge<T>(base: T, override: unknown): T {
  if (override === null || override === undefined) return base;
  if (Array.isArray(base)) return (Array.isArray(override) ? override : base) as T;
  if (typeof base === "object" && typeof override === "object") {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const key of Object.keys(base as Record<string, unknown>)) {
      out[key] = merge((base as Record<string, unknown>)[key], (override as Record<string, unknown>)[key]);
    }
    return out as T;
  }
  return (override as T) ?? base;
}

export async function getContent(): Promise<SiteContent> {
  try {
    const row = await prisma.siteContent.findUnique({ where: { id: 1 } });
    return merge(DEFAULT_CONTENT, row?.data);
  } catch {
    // DB unreachable (e.g. during a build with no database) — use defaults.
    return DEFAULT_CONTENT;
  }
}
