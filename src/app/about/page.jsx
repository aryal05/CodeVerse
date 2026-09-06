import AboutPage from '@/components/pages/AboutPage';

export const metadata = {
  title: 'About Our Nepal IT Company',
  description: 'Meet CodeVerse Build, a Kathmandu-based IT company helping organizations turn ideas into effective websites, apps, and digital products.',
  alternates: { canonical: '/about' },
};

export default function About() {
  return <AboutPage />;
}
