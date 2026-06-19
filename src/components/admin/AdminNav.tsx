"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, Images, Quote, Sparkles, Settings, Type,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/content", label: "Website Text", icon: Type },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/services", label: "Services", icon: Sparkles },
  { href: "/admin/business", label: "Business Info", icon: Settings },
];

export default function AdminNav({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className={mobile ? "mb-6 flex gap-2 overflow-x-auto pb-2" : "mt-8 flex flex-1 flex-col gap-1"}>
      {links.map((l) => {
        const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
        const Icon = l.icon;
        return (
          <a
            key={l.href}
            href={l.href}
            className={`flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-gold/15 text-gold"
                : "text-mist hover:bg-charcoal hover:text-cream"
            }`}
          >
            <Icon className="h-4 w-4" />
            {l.label}
          </a>
        );
      })}
    </nav>
  );
}
