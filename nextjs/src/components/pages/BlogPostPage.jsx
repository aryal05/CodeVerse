'use client';

import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import api from '@/lib/api';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch post
    api.get(`/blog/${slug}`)
      .then(res => {
        setPost(res.data);
        // Fetch related posts
        return api.get(`/blog?published=true&category=${res.data.category}`);
      })
      .then(res => {
        setRelatedPosts(res.data.filter(p => p.slug !== slug).slice(0, 3));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-white mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-royal-500 hover:underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal-500 rounded-full blur-[150px] opacity-10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <Link href="/blog" className="inline-flex items-center gap-2 text-royal-500 hover:gap-3 transition-all mb-8">
              <ArrowLeft size={20} />
              <span>Back to Blog</span>
            </Link>

            <div className="mb-6">
              <span className="bg-royal-500 text-black px-4 py-2 rounded-full text-sm font-semibold uppercase">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-platinum-300 mb-8">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{new Date(post.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>5 min read</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4">
              <span className="text-platinum-300 text-sm">Share:</span>
              <button className="w-10 h-10 bg-luxury-100 rounded-full flex items-center justify-center hover:bg-royal-500 hover:text-black transition-all">
                <Facebook size={18} />
              </button>
              <button className="w-10 h-10 bg-luxury-100 rounded-full flex items-center justify-center hover:bg-royal-500 hover:text-black transition-all">
                <Twitter size={18} />
              </button>
              <button className="w-10 h-10 bg-luxury-100 rounded-full flex items-center justify-center hover:bg-royal-500 hover:text-black transition-all">
                <Linkedin size={18} />
              </button>
              <button className="w-10 h-10 bg-luxury-100 rounded-full flex items-center justify-center hover:bg-royal-500 hover:text-black transition-all">
                <Share2 size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl mx-auto"
          >
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-[500px] object-cover rounded-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="prose prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                color: '#F5F0E8',
                '--tw-prose-headings': '#F5F0E8',
                '--tw-prose-links': '#C8FF00',
                '--tw-prose-bold': '#F5F0E8',
                '--tw-prose-code': '#C8FF00',
                '--tw-prose-quotes': '#888888'
              }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-royal-500/20">
                <div className="flex flex-wrap gap-2">
                  <span className="text-platinum-300">Tags:</span>
                  {post.tags.map((tag, index) => (
                    <span key={index} className="bg-luxury-100 text-white px-4 py-2 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="py-16 bg-luxury-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto glass-luxury p-8 rounded-2xl">
            <div className="flex items-start gap-6">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt={post.author}
                className="w-20 h-20 rounded-full"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-display font-bold text-white mb-2">About {post.author}</h3>
                <p className="text-platinum-300 mb-4">
                  Passionate about web development and digital innovation. Sharing insights and experiences from years of building digital products.
                </p>
                <div className="flex gap-4">
                  <button className="text-royal-500 hover:underline">Follow</button>
                  <button className="text-royal-500 hover:underline">More Articles</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-display font-bold text-white mb-12 text-center">
              Related <span className="gradient-luxury">Articles</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="glass-luxury rounded-xl overflow-hidden hover:border-royal-500 transition-all duration-300 group">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={relatedPost.thumbnail}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-royal-500 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-platinum-300 text-sm line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-luxury-50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Start Your <span className="gradient-luxury">Project?</span>
            </h2>
            <p className="text-xl text-platinum-300 mb-8 max-w-2xl mx-auto">
              Let's turn your ideas into reality. Get in touch with us today.
            </p>
            <Link href="/contact">
              <button className="bg-royal-500 text-black px-10 py-5 rounded-full font-display font-semibold text-lg hover:bg-gold-500 transition-all duration-300 glow-royal">
                Get Started
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;

