import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'SiteEra - Premium Web & Mobile App Development',
  description: 'Transform your digital presence with SiteEra. We craft exceptional web and mobile applications that drive results.',
  keywords: ['web development', 'mobile app', 'digital agency', 'react', 'next.js'],
  authors: [{ name: 'SiteEra' }],
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'SiteEra - Premium Web & Mobile App Development',
    description: 'Transform your digital presence with SiteEra.',
    url: 'https://siteera.com',
    siteName: 'SiteEra',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white antialiased transition-colors duration-300" suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
