'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Award, Users, Target, Zap, Heart, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import CounterAnimation from '@/components/ui/CounterAnimation';
import TiltCard from '@/components/ui/TiltCard';

const About = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const [ref1, inView1] = useScrollAnimation();
  const [ref2, inView2] = useScrollAnimation();
  const [ref3, inView3] = useScrollAnimation();
  const [ref4, inView4] = useScrollAnimation();

  const values = [
    {
      icon: Heart,
      title: 'Client-Centric',
      description: 'Your success is our success. We build lasting partnerships, not just projects.'
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'We stay ahead of trends, using cutting-edge tech to give you a competitive edge.'
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'Every line of code serves a purpose. We focus on metrics that matter to your business.'
    },
    {
      icon: Users,
      title: 'Collaborative',
      description: 'Transparent communication, agile workflows, and your feedback at every step.'
    }
  ];

  const milestones = [
    { year: '2015', event: 'Site Era Founded', description: 'Started with a vision to transform Nepal\'s digital landscape' },
    { year: '2017', event: '50+ Projects', description: 'Crossed 50 successful project deliveries' },
    { year: '2019', event: 'Team Expansion', description: 'Grew to a team of 10+ talented professionals' },
    { year: '2021', event: 'International Clients', description: 'Expanded services to clients across 5 countries' },
    { year: '2023', event: 'Award Recognition', description: 'Recognized as Top Digital Agency in Nepal' },
    { year: '2024', event: '150+ Projects', description: 'Celebrating 150+ successful projects and counting' }
  ];

  const achievements = [
    { number: 150, suffix: '+', label: 'Projects Completed' },
    { number: 50, suffix: '+', label: 'Happy Clients' },
    { number: 9, suffix: '+', label: 'Years Experience' },
    { number: 100, suffix: '%', label: 'Client Satisfaction' }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal-500 rounded-full blur-[150px] opacity-10"
          style={{ y: y1 }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-500 rounded-full blur-[150px] opacity-10"
          style={{ y: y1 }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-gold-500 font-mono text-sm tracking-wider uppercase mb-4 block">About Us</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Building Digital <span className="gradient-luxury">Excellence</span> Since 2015
            </h1>
            <p className="text-xl text-platinum-300 leading-relaxed">
              We're not just another web agency. We're your strategic partner in digital transformation,
              combining technical expertise with creative innovation to build products that matter.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={ref1} className="py-16 border-y border-royal-500/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-5xl md:text-6xl font-display font-bold gradient-luxury mb-2">
                  {inView1 && <CounterAnimation end={stat.number} suffix={stat.suffix} />}
                </div>
                <div className="text-platinum-400 font-body">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={ref2} className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView2 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="text-gold-500 font-mono text-sm tracking-wider uppercase mb-4 block">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                From Passion to <span className="gradient-luxury">Purpose</span>
              </h2>
              <div className="space-y-4 text-platinum-300 leading-relaxed">
                <p>
                  Founded in 2015 by <strong className="text-white">Rajat Aryal</strong>, Site Era began with a simple mission:
                  to help Nepali businesses compete on the global digital stage. What started as a one-person operation
                  has grown into a full-service digital agency serving clients across Nepal and internationally.
                </p>
                <p>
                  With over 9 years of hands-on experience in full-stack development, Rajat assembled a team of
                  passionate designers, developers, and strategists who share the same vision: creating digital
                  experiences that don't just look good, but drive real business results.
                </p>
                <p>
                  Today, we've delivered 150+ projects ranging from simple landing pages to complex enterprise
                  applications, always maintaining our commitment to quality, innovation, and client success.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView2 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Team collaboration"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-luxury px-8 py-6 rounded-xl">
                <div className="flex items-center gap-3">
                  <Award className="text-gold-500" size={32} />
                  <div>
                    <div className="font-display font-bold text-white text-lg">Top Rated</div>
                    <div className="text-platinum-300 text-sm">Agency 2024</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={ref3} className="py-24 bg-luxury-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="text-gold-500 font-mono text-sm tracking-wider uppercase mb-4 block">Our Values</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              What Drives Us <span className="gradient-luxury">Forward</span>
            </h2>
            <p className="text-xl text-platinum-300 max-w-3xl mx-auto">
              Our core values shape every decision we make and every project we deliver.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TiltCard className="card-luxury p-8 rounded-xl h-full transition-all duration-300">
                  <value.icon className="text-royal-500 mb-4" size={40} />
                  <h3 className="text-2xl font-display font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-platinum-300 leading-relaxed">{value.description}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={ref4} className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="text-gold-500 font-mono text-sm tracking-wider uppercase mb-4 block">Our Journey</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Milestones & <span className="gradient-luxury">Achievements</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-luxury hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={inView4 ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="w-full md:w-5/12">
                    <div className={`glass-luxury p-6 rounded-xl ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="text-gold-500 font-display font-bold text-2xl mb-2">{milestone.event}</div>
                      <p className="text-platinum-300">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-16 h-16 btn-gold text-white rounded-full flex items-center justify-center font-display font-bold text-lg z-10 mx-auto my-4 md:my-0 shrink-0">
                    {milestone.year}
                  </div>
                  
                  <div className="w-full md:w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-luxury-50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Start Your <span className="gradient-luxury">Digital Journey?</span>
            </h2>
            <p className="text-xl text-platinum-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business with cutting-edge digital solutions.
            </p>
            <Link href="/contact" className="btn-luxury text-white px-10 py-5 rounded-full font-display font-semibold text-lg transition-all duration-300 inline-flex items-center gap-2 group">
              <span>Get Started Today</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;

