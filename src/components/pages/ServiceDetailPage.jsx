'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, ArrowRight, Code, Smartphone, Palette, ShoppingCart, Database, Sparkles } from 'lucide-react';
import AnimatedGrid from '@/components/ui/AnimatedGrid';

const ServiceDetail = () => {
  const params = useParams();
  const slug = params?.slug;

  const services = {
    'web-development': {
      icon: Code,
      name: 'Web Development',
      tagline: 'Powerful, Scalable Web Applications',
      description: 'We build lightning-fast, SEO-optimized websites and web applications that convert visitors into customers.',
      features: [
        'Custom Web Applications',
        'Progressive Web Apps (PWA)',
        'E-Commerce Platforms',
        'Content Management Systems',
        'API Development & Integration',
        'Performance Optimization',
        'SEO & Analytics Setup',
        'Responsive Design',
        'Security Implementation',
        'Ongoing Maintenance & Support'
      ],
      process: [
        { step: 'Discovery', description: 'Understanding your goals and requirements' },
        { step: 'Planning', description: 'Creating wireframes and project timeline' },
        { step: 'Design', description: 'Crafting beautiful, user-centered interfaces' },
        { step: 'Development', description: 'Building with clean code and best practices' },
        { step: 'Testing', description: 'Rigorous QA across devices and browsers' },
        { step: 'Launch', description: 'Deployment, monitoring, and optimization' }
      ],
      technologies: ['React', 'Next.js', 'Vue.js', 'Node.js', 'PostgreSQL', 'MongoDB', 'AWS'],
      color: 'from-blue-500 to-cyan-500'
    },
    'mobile-development': {
      icon: Smartphone,
      name: 'Mobile App Development',
      tagline: 'Native & Cross-Platform Excellence',
      description: 'Create stunning mobile experiences for iOS and Android that users love.',
      features: [
        'iOS & Android Apps',
        'Cross-Platform Development',
        'App Store Optimization',
        'Push Notifications',
        'Offline Functionality',
        'In-App Purchases',
        'Social Media Integration',
        'Analytics & Tracking'
      ],
      process: [
        { step: 'Concept', description: 'Defining app features and user flows' },
        { step: 'Design', description: 'Creating pixel-perfect UI/UX' },
        { step: 'Development', description: 'Building native or cross-platform apps' },
        { step: 'Testing', description: 'Comprehensive testing on real devices' },
        { step: 'Deployment', description: 'App Store and Play Store submission' },
        { step: 'Support', description: 'Updates, bug fixes, and new features' }
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      color: 'from-purple-500 to-pink-500'
    },
    'ui-ux-design': {
      icon: Palette,
      name: 'UI/UX Design',
      tagline: 'Beautiful, User-Centered Design',
      description: 'We create interfaces that are not just beautiful, but intuitive and conversion-focused.',
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Visual Design',
        'Design Systems',
        'Usability Testing',
        'Brand Identity Design',
        'Responsive Design',
        'Accessibility Compliance'
      ],
      process: [
        { step: 'Research', description: 'Understanding users and competitors' },
        { step: 'Wireframes', description: 'Creating low-fidelity layouts' },
        { step: 'Prototypes', description: 'Building interactive mockups' },
        { step: 'Visual Design', description: 'Applying colors and branding' },
        { step: 'Testing', description: 'Validating with real users' },
        { step: 'Handoff', description: 'Delivering assets to developers' }
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Framer'],
      color: 'from-pink-500 to-rose-500'
    },
    'ecommerce': {
      icon: ShoppingCart,
      name: 'E-Commerce Solutions',
      tagline: 'Sell More, Grow Faster',
      description: 'Complete e-commerce solutions that drive sales and grow your business.',
      features: [
        'Custom Online Stores',
        'Payment Gateway Integration',
        'Inventory Management',
        'Order Tracking',
        'Multi-vendor Marketplaces',
        'Analytics & Reporting',
        'Email Marketing Integration',
        'SEO Optimization'
      ],
      process: [
        { step: 'Planning', description: 'Defining store structure and features' },
        { step: 'Design', description: 'Creating conversion-focused layouts' },
        { step: 'Development', description: 'Building secure, scalable stores' },
        { step: 'Integration', description: 'Connecting payments and shipping' },
        { step: 'Testing', description: 'Ensuring smooth checkout experience' },
        { step: 'Launch', description: 'Going live with marketing support' }
      ],
      technologies: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal'],
      color: 'from-orange-500 to-red-500'
    },
    'cloud-devops': {
      icon: Database,
      name: 'Cloud & DevOps',
      tagline: 'Robust, Scalable Infrastructure',
      description: 'Build the backbone of your digital products with secure, scalable infrastructure.',
      features: [
        'RESTful API Development',
        'GraphQL APIs',
        'Microservices Architecture',
        'Database Design',
        'Cloud Infrastructure',
        'DevOps & CI/CD',
        'API Documentation',
        'Security Implementation'
      ],
      process: [
        { step: 'Architecture', description: 'Designing scalable system architecture' },
        { step: 'Development', description: 'Building robust APIs and services' },
        { step: 'Database', description: 'Optimizing data storage' },
        { step: 'Testing', description: 'Comprehensive API testing' },
        { step: 'Deployment', description: 'Cloud deployment and configuration' },
        { step: 'Monitoring', description: 'Ongoing performance monitoring' }
      ],
      technologies: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform'],
      color: 'from-cyan-500 to-teal-500'
    },
    'digital-strategy': {
      icon: Sparkles,
      name: 'Digital Strategy',
      tagline: 'Stand Out, Be Remembered',
      description: 'Data-driven growth strategies to help your business succeed online.',
      features: [
        'SEO Optimization',
        'Content Strategy',
        'Analytics Setup',
        'Conversion Optimization',
        'Social Media Strategy',
        'Brand Strategy',
        'Marketing Automation',
        'Performance Marketing'
      ],
      process: [
        { step: 'Discovery', description: 'Understanding your brand and audience' },
        { step: 'Research', description: 'Analyzing competitors and market' },
        { step: 'Strategy', description: 'Creating actionable growth plan' },
        { step: 'Implementation', description: 'Executing the strategy' },
        { step: 'Optimization', description: 'Continuous improvement' },
        { step: 'Reporting', description: 'Measuring and reporting results' }
      ],
      technologies: ['Google Analytics', 'SEMrush', 'Hotjar', 'Mixpanel'],
      color: 'from-emerald-500 to-green-500'
    }
  };

  const service = services[slug];

  if (!service) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Service Not Found</h2>
          <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const ServiceIcon = service.icon;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <AnimatedGrid />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-400/20 dark:bg-primary-600/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors mb-8">
            <ArrowLeft size={20} />
            <span>Back to Services</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
              <ServiceIcon className="text-white" size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {service.name}
            </h1>
            <p className="text-xl text-primary-600 font-medium mb-4">{service.tagline}</p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            What&apos;s Included
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
              >
                <CheckCircle className="text-primary-500 flex-shrink-0" size={20} />
                <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
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
                <div className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${service.color} mb-3`}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{step.step}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
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

      {/* CTA */}
      <section className="py-20 bg-primary-600">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-primary-100 mb-10 max-w-2xl mx-auto">
              Let&apos;s discuss your project and create something amazing together.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl text-lg font-semibold shadow-lg"
              >
                <span>Contact Us</span>
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
