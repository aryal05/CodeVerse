'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const Process = () => {
  const [ref, inView] = useScrollAnimation();

  const steps = [
    { number: '01', title: 'Discovery & Planning', description: 'Deep-dive into your goals, audience, and competition.' },
    { number: '02', title: 'Design & Prototype', description: 'Wireframes, mockups, and interactive Figma prototypes.' },
    { number: '03', title: 'Development', description: 'Agile sprints, clean code, daily progress updates.' },
    { number: '04', title: 'Testing & QA', description: 'Cross-device, cross-browser, performance and security audits.' },
    { number: '05', title: 'Launch', description: 'Deployment, DNS, SSL, CDN setup — we handle everything.' },
    { number: '06', title: 'Support & Growth', description: 'Monthly maintenance, updates, analytics, and scaling.' }
  ];

  return (
    <section ref={ref} className="py-24 bg-luxury-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold-500 font-mono text-sm tracking-wider uppercase">HOW WE WORK</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-4">
            Our Process
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-royal-500/20 hidden md:block" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative mb-12 md:mb-24"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="w-full md:w-5/12 mb-4 md:mb-0">
                  <div className={`${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <h3 className="text-3xl font-display font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-platinum-300">{step.description}</p>
                  </div>
                </div>
                
                <div className="w-16 h-16 btn-gold text-white rounded-full flex items-center justify-center font-display font-bold text-xl z-10 my-4 md:my-0">
                  {step.number}
                </div>
                
                <div className="w-full md:w-5/12" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;

