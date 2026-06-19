import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.mdtraders.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  ];
}
