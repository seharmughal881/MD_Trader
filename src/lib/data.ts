// ===================== Static design content =====================
// Dynamic content (products, gallery, testimonials, services, business info)
// now lives in the database and is fetched via src/lib/queries.ts.

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Gallery", href: "#gallery" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const strengths = [
  {
    icon: "gem",
    title: "Premium Quality Products",
    desc: "Curated collections crafted from the finest materials, engineered for timeless durability.",
  },
  {
    icon: "badge-check",
    title: "Trusted Brands",
    desc: "Authorised partner of the world's most respected names in tiles and sanitary ware.",
  },
  {
    icon: "wrench",
    title: "Expert Installation Guidance",
    desc: "End-to-end technical support so every surface is fitted to flawless perfection.",
  },
  {
    icon: "tag",
    title: "Affordable Luxury",
    desc: "Best-in-class pricing that brings world-class design within graceful reach.",
  },
  {
    icon: "headset",
    title: "Professional Customer Service",
    desc: "A dedicated concierge team that treats every project as their own.",
  },
];

export const stats = [
  { value: 10000, suffix: "+", label: "Happy Customers", icon: "users" },
  { value: 500, suffix: "+", label: "Projects Completed", icon: "building-2" },
  { value: 100, suffix: "%", label: "Genuine Products", icon: "shield-check" },
  { value: 25, suffix: "+", label: "Years of Trust", icon: "award" },
];

export const whyChoose = [
  { icon: "shield-check", title: "100% Genuine Products", desc: "Every piece is authentic, warranty-backed and brand-certified." },
  { icon: "trending-down", title: "Best Prices Guaranteed", desc: "Direct sourcing means luxury without the luxury markup." },
  { icon: "headset", title: "Expert Support", desc: "Specialists guide you from selection to final installation." },
  { icon: "truck", title: "On-Time Delivery", desc: "Careful logistics that protect your products and your schedule." },
];

export const brands = [
  "KOHLER", "JAQUAR", "GROHE", "RAK CERAMICS", "TOTO", "DURAVIT", "HANSGROHE", "SOMANY",
];

// Options for the contact form's "interested in" dropdown.
export const productInterests = [
  "Luxury Tiles", "Sanitary Ware", "Bathroom Accessories",
  "Showers & Faucets", "Modular Kitchens", "Interior Solutions",
  "Other / General Enquiry",
];
