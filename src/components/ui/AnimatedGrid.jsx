"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const points = [[8,14],[19,38],[31,20],[42,61],[53,31],[64,76],[76,17],[87,48],[94,80],[14,83],[37,91],[69,54]];
const runners = [[18,31],[34,57],[63,23],[78,69],[91,39]];

export default function AnimatedGrid({ dark = false }) {
  const root = useRef(null);

  useEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const perspective = element.querySelector(".animated-grid__perspective");
    const spotlight = element.querySelector(".animated-grid__spotlight");
    let disposed = false;

    const ctx = gsap.context(() => {
      gsap.fromTo(".grid-beam-x--one", { x: 0 }, { x: () => window.innerWidth * 1.55, duration: 6.5, repeat: -1, ease: "none", repeatRefresh: true });
      gsap.fromTo(".grid-beam-x--two", { x: 0 }, { x: () => window.innerWidth * 1.55, duration: 9, delay: 2.4, repeat: -1, ease: "none", repeatRefresh: true });
      gsap.fromTo(".grid-beam-y--one", { y: 0 }, { y: () => element.offsetHeight * 1.55, duration: 8, delay: 1, repeat: -1, ease: "none", repeatRefresh: true });
      gsap.fromTo(".grid-beam-y--two", { y: 0 }, { y: () => element.offsetHeight * 1.55, duration: 11, delay: 4.2, repeat: -1, ease: "none", repeatRefresh: true });
      gsap.to(".grid-node", { opacity: .95, scale: 2.5, duration: 1.4, repeat: -1, yoyo: true, stagger: { each: .28, from: "random" }, ease: "sine.inOut" });
      gsap.to(".grid-runner", { backgroundPosition: "200% 0", duration: 2.8, repeat: -1, stagger: .35, ease: "none" });
      gsap.to(".animated-grid__plane", { backgroundPosition: "64px 64px", duration: 8, repeat: -1, ease: "none" });
    }, element);

    const move = (event) => {
      if (disposed || !element.isConnected || !perspective || !spotlight) return;
      const x = (event.clientX / window.innerWidth - .5) * 20;
      const y = (event.clientY / window.innerHeight - .5) * 14;
      gsap.to(perspective, { x, y, duration: 1.1, ease: "power3.out", overwrite: "auto" });
      gsap.to(spotlight, { x: event.clientX, y: event.clientY, duration: .8, ease: "power3.out", overwrite: "auto" });
    };
    window.addEventListener("pointermove", move, { passive: true });

    return () => {
      disposed = true;
      window.removeEventListener("pointermove", move);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className={`animated-grid ${dark ? "animated-grid--dark" : ""}`} aria-hidden="true">
      <div className="animated-grid__perspective">
        <div className="animated-grid__plane" />
        <div className="grid-beam-x grid-beam-x--one" />
        <div className="grid-beam-x grid-beam-x--two" />
        <div className="grid-beam-y grid-beam-y--one" />
        <div className="grid-beam-y grid-beam-y--two" />
        {points.map(([left, top], index) => <span key={index} className="grid-node" style={{ left: `${left}%`, top: `${top}%` }} />)}
        {runners.map(([left, top], index) => <span key={index} className="grid-runner" style={{ left: `${left}%`, top: `${top}%` }} />)}
      </div>
      <div className="animated-grid__spotlight" />
      <div className="animated-grid__fade" />
    </div>
  );
}
