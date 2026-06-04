'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Web App', 'Mobile', 'E-Commerce', 'Branding'];

  const projects = [
    {
      title: 'FinTech Dashboard',
      category: 'Web App',
      description: 'Real-time financial analytics platform with AI-powered insights for investment firms.',
      tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'TailwindCSS'],
      color: 'from-blue-500 to-indigo-600',
      client: 'FinServe Nepal',
      year: '2024'
    },
    {
      title: 'EcoStore Nepal',
      category: 'E-Commerce',
      description: 'Sustainable e-commerce platform with 40% increase in conversion rate.',
      tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      color: 'from-green-500 to-emerald-600',
      client: 'EcoStore',
      year: '2024'
    },
    {
      title: 'MedCare App',
      category: 'Mobile',
      description: 'Healthcare management app serving 10,000+ patients across Nepal.',
      tags: ['React Native', 'Firebase', 'Node.js'],
      color: 'from-purple-500 to-violet-600',
      client: 'MedCare Nepal',
      year: '2023'
    },
    {
      title: 'PropertyHub',
      category: 'Web App',
      description: 'Real estate platform with virtual tours and advanced property search.',
      tags: ['Next.js', 'Three.js', 'Prisma', 'PostgreSQL'],
      color: 'from-orange-500 to-red-600',
      client: 'PropertyHub',
      year: '2023'
    },
    {
      title: 'TravelNepal',
      category: 'Mobile',
      description: 'Travel booking app with offline maps and local guide features.',
      tags: ['Flutter', 'Firebase', 'Google Maps'],
      color: 'from-cyan-500 to-blue-600',
      client: 'TravelNepal',
      year: '2023'
    },
    {
      title: 'FoodieApp',
      category: 'Mobile',
      description: 'Food delivery app with real-time tracking and restaurant management.',
      tags: ['React Native', 'Node.js', 'Socket.io'],
      color: 'from-pink-500 to-rose-600',
      client: 'FoodieApp',
      year: '2022'
    },
    {
      title: 'EduLearn Platform',
      category: 'Web App',
      description: 'Online learning platform with live classes and progress tracking.',
      tags: ['Next.js', 'WebRTC', 'PostgreSQL'],
      color: 'from-amber-500 to-orange-600',
      client: 'EduLearn',
      year: '2022'
    },
    {
      title: 'Brand Identity - TechCorp',
      category: 'Branding',
      description: 'Complete brand identity design including logo, guidelines, and collateral.',
      tags: ['Figma', 'Illustrator', 'Brand Strategy'],
      color: 'from-gray-600 to-gray-800',
      client: 'TechCorp Nepal',
      year: '2022'
    },
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

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
        badge="Our Portfolio"
        title="Projects That"
        titleHighlight="Speak for Themselves"
        description="Explore our collection of successful projects. Each one represents our commitment to excellence and our clients' trust in our capabilities."
      />

      {/* Filters */}
      <section className="py-8 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 sticky top-18 z-30 backdrop-blur-md bg-white/90 dark:bg-gray-950/90">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all ${
                  activeFilter === filter
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/portfolio/${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-large transition-all h-full">
                      {/* Project Image */}
                      <div className={`h-56 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white/20 text-8xl font-bold">{project.title.charAt(0)}</span>
                        </div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <motion.div 
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1.1 }}
                            className="w-14 h-14 bg-white rounded-full flex items-center justify-center"
                          >
                            <ArrowUpRight className="w-6 h-6 text-gray-900" />
                          </motion.div>
                        </div>

                        {/* Year Badge */}
                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                          {project.year}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/30 px-2.5 py-1 rounded-full">
                            {project.category}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {project.client}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg">
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
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
              Have a Project in Mind?
            </h2>
            <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
              Let&apos;s create something amazing together. Share your vision and we&apos;ll bring it to life.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-600 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <span>Start Your Project</span>
                <ExternalLink className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
