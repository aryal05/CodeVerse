import ProjectDetailPage from "@/components/pages/ProjectDetailPage";
import { getProject, getProjects } from "@/lib/public-data";
import { notFound } from "next/navigation";

// Revalidate every 60 seconds for fast repeat visits
export const revalidate = 600;

export async function generateStaticParams() {
  try {
    const projects = await getProjects();
    return projects.filter((project) => project.slug).map((project) => ({ id: project.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  let project = null;
  try { project = await getProject(id); } catch {}
  const title = project?.meta_title || (project?.title ? `${project.title} Case Study` : "Digital Project Case Study");
  const description = project?.meta_description || project?.description || "View a CodeVerse Build web or mobile development project from Nepal.";
  const canonicalId = project?.slug || id;
  return {
    title,
    description,
    alternates: { canonical: `/portfolio/${canonicalId}` },
    openGraph: { title, description, url: `/portfolio/${canonicalId}`, images: project?.image ? [project.image] : undefined, type: "article" },
  };
}

export default async function ProjectDetail({ params }) {
  const { id } = await params;
  let project = null;
  try { project = await getProject(id); } catch {}
  if (!project) notFound();
  return <ProjectDetailPage project={project} />;
}
