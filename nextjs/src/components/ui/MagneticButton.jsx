'use client';

import { motion } from 'framer-motion';
import { useMagnetic } from '../../hooks/useMagnetic';

const MagneticButton = ({ children, className = '', ...props }) => {
  const { ref, position, handleMouseMove, handleMouseLeave } = useMagnetic(0.3);

  return (
    <motion.button
      ref={ref}
      className={`magnetic-button ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;

