import { createClient } from "@/lib/supabase";
import ServiceDetailPage from "@/components/pages/ServiceDetailPage";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} - CodeVerse`,
    description: `Learn more about our ${slug.replace(/-/g, " ")} services.`,
  };
}

export default async function ServiceSlugRoute({ params }) {
  const { slug } = await params;
  let service = null;
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    service = data;
  } catch (e) {}
  if (!service) return notFound();
  return <ServiceDetailPage initialService={service} />;
}
