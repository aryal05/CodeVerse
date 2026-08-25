import PortfolioPage from "@/components/pages/PortfolioPage";
import { getOptionalDb } from "@/lib/api-helpers";

// Revalidate every 60 seconds - balances freshness with fast navigation
export const revalidate = 60;

export const metadata = {
  title: "Our Portfolio - CodeVerse",
  description:
    "Explore our portfolio of successful web and mobile app projects.",
};

async function getProjects() {
  const db = getOptionalDb();
  if (!db) {
    return {
      projects: [],
      loadError: "The project database is not configured.",
    };
  }

  // Optimized query: Fetch image URLs directly (Cloudinary only, no base64)
  const { data, error } = await db
    .from("projects")
    .select(
      'id, title, slug, description, category, technologies, client, link, image, created_at, featured, status, "order"',
    )
    .order("order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    return {
      projects: [],
      loadError: "We could not connect to the project database. Please try again shortly.",
    };
  }
  
  if (!data || data.length === 0) {
    return { projects: [], loadError: null };
  }

  // Filter and process: Only include Cloudinary URLs (skip base64)
  const projects = data.map((row) => {
    let imageUrl = null;
    
    // Only include Cloudinary URLs for fast loading
    if (row.image && typeof row.image === 'string') {
      if (row.image.includes('cloudinary.com') || row.image.startsWith('http')) {
        // Valid URL - use it
        imageUrl = row.image;
      }
      // Skip base64 images entirely - they'll show gradient placeholder
    }

    return {
      ...row,
      _id: row.id,
      createdAt: row.created_at,
      image: imageUrl, // Cloudinary URL or null (gradient)
    };
  });

  return { projects, loadError: null };
}

export default async function Portfolio() {
  let result;
  try {
    result = await getProjects();
  } catch {
    result = {
      projects: [],
      loadError: "We could not connect to the project database. Please try again shortly.",
    };
  }
  return <PortfolioPage projects={result.projects} loadError={result.loadError} />;
}
