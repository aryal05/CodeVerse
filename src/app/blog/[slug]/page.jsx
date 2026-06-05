import { cache } from "react";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/pages/BlogPostPage";
import { getDb } from "@/lib/api-helpers";

export const revalidate = 300;

const getBlogPost = cache(async function getBlogPost(slug) {
  try {
    const db = getDb();

    const { data, error } = await db
      .from("blog")
      .select(
        `
        id,
        title,
        slug,
        excerpt,
        content,
        image,
        author,
        category,
        tags,
        read_time,
        published,
        featured,
        created_at
      `,
      )
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    return {
      _id: data.id,
      id: data.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || "",
      content: data.content || "",
      image: data.image || "",
      author: data.author || { name: "Admin" },
      category: data.category || "General",
      tags: Array.isArray(data.tags) ? data.tags : [],
      readTime: data.read_time || "5 min read",
      published: !!data.published,
      featured: !!data.featured,
      createdAt: data.created_at,
    };
  } catch (error) {
    return null;
  }
});

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Post - CodeVerse",
      description: "Read our blog post.",
    };
  }

  return {
    title: `${post.title} - CodeVerse`,
    description: post.excerpt || "Read our blog post.",
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostPage post={post} />;
}
