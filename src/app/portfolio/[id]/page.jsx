import ProjectDetailPage from "@/components/pages/ProjectDetailPage";
import { getOptionalDb, isUuid } from "@/lib/api-helpers";
import { notFound } from "next/navigation";

// Revalidate every 60 seconds for fast repeat visits
export const revalidate = 60;

// Select only necessary columns to avoid large base64 payloads
const PROJECT_COLUMNS = `
  id,
  title,
  slug,
  description,
  full_description,
  category,
  image,
  gallery,
  technologies,
  client,
  duration,
  link,
  github,
  featured,
  status,
  "order",
  meta_title,
  meta_description,
  created_at,
  updated_at
`;

async function getProject(id) {
  try {
    const db = getOptionalDb();
    if (!db) return null;
    const query = isUuid(id)
      ? db.from("projects").select(PROJECT_COLUMNS).eq("id", id)
      : db.from("projects").select(PROJECT_COLUMNS).eq("slug", id);
    const { data } = await query.maybeSingle();
    if (data) {
      return {
        ...data,
        _id: data.id,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        fullDescription: data.full_description,
      };
    }
  } catch {}
  return null;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = await getProject(id);
  return {
    title: project?.title ? `${project.title} - CodeVerse` : "Project Details - CodeVerse",
    description: project?.description || "View project details and case study.",
  };
}

export default async function ProjectDetail({ params }) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();
  return <ProjectDetailPage project={project} />;
}
