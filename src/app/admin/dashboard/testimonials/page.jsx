'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Star, Quote, X, Save, Loader2 } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModal, setDeleteModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [toast, setToast] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin');
      return;
    }
    fetchTestimonials();
  }, [router]);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch testimonials:', err);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin');
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setTestimonials(testimonials.filter(t => t._id !== id));
      setDeleteModal(null);
      showToast('Testimonial deleted successfully');
    } catch (err) {
      console.error('Failed to delete:', err);
      showToast('Failed to delete testimonial', 'error');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const isEditing = editModal._id;
      const url = isEditing ? `/api/testimonials/${editModal._id}` : '/api/testimonials';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editModal.name,
          role: editModal.role,
          company: editModal.company,
          content: editModal.content,
          rating: editModal.rating,
          featured: editModal.featured || false
        })
      });

      if (!res.ok) throw new Error('Failed to save');

      await fetchTestimonials();
      setEditModal(null);
      showToast(isEditing ? 'Testimonial updated' : 'Testimonial added');
    } catch (err) {
      console.error('Failed to save:', err);
      showToast('Failed to save testimonial', 'error');
    } finally {
      setSaving(false);
    }
  };

  const filteredTestimonials = testimonials.filter(t =>
    (t.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.company || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <AdminSidebar onLogout={handleLogout} />
      
      <div className="flex-1 ml-[280px]">
        <AdminHeader title="Testimonials" onLogout={handleLogout} />
        
        <main className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Testimonials</h1>
              <p className="text-gray-500">{testimonials.length} total testimonials</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setEditModal({ name: '', role: '', company: '', content: '', rating: 5, featured: false })}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
            >
              <Plus size={18} />
              Add Testimonial
            </motion.button>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search testimonials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 animate-pulse">
                  <div className="h-4 bg-gray-800 rounded w-3/4 mb-4" />
                  <div className="h-3 bg-gray-800 rounded w-full mb-2" />
                  <div className="h-3 bg-gray-800 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTestimonials.length > 0 ? filteredTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all group"
                >
                  <Quote size={24} className="text-primary-500/30 mb-4" />
                  
                  <p className="text-gray-300 mb-6 line-clamp-4">&ldquo;{testimonial.content}&rdquo;</p>
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < (testimonial.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{(testimonial.name || 'U').charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditModal({
                        _id: testimonial._id,
                        name: testimonial.name || '',
                        role: testimonial.role || '',
                        company: testimonial.company || '',
                        content: testimonial.content || '',
                        rating: testimonial.rating || 5,
                        featured: testimonial.featured || false
                      })}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors text-sm"
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteModal(testimonial)}
                      className="px-3 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              )) : (
                <div className="col-span-full text-center py-16">
                  <Quote size={48} className="text-gray-700 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No testimonials found</h3>
                  <p className="text-gray-500">Add your first testimonial to get started</p>
                </div>
              )}
            </motion.div>
          )}
        </main>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setDeleteModal(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-white mb-2">Delete Testimonial</h3>
              <p className="text-gray-400 mb-6">Are you sure you want to delete this testimonial from <span className="text-white font-medium">{deleteModal.name}</span>?</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteModal(null)} className="flex-1 px-4 py-2.5 bg-gray-800 text-white rounded-xl hover:bg-gray-700">Cancel</button>
                <button onClick={() => handleDelete(deleteModal._id)} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {editModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setEditModal(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-lg w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">{editModal._id ? 'Edit' : 'Add'} Testimonial</h3>
                <button onClick={() => setEditModal(null)} className="p-1 text-gray-500 hover:text-white"><X size={20} /></button>
              </div>
              <form className="space-y-4" onSubmit={handleSave}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Client Name *</label>
                    <input type="text" placeholder="John Doe" value={editModal.name} onChange={(e) => setEditModal({ ...editModal, name: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Role *</label>
                    <input type="text" placeholder="CEO" value={editModal.role} onChange={(e) => setEditModal({ ...editModal, role: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Company</label>
                  <input type="text" placeholder="Company Name" value={editModal.company} onChange={(e) => setEditModal({ ...editModal, company: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Testimonial *</label>
                  <textarea placeholder="What did the client say..." value={editModal.content} onChange={(e) => setEditModal({ ...editModal, content: e.target.value })} rows={4} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none resize-none" required />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setEditModal({ ...editModal, rating: r })}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <Star size={24} className={r <= (editModal.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={editModal.featured || false}
                    onChange={(e) => setEditModal({ ...editModal, featured: e.target.checked })}
                    className="w-5 h-5 bg-gray-800 border-gray-700 rounded text-primary-600"
                  />
                  <label htmlFor="featured" className="text-gray-300">Featured testimonial</label>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setEditModal(null)} className="flex-1 px-4 py-2.5 bg-gray-800 text-white rounded-xl hover:bg-gray-700">Cancel</button>
                  <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50">
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-6 right-6 z-50 px-6 py-3 rounded-xl text-white font-medium shadow-lg ${
              toast.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
