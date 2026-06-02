'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { 
  Code, Smartphone, Palette, ShoppingCart, Database, Sparkles,
  CheckCircle, ArrowRight, Zap, Shield, Clock, TrendingUp
} from 'lucide-react';
import TiltCard from '@/components/ui/TiltCard';

const Services = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const [ref1, inView1] = useScrollAnimation();
  const [ref2, inView2] = useScrollAnimation();
  const [selectedService, setSelectedService] = useState(0);

  const services = [
    {
      icon: Code,
      name: 'Web Development',
      slug: 'web-development',
      tagline: 'Powerful, Scalable Web Applications',
      description: 'We build lightning-fast, SEO-optimized websites and web applications that convert visitors into customers. From simple landing pages to complex enterprise solutions.',
      features: [
        'Custom Web Applications',
        'Progressive Web Apps (PWA)',
        'E-Commerce Platforms',
        'Content Management Systems',
        'API Development & Integration',
        'Performance Optimization'
      ],
      technologies: ['React', 'Next.js', 'Vue.js', 'Node.js', 'Laravel', 'Django'],
      pricing: 'Starting from NPR 50,000',
      deliveryTime: '2-8 weeks',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80'
    },
    {
      icon: Smartphone,
      name: 'Mobile App Development',
      slug: 'mobile-app-development',
      tagline: 'Native & Cross-Platform Excellence',
      description: 'Create stunning mobile experiences for iOS and Android. We build apps that users love, with smooth animations, intuitive interfaces, and robust functionality.',
      features: [
        'iOS & Android Apps',
        'Cross-Platform Development',
        'App Store Optimization',
        'Push Notifications',
        'Offline Functionality',
        'App Maintenance & Updates'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      pricing: 'Starting from NPR 100,000',
      deliveryTime: '4-12 weeks',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80'
    },
    {
      icon: Palette,
      name: 'UI/UX Design',
      slug: 'ui-ux-design',
      tagline: 'Beautiful, User-Centered Design',
      description: 'We create interfaces that are not just beautiful, but intuitive and conversion-focused. Every pixel serves a purpose, every interaction delights users.',
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Visual Design',
        'Design Systems',
        'Usability Testing',
        'Brand Identity Design'
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle'],
      pricing: 'Starting from NPR 30,000',
      deliveryTime: '1-4 weeks',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80'
    },
    {
      icon: ShoppingCart,
      name: 'E-Commerce Solutions',
      slug: 'ecommerce',
      tagline: 'Sell More, Grow Faster',
      description: 'Complete e-commerce solutions that drive sales. From product catalogs to payment gateways, we handle everything to get your store online and profitable.',
      features: [
        'Custom Online Stores',
        'Payment Gateway Integration',
        'Inventory Management',
        'Order Tracking',
        'Multi-vendor Marketplaces',
        'Analytics & Reporting'
      ],
      technologies: ['Shopify', 'WooCommerce', 'Magento', 'Custom Solutions'],
      pricing: 'Starting from NPR 80,000',
      deliveryTime: '3-10 weeks',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80'
    },
    {
      icon: Database,
      name: 'API & Backend Development',
      slug: 'api-development',
      tagline: 'Robust, Scalable Infrastructure',
      description: 'Build the backbone of your digital products. We create secure, scalable APIs and backend systems that power your applications reliably.',
      features: [
        'RESTful API Development',
        'GraphQL APIs',
        'Microservices Architecture',
        'Database Design',
        'Cloud Infrastructure',
        'DevOps & CI/CD'
      ],
      technologies: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker'],
      pricing: 'Starting from NPR 60,000',
      deliveryTime: '2-6 weeks',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80'
    },
    {
      icon: Sparkles,
      name: 'Digital Branding',
      slug: 'digital-branding',
      tagline: 'Stand Out, Be Remembered',
      description: 'Create a memorable brand identity that resonates with your audience. From logos to complete brand guidelines, we help you make a lasting impression.',
      features: [
        'Logo Design',
        'Brand Identity',
        'Style Guides',
        'Marketing Collateral',
        'Social Media Assets',
        'Brand Strategy'
      ],
      technologies: ['Adobe Illustrator', 'Photoshop', 'After Effects', 'Figma'],
      pricing: 'Starting from NPR 25,000',
      deliveryTime: '1-3 weeks',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80'
    }
  ];

  const benefits = [
    { icon: Zap, title: 'Fast Delivery', description: 'Agile sprints, rapid iterations' },
    { icon: Shield, title: 'Quality Assured', description: 'Rigorous testing, zero compromises' },
    { icon: Clock, title: '24/7 Support', description: 'Always here when you need us' },
    { icon: TrendingUp, title: 'Growth Focused', description: 'Built to scale with your business' }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal-500 rounded-full blur-[150px] opacity-10"
          style={{ y: y1 }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-royal-500 font-mono text-sm tracking-wider uppercase mb-4 block">Our Services</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Digital Solutions That <span className="gradient-luxury">Drive Results</span>
            </h1>
            <p className="text-xl text-platinum-300 leading-relaxed">
              From concept to launch, we provide end-to-end digital services that help your business thrive in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={ref1} className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link key={index} href={`/services/${service.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView1 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedService(index)}
                  className="cursor-pointer h-full"
                >
                  <TiltCard className="glass-luxury p-8 rounded-xl h-full hover:border-royal-500 transition-all duration-300 group">
                    <service.icon className="text-royal-500 mb-4 group-hover:scale-110 transition-transform" size={40} />
                    <h3 className="text-2xl font-display font-semibold text-white mb-2">{service.name}</h3>
                    <p className="text-royal-400 text-sm mb-4">{service.tagline}</p>
                    <p className="text-platinum-300 mb-6 leading-relaxed">{service.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-platinum-300">
                          <CheckCircle className="text-royal-500 flex-shrink-0" size={16} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.technologies.slice(0, 4).map((tech, i) => (
                        <span key={i} className="text-xs bg-luxury-100 text-white px-3 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-royal-500/20">
                      <div>
                        <div className="text-xs text-platinum-300">Starting from</div>
                        <div className="text-royal-400 font-display font-semibold">{service.pricing}</div>
                      </div>
                      <ArrowRight className="text-gold-400 group-hover:translate-x-2 group-hover:text-gold-300 transition-all" size={20} />
                    </div>
                  </TiltCard>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={ref2} className="py-24 bg-luxury-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="text-royal-500 font-mono text-sm tracking-wider uppercase mb-4 block">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              The Site Era <span className="gradient-luxury">Advantage</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-royal-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="text-royal-500" size={32} />
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-platinum-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="glass-luxury p-12 rounded-2xl max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Get <span className="gradient-luxury">Started?</span>
            </h2>
            <p className="text-xl text-platinum-300 mb-8">
              Let's discuss your project and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-royal-500 text-black px-10 py-5 rounded-full font-display font-semibold text-lg hover:bg-gold-500 transition-all duration-300 glow-royal inline-flex items-center gap-2 group">
                  <span>Schedule a Call</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </Link>
              <Link href="/services">
                <button className="border-2 border-white text-white px-10 py-5 rounded-full font-display font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300">
                  View Pricing
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;

