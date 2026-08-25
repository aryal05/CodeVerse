"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Check,
  X,
  Sparkles,
  Zap,
  Crown,
  Package,
  ArrowRight,
  Star,
  Shield,
  Clock,
  HeadphonesIcon,
} from "lucide-react";

const Pricing = ({ plans = [] }) => {
  const [hoveredPlan, setHoveredPlan] = useState(null);

  if (plans.length === 0) return null;

  // Icon mapping for plans
  const iconMap = {
    package: Package,
    zap: Zap,
    crown: Crown,
    sparkles: Sparkles,
    star: Star,
    shield: Shield,
  };

  // Gradient mapping
  const gradientMap = {
    "blue-500": "from-blue-500",
    "cyan-500": "to-cyan-500",
    "purple-500": "from-purple-500",
    "pink-500": "to-pink-500",
    "orange-500": "from-orange-500",
    "red-500": "to-red-500",
    "green-500": "from-green-500",
    "emerald-500": "to-emerald-500",
  };

  // Badge color mapping
  const badgeColorMap = {
    primary: "bg-primary-500 text-white",
    green: "bg-green-500 text-white",
    purple: "bg-purple-500 text-white",
    orange: "bg-orange-500 text-white",
    blue: "bg-blue-500 text-white",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-64 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Transparent Pricing
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
              Perfect Plan
            </span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400">
            Flexible pricing options designed to match your project requirements and budget.
            All plans include our commitment to quality and timely delivery.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan) => {
            const IconComponent = iconMap[plan.icon] || Package;
            const isHovered = hoveredPlan === plan.id;
            const gradientFrom = gradientMap[plan.gradient_from] || "from-blue-500";
            const gradientTo = gradientMap[plan.gradient_to] || "to-cyan-500";

            return (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative group ${plan.is_popular ? "lg:-mt-4 lg:mb-4" : ""}`}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 ${
                      badgeColorMap[plan.badge_color] || badgeColorMap.primary
                    } rounded-full text-sm font-semibold shadow-lg z-10`}
                  >
                    {plan.badge}
                  </motion.div>
                )}

                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`h-full bg-white dark:bg-gray-900 rounded-3xl border-2 transition-all duration-300 overflow-hidden ${
                    plan.is_popular
                      ? "border-primary-500 shadow-2xl shadow-primary-500/20"
                      : "border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-xl"
                  }`}
                >
                  {/* Gradient Header */}
                  <div
                    className={`h-2 bg-gradient-to-r ${gradientFrom} ${gradientTo}`}
                  />

                  <div className="p-8">
                    {/* Plan Icon & Name */}
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center shadow-lg`}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {plan.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {plan.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">NPR</span>
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          {plan.price_display}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        One-time payment
                      </p>
                    </div>

                    {/* Description */}
                    {plan.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2">
                        {plan.description}
                      </p>
                    )}

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        What&apos;s included:
                      </p>
                      <ul className="space-y-3">
                        {(plan.features || []).slice(0, 6).map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-start gap-3"
                          >
                            <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                        {(plan.features || []).length > 6 && (
                          <li className="text-sm text-primary-600 dark:text-primary-400 font-medium pl-8">
                            + {plan.features.length - 6} more features
                          </li>
                        )}
                      </ul>

                      {/* Not Included */}
                      {plan.not_included && plan.not_included.length > 0 && (
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                          <ul className="space-y-2">
                            {plan.not_included.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <X className="w-3 h-3 text-gray-400" />
                                </div>
                                <span className="text-sm text-gray-400 dark:text-gray-500">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Link href={plan.button_link || "/contact"}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                          plan.is_popular
                            ? "bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-600/25"
                            : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                        }`}
                      >
                        {plan.button_text || "Get Started"}
                        <motion.span
                          animate={{ x: isHovered ? 4 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.span>
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-gray-500 dark:text-gray-400"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="text-sm">100% Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="text-sm">On-Time Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <HeadphonesIcon className="w-5 h-5 text-purple-500" />
            <span className="text-sm">Dedicated Support</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-sm">Quality Guaranteed</span>
          </div>
        </motion.div>

        {/* Custom Project CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Have a unique project in mind?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              We love tackling complex challenges. Get in touch for a custom quote
              tailored to your specific requirements.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
