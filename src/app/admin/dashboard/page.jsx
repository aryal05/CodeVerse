"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FolderOpen,
  FileText,
  MessageSquare,
  Users,
  Briefcase,
  Star,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Eye,
  Calendar,
  Clock,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsCard from "@/components/admin/StatsCard";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    messages: 0,
    blog: 0,
    testimonials: 0,
    team: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin");
      return;
    }

    const fetchData = async () => {
      try {
        const [projects, services, messages, blog, testimonials, team] =
          await Promise.all([
            fetch("/api/projects")
              .then((r) => r.json())
              .catch(() => []),
            fetch("/api/services?all=true")
              .then((r) => r.json())
              .catch(() => []),
            fetch("/api/messages")
              .then((r) => r.json())
              .catch(() => []),
            fetch("/api/blog")
              .then((r) => r.json())
              .catch(() => []),
            fetch("/api/testimonials")
              .then((r) => r.json())
              .catch(() => []),
            fetch("/api/team")
              .then((r) => r.json())
              .catch(() => []),
          ]);

        setStats({
          projects: Array.isArray(projects) ? projects.length : 0,
          services: Array.isArray(services) ? services.length : 0,
          messages: Array.isArray(messages) ? messages.length : 0,
          blog: Array.isArray(blog) ? blog.length : 0,
          testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
          team: Array.isArray(team) ? team.length : 0,
        });

        setRecentMessages(Array.isArray(messages) ? messages.slice(0, 5) : []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin");
  };

  const quickActions = [
    {
      label: "New Project",
      href: "/admin/dashboard/projects/new",
      icon: FolderOpen,
      color: "bg-blue-500",
    },
    {
      label: "New Blog Post",
      href: "/admin/dashboard/blog/new",
      icon: FileText,
      color: "bg-purple-500",
    },
    {
      label: "Add Service",
      href: "/admin/dashboard/services/new",
      icon: Briefcase,
      color: "bg-orange-500",
    },
    {
      label: "View Messages",
      href: "/admin/dashboard/messages",
      icon: MessageSquare,
      color: "bg-emerald-500",
    },
  ];

  const recentActivity = [
    {
      action: "New project added",
      item: "E-Commerce Platform",
      time: "2 hours ago",
      icon: FolderOpen,
    },
    {
      action: "Blog post published",
      item: "Web Development Trends 2024",
      time: "5 hours ago",
      icon: FileText,
    },
    {
      action: "New message received",
      item: "Contact inquiry",
      time: "1 day ago",
      icon: MessageSquare,
    },
    {
      action: "Team member added",
      item: "John Doe - Developer",
      time: "2 days ago",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <AdminSidebar onLogout={handleLogout} />

      <div className="flex-1 ml-[280px]">
        <AdminHeader title="Dashboard" onLogout={handleLogout} />

        <main className="p-6">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome back, Admin!
            </h1>
            <p className="text-gray-500">
              Here&apos;s what&apos;s happening with your website today.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Projects"
              value={stats.projects}
              change="+12%"
              changeType="positive"
              icon={FolderOpen}
              color="blue"
              delay={0}
            />
            <StatsCard
              title="Blog Posts"
              value={stats.blog}
              change="+8%"
              changeType="positive"
              icon={FileText}
              color="purple"
              delay={0.1}
            />
            <StatsCard
              title="Messages"
              value={stats.messages}
              change="+24%"
              changeType="positive"
              icon={MessageSquare}
              color="green"
              delay={0.2}
            />
            <StatsCard
              title="Services"
              value={stats.services}
              change="+5%"
              changeType="positive"
              icon={Briefcase}
              color="orange"
              delay={0.3}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-xl p-4 text-center cursor-pointer transition-all group"
                    >
                      <div
                        className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                      >
                        <action.icon size={24} className="text-white" />
                      </div>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {action.label}
                      </span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      <activity.icon size={14} className="text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-300 truncate">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.item}</p>
                    </div>
                    <span className="text-xs text-gray-600 whitespace-nowrap">
                      {activity.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Messages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 bg-gray-900 border border-gray-800 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">
                Recent Messages
              </h2>
              <Link
                href="/admin/dashboard/messages"
                className="text-sm text-primary-500 hover:text-primary-400 flex items-center gap-1"
              >
                View all <ArrowUpRight size={14} />
              </Link>
            </div>

            {recentMessages.length > 0 ? (
              <div className="space-y-3">
                {recentMessages.map((message, index) => (
                  <motion.div
                    key={message.id || index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary-600/20 rounded-full flex items-center justify-center">
                      <span className="text-primary-500 font-semibold">
                        {(message.name || "U").charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {message.name || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {message.message || message.subject || "No message"}
                      </p>
                    </div>
                    <span className="text-xs text-gray-600">
                      {message.createdAt
                        ? new Date(message.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare
                  size={40}
                  className="text-gray-700 mx-auto mb-3"
                />
                <p className="text-gray-500">No messages yet</p>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
