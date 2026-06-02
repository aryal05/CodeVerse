'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import MagneticButton from '../ui/MagneticButton';

const CTA = () => {
  const [ref, inView] = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 bg-luxury-50 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-royal-500 rounded-full blur-[120px] opacity-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500 rounded-full blur-[120px] opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Ready to Build Your
            <span className="gradient-luxury"> Digital Empire?</span>
          </h2>
          
          <p className="text-xl text-platinum-300 mb-12">
            Let's turn your vision into reality. Get in touch and let's start building something amazing together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <MagneticButton className="btn-luxury text-white px-10 py-5 rounded-full font-display font-semibold text-lg transition-colors">
              <Link href="/contact">Start Your Project →</Link>
            </MagneticButton>
            
            <MagneticButton className="border-2 border-white text-white px-10 py-5 rounded-full font-display font-semibold text-lg hover:bg-white hover:text-black transition-all">
              <Link href="/portfolio">View Our Work</Link>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

