import ServiceDetailPage from '@/components/pages/ServiceDetailPage';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || '';
  return {
    title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Site Era`,
    description: `Learn more about our ${slug.replace(/-/g, ' ')} services.`,
  };
}

export default async function ServiceDetail({ params }) {
  const resolvedParams = await params;
  return <ServiceDetailPage slug={resolvedParams?.slug} />;
}
