'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Code2, Smartphone, Palette, ShoppingBag, Server, Rocket,
  ArrowRight, CheckCircle2
} from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch services:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Icon mapping
  const iconMap = {
    'code': Code2,
    'smartphone': Smartphone,
    'palette': Palette,
    'shopping-bag': ShoppingBag,
    'server': Server,
    'rocket': Rocket,
  };

  // Color mapping based on index
  const colors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-pink-500 to-rose-500',
    'from-orange-500 to-red-500',
    'from-cyan-500 to-teal-500',
    'from-emerald-500 to-green-500',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageHeader
        badge="Our Services"
        title="Everything You Need to"
        titleHighlight="Succeed Online"
        description="From concept to launch, we provide end-to-end digital solutions tailored to your business goals. Our expert team delivers excellence at every stage."
      />

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No services available yet. Add some from the admin panel!</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {services.map((service, index) => {
                const IconComponent = iconMap[service.icon] || Code2;
                const color = colors[index % colors.length];
                const featuresArray = Array.isArray(service.features) 
                  ? service.features.map(f => typeof f === 'string' ? f : f.title || f.description)
                  : [];

                return (
                  <motion.div
                    key={service._id || index}
                    variants={itemVariants}
                    className="group"
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-large transition-all overflow-hidden">
                      <div className="grid lg:grid-cols-3 gap-8 p-8 lg:p-10">
                        {/* Left - Icon & Title */}
                        <div>
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                            {service.description}
                          </p>
                          <Link href={`/services/${service.slug}`}>
                            <motion.button
                              whileHover={{ x: 5 }}
                              className="inline-flex items-center gap-2 text-primary-600 font-medium"
                            >
                              Learn More <ArrowRight className="w-4 h-4" />
                            </motion.button>
                          </Link>
                        </div>

                        {/* Middle - Features */}
                        {featuresArray.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                              What&apos;s Included
                            </h4>
                            <ul className="space-y-3">
                              {featuresArray.slice(0, 6).map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                  <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0" />
                                  <span className="text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Right - Technologies */}
                        {service.technologies && service.technologies.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                              Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {service.technologies.map((tech, i) => (
                                <span 
                                  key={i}
                                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-primary-600">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
              Let&apos;s discuss your project and find the perfect solution for your business needs.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-600 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
