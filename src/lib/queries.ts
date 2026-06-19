import { prisma } from "./db";
import type {
  BusinessInfo, Category, GalleryItem, Service, SiteData, Testimonial, Hour, Social,
} from "./types";

export const DEFAULT_BUSINESS: BusinessInfo = {
  name: "MD Traders",
  tagline: "Where Luxury Meets Quality",
  phone: "+91 98765 43210",
  phoneHref: "+919876543210",
  whatsapp: "919876543210",
  email: "info@mdtraders.com",
  address: "123 Showroom Avenue, Premium Plaza, City, State 000000",
  mapQuery: "Premium Plaza, City",
  hours: [
    { day: "Monday – Saturday", time: "10:00 AM – 8:30 PM" },
    { day: "Sunday", time: "11:00 AM – 6:00 PM" },
  ],
  socials: [
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "Facebook", href: "#", icon: "facebook" },
    { label: "YouTube", href: "#", icon: "youtube" },
    { label: "LinkedIn", href: "#", icon: "linkedin" },
  ],
};

export async function getBusiness(): Promise<BusinessInfo> {
  const row = await prisma.business.findUnique({ where: { id: 1 } });
  if (!row) {
    const created = await prisma.business.create({
      data: {
        id: 1,
        name: DEFAULT_BUSINESS.name,
        tagline: DEFAULT_BUSINESS.tagline,
        phone: DEFAULT_BUSINESS.phone,
        phoneHref: DEFAULT_BUSINESS.phoneHref,
        whatsapp: DEFAULT_BUSINESS.whatsapp,
        email: DEFAULT_BUSINESS.email,
        address: DEFAULT_BUSINESS.address,
        mapQuery: DEFAULT_BUSINESS.mapQuery,
        hours: DEFAULT_BUSINESS.hours,
        socials: DEFAULT_BUSINESS.socials,
      },
    });
    return mapBusiness(created);
  }
  return mapBusiness(row);
}

function mapBusiness(row: {
  name: string; tagline: string; phone: string; phoneHref: string; whatsapp: string;
  email: string; address: string; mapQuery: string; hours: unknown; socials: unknown;
}): BusinessInfo {
  return {
    name: row.name,
    tagline: row.tagline,
    phone: row.phone,
    phoneHref: row.phoneHref,
    whatsapp: row.whatsapp,
    email: row.email,
    address: row.address,
    mapQuery: row.mapQuery,
    hours: (Array.isArray(row.hours) ? row.hours : []) as Hour[],
    socials: (Array.isArray(row.socials) ? row.socials : []) as Social[],
  };
}

export async function getCategories(): Promise<Category[]> {
  const rows = await prisma.category.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });
  return rows.map((r) => ({
    id: r.id, name: r.name, tag: r.tag, desc: r.desc, features: r.features,
    accent: r.accent, from: r.fromColor, to: r.toColor, icon: r.icon, imageUrl: r.imageUrl,
    order: r.order,
  }));
}

export async function getGallery(): Promise<GalleryItem[]> {
  const rows = await prisma.galleryItem.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });
  return rows.map((r) => ({
    id: r.id, title: r.title, category: r.category, size: r.size,
    imageUrl: r.imageUrl, beforeImageUrl: r.beforeImageUrl, afterImageUrl: r.afterImageUrl,
    from: r.fromColor, to: r.toColor, order: r.order,
  }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await prisma.testimonial.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });
  return rows.map((r) => ({
    id: r.id, name: r.name, role: r.role, rating: r.rating,
    text: r.text, initials: r.initials, imageUrl: r.imageUrl, order: r.order,
  }));
}

export async function getServices(): Promise<Service[]> {
  const rows = await prisma.service.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });
  return rows.map((r) => ({ id: r.id, title: r.title, desc: r.desc, icon: r.icon, order: r.order }));
}

export async function getSiteData(): Promise<SiteData> {
  const [business, categories, gallery, testimonials, services] = await Promise.all([
    getBusiness(), getCategories(), getGallery(), getTestimonials(), getServices(),
  ]);
  return { business, categories, gallery, testimonials, services };
}
