'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Lightbulb, PenTool, Code2, Rocket } from 'lucide-react';

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: Search,
      number: '01',
      title: 'Discovery',
      description: 'We dive deep into understanding your business, goals, target audience, and competition to create a solid foundation.',
      color: 'bg-blue-500'
    },
    {
      icon: Lightbulb,
      number: '02',
      title: 'Strategy',
      description: 'Based on our findings, we develop a comprehensive strategy and roadmap tailored to your specific needs.',
      color: 'bg-purple-500'
    },
    {
      icon: PenTool,
      number: '03',
      title: 'Design',
      description: 'Our designers create intuitive, beautiful interfaces that align with your brand and delight your users.',
      color: 'bg-pink-500'
    },
    {
      icon: Code2,
      number: '04',
      title: 'Development',
      description: 'We build your solution using modern technologies, ensuring scalability, security, and performance.',
      color: 'bg-orange-500'
    },
    {
      icon: Rocket,
      number: '05',
      title: 'Launch & Support',
      description: 'After thorough testing, we deploy your project and provide ongoing support and maintenance.',
      color: 'bg-green-500'
    }
  ];

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-gray-900">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-4"
          >
            <span className="text-sm font-medium text-white">Our Process</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            How We Work
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            A proven methodology that delivers results. Every project follows our 
            refined process to ensure success.
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="relative text-center"
              >
                {/* Icon */}
                <div className="relative inline-flex mb-6">
                  <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-800 border-2 border-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
