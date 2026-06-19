import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { getBusiness } from "@/lib/queries";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.mdtraders.com";
const description =
  "MD Traders — premium tiles, sanitary ware, bathroom accessories, faucets, showers, modular kitchens and turnkey interior solutions. Where luxury meets quality.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MD Traders | Luxury Tiles, Sanitary Ware & Modular Kitchens",
    template: "%s | MD Traders",
  },
  description,
  keywords: [
    "luxury tiles", "sanitary ware", "bathroom accessories", "faucets", "showers",
    "modular kitchens", "interior solutions", "Italian marble", "premium tiles showroom",
    "MD Traders",
  ],
  authors: [{ name: "MD Traders" }],
  creator: "MD Traders",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "MD Traders | Where Luxury Meets Quality",
    description,
    siteName: "MD Traders",
  },
  twitter: {
    card: "summary_large_image",
    title: "MD Traders | Where Luxury Meets Quality",
    description,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const business = await getBusiness();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: business.name,
    description,
    url: siteUrl,
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
    },
    priceRange: "$$ - $$$",
    openingHours: ["Mo-Sa 10:00-20:30", "Su 11:00-18:00"],
    makesOffer: [
      "Luxury Tiles", "Sanitary Ware", "Bathroom Accessories",
      "Showers & Faucets", "Modular Kitchens", "Interior Solutions",
    ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Product", name } })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1280",
    },
  };
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen bg-ink text-cream">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
