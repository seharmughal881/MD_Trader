import { getBusiness } from "@/lib/queries";
import BusinessForm from "@/components/admin/BusinessForm";

export const dynamic = "force-dynamic";

export default async function BusinessAdminPage() {
  const business = await getBusiness();
  return <BusinessForm business={business} />;
}
