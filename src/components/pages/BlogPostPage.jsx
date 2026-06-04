'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import AnimatedGrid from '@/components/ui/AnimatedGrid';
import { useState, useEffect } from 'react';

const BlogPost = () => {
  const params = useParams();
  const slug = params?.slug;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/${slug}`);
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error('Failed to fetch blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Blog Post Not Found</h2>
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <AnimatedGrid />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-400/20 dark:bg-primary-600/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors mb-8">
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            {post.category && (
              <span className="text-sm font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full">
                {post.category}
              </span>
            )}
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-6 mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
              {post.author && <span>{post.author}</span>}
              {post.author && <span>•</span>}
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}
              </span>
              {post.readTime && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image && (
        <section className="py-8">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto rounded-2xl overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div className="flex flex-wrap gap-2">
                  <span className="text-gray-600 dark:text-gray-400">Tags:</span>
                  {post.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-gray-600 dark:text-gray-400">Share:</span>
              <button className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Let&apos;s turn your ideas into reality. Get in touch with us today.
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
