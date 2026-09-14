"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock,
  HeadphonesIcon,
  Shield,
  Sparkles,
  Star,
  X,
} from "lucide-react";

const PricingShader = dynamic(() => import("@/components/ui/PricingShader"), {
  ssr: false,
});

const Pricing = ({ plans = [] }) => {
  if (plans.length === 0) return null;

  const declaredFeaturedIndex = plans.findIndex((plan) => plan.is_popular);
  const featuredIndex = declaredFeaturedIndex >= 0
    ? declaredFeaturedIndex
    : Math.min(1, plans.length - 1);

  return (
    <section id="pricing" className="pricing-showcase">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <span className="pricing-eyebrow">
            <Sparkles /> Transparent pricing
          </span>
          <h2 className="pricing-heading">
            Choose the right foundation for your next digital product.
          </h2>
          <p className="pricing-subhead">
            Clear, one-time project pricing with design, development and launch
            support included.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="pricing-reference-grid"
        >
          {plans.map((plan, index) => {
            const featured = index === featuredIndex;

            return (
              <article
                key={plan.id}
                className={`pricing-reference-card ${featured ? "pricing-reference-card--featured" : ""}`}
              >
                {featured && (
                  <div className="pricing-shader-slot" aria-hidden="true">
                    <PricingShader />
                  </div>
                )}
                <div className="pricing-card-ring" aria-hidden="true" />

                <div className="pricing-card-content">
                  <div className="pricing-card-title-row">
                    <h3>{plan.name}</h3>
                    {(plan.badge || featured) && (
                      <span>{plan.badge || "Popular"}</span>
                    )}
                  </div>
                  <p className="pricing-card-tagline">{plan.tagline}</p>

                  <div className="pricing-card-price">
                    <small>NPR</small>
                    <strong>{plan.price_display}</strong>
                  </div>
                  <p className="pricing-card-payment">One-time payment</p>

                  {plan.description && (
                    <p className="pricing-card-description">{plan.description}</p>
                  )}

                  <ul className="pricing-feature-list" role="list">
                    {(plan.features || []).slice(0, 7).map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <Check aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {(plan.features || []).length > 7 && (
                      <li className="pricing-feature-more">
                        + {plan.features.length - 7} more features
                      </li>
                    )}
                  </ul>

                  {plan.not_included?.length > 0 && (
                    <ul className="pricing-feature-list pricing-feature-list--muted" role="list">
                      {plan.not_included.slice(0, 2).map((feature, featureIndex) => (
                        <li key={featureIndex}>
                          <X aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Link
                  href={plan.button_link || "/contact"}
                  className="pricing-card-cta"
                >
                  <span>{plan.button_text || "Get started"}</span>
                  <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </motion.div>

        <div className="pricing-trust-row">
          <span><Shield /> Secure payment</span>
          <span><Clock /> On-time delivery</span>
          <span><HeadphonesIcon /> Dedicated support</span>
          <span><Star /> Quality guaranteed</span>
        </div>

        <div className="pricing-custom-quote">
          <div>
            <span>Need something different?</span>
            <h3>Let&apos;s scope a custom build.</h3>
            <p>We&apos;ll shape the technology, timeline and investment around your requirements.</p>
          </div>
          <Link href="/contact">
            Request a custom quote <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
