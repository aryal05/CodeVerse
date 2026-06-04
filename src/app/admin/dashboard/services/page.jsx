'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Search, Code, Smartphone, Palette, ShoppingCart, Database, Sparkles } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModal, setDeleteModal] = useState(null);
  const router = useRouter();

  const iconMap = {
    'web-development': Code,
    'mobile-development': Smartphone,
    'ui-ux-design': Palette,
    'ecommerce': ShoppingCart,
    'cloud-devops': Database,
    'digital-strategy': Sparkles,
  };

  const colorMap = {
    'web-development': 'from-blue-500 to-cyan-500',
    'mobile-development': 'from-purple-500 to-pink-500',
    'ui-ux-design': 'from-pink-500 to-rose-500',
    'ecommerce': 'from-orange-500 to-red-500',
    'cloud-devops': 'from-cyan-500 to-teal-500',
    'digital-strategy': 'from-emerald-500 to-green-500',
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin');
      return;
    }
    fetchServices();
  }, [router]);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services?all=true');
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch services:', err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    try {
      await fetch(`/api/services/${slug}`, { method: 'DELETE' });
      setServices(services.filter(s => s.slug !== slug));
      setDeleteModal(null);
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin');
  };

  const filteredServices = services.filter(s =>
    s.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.slug?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <AdminSidebar onLogout={handleLogout} />
      
      <div className="flex-1 ml-[280px]">
        <AdminHeader title="Services" onLogout={handleLogout} />
        
        <main className="p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Services</h1>
              <p className="text-gray-500">Manage your service offerings</p>
            </div>
            
            <Link href="/admin/dashboard/services/new">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
              >
                <Plus size={18} />
                Add Service
              </motion.button>
            </Link>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Services Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 animate-pulse">
                  <div className="w-14 h-14 bg-gray-800 rounded-xl mb-4" />
                  <div className="h-5 bg-gray-800 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-800 rounded w-full" />
                </div>
              ))}
            </div>
          ) : filteredServices.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredServices.map((service, index) => {
                const Icon = iconMap[service.slug] || Code;
                const color = colorMap[service.slug] || 'from-gray-500 to-gray-600';
                
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all group"
                  >
                    {/* Service Image (if available) */}
                    {service.image && (
                      <div className="h-32 relative overflow-hidden bg-gray-800 flex items-center justify-center">
                        <img
                          src={service.image}
                          alt={service.title || 'Service'}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon size={28} className="text-white" />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-lg font-semibold text-white mb-2">
                         {service.title || 'Untitled Service'}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                         {service.shortDescription || service.description || 'No description'}
                      </p>
                      
                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link href={`/admin/dashboard/services/${service.slug || service.id}`} className="flex-1">
                          <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors text-sm">
                            <Edit size={14} />
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => setDeleteModal(service)}
                          className="px-3 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Eye size={24} className="text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No services found</h3>
              <p className="text-gray-500 mb-6">Add your first service offering</p>
              <Link href="/admin/dashboard/services/new">
                <button className="px-4 py-2 bg-primary-600 text-white rounded-xl">
                  Add Service
                </button>
              </Link>
            </div>
          )}
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
              <h3 className="text-xl font-semibold text-white mb-2">Delete Service</h3>
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
