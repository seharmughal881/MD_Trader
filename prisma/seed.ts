import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const categories = [
  { name: "Luxury Tiles", tag: "Surfaces", desc: "Italian marble, large-format porcelain & designer mosaics that redefine every floor and wall.", features: ["Italian Marble", "Large Format", "Anti-Skid", "Wood Finish"], accent: "#c9a24d", fromColor: "#1d1d22", toColor: "#0a0a0b", icon: "layout-grid" },
  { name: "Sanitary Ware", tag: "Bathroom", desc: "Sculptural basins, smart toilets and one-piece commodes engineered for hygiene and elegance.", features: ["Smart Toilets", "Wall-Hung", "Counter Basins", "Bidets"], accent: "#9fb6c9", fromColor: "#1a1d22", toColor: "#0a0a0b", icon: "bath" },
  { name: "Bathroom Accessories", tag: "Details", desc: "Brushed gold, matte black & chrome accessory suites that complete the luxury narrative.", features: ["Towel Rails", "Mirrors", "Soap Dispensers", "Robe Hooks"], accent: "#d9bd7a", fromColor: "#221d1a", toColor: "#0a0a0b", icon: "sparkles" },
  { name: "Showers & Faucets", tag: "Fittings", desc: "Rainfall systems, thermostatic mixers and precision faucets with a lifetime finish.", features: ["Rainfall", "Thermostatic", "Hand Showers", "Sensor Taps"], accent: "#a9c9b6", fromColor: "#1a2220", toColor: "#0a0a0b", icon: "shower-head" },
  { name: "Modular Kitchens", tag: "Living", desc: "Bespoke modular kitchens with premium hardware, soft-close motion and smart storage.", features: ["Soft-Close", "Quartz Tops", "Tall Units", "Smart Storage"], accent: "#d9bd7a", fromColor: "#221f1a", toColor: "#0a0a0b", icon: "chef-hat" },
  { name: "Interior Solutions", tag: "Design", desc: "Turnkey interior design that orchestrates light, texture and material into a signature space.", features: ["Space Planning", "Lighting", "Wardrobes", "Turnkey"], accent: "#c9a4cf", fromColor: "#1f1a22", toColor: "#0a0a0b", icon: "sofa" },
];

const gallery = [
  { title: "Marble Master Bath", category: "Bathroom", size: "tall", fromColor: "#23211b", toColor: "#0c0c0d" },
  { title: "Modular Kitchen Suite", category: "Kitchen", size: "wide", fromColor: "#211d18", toColor: "#0c0c0d" },
  { title: "Designer Powder Room", category: "Bathroom", size: "normal", fromColor: "#1b2023", toColor: "#0c0c0d" },
  { title: "Grand Foyer Tiles", category: "Tiles", size: "normal", fromColor: "#201b1b", toColor: "#0c0c0d" },
  { title: "Spa Shower Enclosure", category: "Showers", size: "tall", fromColor: "#1b231f", toColor: "#0c0c0d" },
  { title: "Luxury Living Interior", category: "Interior", size: "wide", fromColor: "#1f1b23", toColor: "#0c0c0d" },
  { title: "Gold Accent Vanity", category: "Bathroom", size: "normal", fromColor: "#23201a", toColor: "#0c0c0d" },
  { title: "Statement Feature Wall", category: "Tiles", size: "normal", fromColor: "#1d1f23", toColor: "#0c0c0d" },
];

const testimonials = [
  { name: "Aarav Mehta", role: "Villa Owner, Whitefield", rating: 5, initials: "AM", text: "MD Traders transformed our home with Italian marble and a stunning modular kitchen. The quality and service felt truly world-class." },
  { name: "Priya Nair", role: "Interior Architect", rating: 5, initials: "PN", text: "As a designer, I'm picky about finishes. Their sanitary ware and faucet range is the best curated collection in the city. My go-to partner." },
  { name: "Rohan Kapoor", role: "Apartment Renovation", rating: 5, initials: "RK", text: "From consultation to delivery, everything was seamless. Genuine products, fair prices, and a team that genuinely cares. Highly recommend." },
  { name: "Sneha Reddy", role: "Penthouse Project", rating: 5, initials: "SR", text: "The showroom experience itself feels like a luxury hotel. They guided us beautifully and the installation guidance was spot on." },
];

const services = [
  { title: "Home Consultation", desc: "On-site visits to understand your space, lifestyle and aesthetic.", icon: "home" },
  { title: "Material Selection", desc: "Hand-picked curation of finishes, textures and colour palettes.", icon: "palette" },
  { title: "Interior Guidance", desc: "Design direction that ties every element into one cohesive vision.", icon: "compass" },
  { title: "Kitchen Design", desc: "Ergonomic, beautiful modular kitchens tailored to how you cook.", icon: "utensils" },
  { title: "Delivery Support", desc: "Safe, scheduled delivery and installation coordination.", icon: "truck" },
  { title: "Site Measurement", desc: "Precise measurement so every product fits perfectly the first time.", icon: "ruler" },
];

async function main() {
  console.log("Seeding starter content…");
  await prisma.category.deleteMany();
  await prisma.galleryItem.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.service.deleteMany();

  await prisma.category.createMany({ data: categories.map((c, i) => ({ ...c, order: i })) });
  await prisma.galleryItem.createMany({ data: gallery.map((g, i) => ({ ...g, order: i })) });
  await prisma.testimonial.createMany({ data: testimonials.map((t, i) => ({ ...t, order: i })) });
  await prisma.service.createMany({ data: services.map((s, i) => ({ ...s, order: i })) });

  await prisma.business.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });

  console.log("Done. Seeded categories, gallery, testimonials and services.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
