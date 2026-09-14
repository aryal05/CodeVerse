import PortfolioPage from "@/components/pages/PortfolioPage";
import { getProjects } from "@/lib/public-data";

// Revalidate every 60 seconds - balances freshness with fast navigation
export const revalidate = 600;

export const metadata = {
  title: "Web & App Development Portfolio",
  description:
    "Explore websites, mobile apps, and digital products delivered by CodeVerse Build, an IT company based in Kathmandu, Nepal.",
  alternates: { canonical: "/portfolio" },
};

export default async function Portfolio() {
  let result = { projects: [], loadError: null };
  try {
    result.projects = await getProjects();
  } catch {
    result = {
      projects: [],
      loadError: "We could not connect to the project database. Please try again shortly.",
    };
  }
  return <PortfolioPage projects={result.projects} loadError={result.loadError} />;
}
