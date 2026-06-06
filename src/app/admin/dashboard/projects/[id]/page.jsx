'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import ImageUrlInput from '@/components/admin/ImageUrlInput';

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    client: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    image: '',
    gallery: []
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin');
      return;
    }
    
    // Fetch project data
    fetch(`/api/projects/${params.id}`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched project data:', data);
        if (data) {
          setFormData({
            title: data.title || '',
            description: data.description || '',
            category: data.category || '',
            client: data.client || '',
            technologies: Array.isArray(data.technologies) ? data.technologies.join(', ') : (data.technologies || ''),
            liveUrl: data.link || data.liveUrl || '',
            githubUrl: data.github || data.githubUrl || '',
            featured: data.featured || false,
            image: data.image || '',
            gallery: Array.isArray(data.gallery) ? data.gallery : []
          });
        }
      })
      .catch(err => {
        console.error('Failed to fetch project:', err);
      });
  }, [params.id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await fetch(`/api/projects/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          client: formData.client,
          link: formData.liveUrl,
          github: formData.githubUrl,
          technologies: formData.technologies.split(',').map(t => t.trim()),
          featured: formData.featured,
          image: formData.image,
          gallery: formData.gallery
        })
      });
      router.push('/admin/dashboard/projects');
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

  const categories = ['Web App', 'E-Commerce', 'Dashboard', 'Landing Page', 'Other'];

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <AdminSidebar onLogout={handleLogout} />
      
      <div className="flex-1 ml-[280px]">
        <AdminHeader title="Edit Project" onLogout={handleLogout} />
        
        <main className="p-6">
          <Link href="/admin/dashboard/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={18} /> Back to Projects
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8">
              <h1 className="text-2xl font-bold text-white mb-6">Edit Project</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Project Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none resize-none"
                    required
                  />
                </div>

                {/* Main Image */}
                <ImageUrlInput
                  label="Main Project Image"
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  placeholder="https://example.com/project-screenshot.jpg"
                />

                {/* Gallery Images */}
                <ImageUrlInput
                  label="Project Gallery (Multiple Images)"
                  gallery={true}
                  galleryValues={formData.gallery}
                  onGalleryChange={(urls) => setFormData({ ...formData, gallery: urls })}
                />

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
                    <label className="block text-sm font-medium text-gray-400 mb-2">Client</label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Technologies</label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none"
                    placeholder="React, Next.js, Node.js"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Live URL</label>
                    <input
                      type="url"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">GitHub URL</label>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 bg-gray-800 border-gray-700 rounded text-primary-600"
                  />
                  <label htmlFor="featured" className="text-gray-300">Featured project</label>
                </div>

                <div className="flex gap-4 pt-4">
                  <Link href="/admin/dashboard/projects" className="flex-1">
                    <button type="button" className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700">Cancel</button>
                  </Link>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50"
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={18} /> Save Changes</>}
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
