'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const testimonials = [
    {
      quote: "Site Era transformed our online presence completely. Their attention to detail and understanding of our business needs was exceptional. The results exceeded our expectations and our sales increased by 40%.",
      author: "Rajesh Sharma",
      role: "CEO",
      company: "TechVentures Nepal",
      rating: 5,
      image: "/testimonials/rajesh.jpg"
    },
    {
      quote: "Working with Site Era was a game-changer for our e-commerce business. They delivered a platform that not only looks beautiful but converts visitors into customers. Highly recommended!",
      author: "Priya Thapa",
      role: "Founder",
      company: "EcoStore Nepal",
      rating: 5,
      image: "/testimonials/priya.jpg"
    },
    {
      quote: "The team's professionalism and technical expertise are unmatched. They delivered our healthcare app on time and the user feedback has been overwhelmingly positive. A truly reliable partner.",
      author: "Dr. Anil Joshi",
      role: "Director",
      company: "MedCare Nepal",
      rating: 5,
      image: "/testimonials/anil.jpg"
    }
  ];

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-full mb-4"
          >
            <span className="text-sm font-medium text-primary-700">Testimonials</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
          >
            What Our Clients Say
          </motion.h2>
        </div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 lg:p-12 relative border border-gray-100 dark:border-gray-800">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 lg:top-12 lg:left-12">
              <Quote className="w-12 h-12 text-primary-200" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="pt-8"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {testimonials[current].author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonials[current].author}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                      {testimonials[current].role}, {testimonials[current].company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-200">
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === current 
                        ? 'w-8 bg-primary-600' 
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              {/* Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary-600 hover:text-primary-600 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary-600 hover:text-primary-600 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm mb-6">Trusted by leading companies</p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 opacity-50">
            {['TechVentures', 'EcoStore', 'MedCare', 'PropertyHub', 'FinServe'].map((company, i) => (
              <span key={i} className="text-xl font-semibold text-gray-400">
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
