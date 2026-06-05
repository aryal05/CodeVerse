import PortfolioPage from "@/components/pages/PortfolioPage";
import { getDb } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Portfolio - CodeVerse",
  description:
    "Explore our portfolio of successful web and mobile app projects.",
};

export default async function Portfolio() {
  let projects = [];
  try {
    const db = getDb();
    const { data } = await db
      .from("projects")
      .select("*")
      .order("order", { ascending: true })
      .order("created_at", { ascending: false });
    projects = (data || []).map((row) => ({
      ...row,
      _id: row.id,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  } catch {
    projects = [];
  }
  return <PortfolioPage projects={projects} />;
}
