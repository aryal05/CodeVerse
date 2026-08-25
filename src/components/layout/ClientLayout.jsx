'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollExperience from '@/components/ui/ScrollExperience';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import CodeVerseLoader from '@/components/ui/CodeVerseLoader';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <><CodeVerseLoader enabled={false} />{children}</>;
  }

  return (
    <>
      <CodeVerseLoader enabled />
      <ScrollExperience />
      <Navbar />
      <main className="public-site-main min-h-screen">
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
