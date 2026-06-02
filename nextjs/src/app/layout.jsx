import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata = {
  title: 'Site Era - Premium Web & Mobile App Development',
  description: 'Transform your digital presence with Site Era. We craft exceptional web and mobile applications that drive results.',
  keywords: ['web development', 'mobile app', 'digital agency', 'react', 'next.js'],
  authors: [{ name: 'Site Era' }],
  openGraph: {
    title: 'Site Era - Premium Web & Mobile App Development',
    description: 'Transform your digital presence with Site Era.',
    url: 'https://siteera.com',
    siteName: 'Site Era',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-primary text-text-primary antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
