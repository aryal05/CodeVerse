"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Heart, Lightbulb, Rocket, Target, Trophy, Users } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import PremiumPageCTA from "@/components/ui/PremiumPageCTA";

const values = [
  { icon: Target, title: "Mission-Driven", description: "Every pixel serves a purpose. We build with intention and focus on outcomes that matter.", accent: "56, 189, 248" },
  { icon: Lightbulb, title: "Innovation First", description: "We stay curious, challenge assumptions, and use technology where it creates real value.", accent: "167, 139, 250" },
  { icon: Users, title: "Client-Centric", description: "Your success is our success. Open communication turns projects into lasting partnerships.", accent: "251, 146, 60" },
  { icon: Trophy, title: "Excellence Always", description: "We never settle for good enough. Every detail must earn its place and meet our standard.", accent: "45, 212, 191" },
];

const stats = [
  { value: "15+", label: "Successful projects" },
  { value: "50+", label: "Happy clients" },
  { value: "9+", label: "Years of experience" },
  { value: "15+", label: "Team members" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutPage() {
  const missionRef = useRef(null);
  const isMissionInView = useInView(missionRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageHeader
        badge="About CodeVerse"
        title="We're on a Mission to"
        titleHighlight="Transform Digital Nepal"
        description="Founded in 2015, CodeVerse has grown from a small team of passionate developers into Nepal's leading digital agency. We combine creativity with technology to deliver exceptional digital experiences."
      />

      <section className="about-metrics" aria-label="CodeVerse at a glance">
        <div className="container-custom">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="about-metrics__grid">
            {stats.map((stat, index) => (
              <motion.div key={stat.label} variants={itemVariants} className="about-metric">
                <span>0{index + 1}</span>
                <strong>{stat.value}</strong>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section ref={missionRef} className="about-direction">
        <div className="container-custom about-direction__layout">
          <motion.header
            initial={{ opacity: 0, x: -24 }}
            animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="about-direction__intro"
          >
            <span>Why we exist</span>
            <h2>Purpose before <em>pixels.</em></h2>
            <p>Good digital work starts with a clear reason to exist. Our mission guides what we build; our vision shapes how far we take it.</p>
          </motion.header>

          <div className="about-direction__cards">
            <motion.article
              initial={{ opacity: 0, y: 26 }}
              animate={isMissionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="about-direction-card about-direction-card--mission"
            >
              <div><span>01 / Mission</span><i><Rocket aria-hidden="true" /></i></div>
              <h3>Build technology that moves businesses forward.</h3>
              <p>We empower ambitious teams with digital solutions that drive growth, improve experiences, and solve meaningful problems for real people.</p>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 26 }}
              animate={isMissionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="about-direction-card about-direction-card--vision"
            >
              <div><span>02 / Vision</span><i><Award aria-hidden="true" /></i></div>
              <h3>Make world-class digital craft accessible across South Asia.</h3>
              <p>We aim to become the region&apos;s most trusted digital partner—known for thoughtful innovation, reliable delivery, and long-term client success.</p>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="about-values__glow" aria-hidden="true" />
        <div className="container-custom">
          <motion.header initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="about-values__header">
            <div>
              <span><Heart aria-hidden="true" /> Our values</span>
              <h2>The principles behind <em>every decision.</em></h2>
            </div>
            <p>Not posters on a wall—these are the standards we use to make the work better.</p>
          </motion.header>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="about-values__grid">
            {values.map(({ icon: Icon, ...value }, index) => (
              <motion.article key={value.title} variants={itemVariants} className="about-value-card" style={{ "--value-accent": value.accent }}>
                <div className="about-value-card__top"><span>0{index + 1}</span><i><Icon aria-hidden="true" /></i></div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <PremiumPageCTA
        eyebrow="Build with CodeVerse"
        title="Ready to work with a team that"
        highlight="cares about the outcome?"
        description="Bring us the challenge. We'll bring honest thinking, thoughtful craft, and a clear path from conversation to launch."
        primaryLabel="Start a conversation"
        secondaryLabel="Explore our services"
        secondaryHref="/services"
        accent="96, 165, 250"
      />
    </div>
  );
}
