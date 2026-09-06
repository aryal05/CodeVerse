import { getOptionalDb } from "@/lib/api-helpers";
import ServiceDetailPage from "@/components/pages/ServiceDetailPage";
import { notFound } from "next/navigation";

export const revalidate = 120;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const readableName = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  let service = null;
  try {
    const db = getOptionalDb();
    if (db) {
      const { data } = await db.from("services").select("title,short_description,description,image").eq("slug", slug).maybeSingle();
      service = data;
    }
  } catch {}
  const title = `${service?.title || readableName} Services in Nepal`;
  const description = service?.short_description || service?.description?.slice(0, 155) || `Professional ${readableName.toLowerCase()} services from CodeVerse Build in Kathmandu, Nepal.`;
  return {
    title,
    description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: { title, description, url: `/services/${slug}`, images: service?.image ? [service.image] : undefined },
  };
}

export default async function ServiceSlugRoute({ params }) {
  const { slug } = await params;
  let service = null;
  try {
    const supabase = getOptionalDb();
    if (supabase) {
      const { data } = await supabase
        .from("services")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      service = data;
    }
  } catch {}
  if (!service) return notFound();
  return <ServiceDetailPage initialService={service} />;
}
