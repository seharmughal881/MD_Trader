import { getCategories } from "@/lib/queries";
import ProductsManager from "@/components/admin/ProductsManager";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const items = await getCategories();
  return <ProductsManager items={items} />;
}
