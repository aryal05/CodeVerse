'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Mail, Phone, X, Save, Loader2 } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function TeamPage() {
  const [team, setTeam] = useState([]);
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
    fetchTeam();
  }, [router]);

  const fetchTeam = async () => {
    try {
      const res = await fetch('/api/team');
      const data = await res.json();
      setTeam(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch team:', err);
      setTeam([]);
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
      const res = await fetch(`/api/team/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setTeam(team.filter(m => m.id !== id));
      setDeleteModal(null);
      showToast('Team member removed successfully');
    } catch (err) {
      console.error('Failed to delete:', err);
      showToast('Failed to delete team member', 'error');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const isEditing = editModal.id;
      const url = isEditing ? `/api/team/${editModal.id}` : '/api/team';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editModal.name,
          role: editModal.role,
          email: editModal.email,
          phone: editModal.phone,
          bio: editModal.bio || '',
          active: true
        })
      });

      if (!res.ok) throw new Error('Failed to save');

      await fetchTeam();
      setEditModal(null);
      showToast(isEditing ? 'Team member updated' : 'Team member added');
    } catch (err) {
      console.error('Failed to save:', err);
      showToast('Failed to save team member', 'error');
    } finally {
      setSaving(false);
    }
  };

  const filteredTeam = team.filter(m =>
    (m.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.role || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <AdminSidebar onLogout={handleLogout} />
      
      <div className="flex-1 ml-[280px]">
        <AdminHeader title="Team" onLogout={handleLogout} />
        
        <main className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Team Members</h1>
              <p className="text-gray-500">{team.length} total members</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setEditModal({ name: '', role: '', email: '', phone: '', bio: '' })}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
            >
              <Plus size={18} />
              Add Member
            </motion.button>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search team..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 animate-pulse">
                  <div className="w-20 h-20 bg-gray-800 rounded-full mx-auto mb-4" />
                  <div className="h-4 bg-gray-800 rounded w-2/3 mx-auto mb-2" />
                  <div className="h-3 bg-gray-800 rounded w-1/2 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTeam.length > 0 ? filteredTeam.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center hover:border-gray-700 transition-all group"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">{(member.name || 'U').charAt(0)}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-primary-500 text-sm mb-4">{member.role}</p>
                  
                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    {member.email && (
                      <div className="flex items-center justify-center gap-2">
                        <Mail size={14} />
                        <span className="truncate">{member.email}</span>
                      </div>
                    )}
                    {member.phone && (
                      <div className="flex items-center justify-center gap-2">
                        <Phone size={14} />
                        <span>{member.phone}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditModal({
                        id: member.id,
                        name: member.name || '',
                        role: member.role || '',
                        email: member.email || '',
                        phone: member.phone || '',
                        bio: member.bio || ''
                      })}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors text-sm"
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteModal(member)}
                      className="px-3 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              )) : (
                <div className="col-span-full text-center py-16">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={24} className="text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No team members found</h3>
                  <p className="text-gray-500">Add your first team member to get started</p>
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
              <h3 className="text-xl font-semibold text-white mb-2">Remove Team Member</h3>
              <p className="text-gray-400 mb-6">Are you sure you want to remove <span className="text-white font-medium">{deleteModal.name}</span>? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteModal(null)} className="flex-1 px-4 py-2.5 bg-gray-800 text-white rounded-xl hover:bg-gray-700">Cancel</button>
                <button onClick={() => handleDelete(deleteModal.id)} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700">Remove</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {editModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setEditModal(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">{editModal.id ? 'Edit' : 'Add'} Team Member</h3>
                <button onClick={() => setEditModal(null)} className="p-1 text-gray-500 hover:text-white"><X size={20} /></button>
              </div>
              <form className="space-y-4" onSubmit={handleSave}>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Full Name *</label>
                  <input type="text" placeholder="John Doe" value={editModal.name} onChange={(e) => setEditModal({ ...editModal, name: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Role *</label>
                  <input type="text" placeholder="Senior Developer" value={editModal.role} onChange={(e) => setEditModal({ ...editModal, role: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <input type="email" placeholder="team@codeverse.com" value={editModal.email} onChange={(e) => setEditModal({ ...editModal, email: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                  <input type="tel" placeholder="+977 980-000-0000" value={editModal.phone} onChange={(e) => setEditModal({ ...editModal, phone: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                  <textarea placeholder="Short bio..." value={editModal.bio} onChange={(e) => setEditModal({ ...editModal, bio: e.target.value })} rows={2} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none resize-none" />
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

      {/* Toast Notification */}
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
