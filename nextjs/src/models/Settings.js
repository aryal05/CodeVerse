import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  // Site Info
  siteName: { type: String, default: 'Site Era' },
  tagline: { type: String, default: 'Premium Web & Mobile App Development' },
  description: { type: String },
  
  // Logo & Favicon
  logo: { type: String },
  logoWhite: { type: String },
  favicon: { type: String },
  
  // Contact Info
  email: { type: String, default: 'contact@siteera.com' },
  phone: { type: String },
  address: { type: String },
  
  // Social Links
  social: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    github: { type: String },
    youtube: { type: String }
  },
  
  // SEO
  metaTitle: { type: String },
  metaDescription: { type: String },
  metaKeywords: [{ type: String }],
  googleAnalyticsId: { type: String },
  
  // Hero Section
  hero: {
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    backgroundImage: { type: String },
    ctaText: { type: String, default: 'Get Started' },
    ctaLink: { type: String, default: '/contact' }
  },
  
  // About Section
  about: {
    title: { type: String },
    description: { type: String },
    image: { type: String },
    stats: [{
      label: { type: String },
      value: { type: String },
      icon: { type: String }
    }]
  },
  
  // Features/Services Section
  featuresTitle: { type: String, default: 'Our Services' },
  featuresSubtitle: { type: String },
  
  // Portfolio Section
  portfolioTitle: { type: String, default: 'Our Work' },
  portfolioSubtitle: { type: String },
  
  // Testimonials Section
  testimonialsTitle: { type: String, default: 'What Clients Say' },
  testimonialsSubtitle: { type: String },
  
  // Team Section
  teamTitle: { type: String, default: 'Meet Our Team' },
  teamSubtitle: { type: String },
  
  // Blog Section
  blogTitle: { type: String, default: 'Latest Insights' },
  blogSubtitle: { type: String },
  
  // CTA Section
  cta: {
    title: { type: String },
    description: { type: String },
    buttonText: { type: String, default: 'Contact Us' },
    backgroundImage: { type: String }
  },
  
  // Footer
  footer: {
    copyright: { type: String },
    description: { type: String },
    quickLinks: [{ label: String, url: String }],
    services: [{ label: String, url: String }]
  },
  
  // Colors/Theme (optional customization)
  theme: {
    primaryColor: { type: String, default: '#6366f1' },
    secondaryColor: { type: String, default: '#8b5cf6' },
    accentColor: { type: String, default: '#f59e0b' }
  },
  
  // Maintenance Mode
  maintenanceMode: { type: Boolean, default: false },
  maintenanceMessage: { type: String },
  
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
