import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'IT Company in Nepal | CodeVerse Build',
    template: '%s | CodeVerse Build',
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: ['IT company in Nepal', 'software company in Nepal', 'web development company Nepal', 'mobile app development Nepal', 'UI UX design Nepal', 'Kathmandu IT company'],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: '/' },
  category: 'technology',
  referrer: 'origin-when-cross-origin',
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: '/logo_company.png',
    apple: '/logo_company.png',
  },
  openGraph: {
    title: 'IT Company in Nepal | CodeVerse Build',
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_NP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Company in Nepal | CodeVerse Build',
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white antialiased transition-colors duration-300" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['Organization', 'ProfessionalService'],
              '@id': `${SITE_URL}/#organization`,
              name: SITE_NAME,
              alternateName: 'CodeVerse',
              url: SITE_URL,
              logo: `${SITE_URL}/logo_company.png`,
              image: `${SITE_URL}/opengraph-image`,
              description: DEFAULT_DESCRIPTION,
              email: 'codeversebuild@gmail.com',
              telephone: '+977-976-245-4572',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Kathmandu',
                addressCountry: 'NP',
              },
              areaServed: [{ '@type': 'Country', name: 'Nepal' }, { '@type': 'Place', name: 'Worldwide' }],
              knowsAbout: ['Web Development', 'Mobile App Development', 'UI/UX Design', 'Software Development', 'Digital Product Strategy'],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+977-976-245-4572',
                contactType: 'sales',
                areaServed: 'NP',
                availableLanguage: ['English', 'Nepali'],
              },
            }).replace(/</g, '\\u003c'),
          }}
        />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
