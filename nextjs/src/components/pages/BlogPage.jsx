'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Calendar, Clock, User, ArrowRight, Search, Tag } from 'lucide-react';
import api from '@/lib/api';

const Blog = () => {
  const [ref, inView] = useScrollAnimation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    api.get('/blog?published=true')
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = ['all', ...new Set(posts.map(p => p.category))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-royal-500 rounded-full blur-[150px] opacity-10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-royal-500 font-mono text-sm tracking-wider uppercase mb-4 block">Our Blog</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Insights & <span className="gradient-luxury">Innovation</span>
            </h1>
            <p className="text-xl text-platinum-300 leading-relaxed mb-8">
              Stay updated with the latest trends, tips, and insights from the world of web development and digital innovation.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-platinum-300" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-luxury-100 border border-royal-500/20 rounded-full pl-12 pr-4 py-4 text-white focus:border-royal-500 focus:outline-none transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-y border-royal-500/20 sticky top-20 bg-black/80 backdrop-blur-xl z-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-platinum-300">
              <Tag size={18} />
              <span className="text-sm font-mono">Categories:</span>
            </div>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-display capitalize transition-all ${
                  selectedCategory === cat
                    ? 'bg-royal-500 text-black'
                    : 'bg-luxury-100 text-white hover:bg-royal-500 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-royal-500 font-mono text-sm tracking-wider uppercase mb-4 block">Featured Article</span>
              <Link href={`/blog/${featuredPost.slug}`}>
                <div className="grid md:grid-cols-2 gap-8 glass-luxury p-8 rounded-2xl hover:border-royal-500 transition-all duration-300 group">
                  <div className="relative h-[400px] rounded-xl overflow-hidden">
                    <img
                      src={featuredPost.thumbnail}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-royal-500 text-black px-4 py-2 rounded-full text-sm font-semibold">
                      {featuredPost.category}
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    <h2 className="text-4xl font-display font-bold text-white mb-4 group-hover:text-royal-500 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-platinum-300 mb-6 leading-relaxed text-lg">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm text-platinum-300 mb-6">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{new Date(featuredPost.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>5 min read</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-royal-500 font-display font-semibold group-hover:gap-3 transition-all">
                      <span>Read Full Article</span>
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section ref={ref} className="py-24">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="text-center text-platinum-300">Loading articles...</div>
          ) : regularPosts.length === 0 ? (
            <div className="text-center text-platinum-300">No articles found.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="glass-luxury rounded-xl overflow-hidden hover:border-royal-500 transition-all duration-300 group h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-royal-500 text-black px-3 py-1 rounded-full text-xs font-semibold uppercase">
                          {post.category}
                        </div>
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-royal-500 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-platinum-300 mb-4 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-platinum-300 pt-4 border-t border-royal-500/20">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={14} />
                            <span>5 min read</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-luxury-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="glass-luxury p-12 rounded-2xl max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Stay <span className="gradient-luxury">Updated</span>
            </h2>
            <p className="text-xl text-platinum-300 mb-8">
              Subscribe to our newsletter and get the latest insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-luxury-100 border border-royal-500/20 rounded-full px-6 py-4 text-white focus:border-royal-500 focus:outline-none transition-colors"
              />
              <button className="bg-royal-500 text-black px-8 py-4 rounded-full font-display font-semibold hover:bg-gold-500 transition-colors whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;

