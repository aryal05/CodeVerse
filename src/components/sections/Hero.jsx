"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { motion } from "framer-motion";
import { ArrowRight, Asterisk, Check, MousePointer2, Play } from "lucide-react";
import AnimatedGrid from "@/components/ui/AnimatedGrid";

const DashboardVisual = dynamic(() => import("@/components/ui/DashboardVisual"), { ssr: false });

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-kicker", { opacity: 0, y: 18, duration: .6 })
        .from(".hero-line", { opacity: 0, yPercent: 105, rotateX: -18, stagger: .1, duration: .9 }, "-=.25")
        .from(".hero-copy, .hero-actions, .hero-proof", { opacity: 0, y: 24, stagger: .12, duration: .65 }, "-=.45")
        .from(".hero-visual", { opacity: 0, x: 55, scale: .96, duration: 1 }, "-=.8");
      const studioLabel = element.querySelector("[data-gsap-scramble]");
      if (studioLabel) {
        gsap.to(studioLabel, {
          duration: .82,
          scrambleText: { text: studioLabel.textContent, chars: "upperCase", revealDelay: .08, speed: .45 },
          ease: "none",
          delay: .12,
        });
      }
      gsap.to(".hero-orb-a", { x: 70, y: -35, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".hero-orb-b", { x: -45, y: 55, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.timeline({ scrollTrigger: { trigger: element, start: "top top", end: "bottom top", scrub: 1.15 } })
        .to(".hero-premium__copy", { y: -72, autoAlpha: .42, ease: "none" }, 0)
        .to(".hero-visual", { y: 82, scale: .9, rotateY: -5, ease: "none" }, 0)
        .to(".animated-grid__perspective", { scale: 1.12, y: 55, ease: "none" }, 0)
        .to(".hero-marquee", { yPercent: 100, ease: "none" }, 0);
    }, element);

    const visual = element.querySelector(".hero-visual__tilt");
    const buttons = [...element.querySelectorAll(".hero-button")];
    const onPointerMove = (event) => {
      if (!element.isConnected || !visual) return;
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      gsap.to(visual, { rotateY: x * 5, rotateX: y * -4, x: x * 10, y: y * 8, duration: .9, ease: "power3.out", overwrite: "auto" });
      gsap.to(".hero-float-card--top", { x: x * 22, y: y * 18, duration: 1, ease: "power3.out" });
      gsap.to(".hero-float-card--bottom", { x: x * -18, y: y * -14, duration: 1.1, ease: "power3.out" });
    };
    const onPointerLeave = () => gsap.to(visual, { rotateY: 0, rotateX: 0, x: 0, y: 0, duration: 1.1, ease: "elastic.out(1,.5)", overwrite: "auto" });
    const magneticHandlers = buttons.map((button) => {
      const move = (event) => {
        const rect = button.getBoundingClientRect();
        gsap.to(button, { x: (event.clientX - rect.left - rect.width / 2) * .16, y: (event.clientY - rect.top - rect.height / 2) * .2, duration: .35, ease: "power2.out" });
      };
      const leave = () => gsap.to(button, { x: 0, y: 0, duration: .7, ease: "elastic.out(1,.45)" });
      button.addEventListener("pointermove", move);
      button.addEventListener("pointerleave", leave);
      return [button, move, leave];
    });
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerleave", onPointerLeave);

    return () => {
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerleave", onPointerLeave);
      magneticHandlers.forEach(([button, move, leave]) => {
        button.removeEventListener("pointermove", move);
        button.removeEventListener("pointerleave", leave);
      });
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className="hero-premium">
      <AnimatedGrid />
      <div className="hero-orb hero-orb-a" />
      <div className="hero-orb hero-orb-b" />
      <div className="container-custom hero-premium__inner">
        <div className="hero-premium__copy">
          <div className="hero-kicker"><span className="hero-kicker__dot" /><span data-gsap-scramble>Nepal&apos;s independent digital product studio</span></div>
          <h1 className="hero-premium__title" aria-label="We build digital products that drive growth">
            <span className="hero-line-wrap"><span className="hero-line">We build digital</span></span>
            <span className="hero-line-wrap"><span className="hero-line hero-line--muted">products that</span></span>
            <span className="hero-line-wrap"><span className="hero-line hero-line--accent">drive growth.</span></span>
          </h1>
          <p className="hero-copy">We design and engineer high-performing websites, apps and digital brands for ambitious companies—combining clear strategy with obsessive craft.</p>
          <div className="hero-actions">
            <Link href="/contact" className="hero-button hero-button--primary"><span>Start a project</span><ArrowRight size={18} /></Link>
            <Link href="/portfolio" className="hero-button hero-button--ghost"><Play size={16} fill="currentColor" /><span>Explore our work</span></Link>
          </div>
          <div className="hero-proof">
            <div className="hero-avatars" aria-hidden="true">{["RA","AS","NP"].map((name) => <span key={name}>{name}</span>)}</div>
            <div><strong>Senior product team</strong><small><Check size={13} /> Strategy • design • engineering</small></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-visual__tilt">
            <div className="hero-visual__label"><Asterisk size={15} /> Live product telemetry</div>
            <DashboardVisual />
            <motion.div className="hero-float-card hero-float-card--top" whileHover={{ scale: 1.06 }} transition={{ type: "spring", stiffness: 320, damping: 20 }}><MousePointer2 size={16} /><span><strong>Conversion</strong><small>+38.2% this quarter</small></span></motion.div>
            <motion.div className="hero-float-card hero-float-card--bottom" whileHover={{ scale: 1.06 }} transition={{ type: "spring", stiffness: 320, damping: 20 }}><span className="pulse-ring" /><span><strong>Build healthy</strong><small>Deployed 2m ago</small></span></motion.div>
          </div>
        </div>
      </div>
      <div className="hero-marquee" aria-hidden="true"><div>PRODUCT STRATEGY <Asterisk /> UI/UX DESIGN <Asterisk /> WEB DEVELOPMENT <Asterisk /> MOBILE PRODUCTS <Asterisk /> BRAND SYSTEMS <Asterisk /> PRODUCT STRATEGY <Asterisk /> UI/UX DESIGN <Asterisk /></div></div>
    </section>
  );
}
