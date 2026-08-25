"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BadgeDollarSign,
  Briefcase,
  Building2,
  Home,
  Layers3,
  PhoneCall,
} from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Building2 },
  { href: "/services", label: "Expertise", icon: Layers3 },
  { href: "/portfolio", label: "Work", icon: Briefcase },
  { href: "/pricing", label: "Pricing", icon: BadgeDollarSign },
];

const subscribeToScroll = (callback) => {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
};
const getScrollSnapshot = () => window.scrollY > 24;
const getServerScrollSnapshot = () => false;

const isCurrentRoute = (pathname, href) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export default function Navbar() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getServerScrollSnapshot,
  );

  return (
    <>
      <header className={scrolled ? "site-nav site-nav--scrolled" : "site-nav"}>
        <div className="container-custom site-nav__inner">
          <Link href="/" className="brand-mark" aria-label="CodeVerse home">
            <span className="brand-logo-frame">
              <img src="/logo_company.png" alt="CodeVerse — Design, Develop, Deliver" />
            </span>
          </Link>

          <nav className="site-nav__links" aria-label="Main navigation">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className={isCurrentRoute(pathname, href) ? "active" : ""}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="site-nav__actions">
            <ThemeToggle />
            <Link href="/contact" className="nav-cta">
              Let&apos;s talk <ArrowUpRight size={16} />
            </Link>
            <a href="tel:+9779828556757" className="mobile-call-button" aria-label="Call CodeVerse at 9828556757">
              <span className="mobile-call-button__ring" aria-hidden="true" />
              <PhoneCall aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        {links.map(({ href, label, icon: Icon }) => {
          const active = isCurrentRoute(pathname, href);
          return (
            <Link key={href} href={href} className={active ? "active" : ""} aria-current={active ? "page" : undefined}>
              <span className="mobile-bottom-nav__icon"><Icon aria-hidden="true" /></span>
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
