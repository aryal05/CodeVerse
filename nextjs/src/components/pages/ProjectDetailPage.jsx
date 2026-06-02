'use client';

import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Calendar, User, Tag, TrendingUp, Zap, Award } from 'lucide-react';
import api from '@/lib/api';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    // Fetch project details
    api.get(`/projects/${id}`)
      .then(res => {
        setProject(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    // Fetch all projects for navigation
    api.get('/projects')
      .then(res => setAllProjects(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-display text-white mb-4">Project Not Found</h2>
          <Link href="/portfolio" className="btn-luxury text-white px-6 py-3 rounded-full inline-block">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = allProjects.findIndex(p => p.id === parseInt(id));
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal-500 rounded-full blur-[150px] opacity-10" />
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Back Button */}
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-platinum-300 hover:text-royal-400 transition-colors mb-8">
            <ArrowLeft size={20} />
            <span>Back to Portfolio</span>
          </Link>

          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="btn-gold text-white px-4 py-2 rounded-full text-sm font-semibold uppercase">
                {project.category}
              </span>
              {project.featured === 1 && (
                <span className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-500/30">
                  Featured Project
                </span>
              )}
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              {project.title}
            </h1>

            <p className="text-xl text-platinum-300 max-w-3xl mb-8">
              {project.description}
            </p>

            {/* Project Meta */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-platinum-400">
                <User size={18} />
                <span>{project.client || 'Confidential Client'}</span>
              </div>
              <div className="flex items-center gap-2 text-platinum-400">
                <Calendar size={18} />
                <span>{new Date(project.created_at).getFullYear()}</span>
              </div>
              <div className="flex items-center gap-2 text-platinum-400">
                <Tag size={18} />
                <span>{project.tech_stack.length} Technologies</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury text-white px-8 py-4 rounded-full font-display font-semibold inline-flex items-center gap-2"
                >
                  <span>View Live Site</span>
                  <ExternalLink size={20} />
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-display font-semibold hover:bg-white hover:text-black transition-all inline-flex items-center gap-2"
                >
                  <Github size={20} />
                  <span>View Code</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-2xl overflow-hidden"
          >
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-[600px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Challenge */}
            <div className="card-luxury p-8 rounded-xl">
              <h3 className="text-2xl font-display font-bold text-white mb-4">The Challenge</h3>
              <p className="text-platinum-300 leading-relaxed">
                {project.challenge || 'Building a modern, scalable solution that meets the client\'s unique requirements while maintaining excellent user experience and performance.'}
              </p>
            </div>

            {/* Solution */}
            <div className="card-luxury p-8 rounded-xl">
              <h3 className="text-2xl font-display font-bold text-white mb-4">Our Solution</h3>
              <p className="text-platinum-300 leading-relaxed">
                {project.solution || 'We developed a custom solution using cutting-edge technologies, focusing on performance, scalability, and user experience to exceed client expectations.'}
              </p>
            </div>

            {/* Results */}
            <div className="card-luxury p-8 rounded-xl">
              <h3 className="text-2xl font-display font-bold text-white mb-4">The Results</h3>
              <p className="text-platinum-300 leading-relaxed">
                {project.results || 'Successfully delivered a high-performance application that improved user engagement, increased conversion rates, and exceeded all project goals.'}
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-16">
            <h3 className="text-3xl font-display font-bold text-white mb-8 text-center">Technologies Used</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {project.tech_stack.map((tech, index) => (
                <span
                  key={index}
                  className="glass-luxury px-6 py-3 rounded-full text-white font-semibold border border-royal-500/20 hover:border-royal-500/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center card-luxury p-8 rounded-xl">
              <TrendingUp className="text-emerald-500 mx-auto mb-4" size={48} />
              <div className="text-4xl font-display font-bold gradient-luxury mb-2">150%</div>
              <div className="text-platinum-400">Traffic Increase</div>
            </div>
            <div className="text-center card-luxury p-8 rounded-xl">
              <Zap className="text-gold-500 mx-auto mb-4" size={48} />
              <div className="text-4xl font-display font-bold gradient-luxury mb-2">2.5s</div>
              <div className="text-platinum-400">Load Time</div>
            </div>
            <div className="text-center card-luxury p-8 rounded-xl">
              <Award className="text-royal-500 mx-auto mb-4" size={48} />
              <div className="text-4xl font-display font-bold gradient-luxury mb-2">98%</div>
              <div className="text-platinum-400">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Navigation */}
      <section className="py-16 border-t border-royal-500/20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {prevProject ? (
              <Link
                href={`/portfolio/${prevProject.id}`}
                className="group flex items-center gap-4 hover:opacity-80 transition-opacity"
              >
                <ArrowLeft className="text-royal-500" size={24} />
                <div>
                  <div className="text-platinum-400 text-sm mb-1">Previous Project</div>
                  <div className="text-white font-display font-semibold group-hover:text-royal-400 transition-colors">
                    {prevProject.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`/portfolio/${nextProject.id}`}
                className="group flex items-center gap-4 hover:opacity-80 transition-opacity text-right"
              >
                <div>
                  <div className="text-platinum-400 text-sm mb-1">Next Project</div>
                  <div className="text-white font-display font-semibold group-hover:text-royal-400 transition-colors">
                    {nextProject.title}
                  </div>
                </div>
                <ArrowRight className="text-royal-500" size={24} />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-luxury-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Start Your <span className="gradient-luxury">Project?</span>
          </h2>
          <p className="text-xl text-platinum-300 mb-8 max-w-2xl mx-auto">
            Let's create something amazing together. Your project could be our next success story!
          </p>
          <Link href="/contact" className="btn-luxury text-white px-10 py-5 rounded-full font-display font-semibold text-lg inline-flex items-center gap-2">
            <span>Get Started</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;

