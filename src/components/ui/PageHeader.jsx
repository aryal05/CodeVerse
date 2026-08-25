"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import AnimatedGrid from "@/components/ui/AnimatedGrid";

const PageHeader = ({ badge, title, titleHighlight, description }) => {
  const root = useRef(null);

  useEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    gsap.registerPlugin(ScrambleTextPlugin);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-page-header-content] > div > *",
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, stagger: .1, duration: .82, ease: "power3.out", delay: .06 },
      );

      const label = element.querySelector("[data-gsap-scramble]");
      if (label) {
        gsap.to(label, {
          duration: .72,
          scrambleText: { text: label.textContent, chars: "upperCase", revealDelay: .06, speed: .45 },
          ease: "none",
          delay: .12,
        });
      }
    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-white dark:bg-gray-950 relative overflow-hidden">
      <AnimatedGrid />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-400/20 dark:bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10" data-page-header-content>
        <div className="max-w-4xl mx-auto text-center">
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800/50 rounded-full mb-6">
              <span data-gsap-scramble className="text-sm font-medium text-primary-700 dark:text-primary-400">
                {badge}
              </span>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {title}
            {titleHighlight && (
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-purple-600 to-cyan-600">
                {titleHighlight}
              </span>
            )}
          </h1>

          {description && (
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
