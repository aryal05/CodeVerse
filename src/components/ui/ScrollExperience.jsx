"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Observer } from "gsap/Observer";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer, CustomEase);
}

export default function ScrollExperience() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdmin || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: .9, touchMultiplier: 1.15 });
    const update = (time) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    CustomEase.create("codeverseEase", "M0,0 C0.16,1 0.3,1 1,1");
    const cleanup = [];

    const onAnchorClick = (event) => {
      const anchor = event.target.closest("a[href^='#']");
      if (!anchor) return;
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      gsap.to(window, { duration: 1, scrollTo: { y: target, offsetY: 88 }, ease: "codeverseEase" });
    };
    document.addEventListener("click", onAnchorClick);
    cleanup.push(() => document.removeEventListener("click", onAnchorClick));

    const navObserver = Observer.create({
      type: "wheel,touch,scroll",
      tolerance: 18,
      onDown: () => { if (window.scrollY > 180) gsap.to(".site-nav", { yPercent: -115, duration: .35, ease: "power2.out", overwrite: true }); },
      onUp: () => gsap.to(".site-nav", { yPercent: 0, duration: .45, ease: "codeverseEase", overwrite: true }),
    });

    ScrollTrigger.refresh();
    return () => {
      navObserver.kill();
      cleanup.forEach((fn) => fn());
    };
  }, [pathname, isAdmin]);

  return null;
}
