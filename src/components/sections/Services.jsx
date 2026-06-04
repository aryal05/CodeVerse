'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { 
  Code2, Smartphone, Palette, ShoppingBag, Server, Rocket,
  ArrowRight
} from 'lucide-react';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Code2,
      title: 'Web Development',
      description: 'Custom web applications built with modern frameworks like React, Next.js, and Node.js. Scalable, secure, and performant.',
      features: ['Custom Web Apps', 'API Development', 'CMS Solutions'],
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      link: '/services/web-development'
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications for iOS and Android using React Native and Flutter.',
      features: ['iOS Apps', 'Android Apps', 'Cross-Platform'],
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      link: '/services/mobile-development'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'User-centered design that converts. Research-driven interfaces that users love and businesses trust.',
      features: ['User Research', 'Wireframing', 'Prototyping'],
      color: 'bg-pink-500',
      lightColor: 'bg-pink-50',
      link: '/services/ui-ux-design'
    },
    {
      icon: ShoppingBag,
      title: 'E-Commerce',
      description: 'High-converting online stores with seamless checkout, inventory management, and payment integration.',
      features: ['Shopify', 'WooCommerce', 'Custom Stores'],
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50',
      link: '/services/ecommerce'
    },
    {
      icon: Server,
      title: 'Cloud & DevOps',
      description: 'Scalable cloud infrastructure, CI/CD pipelines, and 24/7 monitoring for reliable operations.',
      features: ['AWS/GCP', 'Docker', 'Kubernetes'],
      color: 'bg-cyan-500',
      lightColor: 'bg-cyan-50',
      link: '/services/cloud-devops'
    },
    {
      icon: Rocket,
      title: 'Digital Strategy',
      description: 'Data-driven growth strategies including SEO, analytics, and performance marketing.',
      features: ['SEO', 'Analytics', 'Marketing'],
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      link: '/services/digital-strategy'
    }
  ];

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-full mb-4"
          >
            <span className="text-sm font-medium text-primary-700">Our Services</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Everything you need to
            <br />
            <span className="text-primary-600">succeed online</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            From concept to launch, we provide end-to-end digital solutions 
            tailored to your business goals.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Link href={service.link}>
                <div className="group h-full bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-large transition-all duration-300">
                  {/* Icon */}
                  <div className={`w-14 h-14 ${service.lightColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon className={`w-7 h-7 ${service.color.replace('bg-', 'text-')}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature, i) => (
                      <span 
                        key={i} 
                        className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <div className="flex items-center gap-2 text-primary-600 font-medium text-sm group-hover:gap-3 transition-all">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
