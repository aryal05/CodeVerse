"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FLOW_SECTION_SELECTOR =
  ".public-site-main section:not(.hero-premium):not(.page-header):not(.detail-hero):not(.portfolio-filter)";
const FLOW_CONTENT_SELECTOR =
  ":scope > .container-custom, :scope > .container, :scope > [class*='container']";

export default function ScrollExperience() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (
      isAdmin ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const media = gsap.matchMedia();

    media.add("(min-width: 768px)", () => {
      const pageHeader = document.querySelector(
        ".page-header [data-page-header-content], .detail-hero > .container",
      );

      if (pageHeader) {
        gsap.to(pageHeader, {
          y: 74,
          autoAlpha: 0.52,
          force3D: true,
          ease: "none",
          scrollTrigger: {
            trigger: pageHeader.closest("section"),
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      gsap.utils.toArray(FLOW_SECTION_SELECTOR).forEach((section) => {
        const content = section.querySelector(FLOW_CONTENT_SELECTOR);
        if (!content) return;

        gsap.fromTo(
          content,
          { y: 58 },
          {
            y: 0,
            force3D: true,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 94%",
              end: "top 62%",
              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    });

    media.add("(max-width: 767px)", () => {
      gsap.utils.toArray(FLOW_SECTION_SELECTOR).forEach((section) => {
        const content = section.querySelector(FLOW_CONTENT_SELECTOR);
        if (!content) return;

        gsap.fromTo(
          content,
          { y: 24 },
          {
            y: 0,
            duration: 0.65,
            force3D: true,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: section,
              start: "top 92%",
              once: true,
            },
          },
        );
      });
    });

    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      media.revert();
    };
  }, [pathname, isAdmin]);

  return null;
}
