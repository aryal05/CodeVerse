'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Lightbulb, PenTool, Code2, Rocket, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '01',
    phase: 'Listen',
    title: 'Discovery',
    description: 'We uncover your goals, users, market, and constraints before defining the real problem to solve.',
    outcome: 'Aligned scope',
    accent: '96, 165, 250',
  },
  {
    icon: Lightbulb,
    number: '02',
    phase: 'Plan',
    title: 'Strategy',
    description: 'Insights become a focused roadmap with priorities, milestones, and a clear measure of success.',
    outcome: 'Actionable roadmap',
    accent: '167, 139, 250',
  },
  {
    icon: PenTool,
    number: '03',
    phase: 'Shape',
    title: 'Design',
    description: 'We turn the strategy into intuitive journeys and polished interfaces that feel true to your brand.',
    outcome: 'Validated experience',
    accent: '244, 114, 182',
  },
  {
    icon: Code2,
    number: '04',
    phase: 'Build',
    title: 'Development',
    description: 'Production-ready code brings the experience to life with performance, security, and scale built in.',
    outcome: 'Quality release',
    accent: '251, 146, 60',
  },
  {
    icon: Rocket,
    number: '05',
    phase: 'Grow',
    title: 'Launch & Support',
    description: 'We launch carefully, measure the result, and stay close as your product evolves after release.',
    outcome: 'Long-term momentum',
    accent: '74, 222, 128',
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="process-showcase">
      <div className="process-showcase__glow" aria-hidden="true" />
      <div className="container-custom">
        <div className="process-showcase__header">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45 }}
              className="process-showcase__eyebrow"
            >
              <Sparkles aria-hidden="true" /> Our process
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              From first idea to<br /><em>lasting impact.</em>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="process-showcase__intro"
          >
            <span>01—05</span>
            <p>A transparent, collaborative system that keeps decisions clear and every project moving forward.</p>
          </motion.div>
        </div>

        <div className="process-flow">
          <div className="process-flow__rail" aria-hidden="true">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <ol className="process-flow__steps">
            {steps.map(({ icon: Icon, ...step }, index) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: 34 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.16 + index * 0.09 }}
                className="process-step"
                style={{ '--step-accent': step.accent }}
              >
                <div className="process-step__top">
                  <span className="process-step__number">{step.number}</span>
                  <span className="process-step__phase">{step.phase}</span>
                </div>
                <span className="process-step__icon"><Icon aria-hidden="true" /></span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className="process-step__outcome">
                  <span>Outcome</span>
                  <strong>{step.outcome}</strong>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="process-showcase__promise"
        >
          <span>One clear owner</span><i aria-hidden="true" />
          <span>Weekly progress</span><i aria-hidden="true" />
          <span>Support after launch</span>
        </motion.div>
      </div>
    </section>
  );
}
