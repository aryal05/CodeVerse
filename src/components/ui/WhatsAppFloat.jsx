"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, MessageCircle } from "lucide-react";
import {
  announceWhatsAppOpen,
  WHATSAPP_CONFIRMATION,
  WHATSAPP_URL,
} from "@/lib/contact";

export default function WhatsAppFloat() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    const showNotice = () => {
      window.clearTimeout(timer.current);
      setShowConfirmation(true);
      timer.current = window.setTimeout(() => setShowConfirmation(false), 4200);
    };

    window.addEventListener("codeverse:whatsapp-opened", showNotice);
    return () => {
      window.removeEventListener("codeverse:whatsapp-opened", showNotice);
      window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="whatsapp-confirmation"
            role="status"
            initial={{ opacity: 0, y: 12, scale: .96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: .98 }}
          >
            <CheckCircle2 aria-hidden="true" />
            <span><strong>Message ready</strong><small>{WHATSAPP_CONFIRMATION}</small></span>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={announceWhatsAppOpen}
        className="whatsapp-float group"
        aria-label="Message CodeVerse Build on WhatsApp at 9828556757"
        initial={{ opacity: 0, scale: 0.8, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ y: -4, scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <span className="whatsapp-float__pulse" aria-hidden="true" />
        <span className="whatsapp-float__label">
          <strong>Chat with us</strong>
          <small>Typically replies quickly</small>
        </span>
        <span className="whatsapp-float__icon" aria-hidden="true">
          <MessageCircle />
        </span>
      </motion.a>
    </>
  );
}
