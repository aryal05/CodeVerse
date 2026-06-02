'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import api from '@/lib/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
    source: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await api.post('/messages', formData);
      setStatus({ type: 'success', message: 'Message sent successfully! We\'ll contact you within 24 hours.' });
      setFormData({ name: '', email: '', phone: '', service: '', budget: '', message: '', source: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl font-display font-bold text-white mb-6">
              Let's Build Something Amazing Together
            </h1>
            <p className="text-xl text-platinum-300 mb-12">
              Have a project in mind? We'd love to hear about it. Drop us a message and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="text-gold-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-display font-semibold text-white mb-1">Address</h3>
                  <p className="text-platinum-300">Kathmandu, Bagmati Province, Nepal</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="text-gold-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-display font-semibold text-white mb-1">Email</h3>
                  <a href="mailto:hello@siteera.com.np" className="text-platinum-300 hover:text-royal-400 transition-colors">
                    hello@siteera.com.np
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="text-gold-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-display font-semibold text-white mb-1">Phone</h3>
                  <a href="tel:+9779762454572" className="text-platinum-300 hover:text-royal-400 transition-colors">
                    +977-9762454572
                  </a>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="font-display font-semibold text-white mb-2">Working Hours</h3>
                <p className="text-platinum-300">Monday - Friday: 9AM - 6PM NST</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <form onSubmit={handleSubmit} className="glass-luxury p-8 rounded-lg">
              <div className="space-y-6">
                <div>
                  <label className="block text-white mb-2 font-display">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-luxury-100 border border-royal-500/20 rounded-lg px-4 py-3 text-white focus:border-royal-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 font-display">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-luxury-100 border border-royal-500/20 rounded-lg px-4 py-3 text-white focus:border-royal-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 font-display">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-luxury-100 border border-royal-500/20 rounded-lg px-4 py-3 text-white focus:border-royal-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 font-display">Service Interested In</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-luxury-100 border border-royal-500/20 rounded-lg px-4 py-3 text-white focus:border-royal-500 focus:outline-none transition-colors [&>option]:bg-luxury-100 [&>option]:text-white"
                  >
                    <option value="" className="bg-luxury-100 text-platinum-400">Select a service</option>
                    <option value="web" className="bg-luxury-100 text-white">Web Development</option>
                    <option value="mobile" className="bg-luxury-100 text-white">Mobile App Development</option>
                    <option value="design" className="bg-luxury-100 text-white">UI/UX Design</option>
                    <option value="ecommerce" className="bg-luxury-100 text-white">E-Commerce</option>
                    <option value="api" className="bg-luxury-100 text-white">API Development</option>
                    <option value="branding" className="bg-luxury-100 text-white">Digital Branding</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2 font-display">Project Budget (NPR)</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-luxury-100 border border-royal-500/20 rounded-lg px-4 py-3 text-white focus:border-royal-500 focus:outline-none transition-colors [&>option]:bg-luxury-100 [&>option]:text-white"
                  >
                    <option value="" className="bg-luxury-100 text-platinum-400">Select budget range</option>
                    <option value="<50K" className="bg-luxury-100 text-white">&lt; 50,000</option>
                    <option value="50K-200K" className="bg-luxury-100 text-white">50,000 - 200,000</option>
                    <option value="200K-500K" className="bg-luxury-100 text-white">200,000 - 500,000</option>
                    <option value="500K+" className="bg-luxury-100 text-white">500,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2 font-display">Project Description *</label>
                  <textarea
                    required
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-luxury-100 border border-royal-500/20 rounded-lg px-4 py-3 text-white focus:border-royal-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 font-display">How did you hear about us?</label>
                  <input
                    type="text"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full bg-luxury-100 border border-royal-500/20 rounded-lg px-4 py-3 text-white focus:border-royal-500 focus:outline-none transition-colors"
                  />
                </div>

                {status.message && (
                  <div className={`p-4 rounded-lg ${status.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-luxury text-white py-4 rounded-full font-display font-semibold text-lg transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

