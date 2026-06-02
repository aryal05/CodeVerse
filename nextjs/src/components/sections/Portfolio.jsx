'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import api from '../../utils/api';

const Portfolio = () => {
  const [ref, inView] = useScrollAnimation();
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    api.get('/projects?featured=true')
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  const categories = ['all', 'web', 'mobile', 'ecommerce', 'design'];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section ref={ref} className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-gold-500 font-mono text-sm tracking-wider uppercase">OUR WORK</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-4 mb-8">
            Featured Projects
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-display capitalize transition-all ${
                  filter === cat
                    ? 'btn-luxury text-white'
                    : 'bg-luxury-100 text-platinum-200 border border-royal-500/20 hover:border-royal-500/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-display font-bold text-white mb-2">{project.title}</h3>
                <p className="text-platinum-300 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech_stack.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-xs bg-royal-500 text-white px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <Link to={`/portfolio/${project.id}`} className="text-gold-400 hover:text-gold-300 transition-colors font-display font-semibold flex items-center gap-2">
                  <span>View Case Study</span>
                  <span>→</span>
                </Link>
              </div>
              <div className="absolute top-4 left-4 btn-gold text-white px-3 py-1 rounded text-sm font-semibold">
                {project.category}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/portfolio">
            <button className="btn-luxury text-white px-8 py-4 rounded-full font-display font-semibold transition-colors">
              View All Projects →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

