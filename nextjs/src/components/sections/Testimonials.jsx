'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Star, Quote } from 'lucide-react';
import api from '../../utils/api';

const Testimonials = () => {
  const [ref, inView] = useScrollAnimation();
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    api.get('/testimonials?active=true')
      .then(res => setTestimonials(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (testimonials.length === 0) return null;

  return (
    <section ref={ref} className="py-24 bg-luxury-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold-500 font-mono text-sm tracking-wider uppercase">TESTIMONIALS</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-4">
            What Our Clients Say
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-luxury p-12 rounded-lg text-center"
            >
              <Quote className="text-gold-500 mx-auto mb-6" size={48} />
              
              <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
                "{testimonials[current].quote}"
              </p>

              <div className="flex justify-center mb-4">
                {[...Array(testimonials[current].stars)].map((_, i) => (
                  <Star key={i} className="text-gold-500 fill-gold-500" size={20} />
                ))}
              </div>

              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[current].avatar_url}
                  alt={testimonials[current].name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="text-left">
                  <div className="font-display font-semibold text-white">
                    {testimonials[current].name}
                  </div>
                  <div className="text-platinum-300 text-sm">
                    {testimonials[current].title} · {testimonials[current].company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === current ? 'bg-royal-500 w-8' : 'bg-luxury-100'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

