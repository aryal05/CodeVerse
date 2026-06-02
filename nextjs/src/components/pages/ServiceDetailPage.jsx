'use client';


import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, ArrowRight, Code, Smartphone, Palette, ShoppingCart, Database, Sparkles } from 'lucide-react';

const ServiceDetail = () => {
  const { slug } = useParams();

  // Service data
  const services = {
    'web-development': {
      icon: Code,
      name: 'Web Development',
      tagline: 'Powerful, Scalable Web Applications',
      description: 'We build lightning-fast, SEO-optimized websites and web applications that convert visitors into customers. From simple landing pages to complex enterprise solutions, we deliver excellence.',
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
        { step: 'Discovery', description: 'Understanding your goals, audience, and requirements' },
        { step: 'Planning', description: 'Creating wireframes, architecture, and project timeline' },
        { step: 'Design', description: 'Crafting beautiful, user-centered interfaces' },
        { step: 'Development', description: 'Building with clean code and best practices' },
        { step: 'Testing', description: 'Rigorous QA across devices and browsers' },
        { step: 'Launch', description: 'Deployment, monitoring, and optimization' }
      ],
      technologies: ['React', 'Next.js', 'Vue.js', 'Node.js', 'Laravel', 'Django', 'PostgreSQL', 'MongoDB', 'AWS', 'Vercel'],
      pricing: [
        {
          name: 'Basic',
          price: '50,000',
          features: ['5-10 Pages', 'Responsive Design', 'Contact Form', 'Basic SEO', '1 Month Support']
        },
        {
          name: 'Professional',
          price: '150,000',
          features: ['15-25 Pages', 'Custom Design', 'CMS Integration', 'Advanced SEO', 'E-Commerce Ready', '3 Months Support'],
          popular: true
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: ['Unlimited Pages', 'Custom Features', 'API Integration', 'Performance Optimization', 'Dedicated Support', '12 Months Support']
        }
      ]
    },
    'mobile-app-development': {
      icon: Smartphone,
      name: 'Mobile App Development',
      tagline: 'Native & Cross-Platform Excellence',
      description: 'Create stunning mobile experiences for iOS and Android. We build apps that users love, with smooth animations, intuitive interfaces, and robust functionality.',
      features: [
        'iOS & Android Apps',
        'Cross-Platform Development',
        'App Store Optimization',
        'Push Notifications',
        'Offline Functionality',
        'In-App Purchases',
        'Social Media Integration',
        'Analytics & Tracking',
        'App Maintenance & Updates',
        'Beta Testing & QA'
      ],
      process: [
        { step: 'Concept', description: 'Defining app features and user flows' },
        { step: 'Design', description: 'Creating pixel-perfect UI/UX' },
        { step: 'Development', description: 'Building native or cross-platform apps' },
        { step: 'Testing', description: 'Comprehensive testing on real devices' },
        { step: 'Deployment', description: 'App Store and Play Store submission' },
        { step: 'Support', description: 'Updates, bug fixes, and new features' }
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'AWS Amplify', 'Redux', 'GraphQL'],
      pricing: [
        {
          name: 'Basic',
          price: '100,000',
          features: ['Single Platform', 'Basic Features', 'Standard UI', '1 Month Support']
        },
        {
          name: 'Professional',
          price: '250,000',
          features: ['iOS & Android', 'Advanced Features', 'Custom Design', 'Push Notifications', '3 Months Support'],
          popular: true
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: ['Complex Features', 'Backend Integration', 'Real-time Features', 'Dedicated Team', '12 Months Support']
        }
      ]
    },
    'ui-ux-design': {
      icon: Palette,
      name: 'UI/UX Design',
      tagline: 'Beautiful, User-Centered Design',
      description: 'We create interfaces that are not just beautiful, but intuitive and conversion-focused. Every pixel serves a purpose, every interaction delights users.',
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Visual Design',
        'Design Systems',
        'Usability Testing',
        'Brand Identity Design',
        'Responsive Design',
        'Accessibility Compliance',
        'Design Handoff',
        'Design Consultation'
      ],
      process: [
        { step: 'Research', description: 'Understanding users and competitors' },
        { step: 'Wireframes', description: 'Creating low-fidelity layouts' },
        { step: 'Prototypes', description: 'Building interactive mockups' },
        { step: 'Visual Design', description: 'Applying colors, typography, and branding' },
        { step: 'Testing', description: 'Validating with real users' },
        { step: 'Handoff', description: 'Delivering assets to developers' }
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Framer', 'Adobe Illustrator', 'Photoshop'],
      pricing: [
        {
          name: 'Basic',
          price: '30,000',
          features: ['5-10 Screens', 'Basic Wireframes', 'Visual Design', 'Design Files']
        },
        {
          name: 'Professional',
          price: '80,000',
          features: ['15-25 Screens', 'Interactive Prototypes', 'Design System', 'User Testing', 'Revisions'],
          popular: true
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: ['Unlimited Screens', 'Complete Design System', 'User Research', 'Ongoing Support', 'Brand Guidelines']
        }
      ]
    },
    'ecommerce': {
      icon: ShoppingCart,
      name: 'E-Commerce Solutions',
      tagline: 'Sell More, Grow Faster',
      description: 'Complete e-commerce solutions that drive sales. From product catalogs to payment gateways, we handle everything to get your store online and profitable.',
      features: [
        'Custom Online Stores',
        'Payment Gateway Integration',
        'Inventory Management',
        'Order Tracking',
        'Multi-vendor Marketplaces',
        'Analytics & Reporting',
        'Email Marketing Integration',
        'SEO Optimization',
        'Mobile Responsive',
        'Security & Compliance'
      ],
      process: [
        { step: 'Planning', description: 'Defining store structure and features' },
        { step: 'Design', description: 'Creating conversion-focused layouts' },
        { step: 'Development', description: 'Building secure, scalable stores' },
        { step: 'Integration', description: 'Connecting payments and shipping' },
        { step: 'Testing', description: 'Ensuring smooth checkout experience' },
        { step: 'Launch', description: 'Going live with marketing support' }
      ],
      technologies: ['Shopify', 'WooCommerce', 'Magento', 'Custom Solutions', 'Stripe', 'PayPal', 'Razorpay', 'eSewa'],
      pricing: [
        {
          name: 'Basic',
          price: '80,000',
          features: ['Up to 50 Products', 'Payment Gateway', 'Basic Design', 'Mobile Responsive', '1 Month Support']
        },
        {
          name: 'Professional',
          price: '200,000',
          features: ['Unlimited Products', 'Custom Design', 'Inventory Management', 'Email Marketing', '3 Months Support'],
          popular: true
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: ['Multi-vendor', 'Advanced Features', 'Custom Integrations', 'Dedicated Support', '12 Months Support']
        }
      ]
    },
    'api-development': {
      icon: Database,
      name: 'API & Backend Development',
      tagline: 'Robust, Scalable Infrastructure',
      description: 'Build the backbone of your digital products. We create secure, scalable APIs and backend systems that power your applications reliably.',
      features: [
        'RESTful API Development',
        'GraphQL APIs',
        'Microservices Architecture',
        'Database Design',
        'Cloud Infrastructure',
        'DevOps & CI/CD',
        'API Documentation',
        'Security Implementation',
        'Performance Optimization',
        'Monitoring & Logging'
      ],
      process: [
        { step: 'Architecture', description: 'Designing scalable system architecture' },
        { step: 'Development', description: 'Building robust APIs and services' },
        { step: 'Database', description: 'Optimizing data storage and retrieval' },
        { step: 'Testing', description: 'Comprehensive API testing' },
        { step: 'Deployment', description: 'Cloud deployment and configuration' },
        { step: 'Monitoring', description: 'Ongoing performance monitoring' }
      ],
      technologies: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker', 'Kubernetes', 'GraphQL'],
      pricing: [
        {
          name: 'Basic',
          price: '60,000',
          features: ['Simple API', 'Basic Database', 'Documentation', '1 Month Support']
        },
        {
          name: 'Professional',
          price: '150,000',
          features: ['Complex APIs', 'Microservices', 'Cloud Deployment', 'CI/CD Pipeline', '3 Months Support'],
          popular: true
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: ['Enterprise Architecture', 'High Availability', 'Advanced Security', 'Dedicated Team', '12 Months Support']
        }
      ]
    },
    'digital-branding': {
      icon: Sparkles,
      name: 'Digital Branding',
      tagline: 'Stand Out, Be Remembered',
      description: 'Create a memorable brand identity that resonates with your audience. From logos to complete brand guidelines, we help you make a lasting impression.',
      features: [
        'Logo Design',
        'Brand Identity',
        'Style Guides',
        'Marketing Collateral',
        'Social Media Assets',
        'Brand Strategy',
        'Typography Selection',
        'Color Palette',
        'Brand Guidelines',
        'Ongoing Brand Support'
      ],
      process: [
        { step: 'Discovery', description: 'Understanding your brand values and audience' },
        { step: 'Research', description: 'Analyzing competitors and market trends' },
        { step: 'Concepts', description: 'Creating initial design directions' },
        { step: 'Refinement', description: 'Perfecting the chosen direction' },
        { step: 'Guidelines', description: 'Creating comprehensive brand guidelines' },
        { step: 'Delivery', description: 'Providing all brand assets' }
      ],
      technologies: ['Adobe Illustrator', 'Photoshop', 'After Effects', 'Figma', 'InDesign'],
      pricing: [
        {
          name: 'Basic',
          price: '25,000',
          features: ['Logo Design', 'Color Palette', 'Typography', 'Basic Guidelines']
        },
        {
          name: 'Professional',
          price: '60,000',
          features: ['Complete Brand Identity', 'Style Guide', 'Marketing Materials', 'Social Media Kit', 'Revisions'],
          popular: true
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: ['Full Brand Strategy', 'Complete Guidelines', 'Marketing Campaigns', 'Ongoing Support', 'Brand Consultation']
        }
      ]
    }
  };

  const service = services[slug];

  if (!service) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-display text-white mb-4">Service Not Found</h2>
          <Link href="/services" className="btn-luxury text-white px-6 py-3 rounded-full inline-block">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const ServiceIcon = service.icon;

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal-500 rounded-full blur-[150px] opacity-10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-platinum-300 hover:text-royal-400 transition-colors mb-8">
            <ArrowLeft size={20} />
            <span>Back to Services</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <ServiceIcon className="text-gold-500 mx-auto mb-6" size={64} />
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              {service.name}
            </h1>
            <p className="text-2xl text-gold-500 font-display mb-6">{service.tagline}</p>
            <p className="text-xl text-platinum-300 leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-luxury-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-display font-bold text-white mb-12 text-center">
            What's <span className="gradient-luxury">Included</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="text-emerald-500 flex-shrink-0 mt-1" size={20} />
                <span className="text-platinum-200">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-display font-bold text-white mb-12 text-center">
            Our <span className="gradient-luxury">Process</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-luxury p-6 rounded-xl"
              >
                <div className="text-4xl font-display font-bold gradient-luxury mb-4">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-2">{step.step}</h3>
                <p className="text-platinum-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 bg-luxury-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-display font-bold text-white mb-12 text-center">
            Technologies We <span className="gradient-luxury">Use</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {service.technologies.map((tech, index) => (
              <span
                key={index}
                className="glass-luxury px-6 py-3 rounded-full text-white font-semibold border border-royal-500/20 hover:border-royal-500/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-display font-bold text-white mb-4 text-center">
            Transparent <span className="gradient-luxury">Pricing</span>
          </h2>
          <p className="text-platinum-300 text-center mb-12 max-w-2xl mx-auto">
            Choose the package that fits your needs. All prices in NPR.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {service.pricing.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`card-luxury p-8 rounded-xl ${plan.popular ? 'border-2 border-gold-500' : ''}`}
              >
                {plan.popular && (
                  <div className="text-gold-500 font-semibold text-sm mb-4 uppercase">Most Popular</div>
                )}
                <h3 className="text-2xl font-display font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-display font-bold gradient-luxury">
                    {plan.price === 'Custom' ? plan.price : `NPR ${plan.price}`}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="text-emerald-500 flex-shrink-0 mt-1" size={16} />
                      <span className="text-platinum-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`block text-center py-3 rounded-full font-display font-semibold transition-all ${
                    plan.popular
                      ? 'btn-luxury text-white'
                      : 'border-2 border-white text-white hover:bg-white hover:text-black'
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-luxury-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Get <span className="gradient-luxury">Started?</span>
          </h2>
          <p className="text-xl text-platinum-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create something amazing together.
          </p>
          <Link href="/contact" className="btn-luxury text-white px-10 py-5 rounded-full font-display font-semibold text-lg inline-flex items-center gap-2">
            <span>Contact Us</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;

