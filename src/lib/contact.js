export const WHATSAPP_MESSAGE =
  "Hello CodeVerse Build! I'm interested in your digital services and would like to discuss a project. Please guide me through the next steps. Thank you.";

export const WHATSAPP_URL =
  `https://wa.me/9779828556757?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const WHATSAPP_CONFIRMATION =
  "Thank you for reaching out. Our team will guide you shortly.";

export function announceWhatsAppOpen() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("codeverse:whatsapp-opened"));
  }
}
