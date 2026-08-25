import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Pricing from "@/components/sections/Pricing";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import { getOptionalDb, safeImageUrl } from "@/lib/api-helpers";

export const revalidate = 60;

async function getHomepageData() {
  const emptyData = {
    projects: [],
    services: [],
    testimonials: [],
    pricing: [],
  };

  try {
    const db = getOptionalDb();
    if (!db) return emptyData;

    const [projectsRes, servicesRes, testimonialsRes, pricingRes] = await Promise.all([
      db
        .from("projects")
        .select("id,title,slug,category,client,description,link,image,created_at")
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

      db
        .from("pricing_plans")
        .select("*")
        .eq("is_active", true)
        .order("order", { ascending: true })
        .limit(3),
    ]);

    if (projectsRes.error) throw projectsRes.error;
    if (servicesRes.error) throw servicesRes.error;
    if (testimonialsRes.error) throw testimonialsRes.error;
    // Don't throw for pricing - it might not exist yet

    const projects = (projectsRes.data || []).map((row) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      image: safeImageUrl(row.image),
      category: row.category,
      client: row.client,
      description: row.description,
      link: row.link,
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

    const pricing = (pricingRes.data || []).map((row) => ({
      ...row,
      features: row.features || [],
      highlighted_features: row.highlighted_features || [],
      not_included: row.not_included || [],
    }));

    return { projects, services, testimonials, pricing };
  } catch {
    return emptyData;
  }
}

export default async function Home() {
  const { projects, services, testimonials, pricing } = await getHomepageData();

  return (
    <>
      <Hero />
      <About />
      <Services services={services} />
      <Portfolio projects={projects} />
      <Pricing plans={pricing} />
      <Process />
      <Testimonials testimonials={testimonials} />
      <CTA />
    </>
  );
}
