'use client';

import { motion } from 'framer-motion';

const InfiniteMarquee = ({ items, direction = 'left', speed = 30 }) => {
  const duplicatedItems = [...items, ...items, ...items];
  
  return (
    <div className="relative overflow-hidden py-4">
      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? ['0%', '-33.33%'] : ['-33.33%', '0%']
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-8 py-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-amber-400/20 transition-colors duration-300"
          >
            <span className="text-2xl font-bold text-gray-600 hover:text-amber-400/60 transition-colors">
              {item}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteMarquee;
