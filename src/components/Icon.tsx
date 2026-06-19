import {
  Gem, BadgeCheck, Wrench, Tag, Headset, Users, Building2, ShieldCheck, Award,
  TrendingDown, Truck, Home, Palette, Compass, Utensils, Ruler, LayoutGrid,
  Bath, Sparkles, ShowerHead, ChefHat, Sofa, type LucideProps,
} from "lucide-react";

const map = {
  gem: Gem,
  "badge-check": BadgeCheck,
  wrench: Wrench,
  tag: Tag,
  headset: Headset,
  users: Users,
  "building-2": Building2,
  "shield-check": ShieldCheck,
  award: Award,
  "trending-down": TrendingDown,
  truck: Truck,
  home: Home,
  palette: Palette,
  compass: Compass,
  utensils: Utensils,
  ruler: Ruler,
  "layout-grid": LayoutGrid,
  bath: Bath,
  sparkles: Sparkles,
  "shower-head": ShowerHead,
  "chef-hat": ChefHat,
  sofa: Sofa,
} as const;

// Brand icons were removed from lucide-react — provide inline SVG paths.
const brandPaths: Record<string, string> = {
  instagram:
    "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5-3.2a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z",
  facebook:
    "M13 22v-8h2.7l.4-3H13V9c0-.9.3-1.5 1.6-1.5H16V5c-.3 0-1.2-.1-2.3-.1C11.4 4.9 10 6.3 10 8.7V11H7.5v3H10v8h3z",
  youtube:
    "M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.5A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.5a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12zM9.8 15.2V8.8l5.6 3.2-5.6 3.2z",
  linkedin:
    "M6.5 8.5h-3V21h3V8.5zM5 3a1.75 1.75 0 1 0 0 3.5A1.75 1.75 0 0 0 5 3zm6 5.5h-3V21h3v-6.5c0-1.7 2.3-1.9 2.3 0V21h3v-7.3c0-4.4-4.6-4.2-5.3-2V8.5z",
};

export type IconName = keyof typeof map;

export default function Icon({ name, ...props }: { name: string } & LucideProps) {
  if (brandPaths[name]) {
    const { className, size = 24 } = props;
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        className={className}
        aria-hidden="true"
      >
        <path d={brandPaths[name]} />
      </svg>
    );
  }
  const Cmp = map[name as IconName] ?? Sparkles;
  return <Cmp {...props} />;
}
