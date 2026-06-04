'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['All']);

  // Fetch blog posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        setPosts(data);
        
        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(data.map(p => p.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts.find(post => post.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageHeader
        badge="Our Blog"
        title="Insights &"
        titleHighlight="Resources"
        description="Stay updated with the latest trends, tutorials, and insights from our team of experts."
      />

      {/* Search & Filters */}
      <section className="py-8 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    activeCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {!loading && featuredPost && activeCategory === 'All' && !searchQuery && (
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href={`/blog/${featuredPost.slug}`}>
                <div className="group grid lg:grid-cols-2 gap-8 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-large transition-all">
                  {/* Image */}
                  <div className="h-64 relative overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    {featuredPost.image ? (
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-500 to-purple-600">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white/20 text-9xl font-bold">F</span>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                      Featured
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <span className="text-xs font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/30 px-2.5 py-1 rounded-full w-fit mb-4">
                      {featuredPost.category}
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{featuredPost.author?.name || 'Admin'}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime || '5 min read'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading blog posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {posts.length === 0 
                  ? 'No blog posts yet. Add some from the admin panel!' 
                  : 'No articles found matching your criteria.'}
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.filter(p => !p.featured || activeCategory !== 'All' || searchQuery).map((post, index) => {
                const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                });
                
                return (
                  <motion.div
                    key={post._id || post.slug}
                    variants={itemVariants}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="group h-full bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-large transition-all">
                        {/* Image */}
                        <div className="h-48 relative overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                          {post.image ? (
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-gray-400/50 dark:text-gray-600/50 text-6xl font-bold">
                                  {post.title.charAt(0)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <span className="text-xs font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/30 px-2.5 py-1 rounded-full">
                            {post.category}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>{post.author?.name || 'Admin'}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime || '5 min read'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 lg:py-28 bg-primary-600">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-primary-100 mb-8">
              Get the latest articles, tutorials, and updates delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-all"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
