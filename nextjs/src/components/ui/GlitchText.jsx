'use client';

import { useEffect, useState } from 'react';

const GlitchText = ({ children, className = '' }) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, Math.random() * 4000 + 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className={glitch ? 'animate-glitch' : ''}>{children}</span>
      {glitch && (
        <>
          <span
            className="absolute top-0 left-0 text-royal-500 opacity-80"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
              transform: 'translate(-2px, -2px)',
            }}
          >
            {children}
          </span>
          <span
            className="absolute top-0 left-0 text-gold-500 opacity-80"
            style={{
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
              transform: 'translate(2px, 2px)',
            }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
};

export default GlitchText;

