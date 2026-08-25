"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BarChart3, Briefcase, ChevronLeft, DollarSign, FileText, FolderKanban, LayoutDashboard, LogOut, MessageSquare, PanelLeftClose, Settings, Star, UserCog, Users, X } from "lucide-react";

const groups = [
  { label: "Overview", items: [[LayoutDashboard,"Dashboard","/admin/dashboard"],[BarChart3,"Analytics","/admin/dashboard/analytics"]] },
  { label: "Content", items: [[FolderKanban,"Projects","/admin/dashboard/projects"],[Briefcase,"Services","/admin/dashboard/services"],[DollarSign,"Pricing","/admin/dashboard/pricing"],[FileText,"Blog posts","/admin/dashboard/blog"]] },
  { label: "People", items: [[UserCog,"Users & access","/admin/dashboard/users"],[Users,"Team","/admin/dashboard/team"],[Star,"Testimonials","/admin/dashboard/testimonials"],[MessageSquare,"Messages","/admin/dashboard/messages"]] },
];

export default function AdminSidebar({ onLogout }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const listener = () => setMobileOpen((value) => !value);
    window.addEventListener("admin-sidebar-toggle", listener);
    return () => window.removeEventListener("admin-sidebar-toggle", listener);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--admin-sidebar", collapsed ? "88px" : "272px");
    return () => document.documentElement.style.removeProperty("--admin-sidebar");
  }, [collapsed]);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      {mobileOpen && <button className="admin-sidebar-backdrop" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
      <motion.aside className={`admin-sidebar ${collapsed ? "is-collapsed" : ""} ${mobileOpen ? "is-mobile-open" : ""}`} animate={{ width: collapsed ? 88 : 272 }} transition={{ duration: .25, ease: [0.22,1,0.36,1] }}>
        <div className="admin-sidebar__brand">
          <Link href="/admin/dashboard" className="admin-brand"><span className="admin-brand__logo"><img src="/logo_company.png" alt="CodeVerse" /></span>{!collapsed && <div>Command center<small>Website administration</small></div>}</Link>
          <button className="admin-mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={18} /></button>
        </div>
        <nav className="admin-sidebar__nav">
          {groups.map((group) => (
            <div className="admin-nav-group" key={group.label}>
              {!collapsed && <p>{group.label}</p>}
              {group.items.map(([Icon,label,href]) => {
                const active = href === "/admin/dashboard" ? pathname === href : pathname.startsWith(href);
                return <Link key={href} href={href} className={active ? "active" : ""} title={collapsed ? label : undefined}><Icon size={18} />{!collapsed && <span>{label}</span>}{active && <i />}</Link>;
              })}
            </div>
          ))}
          <div className="admin-nav-group admin-nav-group--settings">
            <Link href="/admin/dashboard/settings" className={pathname.startsWith("/admin/dashboard/settings") ? "active" : ""}><Settings size={18} />{!collapsed && <span>Settings</span>}</Link>
          </div>
        </nav>
        <div className="admin-sidebar__footer">
          {!collapsed && <div className="admin-user"><span>RA</span><div><strong>Rajat Aryal</strong><small>Administrator</small></div></div>}
          <button onClick={onLogout} className="admin-logout" title="Sign out"><LogOut size={18} />{!collapsed && <span>Sign out</span>}</button>
          <button onClick={() => setCollapsed(!collapsed)} className="admin-collapse" aria-label="Collapse sidebar">{collapsed ? <PanelLeftClose size={18} className="rotate-180" /> : <><ChevronLeft size={17} /> Collapse</>}</button>
        </div>
      </motion.aside>
    </>
  );
}
