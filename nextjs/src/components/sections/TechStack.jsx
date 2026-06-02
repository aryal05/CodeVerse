'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const TechStack = () => {
  const [ref, inView] = useScrollAnimation();

  const row1 = ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Firebase', 'AWS'];
  const row2 = ['React Native', 'Flutter', 'Figma', 'Tailwind', 'TypeScript', 'Docker', 'Git', 'Vercel'];

  return (
    <section ref={ref} className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="text-center">
          <span className="text-gold-500 font-mono text-sm tracking-wider uppercase">TECHNOLOGIES</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-4 mb-4">
            Our Arsenal
          </h2>
          <p className="text-platinum-300">The tools that power world-class products</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="overflow-hidden">
          <motion.div
            className="flex space-x-8"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            {[...row1, ...row1].map((tech, index) => (
              <div
                key={index}
                className="flex-shrink-0 glass-luxury px-8 py-6 rounded-lg hover:border-royal-500/50 transition-all group"
              >
                <span className="text-xl font-display font-semibold text-white group-hover:text-royal-400 transition-colors">
                  {tech}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="overflow-hidden">
          <motion.div
            className="flex space-x-8"
            animate={{ x: [-1000, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            {[...row2, ...row2].map((tech, index) => (
              <div
                key={index}
                className="flex-shrink-0 glass-luxury px-8 py-6 rounded-lg hover:border-royal-500/50 transition-all group"
              >
                <span className="text-xl font-display font-semibold text-white group-hover:text-royal-400 transition-colors">
                  {tech}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;

