'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import ImageUrlInput from '@/components/admin/ImageUrlInput';

export default function EditServicePage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    features: '',
    icon: 'code',
    image: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin');
      return;
    }
    
    fetch(`/api/services/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setFormData({
            name: data.title || data.name || '',
            slug: data.slug || '',
            description: data.description || '',
            features: Array.isArray(data.features) 
              ? data.features.map(f => typeof f === 'string' ? f : f.title || f.description || '').join('\n') 
              : '',
            icon: data.icon || 'code',
            image: data.image || ''
          });
        }
      })
      .catch(console.error);
  }, [params.id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Convert features from string array to object array
      const featuresArray = formData.features
        .split('\n')
        .filter(f => f.trim())
        .map(feature => ({
          title: feature.trim(),
          description: '',
          icon: ''
        }));
      
      const response = await fetch(`/api/services/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.name,
          slug: formData.slug,
          shortDescription: formData.description,
          description: formData.description,
          icon: formData.icon,
          image: formData.image,
          features: featuresArray
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        console.error('Error updating service:', error);
        alert('Failed to update service');
        return;
      }
      
      router.push('/admin/dashboard/services');
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin');
  };

  const icons = [
    { value: 'code', label: 'Code (Web Dev)' },
    { value: 'smartphone', label: 'Smartphone (Mobile)' },
    { value: 'palette', label: 'Palette (Design)' },
    { value: 'shopping-cart', label: 'Shopping Cart (E-Commerce)' },
    { value: 'database', label: 'Database (Backend)' },
    { value: 'sparkles', label: 'Sparkles (Strategy)' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <AdminSidebar onLogout={handleLogout} />
      
      <div className="flex-1 ml-[280px]">
        <AdminHeader title="Edit Service" onLogout={handleLogout} />
        
        <main className="p-6">
          <Link href="/admin/dashboard/services" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={18} /> Back to Services
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8">
              <h1 className="text-2xl font-bold text-white mb-6">Edit Service</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Service Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">URL Slug</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Icon</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none"
                  >
                    {icons.map(icon => <option key={icon.value} value={icon.value}>{icon.label}</option>)}
                  </select>
                </div>

                {/* Service Image */}
                <ImageUrlInput
                  label="Service Image"
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  placeholder="https://example.com/service-image.jpg"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Features (one per line)</label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    rows={6}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Link href="/admin/dashboard/services" className="flex-1">
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
