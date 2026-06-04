import ProjectDetailPage from '@/components/pages/ProjectDetailPage';

export async function generateMetadata() {
  return {
    title: `Project Details - Site Era`,
    description: `View project details and case study.`,
  };
}

export default function ProjectDetail() {
  return <ProjectDetailPage />;
}
