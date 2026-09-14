'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CalendarCheck, Mail, MapPin, Phone, Sparkles } from 'lucide-react';

const nextSteps = [
  ['01', 'Share the idea', 'Tell us what you want to build and why it matters.'],
  ['02', 'Get a clear plan', 'We return with scope, timing, and the right approach.'],
  ['03', 'Build with confidence', 'One focused team takes it from concept to launch.'],
];

const contactItems = [
  { icon: Mail, value: 'codeversebuild@gmail.com', href: 'mailto:codeversebuild@gmail.com' },
  { icon: Phone, value: '+977 976-245-4572', href: 'tel:+9779762454572' },
  { icon: Phone, value: '+977 982-855-6757', href: 'tel:+9779828556757' },
  { icon: MapPin, value: 'Kathmandu, Nepal' },
];

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="conversion-stage">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="conversion-panel"
        >
          <div className="conversion-panel__grid" aria-hidden="true" />
          <div className="conversion-panel__beam" aria-hidden="true" />
          <div className="conversion-panel__orb conversion-panel__orb--one" aria-hidden="true" />
          <div className="conversion-panel__orb conversion-panel__orb--two" aria-hidden="true" />

          <div className="conversion-panel__main">
            <div className="conversion-panel__copy">
              <span className="conversion-panel__eyebrow">
                <Sparkles aria-hidden="true" /> Your next chapter
              </span>
              <h2>Turn your next idea into <em>something real.</em></h2>
              <p>
                Bring us the ambition. We&apos;ll bring the clarity, design craft,
                and engineering needed to move it forward.
              </p>
              <div className="conversion-panel__actions">
                <Link href="/contact" className="conversion-panel__primary">
                  Start a conversation <ArrowRight aria-hidden="true" />
                </Link>
                <Link href="/portfolio" className="conversion-panel__secondary">
                  Explore our work <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </div>

            <motion.aside
              initial={{ opacity: 0, x: 24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="conversion-brief"
              aria-label="What happens next"
            >
              <div className="conversion-brief__header">
                <div>
                  <span>Simple start</span>
                  <h3>What happens next</h3>
                </div>
                <CalendarCheck aria-hidden="true" />
              </div>
              <ol>
                {nextSteps.map(([number, title, description]) => (
                  <li key={number}>
                    <span>{number}</span>
                    <div><strong>{title}</strong><p>{description}</p></div>
                  </li>
                ))}
              </ol>
              <div className="conversion-brief__availability">
                <i aria-hidden="true" /> Free discovery call · No obligation
              </div>
            </motion.aside>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="conversion-panel__contact"
          >
            {contactItems.map(({ icon: Icon, value, href }) => {
              const content = <><Icon aria-hidden="true" /><span>{value}</span></>;
              return href ? <a key={value} href={href}>{content}</a> : <div key={value}>{content}</div>;
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
