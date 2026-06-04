'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Calendar, CheckCircle } from 'lucide-react';
import AnimatedGrid from '@/components/ui/AnimatedGrid';

const ProjectDetail = () => {
  const params = useParams();
  const id = params?.id;

  // Sample project data
  const project = {
    title: 'FinTech Dashboard',
    category: 'Web App',
    description: 'A comprehensive financial analytics platform with real-time data visualization, AI-powered insights, and portfolio management tools.',
    client: 'FinServe Nepal',
    year: '2024',
    duration: '4 months',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'TailwindCSS', 'Chart.js'],
    features: [
      'Real-time market data integration',
      'AI-powered investment recommendations',
      'Portfolio tracking and analytics',
      'Secure authentication system',
      'Mobile-responsive design',
      'Export reports to PDF/Excel'
    ],
    results: [
      { metric: '40%', label: 'Increase in user engagement' },
      { metric: '2x', label: 'Faster data processing' },
      { metric: '99.9%', label: 'System uptime' }
    ],
    color: 'from-blue-500 to-indigo-600'
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <AnimatedGrid />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-400/20 dark:bg-primary-600/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors mb-8">
            <ArrowLeft size={20} />
            <span>Back to Portfolio</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="text-sm font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full">
              {project.category}
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mt-6 mb-6">
              {project.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-6 text-gray-600 dark:text-gray-400">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-500">Client</span>
                <p className="font-medium text-gray-900 dark:text-white">{project.client}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-500">Year</span>
                <p className="font-medium text-gray-900 dark:text-white">{project.year}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-500">Duration</span>
                <p className="font-medium text-gray-900 dark:text-white">{project.duration}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Image */}
      <section className="py-8">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className={`h-[400px] lg:h-[500px] bg-gradient-to-br ${project.color} rounded-2xl flex items-center justify-center`}
          >
            <span className="text-white/30 text-9xl font-bold">{project.title.charAt(0)}</span>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl"
              >
                <CheckCircle className="text-primary-500 flex-shrink-0" size={20} />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Technologies Used
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {project.technologies.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Results
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {project.results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 mb-2">
                  {result.metric}
                </div>
                <p className="text-gray-600 dark:text-gray-400">{result.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Have a Similar Project?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help bring your vision to life.
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold"
            >
              Start Your Project
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
