import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/models/Project';
import Service from '@/models/Service';
import Blog from '@/models/Blog';
import Team from '@/models/Team';
import Testimonial from '@/models/Testimonial';
import Settings from '@/models/Settings';
import User from '@/models/User';

export async function POST() {
  try {
    await connectDB();

    // Clear existing data
    await Promise.all([
      Project.deleteMany({}),
      Service.deleteMany({}),
      Blog.deleteMany({}),
      Team.deleteMany({}),
      Testimonial.deleteMany({}),
      Settings.deleteMany({}),
      User.deleteMany({})
    ]);

    // Create Admin User
    const admin = new User({
      username: 'admin',
      password: 'admin123'
    });
    await admin.save();

    // Create Settings
    const settings = new Settings({
      siteName: 'Site Era',
      tagline: 'Premium Web & Mobile App Development',
      description: 'We transform ideas into exceptional digital experiences',
      email: 'contact@siteera.com',
      phone: '+977-9762454572',
      address: 'Kathmandu, Nepal',
      social: {
        facebook: 'https://facebook.com/siteera',
        twitter: 'https://twitter.com/siteera',
        instagram: 'https://instagram.com/siteera',
        linkedin: 'https://linkedin.com/company/siteera',
        github: 'https://github.com/siteera'
      },
      hero: {
        title: 'Transform Your Digital Presence',
        subtitle: 'Premium Web & Mobile App Development',
        description: 'We craft exceptional digital experiences that drive results.',
        ctaText: 'Start Your Project',
        ctaLink: '/contact'
      }
    });
    await settings.save();

    // Create Services
    const services = await Service.create([
      {
        title: 'Web Development',
        slug: 'web-development',
        shortDescription: 'Custom websites built with modern technologies',
        description: 'We build fast, responsive, and scalable web applications.',
        icon: 'globe',
        technologies: ['React', 'Next.js', 'Node.js', 'TypeScript'],
        featured: true,
        order: 1
      },
      {
        title: 'Mobile App Development',
        slug: 'mobile-app-development',
        shortDescription: 'Native and cross-platform mobile apps',
        description: 'Beautiful, high-performance mobile applications for iOS and Android.',
        icon: 'smartphone',
        technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
        featured: true,
        order: 2
      },
      {
        title: 'UI/UX Design',
        slug: 'ui-ux-design',
        shortDescription: 'Beautiful and intuitive user interfaces',
        description: 'User-centered interfaces that are both beautiful and functional.',
        icon: 'pen-tool',
        featured: true,
        order: 3
      }
    ]);

    // Create Projects
    const projects = await Project.create([
      {
        title: 'E-commerce Platform',
        slug: 'ecommerce-platform',
        description: 'Complete e-commerce solution with 40% conversion increase.',
        category: 'Web Development',
        technologies: ['Next.js', 'Stripe', 'PostgreSQL'],
        featured: true,
        order: 1,
        status: 'completed'
      },
      {
        title: 'Fitness Tracking App',
        slug: 'fitness-tracking-app',
        description: 'Cross-platform mobile app for tracking workouts.',
        category: 'Mobile App',
        technologies: ['React Native', 'Firebase'],
        featured: true,
        order: 2,
        status: 'completed'
      }
    ]);

    // Create Team
    const team = await Team.create([
      {
        name: 'Rajat Aryal',
        role: 'Founder & CEO',
        shortBio: 'Visionary leader with 10+ years in tech',
        bio: 'Rajat founded Site Era with a vision to help businesses succeed digitally.',
        featured: true,
        order: 1,
        active: true
      }
    ]);

    // Create Testimonials
    const testimonials = await Testimonial.create([
      {
        name: 'John Davidson',
        role: 'CEO',
        company: 'TechStart Inc.',
        content: 'Site Era transformed our website into a modern, high-converting platform.',
        rating: 5,
        featured: true,
        order: 1
      }
    ]);

    // Create Blog
    const blog = await Blog.create([
      {
        title: 'The Future of Web Development',
        slug: 'future-of-web-development',
        excerpt: 'Explore the latest trends shaping web development.',
        content: '<p>The web development landscape is constantly evolving...</p>',
        author: { name: 'Rajat Aryal' },
        category: 'Technology',
        tags: ['Web Development', 'Trends'],
        published: true,
        featured: true
      }
    ]);

    return NextResponse.json({
      message: 'Database seeded successfully!',
      data: {
        admin: { username: 'admin', password: 'admin123' },
        services: services.length,
        projects: projects.length,
        team: team.length,
        testimonials: testimonials.length,
        blog: blog.length
      }
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
