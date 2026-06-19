import { getContent } from "@/lib/content";
import ContentForm from "@/components/admin/ContentForm";

export const dynamic = "force-dynamic";

export default async function ContentAdminPage() {
  const content = await getContent();
  return <ContentForm content={content} />;
}
