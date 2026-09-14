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

const DashboardVisual = dynamic(() => import("@/components/ui/DashboardVisual"), {
  ssr: false,
  loading: () => <div className="hero-dashboard-placeholder" aria-hidden="true" />,
});

const HERO_SERVICES = [
  "Product strategy",
  "UI/UX design",
  "Web development",
  "Mobile products",
  "Brand systems",
];

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    const element = root.current;
    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 767px)").matches
    ) return undefined;
    gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);
    const stickyLayout = window.matchMedia("(min-width: 1101px)").matches;

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-kicker", { opacity: 0, y: 18, duration: .6 })
        .from(".hero-copy, .hero-actions, .hero-proof", { opacity: 0, y: 24, stagger: .12, duration: .65 }, "-=.25")
        .from(".hero-visual", { opacity: 0, x: 55, scale: .96, duration: 1 }, "-=.8");
      const studioLabel = element.querySelector("[data-gsap-scramble]");
      if (studioLabel) {
        gsap.to(studioLabel, {
          duration: 0.82,
          scrambleText: {
            text: studioLabel.textContent,
            chars: "upperCase",
            revealDelay: 0.08,
            speed: 0.45,
          },
          ease: "none",
          delay: 0.12,
        });
      }
      gsap
        .timeline({
          scrollTrigger: {
            trigger: element,
            start: "top top",
            end: stickyLayout ? "bottom bottom" : "bottom 35%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          ".hero-premium__copy",
          { y: 0 },
          {
            y: () => window.innerHeight * (stickyLayout ? 0.52 : 0.2),
            force3D: true,
            ease: "none",
          },
          0,
        )
        .fromTo(
          ".hero-visual",
          { y: 0 },
          {
            y: () => window.innerHeight * (stickyLayout ? 0.58 : 0.24),
            force3D: true,
            ease: "none",
          },
          0,
        )
        .fromTo(
          ".animated-grid",
          { y: 0 },
          { y: 88, force3D: true, ease: "none" },
          0,
        )
        .fromTo(
          ".hero-wave-field",
          { y: 0 },
          { y: 148, force3D: true, ease: "none" },
          0,
        )
        .fromTo(
          ".hero-marquee",
          { y: 0 },
          { y: 96, force3D: true, ease: "none" },
          0,
        );
    }, element);

    const visual = element.querySelector(".hero-visual__tilt");
    const topCard = element.querySelector(".hero-float-card--top");
    const bottomCard = element.querySelector(".hero-float-card--bottom");
    const buttons = [...element.querySelectorAll(".hero-button")];
    const setRotateX = visual
      ? gsap.quickTo(visual, "rotateX", { duration: 0.85, ease: "power3.out" })
      : null;
    const setRotateY = visual
      ? gsap.quickTo(visual, "rotateY", { duration: 0.85, ease: "power3.out" })
      : null;
    const setVisualX = visual
      ? gsap.quickTo(visual, "x", { duration: 0.85, ease: "power3.out" })
      : null;
    const setVisualY = visual
      ? gsap.quickTo(visual, "y", { duration: 0.85, ease: "power3.out" })
      : null;
    const setTopX = topCard
      ? gsap.quickTo(topCard, "x", { duration: 1, ease: "power3.out" })
      : null;
    const setTopY = topCard
      ? gsap.quickTo(topCard, "y", { duration: 1, ease: "power3.out" })
      : null;
    const setBottomX = bottomCard
      ? gsap.quickTo(bottomCard, "x", { duration: 1.05, ease: "power3.out" })
      : null;
    const setBottomY = bottomCard
      ? gsap.quickTo(bottomCard, "y", { duration: 1.05, ease: "power3.out" })
      : null;
    const onPointerMove = (event) => {
      if (!visual?.isConnected) return;
      const rect = visual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      setRotateY?.(x * 5);
      setRotateX?.(y * -4);
      setVisualX?.(x * 10);
      setVisualY?.(y * 8);
      setTopX?.(x * 22);
      setTopY?.(y * 18);
      setBottomX?.(x * -18);
      setBottomY?.(y * -14);
    };
    const onPointerLeave = () => {
      setRotateX?.(0);
      setRotateY?.(0);
      setVisualX?.(0);
      setVisualY?.(0);
      setTopX?.(0);
      setTopY?.(0);
      setBottomX?.(0);
      setBottomY?.(0);
    };
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
    visual?.addEventListener("pointermove", onPointerMove);
    visual?.addEventListener("pointerleave", onPointerLeave);
    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    const refreshOnLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", refreshOnLoad, { once: true });

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      window.removeEventListener("load", refreshOnLoad);
      visual?.removeEventListener("pointermove", onPointerMove);
      visual?.removeEventListener("pointerleave", onPointerLeave);
      magneticHandlers.forEach(([button, move, leave]) => {
        button.removeEventListener("pointermove", move);
        button.removeEventListener("pointerleave", leave);
      });
      gsap.killTweensOf([visual, topCard, bottomCard, ...buttons]);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="hero-scroll-stage">
    <section className="hero-premium">
      <AnimatedGrid />
      <div className="hero-wave-field" aria-hidden="true">
        <svg viewBox="0 0 1440 760" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hero-wave-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="0.48" stopColor="#6366f1" stopOpacity="0.13" />
              <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hero-wave-stroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="0.3" stopColor="#60a5fa" stopOpacity="0.36" />
              <stop offset="0.68" stopColor="#8b5cf6" stopOpacity="0.42" />
              <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g className="hero-wave-field__ribbon">
            <path
              d="M-160 510 C120 360 310 650 585 495 C850 346 1035 600 1600 380 L1600 760 L-160 760 Z"
              fill="url(#hero-wave-fill)"
            />
            <path
              d="M-160 510 C120 360 310 650 585 495 C850 346 1035 600 1600 380"
              fill="none"
              stroke="url(#hero-wave-stroke)"
              strokeWidth="1.4"
            />
          </g>

          <g className="hero-wave-field__contours">
            <path d="M-180 565 C130 392 330 690 615 525 C875 376 1110 626 1610 420" />
            <path d="M-180 612 C145 430 352 722 645 558 C930 400 1140 654 1610 468" />
            <path d="M-180 658 C175 470 390 752 690 590 C980 434 1205 686 1610 520" />
          </g>

          <g className="hero-wave-field__signal">
            <path d="M-120 455 C160 320 340 575 610 438 C890 298 1090 530 1540 330" />
          </g>
        </svg>
      </div>
      <div className="container-custom hero-premium__inner">
        <div className="hero-premium__copy">
          <div className="hero-kicker">
            <span className="hero-kicker__dot" />
            <span data-gsap-scramble>
              Nepal&apos;s independent digital product studio
            </span>
          </div>
          <h1
            className="hero-premium__title"
            aria-label="Digital products built in Nepal. Designed to drive growth."
          >
            <span className="hero-line-wrap">
              <span className="hero-line">Digital products</span>
            </span>
            <span className="hero-line-wrap">
              <span className="hero-line">built in Nepal.</span>
            </span>
            <span className="hero-line-wrap">
              <span className="hero-line hero-line--muted">Designed to</span>
            </span>
            <span className="hero-line-wrap">
              <span className="hero-line hero-line--accent">drive growth.</span>
            </span>
          </h1>
          <p className="hero-copy">
            We design and engineer high-performing websites, apps and digital
            brands for ambitious companies combining clear strategy with
            obsessive craft.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="hero-button hero-button--primary">
              <span>Start a project</span>
              <ArrowRight size={18} />
            </Link>
            <Link href="/portfolio" className="hero-button hero-button--ghost">
              <Play size={16} fill="currentColor" />
              <span>Explore our work</span>
            </Link>
          </div>
          <div className="hero-proof">
            <div className="hero-avatars" aria-hidden="true">
              {["RA", "AS", "NP"].map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
            <div>
              <strong>Senior product team</strong>
              <small>
                <Check size={13} /> Strategy • design • engineering
              </small>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-visual__tilt">
            <div className="hero-visual__label">
              <Asterisk size={15} /> Live product telemetry
            </div>
            <div className="hero-dashboard-frame">
              <DashboardVisual />
            </div>
            <motion.div
              className="hero-float-card hero-float-card--top"
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
            >
              <MousePointer2 size={16} />
              <span>
                <strong>Conversion</strong>
                <small>+38.2% this quarter</small>
              </span>
            </motion.div>
            <motion.div
              className="hero-float-card hero-float-card--bottom"
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
            >
              <span className="pulse-ring" />
              <span>
                <strong>Build healthy</strong>
                <small>Deployed 2m ago</small>
              </span>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="hero-marquee" aria-label="Our core services">
        <span className="hero-marquee__light" aria-hidden="true" />
        <div className="hero-marquee__viewport">
          <div className="hero-marquee__track">
            {[0, 1].map((group) => (
              <div
                className="hero-marquee__group"
                aria-hidden={group === 1}
                key={group}
              >
                {HERO_SERVICES.map((service, index) => (
                  <span
                    className="hero-marquee__item"
                    key={`${group}-${service}`}
                  >
                    <span className="hero-marquee__index">0{index + 1}</span>
                    <span className="hero-marquee__text">{service}</span>
                    <span
                      className="hero-marquee__separator"
                      aria-hidden="true"
                    >
                      <Asterisk />
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
