import PortfolioPage from "@/components/pages/PortfolioPage";
import { getDb, safeImageUrl } from "@/lib/api-helpers";

// force-dynamic prevents ISR snapshot generation.
// ISR was failing because base64 images stored in DB made the snapshot > 43 MB.
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
      // Exclude gallery (may contain many base64 images) from the list view.
      // The detail page fetches gallery separately when the user opens a project.
      .select(
        'id, title, slug, description, category, image, technologies, client, created_at, featured, status, "order"',
      )
      .order("order", { ascending: true })
      .order("created_at", { ascending: false });

    projects = (data || []).map((row) => ({
      ...row,
      _id: row.id,
      createdAt: row.created_at,
      // Replace base64 images with null - gradient placeholder shows instead.
      // Base64 strings are 2-10 MB each and make the page payload enormous.
      image: safeImageUrl(row.image),
    }));
  } catch {
    projects = [];
  }
  return <PortfolioPage projects={projects} />;
}
