'use client';

import { motion } from 'framer-motion';
import CounterAnimation from '../ui/CounterAnimation';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const Stats = () => {
  const [ref, inView] = useScrollAnimation(0.3);

  const stats = [
    { number: 9, suffix: '+', label: 'Years of Experience' },
    { number: 150, suffix: '+', label: 'Projects Delivered' },
    { number: 50, suffix: '+', label: 'Happy Clients' },
    { number: 100, suffix: '%', label: 'On-Time Delivery' },
  ];

  return (
    <section ref={ref} className="py-20 bg-luxury-50 border-y border-royal-500/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-5xl md:text-6xl font-display font-bold gradient-luxury mb-2">
                {inView && <CounterAnimation end={stat.number} suffix={stat.suffix} />}
              </div>
              <div className="text-platinum-400 font-body">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

