"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  createSession, destroySession, requireAuth, verifyCredentials,
} from "@/lib/auth";
import type { Hour, Social } from "@/lib/types";
import { DEFAULT_CONTENT, type SiteContent } from "@/lib/content";

function s(formData: FormData, key: string): string {
  return (formData.get(key) as string | null)?.trim() ?? "";
}
function n(formData: FormData, key: string, fallback = 0): number {
  const v = Number(formData.get(key));
  return Number.isFinite(v) ? v : fallback;
}

function refresh(adminPath: string) {
  revalidatePath("/");
  revalidatePath(adminPath);
}

/* ----------------------------- Auth ----------------------------- */
export async function loginAction(_prev: { error?: string } | undefined, formData: FormData) {
  const username = s(formData, "username");
  const password = s(formData, "password");
  if (!verifyCredentials(username, password)) {
    return { error: "Invalid username or password." };
  }
  await createSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

/* --------------------------- Categories -------------------------- */
export async function saveCategory(formData: FormData) {
  await requireAuth();
  const id = s(formData, "id");
  const data = {
    name: s(formData, "name"),
    tag: s(formData, "tag") || "General",
    desc: s(formData, "desc"),
    features: s(formData, "features").split(",").map((f) => f.trim()).filter(Boolean),
    accent: s(formData, "accent") || "#c9a24d",
    fromColor: s(formData, "fromColor") || "#1d1d22",
    toColor: s(formData, "toColor") || "#0a0a0b",
    icon: s(formData, "icon") || "sparkles",
    imageUrl: s(formData, "imageUrl") || null,
    order: n(formData, "order"),
  };
  if (id) await prisma.category.update({ where: { id }, data });
  else await prisma.category.create({ data });
  refresh("/admin/products");
  redirect("/admin/products");
}

export async function deleteCategory(formData: FormData) {
  await requireAuth();
  await prisma.category.delete({ where: { id: s(formData, "id") } });
  refresh("/admin/products");
}

/* ---------------------------- Gallery ---------------------------- */
export async function saveGallery(formData: FormData) {
  await requireAuth();
  const id = s(formData, "id");
  const data = {
    title: s(formData, "title"),
    category: s(formData, "category") || "Showroom",
    size: s(formData, "size") || "normal",
    imageUrl: s(formData, "imageUrl") || null,
    fromColor: s(formData, "fromColor") || "#23211b",
    toColor: s(formData, "toColor") || "#0c0c0d",
    order: n(formData, "order"),
  };
  if (id) await prisma.galleryItem.update({ where: { id }, data });
  else await prisma.galleryItem.create({ data });
  refresh("/admin/gallery");
  redirect("/admin/gallery");
}

export async function deleteGallery(formData: FormData) {
  await requireAuth();
  await prisma.galleryItem.delete({ where: { id: s(formData, "id") } });
  refresh("/admin/gallery");
}

/* -------------------------- Testimonials ------------------------- */
export async function saveTestimonial(formData: FormData) {
  await requireAuth();
  const id = s(formData, "id");
  const name = s(formData, "name");
  const data = {
    name,
    role: s(formData, "role"),
    rating: Math.max(1, Math.min(5, n(formData, "rating", 5))),
    text: s(formData, "text"),
    initials: (s(formData, "initials") || name.slice(0, 2)).toUpperCase(),
    imageUrl: s(formData, "imageUrl") || null,
    order: n(formData, "order"),
  };
  if (id) await prisma.testimonial.update({ where: { id }, data });
  else await prisma.testimonial.create({ data });
  refresh("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAuth();
  await prisma.testimonial.delete({ where: { id: s(formData, "id") } });
  refresh("/admin/testimonials");
}

/* ---------------------------- Services --------------------------- */
export async function saveService(formData: FormData) {
  await requireAuth();
  const id = s(formData, "id");
  const data = {
    title: s(formData, "title"),
    desc: s(formData, "desc"),
    icon: s(formData, "icon") || "sparkles",
    order: n(formData, "order"),
  };
  if (id) await prisma.service.update({ where: { id }, data });
  else await prisma.service.create({ data });
  refresh("/admin/services");
  redirect("/admin/services");
}

export async function deleteService(formData: FormData) {
  await requireAuth();
  await prisma.service.delete({ where: { id: s(formData, "id") } });
  refresh("/admin/services");
}

/* ---------------------------- Business --------------------------- */
function parseHours(raw: string): Hour[] {
  return raw.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
    const [day, ...rest] = line.split("|");
    return { day: day.trim(), time: rest.join("|").trim() };
  });
}
function parseSocials(raw: string): Social[] {
  return raw.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
    const [label, href, icon] = line.split("|").map((p) => p.trim());
    return { label: label || "Link", href: href || "#", icon: icon || "instagram" };
  });
}

