'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Code, Smartphone, Palette, ShoppingCart, Database, Sparkles } from 'lucide-react';

const Services = () => {
  const [ref, inView] = useScrollAnimation();

  const services = [
    {
      icon: Code,
      name: 'Web Development',
      slug: 'web-development',
      description: 'Custom web applications built with modern frameworks',
      tags: ['React', 'Next.js', 'Vue.js', 'Laravel', 'Node.js']
    },
    {
      icon: Smartphone,
      name: 'Mobile App Development',
      slug: 'mobile-app-development',
      description: 'Native and cross-platform mobile applications',
      tags: ['React Native', 'Flutter', 'iOS', 'Android']
    },
    {
      icon: Palette,
      name: 'UI/UX Design',
      slug: 'ui-ux-design',
      description: 'Beautiful, user-centered design experiences',
      tags: ['Figma', 'Design Systems', 'Prototyping', 'User Research']
    },
    {
      icon: ShoppingCart,
      name: 'E-Commerce Solutions',
      slug: 'ecommerce',
      description: 'Complete online store solutions',
      tags: ['Shopify', 'WooCommerce', 'Custom Stores', 'Payment Integration']
    },
    {
      icon: Database,
      name: 'API & Backend Development',
      slug: 'api-development',
      description: 'Scalable backend systems and APIs',
      tags: ['REST', 'GraphQL', 'Microservices', 'AWS', 'Firebase']
    },
    {
      icon: Sparkles,
      name: 'Digital Branding',
      slug: 'digital-branding',
      description: 'Complete brand identity and marketing assets',
      tags: ['Logo Design', 'Brand Identity', 'Style Guides', 'Marketing']
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-luxury-50 relative overflow-hidden">
      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <span className="text-[20rem] font-display font-bold text-white">SERVICES</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold-500 font-mono text-sm tracking-wider uppercase">WHAT WE DO</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-4">
            Our Services
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={index} to={`/services/${service.slug}`}>
              <motion.div
                className="card-luxury p-8 rounded-lg transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <service.icon className="text-royal-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-2xl font-display font-semibold text-white mb-3">{service.name}</h3>
                <p className="text-platinum-300 mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-luxury-100 text-platinum-200 px-3 py-1 rounded-full border border-royal-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 text-gold-400 opacity-100 group-hover:text-gold-300 transition-colors inline-flex items-center gap-2 font-display font-semibold">
                  <span>Learn More</span>
                  <span>→</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

