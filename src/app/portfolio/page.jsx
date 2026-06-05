import PortfolioPage from "@/components/pages/PortfolioPage";

export const metadata = {
  title: "Our Portfolio - CodeVerse",
  description:
    "Explore our portfolio of successful web and mobile app projects.",
};

async function getProjects() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/projects`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Portfolio() {
  const projects = await getProjects();
  return <PortfolioPage projects={projects} />;
}
