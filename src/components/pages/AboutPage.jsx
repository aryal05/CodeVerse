'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { 
  Target, Lightbulb, Users, Trophy, ArrowRight, 
  Rocket, Award, Heart, Zap
} from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';

const AboutPage = () => {
  const missionRef = useRef(null);
  const isMissionInView = useInView(missionRef, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'Every pixel serves a purpose. We build with intention, focusing on outcomes that matter.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'We stay ahead of the curve, implementing cutting-edge solutions.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Client-Centric',
      description: 'Your success is our success. We build lasting partnerships.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Trophy,
      title: 'Excellence Always',
      description: 'We never settle for good enough. Every deliverable meets our standards.',
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  const milestones = [
    { year: '2015', title: 'Founded', description: 'Started with a vision to transform digital experiences' },
    { year: '2017', title: 'First Major Client', description: 'Landed our first enterprise client' },
    { year: '2019', title: '50+ Projects', description: 'Reached milestone of 50 successful deliveries' },
    { year: '2021', title: 'Team Expansion', description: 'Grew to a team of 15+ professionals' },
    { year: '2023', title: '100+ Projects', description: 'Celebrated 100+ successful projects' },
    { year: '2024', title: 'Regional Recognition', description: 'Recognized as Nepal\'s top digital agency' },
  ];

  const stats = [
    { value: '150+', label: 'Projects Completed' },
    { value: '50+', label: 'Happy Clients' },
    { value: '9+', label: 'Years Experience' },
    { value: '15+', label: 'Team Members' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageHeader
        badge="About CodeVerse"
        title="We're on a Mission to"
        titleHighlight="Transform Digital Nepal"
        description="Founded in 2015, CodeVerse has grown from a small team of passionate developers into Nepal's leading digital agency. We combine creativity with technology to deliver exceptional digital experiences."
      />

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-large transition-shadow"
              >
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section ref={missionRef} className="py-20 lg:py-28 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="group p-8 lg:p-10 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To empower businesses with innovative digital solutions that drive growth, 
                enhance user experiences, and create lasting impact. We believe in building 
                technology that serves people and solves real problems.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group p-8 lg:p-10 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-800 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To be the most trusted digital partner for businesses in South Asia, 
                known for our innovation, quality, and commitment to client success. 
                We envision a future where every business has access to world-class digital solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 rounded-full mb-4">
              <Heart className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-400">Our Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              What We Stand For
            </h2>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-large transition-all text-center"
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-28 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From humble beginnings to becoming Nepal&apos;s trusted digital partner
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 -translate-x-1/2 hidden md:block" />
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center gap-8 mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="inline-block p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 transition-colors">
                    <span className="text-primary-600 font-bold text-lg">{milestone.year}</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">{milestone.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{milestone.description}</p>
                  </div>
                </div>
                <div className="hidden md:flex w-4 h-4 rounded-full bg-primary-500 flex-shrink-0 relative z-10">
                  <div className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-30" />
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
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
              Ready to Work With Us?
            </h2>
            <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help transform your digital presence and achieve your business goals.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-600 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
