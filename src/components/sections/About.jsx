'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Award, Sparkles, Target, Users, Zap } from 'lucide-react';

const stats = [
  { value: '9+', label: 'Years of experience' },
  { value: '15+', label: 'Successful projects' },
  { value: '50+', label: 'Happy clients' },
  { value: '99%', label: 'Client satisfaction' },
];

const principles = [
  { icon: Award, title: 'Quality first', description: 'Craft that holds up beyond launch.', accent: '96, 165, 250' },
  { icon: Users, title: 'Client focused', description: 'Your goals guide every decision.', accent: '167, 139, 250' },
  { icon: Target, title: 'Results driven', description: 'Outcomes matter more than output.', accent: '244, 114, 182' },
  { icon: Zap, title: 'Always evolving', description: 'Modern tools, applied with purpose.', accent: '45, 212, 191' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="home-about">
      <div className="home-about__wash" aria-hidden="true" />
      <div className="container-custom">
        <div className="home-about__layout">
          <div className="home-about__story">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45 }}
              className="home-about__eyebrow"
            >
              <Sparkles aria-hidden="true" /> About CodeVerse
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.58, delay: 0.07 }}
            >
              A focused team for <em>ambitious ideas.</em>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.58, delay: 0.14 }}
              className="home-about__copy"
            >
              <p>Founded in 2015, CodeVerse grew from a small group of passionate developers into a multidisciplinary digital team in Nepal.</p>
              <p>We connect strategic thinking, expressive design, and dependable engineering to create work that delivers real business value.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.22 }}
            >
              <Link href="/about" className="home-about__action">
                Discover our story <ArrowRight aria-hidden="true" />
              </Link>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="home-about__principles"
            aria-label="How CodeVerse works"
          >
            <div className="home-about__principles-head">
              <span>How we show up</span>
              <strong>Principles, not promises.</strong>
            </div>
            <div className="home-about__principles-list">
              {principles.map(({ icon: Icon, ...principle }, index) => (
                <div key={principle.title} className="home-about-principle" style={{ '--principle-accent': principle.accent }}>
                  <span className="home-about-principle__number">0{index + 1}</span>
                  <i><Icon aria-hidden="true" /></i>
                  <div><h3>{principle.title}</h3><p>{principle.description}</p></div>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.32 }}
          className="home-about__stats"
          aria-label="Company highlights"
        >
          {stats.map((stat, index) => (
            <div key={stat.label}><span>0{index + 1}</span><strong>{stat.value}</strong><p>{stat.label}</p></div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
