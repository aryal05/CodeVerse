'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Search, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModal, setDeleteModal] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin');
      return;
    }
    fetchPosts();
  }, [router]);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    try {
      await fetch(`/api/blog/${slug}`, { method: 'DELETE' });
      setPosts(posts.filter(p => p.slug !== slug));
      setDeleteModal(null);
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const togglePublish = async (post) => {
    try {
      await fetch(`/api/blog/${post.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...post, published: !post.published })
      });
      setPosts(posts.map(p => p.id === post.id ? { ...p, published: !p.published } : p));
    } catch (err) {
      console.error('Failed to toggle publish:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin');
  };

  const filteredPosts = posts.filter(p =>
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <AdminSidebar onLogout={handleLogout} />
      
      <div className="flex-1 ml-[280px]">
        <AdminHeader title="Blog Posts" onLogout={handleLogout} />
        
        <main className="p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
              <p className="text-gray-500">Manage your blog content</p>
            </div>
            
            <Link href="/admin/dashboard/blog/new">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
              >
                <Plus size={18} />
                New Post
              </motion.button>
            </Link>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Posts Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden"
          >
            {loading ? (
              <div className="p-8 space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse flex gap-4">
                    <div className="w-20 h-14 bg-gray-800 rounded-lg" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-800 rounded w-1/3 mb-2" />
                      <div className="h-3 bg-gray-800 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Post</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filteredPosts.map((post, index) => (
                      <motion.tr
                        key={post.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-12 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-800">
                              {post.image ? (
                                <img
                                  src={post.image}
                                  alt={post.title || 'Blog post'}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                                  <span className="text-white/50 font-bold">{post.title?.charAt(0) || 'B'}</span>
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-white font-medium truncate max-w-xs">{post.title || 'Untitled'}</h3>
                              <p className="text-sm text-gray-500 truncate max-w-xs">{post.excerpt || 'No excerpt'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-medium text-primary-500 bg-primary-500/10 px-2.5 py-1 rounded-full">
                            {post.category || 'General'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => togglePublish(post)}
                            className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                              post.published
                                ? 'text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20'
                                : 'text-gray-400 bg-gray-700 hover:bg-gray-600'
                            }`}
                          >
                            {post.published ? <CheckCircle size={12} /> : <XCircle size={12} />}
                            {post.published ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">
                            {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/admin/dashboard/blog/${post.slug || post.id}`}>
                              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                                <Edit size={16} />
                              </button>
                            </Link>
                            <button
                              onClick={() => setDeleteModal(post)}
                              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-16 text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Eye size={24} className="text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No posts found</h3>
                <p className="text-gray-500 mb-6">Start writing your first blog post</p>
                <Link href="/admin/dashboard/blog/new">
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-xl">
                    Create Post
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </main>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-semibold text-white mb-2">Delete Post</h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete &quot;{deleteModal.title}&quot;? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal(null)}
                  className="flex-1 px-4 py-2.5 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteModal.slug)}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
