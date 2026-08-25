"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const LOADER_STATE_KEY = "__codeverse_loader_state__";

function getLoaderState() {
  if (!window[LOADER_STATE_KEY]) {
    window[LOADER_STATE_KEY] = {
      status: "idle",
      subscribers: new Set(),
      previousOverflow: "",
      gridTween: null,
      timeout: null,
    };
  }
  return window[LOADER_STATE_KEY];
}

function completeLoader(state) {
  if (state.status === "complete") return;
  state.status = "complete";
  if (state.timeout) window.clearTimeout(state.timeout);
  state.gridTween?.kill();
  document.body.style.overflow = state.previousOverflow;
  state.subscribers.forEach((hide) => hide());
  state.gridTween = null;
  state.timeout = null;
}

export default function CodeVerseLoader({ enabled = true }) {
  const root = useRef(null);
  const percentage = useRef(null);
  const [visible, setVisible] = useState(enabled);

  useEffect(() => {
    const loaderState = getLoaderState();
    const hide = () => setVisible(false);

    if (!enabled) {
      // A document first opened on an admin route must not show the public
      // loader later during client-side navigation.
      if (loaderState.status === "idle") loaderState.status = "complete";
      setVisible(false);
      return undefined;
    }

    loaderState.subscribers.add(hide);

    if (loaderState.status === "complete") {
      hide();
      return () => loaderState.subscribers.delete(hide);
    }

    // React Strict Mode runs effects twice in development. The animation is
    // owned by the browser document, so a remount only subscribes to the
    // existing run instead of constructing a second timeline.
    if (loaderState.status === "running" || !root.current) {
      return () => loaderState.subscribers.delete(hide);
    }

    loaderState.status = "running";
    const element = root.current;
    loaderState.previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      loaderState.timeout = window.setTimeout(() => completeLoader(loaderState), 450);
      return () => loaderState.subscribers.delete(hide);
    }

    gsap.context(() => {
      const progress = { value: 0 };
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => completeLoader(loaderState),
      });

      timeline
        .to(".codeverse-loader__grid", { opacity: .55, scale: 1, duration: .45 })
        .to(".codeverse-loader__brand-panel", { autoAlpha: 1, y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0% round 24px)", duration: .72, ease: "power4.out" }, "-=.18")
        .to(".codeverse-loader__logo", { autoAlpha: 1, scale: 1, duration: .48 }, "-=.36")
        .to(".codeverse-loader__brand-meta", { autoAlpha: 1, y: 0, duration: .35 }, "-=.28")
        .to(".codeverse-loader__copy > *", { autoAlpha: 1, y: 0, stagger: .07, duration: .48 }, "-=.18")
        .to(".codeverse-loader__progress span", { scaleX: 1, duration: 1.05, ease: "power2.inOut" }, "-=.18")
        .to(progress, {
          value: 100,
          duration: 1.05,
          ease: "power2.inOut",
          onUpdate: () => {
            if (percentage.current) percentage.current.textContent = String(Math.round(progress.value)).padStart(2, "0");
          },
        }, "<")
        .to(".codeverse-loader__content", { autoAlpha: 0, y: -12, scale: .985, duration: .34, ease: "power2.in" }, "+=.08")
        .to(element, { clipPath: "inset(0 0 100% 0)", duration: .68, ease: "power4.inOut" }, "-=.04");

      loaderState.gridTween = gsap.to(".codeverse-loader__grid", {
        backgroundPosition: "64px 64px",
        duration: 2.8,
        ease: "none",
      });
    }, element);

    return () => loaderState.subscribers.delete(hide);
  }, [enabled]);

  if (!visible) return null;

  return (
    <div ref={root} className="codeverse-loader" role="status" aria-live="polite" aria-label="CodeVerse is preparing your experience">
      <div className="codeverse-loader__grid" aria-hidden="true" />
      <div className="codeverse-loader__wash" aria-hidden="true" />
      <div className="codeverse-loader__content">
        <div className="codeverse-loader__brand-panel">
          <div className="codeverse-loader__brand-top" aria-hidden="true">
            <span>CV / 01</span>
            <i />
          </div>
          <div className="codeverse-loader__logo-viewport">
            <img className="codeverse-loader__logo" src="/logo_company.png" alt="" />
          </div>
          <div className="codeverse-loader__brand-meta" aria-hidden="true"><i /> Digital studio online</div>
        </div>
        <div className="codeverse-loader__copy">
          <p>Design. Develop. Deliver.</p>
          <h1>Ideas engineered<br /><span>into impact.</span></h1>
          <div className="codeverse-loader__progress-meta">
            <span>Preparing your experience</span>
            <strong><span ref={percentage}>00</span>%</strong>
          </div>
          <div className="codeverse-loader__progress" aria-hidden="true"><span /></div>
        </div>
      </div>
    </div>
  );
}
