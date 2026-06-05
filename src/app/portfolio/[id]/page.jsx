import ProjectDetailPage from "@/components/pages/ProjectDetailPage";
import { getDb } from "@/lib/api-helpers";
import { notFound } from "next/navigation";

export const revalidate = 120;

export async function generateMetadata({ params }) {
  const { id } = await params;
  let title = "Project Details - CodeVerse";
  try {
    const db = getDb();
    const { data } = await db
      .from("projects")
      .select("title, description")
      .or(`id.eq.${id},slug.eq.${id}`)
      .maybeSingle();
    if (data?.title) title = `${data.title} - CodeVerse`;
  } catch {}
  return { title, description: "View project details and case study." };
}

export default async function ProjectDetail({ params }) {
  const { id } = await params;
  let project = null;
  try {
    const db = getDb();
    const { data } = await db
      .from("projects")
      .select("*")
      .or(`id.eq.${id},slug.eq.${id}`)
      .maybeSingle();
    if (data) {
      project = {
        ...data,
        _id: data.id,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        fullDescription: data.full_description,
      };
    }
  } catch {}
  if (!project) notFound();
  return <ProjectDetailPage project={project} />;
}
