"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, ChevronDown, ExternalLink, LogOut, Menu, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminHeader({ title, onLogout }) {
  const [notifications, setNotifications] = useState(false);
  const [profile, setProfile] = useState(false);
  const today = new Intl.DateTimeFormat("en", { weekday: "short", month: "short", day: "numeric" }).format(new Date());

  return (
    <header className="admin-header">
      <div className="admin-header__title">
        <Button variant="outline" size="icon" className="admin-header__mobile-menu" onClick={() => window.dispatchEvent(new Event("admin-sidebar-toggle"))} aria-label="Open navigation"><Menu size={20} /></Button>
        <div><span>{today}</span><h1>{title}</h1></div>
      </div>
      <div className="admin-header__actions">
        <label className="admin-search"><Search size={17} /><input type="search" placeholder="Search anything…" aria-label="Search dashboard" /><kbd>⌘ K</kbd></label>
        <Link className="admin-icon-button admin-view-site" href="/" target="_blank" aria-label="View website"><ExternalLink size={18} /></Link>
        <div className="admin-popover-wrap">
          <Button variant="outline" size="icon" className="admin-icon-button" onClick={() => { setNotifications(!notifications); setProfile(false); }} aria-label="Notifications"><Bell size={18} /><i /></Button>
          <AnimatePresence>{notifications && <motion.div className="admin-popover admin-notifications" initial={{ opacity:0,y:8,scale:.98 }} animate={{ opacity:1,y:0,scale:1 }} exit={{ opacity:0,y:8,scale:.98 }}>
            <div className="admin-popover__head"><strong>Notifications</strong><span>2 new</span></div>
            {["New project enquiry received","A testimonial is ready to review","Website content was updated"].map((item,index) => <button key={item}><i className={index < 2 ? "unread" : ""} /><span>{item}<small>{index === 0 ? "5 minutes ago" : index === 1 ? "2 hours ago" : "Yesterday"}</small></span></button>)}
          </motion.div>}</AnimatePresence>
        </div>
        <div className="admin-popover-wrap">
          <button className="admin-profile-button" onClick={() => { setProfile(!profile); setNotifications(false); }}><span>RA</span><div><strong>Rajat</strong><small>Admin</small></div><ChevronDown size={15} /></button>
          <AnimatePresence>{profile && <motion.div className="admin-popover admin-profile-menu" initial={{ opacity:0,y:8,scale:.98 }} animate={{ opacity:1,y:0,scale:1 }} exit={{ opacity:0,y:8,scale:.98 }}>
            <Link href="/admin/dashboard/settings"><Settings size={16} /> Settings</Link>
            <button onClick={onLogout}><LogOut size={16} /> Sign out</button>
          </motion.div>}</AnimatePresence>
        </div>
      </div>
    </header>
  );
}
