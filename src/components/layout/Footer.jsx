"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Twitter,
} from "lucide-react";

const footerLinks = {
  company: [
    { label: "About us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Our services", href: "/services" },
    { label: "Selected work", href: "/portfolio" },
    { label: "Pricing", href: "/pricing" },
  ],
};

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "codeversebuild@gmail.com",
    href: "mailto:codeversebuild@gmail.com",
  },
  {
    icon: Phone,
    label: "Call",
    value: "+977 976-245-4572",
    href: "tel:+9779762454572",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+977 982-855-6757",
    href: "tel:+9779828556757",
  },
  { icon: MapPin, label: "Studio", value: "Kathmandu, Nepal" },
];

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Github, label: "GitHub" },
];

export default function Footer() {
  const [showMaintenancePopup, setShowMaintenancePopup] = useState(false);
  const closeButtonRef = useRef(null);
  const returnFocusRef = useRef(null);

  const openMaintenancePopup = useCallback(() => {
    returnFocusRef.current = document.activeElement;
    setShowMaintenancePopup(true);
  }, []);

  const closeMaintenancePopup = useCallback(() => {
    setShowMaintenancePopup(false);
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!showMaintenancePopup) return undefined;
    closeButtonRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeMaintenancePopup();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMaintenancePopup, showMaintenancePopup]);

  return (
    <footer className="premium-footer">
      <div className="premium-footer__mesh" aria-hidden="true" />
      <div
        className="premium-footer__orb premium-footer__orb--blue"
        aria-hidden="true"
      />
      <div
        className="premium-footer__orb premium-footer__orb--violet"
        aria-hidden="true"
      />

      <div className="container-custom premium-footer__inner">
        <div className="premium-footer__cta">
          <div className="premium-footer__cta-copy">
            <span className="premium-footer__eyebrow">
              <Sparkles /> Available for new projects
            </span>
            <h2>Let&apos;s build something people remember.</h2>
            <p>
              Strategy, design, and development—handled by one focused team.
            </p>
          </div>
          <Link href="/contact" className="premium-footer__cta-button">
            Start a project <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="premium-footer__grid">
          <div className="premium-footer__brand">
            <Link
              href="/"
              className="premium-footer__logo"
              aria-label="CodeVerse home"
            >
              <span className="premium-footer__logo-frame">
                <Image src="/logo_company.png" alt="" width={568} height={439} sizes="72px" />
              </span>
              <span>
                Code<strong>verse</strong>
              </span>
            </Link>
            <p>
              Digital products with sharp strategy, thoughtful design, and
              reliable engineering from Kathmandu to the world.
            </p>
            <span className="premium-footer__status">
              <i aria-hidden="true" /> Replies within one business day
            </span>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <nav
              key={title}
              className="premium-footer__links"
              aria-label={`${title} footer links`}
            >
              <h3>{title}</h3>
              <ul>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      {link.label} <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="premium-footer__contact">
            <h3>Get in touch</h3>
            <div className="premium-footer__contact-list">
              {contactItems.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <span className="premium-footer__contact-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <span>
                      <small>{label}</small>
                      <strong>{value}</strong>
                    </span>
                  </>
                );

                return href ? (
                  <a
                    key={`${label}-${value}`}
                    href={href}
                    className="premium-footer__contact-row"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={`${label}-${value}`}
                    className="premium-footer__contact-row"
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="premium-footer__wordmark" aria-hidden="true">
          <span>CodeVerse</span>
          <strong>Build</strong>
        </div>

        <div className="premium-footer__bottom">
          <p suppressHydrationWarning>
            &copy; {new Date().getFullYear()} CodeVerse. All rights reserved.
          </p>
          <p>Design. Develop. Deliver.</p>
          <nav className="premium-footer__socials" aria-label="Social media">
            {socialLinks.map(({ icon: Icon, label }) => (
              <motion.button
                key={label}
                type="button"
                onClick={openMaintenancePopup}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.94 }}
                aria-label={label}
              >
                <Icon aria-hidden="true" />
              </motion.button>
            ))}
          </nav>
        </div>
      </div>

      {showMaintenancePopup && (
        <div
          className="premium-footer__modal-backdrop"
          role="presentation"
          onClick={closeMaintenancePopup}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="social-maintenance-title"
            aria-describedby="social-maintenance-description"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="premium-footer__modal"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="premium-footer__modal-icon">
              <Sparkles aria-hidden="true" />
            </span>
            <h3 id="social-maintenance-title">
              We&apos;re polishing our socials
            </h3>
            <p id="social-maintenance-description">
              Those channels are being refreshed. You can reach us directly from
              the contact options below.
            </p>
            <button
              type="button"
              ref={closeButtonRef}
              onClick={closeMaintenancePopup}
            >
              Got it
            </button>
          </motion.div>
        </div>
      )}
    </footer>
  );
}