export async function saveBusiness(formData: FormData) {
  await requireAuth();
  const data = {
    name: s(formData, "name"),
    tagline: s(formData, "tagline"),
    phone: s(formData, "phone"),
    phoneHref: s(formData, "phoneHref"),
    whatsapp: s(formData, "whatsapp").replace(/[^0-9]/g, ""),
    email: s(formData, "email"),
    address: s(formData, "address"),
    mapQuery: s(formData, "mapQuery"),
    hours: parseHours(s(formData, "hours")),
    socials: parseSocials(s(formData, "socials")),
  };
  await prisma.business.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });
  refresh("/admin/business");
  redirect("/admin/business");
}

/* -------------------------- Site content ------------------------- */
function lines(raw: string): string[] {
  return raw.split("\n").map((l) => l.trim()).filter(Boolean);
}
function heading(formData: FormData, key: keyof SiteContent, fallback: { eyebrow: string; title: string; highlight: string; subtitle: string }) {
  return {
    eyebrow: s(formData, `${key}.eyebrow`) || fallback.eyebrow,
    title: s(formData, `${key}.title`) || fallback.title,
    highlight: s(formData, `${key}.highlight`) || fallback.highlight,
    subtitle: s(formData, `${key}.subtitle`) || fallback.subtitle,
  };
}

export async function saveContent(formData: FormData) {
  await requireAuth();
  const d = DEFAULT_CONTENT;

  const content: SiteContent = {
    brandsTitle: s(formData, "brandsTitle") || d.brandsTitle,
    brands: s(formData, "brands").split(/[\n,]/).map((b) => b.trim()).filter(Boolean),
    hero: {
      badge: s(formData, "hero.badge"),
      titleTop: s(formData, "hero.titleTop"),
      titleBottom: s(formData, "hero.titleBottom"),
      subheadline: s(formData, "hero.subheadline"),
      ctaPrimary: s(formData, "hero.ctaPrimary") || d.hero.ctaPrimary,
      ctaSecondary: s(formData, "hero.ctaSecondary") || d.hero.ctaSecondary,
      stats: lines(s(formData, "hero.stats")).map((line) => {
        const [value, ...rest] = line.split("|");
        return { value: value.trim(), label: rest.join("|").trim() };
      }),
    },
    about: {
      ...heading(formData, "about", d.about),
      strengths: lines(s(formData, "about.strengths")).map((line) => {
        const [icon, title, ...rest] = line.split("|");
        return { icon: (icon || "sparkles").trim(), title: (title || "").trim(), desc: rest.join("|").trim() };
      }),
    },
    why: {
      ...heading(formData, "why", d.why),
      stats: lines(s(formData, "why.stats")).map((line) => {
        const [value, suffix, label, icon] = line.split("|").map((p) => p.trim());
        return { value: Number(value) || 0, suffix: suffix || "", label: label || "", icon: icon || "award" };
      }),
      reasons: lines(s(formData, "why.reasons")).map((line) => {
        const [icon, title, ...rest] = line.split("|");
        return { icon: (icon || "sparkles").trim(), title: (title || "").trim(), desc: rest.join("|").trim() };
      }),
    },
    products: heading(formData, "products", d.products),
    gallery: heading(formData, "gallery", d.gallery),
    testimonials: heading(formData, "testimonials", d.testimonials),
    services: heading(formData, "services", d.services),
    contact: heading(formData, "contact", d.contact),
  };

  await prisma.siteContent.upsert({
    where: { id: 1 },
    update: { data: content },
    create: { id: 1, data: content },
  });
  refresh("/admin/content");
  redirect("/admin/content");
}
