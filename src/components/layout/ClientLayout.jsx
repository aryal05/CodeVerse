'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return children;
  }

  return (
    <>
      <a className="skip-to-content" href="#main-content">Skip to main content</a>
      <Navbar />
      <main id="main-content" className="public-site-main min-h-screen" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
