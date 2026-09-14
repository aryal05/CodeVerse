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

    let cancelled = false;
    let media = null;
    let refreshFrame = null;
    let idleHandle = null;
    let timeoutHandle = null;

    const initialize = () => {
      if (cancelled) return;
      media = gsap.matchMedia();

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
            immediateRender: false,
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
            immediateRender: false,
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

      refreshFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    // This component can hydrate before streamed page sections. Waiting for an
    // idle turn prevents GSAP from adding inline transforms during hydration.
    if ("requestIdleCallback" in window) {
      idleHandle = window.requestIdleCallback(initialize, { timeout: 500 });
    } else {
      timeoutHandle = window.setTimeout(initialize, 96);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== null) window.cancelIdleCallback(idleHandle);
      if (timeoutHandle !== null) window.clearTimeout(timeoutHandle);
      if (refreshFrame !== null) window.cancelAnimationFrame(refreshFrame);
      media?.revert();
    };
  }, [pathname, isAdmin]);

  return null;
}
