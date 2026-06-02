import ServiceDetailPage from '@/components/pages/ServiceDetailPage';

export async function generateMetadata({ params }) {
  return {
    title: `${params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Site Era`,
    description: `Learn more about our ${params.slug.replace(/-/g, ' ')} services.`,
  };
}

export default function ServiceDetail({ params }) {
  return <ServiceDetailPage slug={params.slug} />;
}
