import { getService, getServices } from "@/lib/public-data";
import ServiceDetailPage from "@/components/pages/ServiceDetailPage";
import { notFound } from "next/navigation";

export const revalidate = 600;

export async function generateStaticParams() {
  try {
    const services = await getServices();
    return services.filter((service) => service.slug).map((service) => ({ slug: service.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const readableName = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  let service = null;
  try {
    service = await getService(slug);
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
    service = await getService(slug);
  } catch {}
  if (!service) return notFound();
  return <ServiceDetailPage initialService={service} />;
}
