'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Linkedin, Github, Twitter } from 'lucide-react';
import TiltCard from '../ui/TiltCard';

const Team = () => {
  const [ref, inView] = useScrollAnimation();

  const team = [
    {
      name: 'Rajat Aryal',
      title: 'Founder & CEO, Full-Stack Developer',
      image: 'https://i.pravatar.cc/300?img=12',
      social: { linkedin: '#', github: '#', twitter: '#' }
    },
    {
      name: 'Priya Sharma',
      title: 'Lead UI/UX Designer',
      image: 'https://i.pravatar.cc/300?img=45',
      social: { linkedin: '#', github: '#', twitter: '#' }
    },
    {
      name: 'Amit Gurung',
      title: 'Mobile App Lead',
      image: 'https://i.pravatar.cc/300?img=33',
      social: { linkedin: '#', github: '#', twitter: '#' }
    },
    {
      name: 'Sita Thapa',
      title: 'Project Manager & Client Relations',
      image: 'https://i.pravatar.cc/300?img=47',
      social: { linkedin: '#', github: '#', twitter: '#' }
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold-500 font-mono text-sm tracking-wider uppercase">OUR TEAM</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-4">
            Meet the Experts
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TiltCard className="group">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex space-x-4 justify-center">
                      <a href={member.social.linkedin} className="text-white hover:text-royal-400 transition-colors">
                        <Linkedin size={20} />
                      </a>
                      <a href={member.social.github} className="text-white hover:text-royal-400 transition-colors">
                        <Github size={20} />
                      </a>
                      <a href={member.social.twitter} className="text-white hover:text-royal-400 transition-colors">
                        <Twitter size={20} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-display font-semibold text-white">{member.name}</h3>
                  <p className="text-platinum-300 text-sm">{member.title}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;

