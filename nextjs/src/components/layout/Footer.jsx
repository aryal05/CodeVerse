'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subError, setSubError] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 5000);
      } else {
        throw new Error('Failed');
      }
    } catch (err) {
      setSubError('Failed to subscribe. Try again.');
      setTimeout(() => setSubError(''), 3000);
    }
  };

  return (
    <footer className="bg-black border-t border-indigo-500/20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-display font-bold mb-4">
              <span className="gradient-royal">SITE</span>
              <span className="text-white"> ERA</span>
            </div>
            <p className="text-gray-400 mb-6">
              Kathmandu&apos;s Premier Digital Studio. Building digital empires since 2015.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/siteera" target="_blank" rel="noopener noreferrer" className="text-white hover:text-indigo-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com/siteera" target="_blank" rel="noopener noreferrer" className="text-white hover:text-indigo-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com/company/siteera" target="_blank" rel="noopener noreferrer" className="text-white hover:text-indigo-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/siteera" target="_blank" rel="noopener noreferrer" className="text-white hover:text-indigo-400 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-indigo-400 transition-colors">About</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-indigo-400 transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="text-gray-400 hover:text-indigo-400 transition-colors">Portfolio</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-indigo-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg mb-4 text-white">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services/web-development" className="text-gray-400 hover:text-indigo-400 transition-colors">Web Development</Link></li>
              <li><Link href="/services/mobile-app-development" className="text-gray-400 hover:text-indigo-400 transition-colors">Mobile Apps</Link></li>
              <li><Link href="/services/ui-ux-design" className="text-gray-400 hover:text-indigo-400 transition-colors">UI/UX Design</Link></li>
              <li><Link href="/services/ecommerce-solutions" className="text-gray-400 hover:text-indigo-400 transition-colors">E-Commerce</Link></li>
              <li><Link href="/services/cloud-solutions" className="text-gray-400 hover:text-indigo-400 transition-colors">Cloud Solutions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg mb-4 text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-gray-400">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Kathmandu, Bagmati Province, Nepal</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail size={18} />
                <a href="mailto:hello@siteera.com.np" className="hover:text-indigo-400 transition-colors">
                  hello@siteera.com.np
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone size={18} />
                <a href="tel:+9779762454572" className="hover:text-indigo-400 transition-colors">
                  +977-9762454572
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-indigo-500/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-lg font-bold text-white mb-1">Stay Updated</h3>
              <p className="text-sm text-gray-400">Subscribe to our newsletter for the latest updates and insights.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                  <CheckCircle size={18} />
                  <span>Subscribed successfully!</span>
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 md:w-64 px-4 py-3 bg-gray-900 border border-indigo-500/20 rounded-lg text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition-colors text-sm"
                  />
                  <button type="submit" className="btn-luxury text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 text-sm">
                    <Send size={16} /> Subscribe
                  </button>
                </>
              )}
              {subError && <span className="text-red-400 text-xs">{subError}</span>}
            </form>
          </div>
        </div>

        <div className="border-t border-indigo-500/20 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Site Era. All rights reserved. Built with passion in Nepal.</p>
        </div>
      </div>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/9779762454572?text=Hi%20Rajat%2C%20I%27m%20interested%20in%20Site%20Era%27s%20services!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 btn-gold text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </footer>
  );
};

export default Footer;
