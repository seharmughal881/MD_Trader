import { getTestimonials } from "@/lib/queries";
import TestimonialsManager from "@/components/admin/TestimonialsManager";

export const dynamic = "force-dynamic";

export default async function TestimonialsAdminPage() {
  const items = await getTestimonials();
  return <TestimonialsManager items={items} />;
}
