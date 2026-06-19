export type Category = {
  id: string;
  name: string;
  tag: string;
  desc: string;
  features: string[];
  accent: string;
  from: string;
  to: string;
  icon: string;
  imageUrl: string | null;
  order: number;
};

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  size: string;
  imageUrl: string | null;
  beforeImageUrl: string | null;
  afterImageUrl: string | null;
  from: string;
  to: string;
  order: number;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  initials: string;
  imageUrl: string | null;
  order: number;
};

export type Service = {
  id: string;
  title: string;
  desc: string;
  icon: string;
  order: number;
};

export type Hour = { day: string; time: string };
export type Social = { label: string; href: string; icon: string };

export type BusinessInfo = {
  name: string;
  tagline: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  email: string;
  address: string;
  mapQuery: string;
  hours: Hour[];
  socials: Social[];
};

export type SiteData = {
  business: BusinessInfo;
  categories: Category[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  services: Service[];
};
