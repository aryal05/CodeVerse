'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

export const useScrollAnimation = (threshold = 0.2) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: `-${threshold * 100}px` 
  });
  
  return [ref, isInView];
};

export default useScrollAnimation;
