import ServiceDetailPage from '@/components/pages/ServiceDetailPage';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || '';
  return {
    title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - CodeVerse`,
    description: `Learn more about our ${slug.replace(/-/g, ' ')} services.`,
  };
}

export default function ServiceDetailPageWrapper() {
  return <ServiceDetailPage />;
}
