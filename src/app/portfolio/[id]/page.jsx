import ProjectDetailPage from "@/components/pages/ProjectDetailPage";

export async function generateMetadata({ params }) {
  return {
    title: `Project Details - CodeVerse`,
    description: `View project details and case study.`,
  };
}

async function getProject(id) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/projects/${id}`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function ProjectDetail({ params }) {
  const project = await getProject(params.id);
  return <ProjectDetailPage project={project} />;
}
