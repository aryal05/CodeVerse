import BlogPostPage from '@/components/pages/BlogPostPage';

export async function generateMetadata() {
  return {
    title: `Blog Post - Site Era`,
    description: `Read our blog post.`,
  };
}

export default function BlogPost() {
  return <BlogPostPage />;
}
