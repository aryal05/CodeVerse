import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Team from '@/components/sections/Team';
import TechStack from '@/components/sections/TechStack';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <About />
      <Services />
      <Portfolio />
      <Process />
      <TechStack />
      <Testimonials />
      <Team />
      <CTA />
    </main>
  );
}
