'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Check } from 'lucide-react';

const About = () => {
  const [ref, inView] = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                alt="Team collaboration"
                className="rounded-lg"
              />
              <div className="absolute -bottom-6 -right-6 btn-gold text-white px-6 py-4 rounded-lg font-display font-bold">
                🏆 Top Rated Agency 2024
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-gold-500 font-mono text-sm tracking-wider uppercase">WHO WE ARE</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-4 mb-6">
              A Small Team With a Big Vision for Nepal's Digital Future
            </h2>
            <p className="text-platinum-300 mb-8 leading-relaxed">
              Founded by <strong className="text-white">Rajat Aryal</strong>, a full-stack developer with 9 years of experience,
              Site Era is a full-service digital agency specializing in custom web development, mobile applications,
              and end-to-end digital transformation. We work with startups, SMEs, and enterprises across Nepal and internationally.
            </p>

            <div className="space-y-4 mb-8">
              {[
                'Agile development with transparent communication',
                'Built for performance — every millisecond matters',
                'Post-launch support and maintenance included'
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="text-emerald-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-white">{item}</span>
                </div>
              ))}
            </div>

            <Link href="/about">
              <button className="btn-luxury text-white px-8 py-4 rounded-full font-display font-semibold transition-colors">
                Our Story →
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

