'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import ImageUrlInput from '@/components/admin/ImageUrlInput';

export default function NewBlogPostPage() {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    published: false,
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()),
          slug: formData.title.toLowerCase().replace(/\s+/g, '-')
        })
      });
      router.push('/admin/dashboard/blog');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin');
  };

  const categories = ['Development', 'Design', 'Business', 'Technology', 'Tutorial'];

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <AdminSidebar onLogout={handleLogout} />
      
      <div className="flex-1 ml-[280px]">
        <AdminHeader title="New Blog Post" onLogout={handleLogout} />
        
        <main className="p-6">
          <Link href="/admin/dashboard/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={18} /> Back to Blog
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8">
              <h1 className="text-2xl font-bold text-white mb-6">Create New Post</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none"
                    placeholder="Enter post title"
                    required
                  />
                </div>

                {/* Cover Image */}
                <ImageUrlInput
                  label="Cover Image"
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  placeholder="https://example.com/blog-cover.jpg"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Excerpt</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={2}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none resize-none"
                    placeholder="Brief description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Content *</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={12}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none resize-none"
                    placeholder="Write your post content..."
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none"
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Tags</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none"
                      placeholder="react, nextjs, web (comma separated)"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-5 h-5 bg-gray-800 border-gray-700 rounded text-primary-600"
                  />
                  <label htmlFor="published" className="text-gray-300">Publish immediately</label>
                </div>

                <div className="flex gap-4 pt-4">
                  <Link href="/admin/dashboard/blog" className="flex-1">
                    <button type="button" className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700">Cancel</button>
                  </Link>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50"
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={18} /> Create Post</>}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
