'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ExternalLink, Github, Search, Filter, ArrowRight } from 'lucide-react';
import api from '@/lib/api';

const Portfolio = () => {
  const [ref, inView] = useScrollAnimation();
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/projects')
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'web', label: 'Web Apps', count: projects.filter(p => p.category === 'web').length },
    { id: 'mobile', label: 'Mobile Apps', count: projects.filter(p => p.category === 'mobile').length },
    { id: 'ecommerce', label: 'E-Commerce', count: projects.filter(p => p.category === 'ecommerce').length },
    { id: 'design', label: 'Design', count: projects.filter(p => p.category === 'design').length }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal-500 rounded-full blur-[150px] opacity-10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-royal-500 font-mono text-sm tracking-wider uppercase mb-4 block">Our Work</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Projects That <span className="gradient-luxury">Make Impact</span>
            </h1>
            <p className="text-xl text-platinum-300 leading-relaxed mb-8">
              Explore our portfolio of successful projects. Each one tells a story of innovation, collaboration, and results.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-platinum-300" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-luxury-100 border border-royal-500/20 rounded-full pl-12 pr-4 py-4 text-white focus:border-royal-500 focus:outline-none transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-y border-royal-500/20 sticky top-20 bg-black/80 backdrop-blur-xl z-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-platinum-300">
              <Filter size={18} />
              <span className="text-sm font-mono">Filter:</span>
            </div>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-2 rounded-full font-display capitalize transition-all ${
                  filter === cat.id
                    ? 'bg-royal-500 text-black'
                    : 'bg-luxury-100 text-white hover:bg-royal-500 hover:text-black'
                }`}
              >
                {cat.label}
                <span className="ml-2 text-xs opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={ref} className="py-24">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="text-center text-platinum-300">Loading projects...</div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center text-platinum-300">No projects found matching your criteria.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group relative overflow-hidden rounded-xl bg-luxury-100"
                  >
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 bg-royal-500 text-white px-3 py-1 rounded-full text-sm font-semibold uppercase">
                        {project.category}
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <div className="flex gap-4">
                          {project.live_url && (
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="w-12 h-12 bg-royal-500 text-white rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors"
                            >
                              <ExternalLink size={20} />
                            </a>
                          )}
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-platinum-200 transition-colors"
                            >
                              <Github size={20} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-royal-500 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-platinum-300 mb-4 line-clamp-2">{project.description}</p>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech_stack.slice(0, 4).map((tech, i) => (
                          <span key={i} className="text-xs bg-luxury-50 text-white px-3 py-1 rounded-full border border-royal-500/20">
                            {tech}
                          </span>
                        ))}
                        {project.tech_stack.length > 4 && (
                          <span className="text-xs text-platinum-300">+{project.tech_stack.length - 4} more</span>
                        )}
                      </div>

                      {/* View Case Study */}
                      <Link 
                        href={`/portfolio/${project.id}`}
                        className="flex items-center gap-2 text-gold-400 font-display font-semibold group-hover:gap-3 transition-all hover:text-gold-300"
                      >
                        <span>View Case Study</span>
                        <ArrowRight size={18} />
                      </Link>
                    </div>

                    {/* Featured Badge */}
                    {project.featured === 1 && (
                      <div className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                        Featured
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-luxury-50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Want to Be Our <span className="gradient-luxury">Next Success Story?</span>
            </h2>
            <p className="text-xl text-platinum-300 mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Your project could be featured here next!
            </p>
            <Link href="/contact">
              <button className="bg-royal-500 text-black px-10 py-5 rounded-full font-display font-semibold text-lg hover:bg-gold-500 transition-all duration-300 glow-royal inline-flex items-center gap-2 group">
                <span>Start Your Project</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;

