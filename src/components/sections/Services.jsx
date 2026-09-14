"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, Palette, Rocket, Server, ShoppingBag, Smartphone, Sparkles } from "lucide-react";

const iconMap = {
  code: Code2,
  smartphone: Smartphone,
  palette: Palette,
  "shopping-bag": ShoppingBag,
  "shopping-cart": ShoppingBag,
  server: Server,
  rocket: Rocket,
  database: Server,
  sparkles: Rocket,
};

const accents = ["56, 189, 248", "167, 139, 250", "244, 114, 182"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52 } },
};

export default function Services({ services = [] }) {
  const featuredServices = services.slice(0, 3);

  return (
    <section id="services" className="home-services">
      <div className="home-services__glow" aria-hidden="true" />
      <div className="container-custom">
        <motion.header
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.58 }}
          className="home-services__header"
        >
          <div>
            <span className="home-services__eyebrow"><Sparkles aria-hidden="true" /> Our services</span>
            <h2>Built for where your business is <em>going.</em></h2>
          </div>
          <div className="home-services__intro">
            <p>Strategy, design, and technology working together—not as separate handoffs.</p>
            <Link href="/services">View every capability <ArrowRight aria-hidden="true" /></Link>
          </div>
        </motion.header>

        {featuredServices.length === 0 ? (
          <div className="home-services__empty">
            <p>No services available yet.</p>
            <Link href="/services">View all services <ArrowRight aria-hidden="true" /></Link>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="home-services__grid"
          >
            {featuredServices.map((service, index) => {
              const Icon = iconMap[service.icon] || Code2;
              return (
                <motion.article
                  key={service.id || service.slug || index}
                  variants={itemVariants}
                  className={`home-service-card ${index === 0 ? "home-service-card--featured" : ""}`}
                  style={{ "--home-service-accent": accents[index % accents.length] }}
                >
                  <span className="home-service-card__watermark" aria-hidden="true">0{index + 1}</span>
                  <div className="home-service-card__top">
                    <span>Capability / 0{index + 1}</span>
                    <i><Icon aria-hidden="true" /></i>
                  </div>
                  <div className="home-service-card__body">
                    <h3>{service.title}</h3>
                    <p>{service.short_description || service.description}</p>
                  </div>
                  <Link href={`/services/${service.slug}`} className="home-service-card__action" aria-label={`Explore ${service.title}`}>
                    Explore service <ArrowRight aria-hidden="true" />
                  </Link>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
