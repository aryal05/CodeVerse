"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Code2,
  Smartphone,
  Palette,
  ShoppingBag,
  Server,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import OptimizedImage from "@/components/ui/OptimizedImage";
import PremiumPageCTA from "@/components/ui/PremiumPageCTA";

const ServicesPage = ({ initialServices = null }) => {
  const hasInitialSnapshot = Array.isArray(initialServices);
  const [services, setServices] = useState(initialServices || []);
  const [loading, setLoading] = useState(!hasInitialSnapshot);

  // Fetch services from API (fallback when no initialServices provided)
  useEffect(() => {
    if (hasInitialSnapshot) return;
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [hasInitialSnapshot]);

  // Icon mapping
  const iconMap = {
    code: Code2,
    smartphone: Smartphone,
    palette: Palette,
    "shopping-bag": ShoppingBag,
    server: Server,
    rocket: Rocket,
  };

  const accents = [
    "56, 189, 248",
    "167, 139, 250",
    "244, 114, 182",
    "251, 146, 60",
    "45, 212, 191",
    "74, 222, 128",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageHeader
        badge="Our Services"
        title="Everything You Need to"
        titleHighlight="Succeed Online"
        description="From concept to launch, we provide end-to-end digital solutions tailored to your business goals. Our expert team delivers excellence at every stage."
      />

      <section className="services-catalog">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Loading services...
              </p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No services available yet. Add some from the admin panel!
              </p>
            </div>
          ) : (
            <>
              <div className="services-catalog__meta">
                <span>Capability index</span>
                <strong>
                  {String(services.length).padStart(2, "0")} services
                </strong>
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="services-catalog__grid"
              >
                {services.map((service, index) => {
                  const IconComponent = iconMap[service.icon] || Code2;
                  const accent = accents[index % accents.length];
                  const featuresArray = Array.isArray(service.features)
                    ? service.features
                        .map((feature) =>
                          typeof feature === "string"
                            ? feature
                            : feature.title || feature.description,
                        )
                        .filter(Boolean)
                    : [];

                  return (
                    <motion.article
                      key={service._id || service.id || service.slug || index}
                      variants={itemVariants}
                      className="service-modern-card"
                      style={{ "--service-accent": accent }}
                    >
                      <span
                        className="service-modern-card__watermark"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="service-modern-card__top">
                        <span className="service-modern-card__index">
                          Service / {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="service-modern-card__icon">
                          <IconComponent aria-hidden="true" />
                        </span>
                      </div>

                      {service.image && (
                        <div className="service-modern-card__media">
                          <OptimizedImage
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                            width={900}
                            height={460}
                            loading="lazy"
                            quality="auto"
                          />
                          <span aria-hidden="true" />
                        </div>
                      )}

                      <div className="service-modern-card__body">
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>

                        {(featuresArray.length > 0 ||
                          service.technologies?.length > 0) && (
                          <div className="service-modern-card__details">
                            {featuresArray.length > 0 && (
                              <div>
                                <h4>What&apos;s included</h4>
                                <ul>
                                  {featuresArray
                                    .slice(0, 4)
                                    .map((feature, featureIndex) => (
                                      <li key={featureIndex}>
                                        <CheckCircle2 aria-hidden="true" />
                                        <span>{feature}</span>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            )}
                            {service.technologies?.length > 0 && (
                              <div>
                                <h4>Technology</h4>
                                <div className="service-modern-card__tech">
                                  {service.technologies
                                    .slice(0, 6)
                                    .map((tech, techIndex) => (
                                      <span key={techIndex}>{tech}</span>
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <Link
                        href={`/services/${service.slug}`}
                        className="service-modern-card__action"
                      >
                        Explore this service <ArrowRight aria-hidden="true" />
                      </Link>
                    </motion.article>
                  );
                })}
              </motion.div>
            </>
          )}
        </div>
      </section>

      <PremiumPageCTA
        eyebrow="Find the right solution"
        title="Not sure which service"
        highlight="fits your next move?"
        description="Tell us where you are and where you want to go. We’ll shape the right scope, team, and technical approach around your goals."
        primaryLabel="Get a free quote"
        secondaryLabel="View pricing"
        secondaryHref="/pricing"
        accent="167, 139, 250"
      />
    </div>
  );
};

export default ServicesPage;
