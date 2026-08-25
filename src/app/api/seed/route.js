import { NextResponse } from "next/server";
import { getDb, handleApiError } from "@/lib/api-helpers";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const db = getDb();

    // --- Admin user ---
    const password_hash = await bcrypt.hash("admin123", 10);
    await db
      .from("users")
      .upsert(
        {
          username: "admin",
          email: "admin@codeverse.com",
          password_hash,
          role: "admin",
          active: true,
        },
        { onConflict: "username" },
      );

    // --- Settings ---
    await db.from("settings").upsert(
      [
        {
          key: "site_info",
          value: {
            name: "Codeverse",
            tagline: "Premium Web & Mobile App Development",
            email: "codeversebuild@gmail.com",
            phone: "+977-9762454572",
            phones: ["+977-9762454572", "+977-9828556757"],
            address: "Kathmandu, Nepal",
          },
        },
        {
          key: "social_links",
          value: {
            facebook: "https://facebook.com",
            twitter: "https://twitter.com",
            instagram: "https://instagram.com",
            linkedin: "https://linkedin.com",
            github: "https://github.com",
          },
        },
      ],
      { onConflict: "key" },
    );

    // --- Services ---
    const { data: services } = await db
      .from("services")
      .upsert(
        [
          {
            title: "Web Development",
            slug: "web-development",
            short_description: "Custom websites built with modern technologies",
            description:
              "We build fast, responsive, and scalable web applications.",
            icon: "code",
            technologies: ["React", "Next.js", "Node.js", "TypeScript"],
            featured: true,
            active: true,
            order: 1,
          },
          {
            title: "Mobile App Development",
            slug: "mobile-app-development",
            short_description: "Native and cross-platform mobile apps",
            description:
              "Beautiful, high-performance mobile applications for iOS and Android.",
            icon: "smartphone",
            technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
            featured: true,
            active: true,
            order: 2,
          },
          {
            title: "UI/UX Design",
            slug: "ui-ux-design",
            short_description: "Beautiful and intuitive user interfaces",
            description:
              "User-centered interfaces that are both beautiful and functional.",
            icon: "palette",
            featured: true,
            active: true,
            order: 3,
          },
        ],
        { onConflict: "slug" },
      )
      .select("id");

    // --- Projects ---
    const { data: projects } = await db
      .from("projects")
      .upsert(
        [
          {
            title: "E-commerce Platform",
            slug: "ecommerce-platform",
            description:
              "Complete e-commerce solution with 40% conversion increase.",
            category: "Web App",
            technologies: ["Next.js", "Stripe", "PostgreSQL"],
            featured: true,
            status: "completed",
            order: 1,
          },
          {
            title: "Fitness Tracking App",
            slug: "fitness-tracking-app",
            description: "Cross-platform mobile app for tracking workouts.",
            category: "Mobile App",
            technologies: ["React Native", "Firebase"],
            featured: true,
            status: "completed",
            order: 2,
          },
        ],
        { onConflict: "slug" },
      )
      .select("id");

    // --- Testimonials ---
    const { data: testimonials } = await db
      .from("testimonials")
      .upsert(
        [
          {
            name: "John Davidson",
            role: "CEO",
            company: "TechStart Inc.",
            content:
              "Codeverse transformed our website into a modern, high-converting platform.",
            rating: 5,
            featured: true,
            active: true,
            order: 1,
          },
          {
            name: "Sarah Johnson",
            role: "Marketing Director",
            company: "Digital Solutions Ltd",
            content:
              "Working with Codeverse was a pleasure. They understood our needs perfectly.",
            rating: 5,
            featured: true,
            active: true,
            order: 2,
          },
        ],
        { onConflict: "name" },
      )
      .select("id");

    // --- Blog ---
    const { data: blog } = await db
      .from("blog")
      .upsert(
        [
          {
            title: "The Future of Web Development",
            slug: "future-of-web-development",
            excerpt: "Explore the latest trends shaping web development.",
            content:
              "<p>The web development landscape is constantly evolving...</p>",
            author: { name: "Rajat Aryal", avatar: "", bio: "Founder & CEO" },
            category: "Technology",
            tags: ["Web Development", "Trends"],
            published: true,
            featured: true,
            read_time: "5 min read",
          },
        ],
        { onConflict: "slug" },
      )
      .select("id");

    return NextResponse.json({
      message: "Database seeded successfully!",
      data: {
        admin: { username: "admin", password: "admin123" },
        services: services?.length || 0,
        projects: projects?.length || 0,
        testimonials: testimonials?.length || 0,
        blog: blog?.length || 0,
      },
    });
  } catch (error) {
    return handleApiError(error, "Seed failed");
  }
}
