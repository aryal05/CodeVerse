import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import { getDb, safeImageUrl } from "@/lib/api-helpers";

// ISR: serve from cache, revalidate in background every 60 seconds
export const revalidate = 60;

async function getHomepageData() {
  try {
    const db = getDb();

    const [projectsRes, servicesRes, testimonialsRes] = await Promise.all([
      db
        .from("projects")
        .select("id,title,slug,image,category,client,description,created_at")
        .eq("featured", true)
        .order("order", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(4),

      db
        .from("services")
        .select("id,title,slug,short_description,description,icon")
        .eq("active", true)
        .eq("featured", true)
        .order("order", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(3),

      db
        .from("testimonials")
        .select("id,name,role,company,content,rating")
        .eq("active", true)
        .order("order", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(3),
    ]);

    if (projectsRes.error) throw projectsRes.error;
    if (servicesRes.error) throw servicesRes.error;
    if (testimonialsRes.error) throw testimonialsRes.error;

    const projects = (projectsRes.data || []).map((row) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      image: safeImageUrl(row.image), // strip base64
      category: row.category,
      client: row.client,
      description: row.description,
      createdAt: row.created_at,
      technologies: [],
    }));

    const services = (servicesRes.data || []).map((row) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      short_description: row.short_description,
      description: row.description,
      icon: row.icon,
    }));

    const testimonials = (testimonialsRes.data || []).map((row) => ({
      id: row.id,
      name: row.name,
      role: row.role,
      company: row.company,
      content: row.content,
      rating: row.rating,
    }));

    return { projects, services, testimonials };
  } catch {
    return { projects: [], services: [], testimonials: [] };
  }
}

export default async function Home() {
  const { projects, services, testimonials } = await getHomepageData();

  return (
    <>
      <Hero />
      <About />
      <Services services={services} />
      <Portfolio projects={projects} />
      <Process />
      <Testimonials testimonials={testimonials} />
      <CTA />
    </>
  );
}
