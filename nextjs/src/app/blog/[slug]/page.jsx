import BlogPostPage from '@/components/pages/BlogPostPage';

export async function generateMetadata({ params }) {
  return {
    title: `Blog Post - Site Era`,
    description: `Read our blog post.`,
  };
}

export default function BlogPost({ params }) {
  return <BlogPostPage slug={params.slug} />;
}
