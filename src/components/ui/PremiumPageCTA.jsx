'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Sparkles } from 'lucide-react';

export default function PremiumPageCTA({
  eyebrow,
  title,
  highlight,
  description,
  primaryLabel,
  secondaryLabel,
  secondaryHref,
  accent = '96, 165, 250',
}) {
  return (
    <section className="page-closing-cta" style={{ '--closing-accent': accent }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="page-closing-cta__panel"
        >
          <span className="page-closing-cta__watermark" aria-hidden="true">Let&apos;s talk</span>
          <div className="page-closing-cta__glow" aria-hidden="true" />

          <div className="page-closing-cta__content">
            <div className="page-closing-cta__copy">
              <span className="page-closing-cta__eyebrow"><Sparkles aria-hidden="true" /> {eyebrow}</span>
              <h2>{title} <em>{highlight}</em></h2>
              <p>{description}</p>
            </div>

            <div className="page-closing-cta__actions">
              <Link href="/contact" className="page-closing-cta__primary">
                {primaryLabel} <ArrowRight aria-hidden="true" />
              </Link>
              <Link href={secondaryHref} className="page-closing-cta__secondary">
                {secondaryLabel} <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="page-closing-cta__proof">
            {['Free consultation', 'Clear proposal', 'No obligation'].map((item) => (
              <span key={item}><i><Check aria-hidden="true" /></i>{item}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
