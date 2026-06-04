'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100]"
        style={{ 
          scaleX,
          background: 'linear-gradient(90deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%)'
        }}
      />
      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[6px] origin-left z-[99] blur-sm opacity-60"
        style={{ 
          scaleX,
          background: 'linear-gradient(90deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%)'
        }}
      />
    </>
  );
};

export default ScrollProgress;
