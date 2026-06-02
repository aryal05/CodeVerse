'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, Sparkles, Zap, Rocket } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import MarqueeStrip from '../ui/MarqueeStrip';
import ParticleBackground from '../ui/ParticleBackground';
import GlitchText from '../ui/GlitchText';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: i * 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Elements */}
      <ParticleBackground />
      
      {/* Animated Grid Background */}
      <motion.div 
        className="absolute inset-0 bg-grid opacity-20" 
        style={{ backgroundSize: '50px 50px', y: y1 }} 
      />

      {/* Enhanced Floating Orbs with Parallax */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-royal-500 rounded-full blur-[150px] opacity-20 animate-float"
        style={{ y: y1 }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold-500 rounded-full blur-[150px] opacity-20 animate-float-delay"
        style={{ y: y2 }}
      />
      <motion.div 
        className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-emerald-500 rounded-full blur-[150px] opacity-15 animate-float"
        style={{ y: y1 }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] bg-royal-600 rounded-full blur-[150px] opacity-10 animate-float-delay"
        style={{ y: y2 }}
      />

      {/* Spotlight Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-60" />

      {/* Content */}
      <motion.div 
        className="container mx-auto px-6 relative z-10 text-center"
        style={{ opacity }}
      >
        {/* Premium Badge */}
        <motion.div
          className="mb-8 inline-flex items-center gap-2 glass-luxury px-6 py-3 rounded-full"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <Sparkles className="text-gold-500" size={16} />
          <span className="text-gold-500 font-mono text-xs tracking-wider uppercase">
            Award-Winning Digital Studio · Est. 2015
          </span>
          <Sparkles className="text-gold-500" size={16} />
        </motion.div>

        {/* Main Heading with Enhanced Typography */}
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white mb-8 leading-[0.9]"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="mb-4">
            <GlitchText>We Don't Just</GlitchText>
          </div>
          <div className="mb-4">
            <GlitchText>Build Websites.</GlitchText>
          </div>
          <div className="relative inline-block">
            <span className="gradient-luxury">We Build Empires.</span>
            <motion.div
              className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-luxury"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            />
          </div>
        </motion.h1>

        {/* Enhanced Subtext */}
        <motion.p
          className="text-xl md:text-2xl text-platinum-300 max-w-4xl mx-auto mb-8 leading-relaxed"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Site Era crafts <span className="text-white font-semibold">high-performance</span> web & mobile experiences that turn
          visitors into customers and startups into <span className="text-royal-400">industry leaders</span>.
        </motion.p>

        {/* Trust Indicators */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 mb-12 text-sm text-platinum-300"
          custom={2.5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="flex items-center gap-2">
            <Zap className="text-gold-500" size={16} />
            <span>9+ Years Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <Rocket className="text-gold-500" size={16} />
            <span>150+ Projects Delivered</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="text-gold-500" size={16} />
            <span>100% Client Satisfaction</span>
          </div>
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <MagneticButton className="group relative btn-luxury text-white px-10 py-5 rounded-full font-display font-semibold text-lg transition-all duration-300 overflow-hidden">
            <Link href="/portfolio" className="relative z-10 flex items-center gap-2">
              <span>View Our Work</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </MagneticButton>
          
          <MagneticButton className="group relative border-2 border-white text-white px-10 py-5 rounded-full font-display font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 overflow-hidden">
            <Link href="/contact" className="relative z-10 flex items-center gap-2">
              <span>Let's Talk</span>
              <Sparkles size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex flex-col items-center gap-2"
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <span className="text-xs text-platinum-400 font-mono uppercase tracking-wider">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="text-royal-500" size={32} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Bottom Marquee */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-gradient-luxury text-black py-5 font-mono text-sm font-bold overflow-hidden"
        custom={5}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <MarqueeStrip text="🚀 WEB DEVELOPMENT · 📱 MOBILE APPS · 🎨 UI/UX DESIGN · 🛒 E-COMMERCE · ⚡ API INTEGRATION · ✨ BRANDING · 💎 DIGITAL TRANSFORMATION · " />
      </motion.div>
    </section>
  );
};

export default Hero;

