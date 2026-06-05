import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

async function getFeaturedProjects() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/projects?featured=true&limit=6`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio projects={featuredProjects} />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}
