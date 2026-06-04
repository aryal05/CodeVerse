'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Trash2, Eye, X, Clock, User, Phone, MessageSquare, CheckCircle, Circle } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin');
      return;
    }
    fetchMessages();
  }, [router]);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      setMessages(messages.filter(m => m._id !== id));
      setSelectedMessage(null);
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true })
      });
      setMessages(messages.map(m => m._id === id ? { ...m, read: true } : m));
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin');
  };

  const filteredMessages = filter === 'all' 
    ? messages 
    : filter === 'unread' 
      ? messages.filter(m => !m.read)
      : messages.filter(m => m.read);

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <AdminSidebar onLogout={handleLogout} />
      
      <div className="flex-1 ml-[280px]">
        <AdminHeader title="Messages" onLogout={handleLogout} />
        
        <main className="p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Messages</h1>
              <p className="text-gray-500">
                {unreadCount > 0 ? `${unreadCount} unread messages` : 'All messages read'}
              </p>
            </div>
            
            {/* Filters */}
            <div className="flex gap-2">
              {['all', 'unread', 'read'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    filter === f
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Messages List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden"
          >
            {loading ? (
              <div className="p-8 space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse flex gap-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-full" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-800 rounded w-1/4 mb-2" />
                      <div className="h-3 bg-gray-800 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredMessages.length > 0 ? (
              <div className="divide-y divide-gray-800">
                {filteredMessages.map((message, index) => (
                  <motion.div
                    key={message._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setSelectedMessage(message);
                      if (!message.read) markAsRead(message._id);
                    }}
                    className={`p-5 flex items-start gap-4 cursor-pointer hover:bg-gray-800/50 transition-colors ${
                      !message.read ? 'bg-primary-500/5' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold">
                        {(message.name || 'U').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {!message.read && (
                          <Circle size={8} className="text-primary-500 fill-primary-500" />
                        )}
                        <h3 className={`font-medium truncate ${!message.read ? 'text-white' : 'text-gray-300'}`}>
                          {message.name || 'Unknown'}
                        </h3>
                        <span className="text-xs text-gray-600">
                          {message.createdAt ? new Date(message.createdAt).toLocaleDateString() : ''}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{message.email}</p>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                        {message.message || message.subject || 'No message'}
                      </p>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(message._id);
                        }}
                        className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-16 text-center">
                <Mail size={48} className="text-gray-700 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No messages</h3>
                <p className="text-gray-500">Messages from your contact form will appear here</p>
              </div>
            )}
          </motion.div>
        </main>
      </div>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-800 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {(selectedMessage.name || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">{selectedMessage.name || 'Unknown'}</h2>
                    <p className="text-gray-500">{selectedMessage.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[50vh]">
                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                  {selectedMessage.phone && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Phone size={14} />
                      {selectedMessage.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock size={14} />
                    {selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString() : 'N/A'}
                  </div>
                </div>
                
                {selectedMessage.subject && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Subject</h3>
                    <p className="text-white">{selectedMessage.subject}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Message</h3>
                  <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message || 'No message content'}
                  </p>
                </div>
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-gray-800 flex gap-3">
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
                >
                  <Mail size={18} />
                  Reply via Email
                </a>
                <button
                  onClick={() => handleDelete(selectedMessage._id)}
                  className="px-4 py-3 bg-red-600/10 text-red-400 rounded-xl hover:bg-red-600/20 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
