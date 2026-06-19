import { getServices } from "@/lib/queries";
import ServicesManager from "@/components/admin/ServicesManager";

export const dynamic = "force-dynamic";

export default async function ServicesAdminPage() {
  const items = await getServices();
  return <ServicesManager items={items} />;
}
