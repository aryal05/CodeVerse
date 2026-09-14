import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Pricing from "@/components/sections/Pricing";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import { getHomepageData } from "@/lib/public-data";

export const revalidate = 300;

export default async function Home() {
  let data = { projects: [], services: [], testimonials: [], pricing: [] };
  try { data = await getHomepageData(); } catch {}
  const { projects, services, testimonials, pricing } = data;

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
