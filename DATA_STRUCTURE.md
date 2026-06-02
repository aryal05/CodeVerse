# Site Era - Data Structure Overview

All your website data is stored in **MongoDB Atlas** with comprehensive fields for everything.

## 📊 Data Models

### 1. **Settings** (Site-wide Configuration)
```javascript
{
  siteName: "Site Era",
  tagline: "Premium Web & Mobile App Development",
  email: "contact@siteera.com",
  phone: "+1 (555) 123-4567",
  address: "123 Tech Street, San Francisco, CA 94102",
  logo: "base64-image-string",
  logoWhite: "base64-image-string",
  favicon: "base64-image-string",
  social: {
    facebook: "url",
    twitter: "url",
    instagram: "url",
    linkedin: "url",
    github: "url",
    youtube: "url"
  },
  hero: {
    title: "Transform Your Digital Presence",
    subtitle: "Premium Web & Mobile App Development",
    description: "We craft exceptional digital experiences...",
    backgroundImage: "base64-image-string",
    ctaText: "Start Your Project",
    ctaLink: "/contact"
  },
  about: {
    title: "Who We Are",
    description: "Site Era is a full-service digital agency...",
    image: "base64-image-string",
    stats: [
      { label: "Projects Completed", value: "150+", icon: "briefcase" },
      { label: "Happy Clients", value: "50+", icon: "users" }
    ]
  },
  cta: {
    title: "Ready to Start Your Project?",
    description: "Let us help you turn your ideas into reality",
    backgroundImage: "base64-image-string"
  },
  theme: {
    primaryColor: "#6366f1",
    secondaryColor: "#8b5cf6",
    accentColor: "#f59e0b"
  }
}
```

### 2. **Services** (Your Services with Images)
```javascript
{
  title: "Web Development",
  slug: "web-development",
  shortDescription: "Custom websites built with modern technologies",
  description: "Full description of the service...",
  image: "base64-image-string",           // Main service image
  icon: "icon-name",
  features: [
    { title: "Custom Design", description: "...", icon: "palette" },
    { title: "Responsive", description: "...", icon: "smartphone" }
  ],
  process: [
    { step: 1, title: "Discovery", description: "..." },
    { step: 2, title: "Design", description: "..." }
  ],
  technologies: ["React", "Next.js", "Node.js"],
  pricing: {
    basic: { name: "Starter", price: "$2,999", features: [...] },
    standard: { name: "Business", price: "$5,999", features: [...] },
    premium: { name: "Enterprise", price: "$9,999+", features: [...] }
  },
  faq: [
    { question: "How long does it take?", answer: "..." }
  ],
  featured: true,
  active: true,
  metaTitle: "...",
  metaDescription: "..."
}
```

### 3. **Projects/Portfolio** (Portfolio with Gallery)
```javascript
{
  title: "E-commerce Platform Redesign",
  slug: "ecommerce-platform-redesign",
  description: "Short description...",
  fullDescription: "Detailed project description...",
  category: "Web Development",
  image: "base64-image-string",           // Main portfolio image
  gallery: [                              // Multiple project images
    "base64-image-1",
    "base64-image-2",
    "base64-image-3"
  ],
  technologies: ["Next.js", "Stripe", "PostgreSQL"],
  client: "Fashion Retail Co.",
  duration: "3 months",
  link: "https://live-site.com",
  github: "https://github.com/...",
  featured: true,
  status: "completed",  // completed | in-progress | planning
  order: 1
}
```

### 4. **Blog Posts** (Articles with Images)
```javascript
{
  title: "The Future of Web Development in 2024",
  slug: "future-of-web-development-2024",
  excerpt: "Short summary...",
  content: "<p>Full HTML content...</p>",
  image: "base64-image-string",           // Featured image
  gallery: ["base64-image-1", "base64-image-2"],  // Article images
  author: {
    name: "Michael Rodriguez",
    avatar: "base64-image-string",
    bio: "Senior Developer at Site Era"
  },
  category: "Technology",
  tags: ["Web Development", "Trends", "AI"],
  readTime: "5 min",
  published: true,
  featured: true,
  views: 150,
  likes: 24
}
```

### 5. **Team Members** (Team with Photos & Social)
```javascript
{
  name: "Rajat Aryal",
  role: "Founder & CEO",
  shortBio: "Visionary leader with 10+ years in tech",
  bio: "Full biography...",
  image: "base64-image-string",           // Team member photo
  email: "rajat@siteera.com",
  phone: "+1...",
  social: {
    linkedin: "url",
    twitter: "url",
    github: "url",
    instagram: "url",
    facebook: "url",
    website: "url"
  },
  skills: [
    { name: "Strategic Planning", level: 95 },
    { name: "Team Leadership", level: 90 }
  ],
  education: [
    { degree: "MBA", institution: "Stanford", year: "2015" }
  ],
  experience: [
    { position: "CTO", company: "TechCorp", duration: "2018-2022" }
  ],
  awards: [
    { title: "Best Tech Startup", year: "2023" }
  ],
  featured: true,
  order: 1,
  active: true
}
```

### 6. **Testimonials** (Client Reviews)
```javascript
{
  name: "John Davidson",
  role: "CEO",
  company: "TechStart Inc.",
  content: "Site Era transformed our outdated website...",
  image: "base64-image-string",           // Client photo (optional)
  rating: 5,                              // 1-5 stars
  featured: true,
  order: 1
}
```

### 7. **Messages** (Contact Form Submissions)
```javascript
{
  name: "Client Name",
  email: "client@example.com",
  subject: "Project Inquiry",
  message: "Message content...",
  read: false,
  createdAt: "2024-01-15T10:30:00Z"
}
```

### 8. **Newsletter Subscribers**
```javascript
{
  email: "subscriber@example.com",
  subscribed: true,
  createdAt: "2024-01-15T10:30:00Z"
}
```

### 9. **Users** (Admin Accounts)
```javascript
{
  username: "admin",
  password: "hashed-password",
  role: "admin",
  createdAt: "2024-01-15T10:30:00Z"
}
```

---

## 🖼️ Image Storage

All images are stored as **Base64 strings** in MongoDB:
- Main images for Services, Projects, Blog, Team
- Gallery images (multiple) for Projects and Blog
- Logo, Favicon, Hero backgrounds
- Team member photos
- Testimonial client photos

**API Endpoints for Data:**

| Endpoint | Description |
|----------|-------------|
| `GET /api/settings` | Site configuration |
| `GET /api/services` | All services |
| `GET /api/projects` | All portfolio items |
| `GET /api/projects?featured=true` | Featured projects only |
| `GET /api/blog` | All blog posts |
| `GET /api/team` | All team members |
| `GET /api/testimonials` | All testimonials |
| `GET /api/messages` | Contact form submissions |
| `POST /api/upload` | Upload images (Base64) |
| `POST /api/seed` | Reset & populate sample data |

---

## 🚀 Getting Started

1. **Create MongoDB Atlas account** → Get connection string
2. **Deploy to Vercel** → Set `MONGODB_URI` environment variable
3. **Seed database** → Call `POST /api/seed` to populate initial data
4. **Admin login** → Use `admin` / `admin123` to access dashboard

**All your data (images, content, settings) is securely stored in MongoDB and ready to use!** ✅
