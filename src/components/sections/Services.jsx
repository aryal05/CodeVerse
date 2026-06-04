'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code2, Smartphone, Palette, ShoppingBag, Server, Rocket, ArrowRight } from 'lucide-react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services?featured=true&limit=6');
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
    'shopping-cart': ShoppingBag,
    'server': Server,
    'rocket': Rocket,
    'database': Server,
    'sparkles': Rocket,
  };

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
    <section id="services" className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold tracking-wider text-primary-600 uppercase">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">Offer</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Comprehensive digital solutions tailored to elevate your business
          </p>
        </motion.div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-8 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-xl mb-6" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              No services available yet. Add some from the admin panel!
            </p>
            <Link href="/services">
              <button className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
                View All Services
              </button>
            </Link>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.slice(0, 6).map((service, index) => {
              const IconComponent = iconMap[service.icon] || Code2;
              const colors = [
                'from-blue-500 to-cyan-500',
                'from-purple-500 to-pink-500',
                'from-pink-500 to-rose-500',
                'from-orange-500 to-red-500',
                'from-cyan-500 to-teal-500',
                'from-emerald-500 to-green-500',
              ];
              const color = colors[index % colors.length];

              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-large transition-all"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {service.short_description || service.description}
                  </p>
                  
                  <Link href={`/services/${service.slug}`}>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-primary-600 font-medium"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* View All Services CTA */}
        {!loading && services.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-16"
          >
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <span>View All Services</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Services;
