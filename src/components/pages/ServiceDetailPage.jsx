"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CheckCircle,
  Code,
  Smartphone,
  Palette,
  ShoppingCart,
  Database,
  Sparkles,
} from "lucide-react";
import PremiumPageCTA from "@/components/ui/PremiumPageCTA";
import { useState, useEffect } from "react";

const ServiceDetail = ({ initialService }) => {
  const params = useParams();
  const slug = params?.slug;
  const [service, setService] = useState(initialService || null);
  const [loading, setLoading] = useState(!initialService);

  useEffect(() => {
    // Skip fetch if data was provided server-side
    if (initialService) return;
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${slug}`);
        const data = await res.json();
        setService(data);
      } catch (error) {
        console.error("Failed to fetch service:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchService();
    }
  }, [slug, initialService]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading service...
          </p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Service Not Found
          </h2>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl"
          >
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  // Ensure service has required fields
  const serviceName = service.name || service.title || "Service";
  const serviceDescription = service.description || "";
  const serviceTagline = service.tagline || null;

  const iconMap = {
    Code,
    Smartphone,
    Palette,
    ShoppingCart,
    Database,
    Sparkles,
  };

  // Handle icon - it might be an object or string
  const iconKey = typeof service.icon === "string" ? service.icon : "Code";
  const ServiceIcon = iconMap[iconKey] || iconMap.Code;

  const colors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-pink-500 to-rose-500",
    "from-orange-500 to-red-500",
    "from-cyan-500 to-teal-500",
    "from-emerald-500 to-green-500",
  ];
  const parsedColorIndex = service._id ? parseInt(service._id.slice(-1), 16) : 0;
  const colorIndex = Number.isFinite(parsedColorIndex) ? parsedColorIndex % colors.length : 0;
  const color = service.color || colors[colorIndex];

  return (
    <div className="detail-page detail-page--service min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="detail-hero detail-hero--service">

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Services</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="detail-hero__copy text-center max-w-4xl mx-auto"
          >
            {service.image ? (
              <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden mb-6">
                <Image
                  src={service.image}
                  alt={serviceName}
                  className="w-full h-full object-cover"
                  width={400}
                  height={400}
                  priority
                  unoptimized
                />
              </div>
            ) : (
              <div
                className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6`}
              >
                <ServiceIcon className="text-white" size={40} />
              </div>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {serviceName}
            </h1>
            {serviceTagline && (
              <p className="text-xl text-primary-600 font-medium mb-4">
                {serviceTagline}
              </p>
            )}
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {serviceDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
      {service.features && service.features.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              What&apos;s Included
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {service.features.map((feature, index) => {
                const featureText =
                  typeof feature === "string"
                    ? feature
                    : feature.title || feature.description || String(feature);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
                  >
                    <CheckCircle
                      className="text-primary-500 flex-shrink-0"
                      size={20}
                    />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {featureText}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {service.process && service.process.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Our Process
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {service.process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800"
                >
                  <div
                    className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${color} mb-3`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {step.step}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technologies */}
      {service.technologies && service.technologies.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Technologies We Use
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {service.technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-5 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700 font-medium text-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
      )}

      <PremiumPageCTA
        eyebrow="Turn capability into momentum"
        title={`Ready to invest in ${serviceName}`}
        highlight="that performs?"
        description={`Let's shape a focused ${serviceName.toLowerCase()} engagement around your goals, users, and growth.`}
        primaryLabel="Start your project"
        secondaryLabel="Explore our work"
        secondaryHref="/portfolio"
        accent="167, 139, 250"
      />
    </div>
  );
};

export default ServiceDetail;
