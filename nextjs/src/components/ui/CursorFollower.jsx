'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        setCursorVariant('link');
        setCursorText('VIEW');
      } else if (e.target.tagName === 'IMG') {
        setCursorVariant('image');
        setCursorText('DRAG');
      }
    };

    const handleMouseOut = () => {
      setCursorVariant('default');
      setCursorText('');
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      scale: 1,
    },
    link: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 2,
    },
    image: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 2,
    },
  };

  const ringVariants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
    },
  };

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-royal-500 rounded-full pointer-events-none z-[10000] mix-blend-difference"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      
      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-royal-500 rounded-full pointer-events-none z-[10000] mix-blend-difference flex items-center justify-center"
        variants={ringVariants}
        animate="default"
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      >
        {cursorText && (
          <span className="text-[8px] font-mono text-royal-500">{cursorText}</span>
        )}
      </motion.div>
    </>
  );
};

export default CursorFollower;

