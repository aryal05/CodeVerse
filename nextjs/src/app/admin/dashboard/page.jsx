'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, FolderOpen, FileText, MessageSquare, 
  Users, Settings, LogOut, Menu, X, Briefcase, Star
} from 'lucide-react';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    messages: 0,
    blog: 0
  });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin');
      return;
    }

    // Fetch stats
    const fetchStats = async () => {
      try {
        const [projects, services, messages, blog] = await Promise.all([
          fetch('/api/projects').then(r => r.json()),
          fetch('/api/services').then(r => r.json()),
          fetch('/api/messages').then(r => r.json()),
          fetch('/api/blog').then(r => r.json())
        ]);
        setStats({
          projects: projects.length || 0,
          services: services.length || 0,
          messages: messages.length || 0,
          blog: blog.length || 0
        });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };

    fetchStats();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: FolderOpen, label: 'Projects', href: '/admin/dashboard/projects' },
    { icon: Briefcase, label: 'Services', href: '/admin/dashboard/services' },
    { icon: FileText, label: 'Blog', href: '/admin/dashboard/blog' },
    { icon: Users, label: 'Team', href: '/admin/dashboard/team' },
    { icon: Star, label: 'Testimonials', href: '/admin/dashboard/testimonials' },
    { icon: MessageSquare, label: 'Messages', href: '/admin/dashboard/messages' },
    { icon: Settings, label: 'Settings', href: '/admin/dashboard/settings' },
  ];

  const statCards = [
    { label: 'Projects', value: stats.projects, icon: FolderOpen, color: 'from-indigo-500 to-purple-500' },
    { label: 'Services', value: stats.services, icon: Briefcase, color: 'from-amber-500 to-orange-500' },
    { label: 'Messages', value: stats.messages, icon: MessageSquare, color: 'from-emerald-500 to-teal-500' },
    { label: 'Blog Posts', value: stats.blog, icon: FileText, color: 'from-pink-500 to-rose-500' },
  ];

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 border-r border-gray-800 transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h1 className="text-xl font-bold">
                <span className="gradient-royal">SITE</span> ERA
              </h1>
            )}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors w-full"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => (
            <div key={stat.label} className="glass-luxury rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon size={24} className="text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="glass-luxury rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/admin/dashboard/projects" className="btn-luxury text-white px-4 py-3 rounded-lg text-center">
              Add Project
            </Link>
            <Link href="/admin/dashboard/blog" className="btn-luxury text-white px-4 py-3 rounded-lg text-center">
              New Blog Post
            </Link>
            <Link href="/admin/dashboard/services" className="btn-luxury text-white px-4 py-3 rounded-lg text-center">
              Add Service
            </Link>
            <Link href="/admin/dashboard/messages" className="btn-luxury text-white px-4 py-3 rounded-lg text-center">
              View Messages
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
