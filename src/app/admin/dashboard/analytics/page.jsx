'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, Eye, Clock, Globe, Monitor, 
  Smartphone, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AnalyticsPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin');
  };

  const stats = [
    { label: 'Total Visitors', value: '12,847', change: '+18.2%', positive: true, icon: Users },
    { label: 'Page Views', value: '48,294', change: '+12.5%', positive: true, icon: Eye },
    { label: 'Avg. Session', value: '4m 32s', change: '-2.1%', positive: false, icon: Clock },
    { label: 'Bounce Rate', value: '42.3%', change: '-5.4%', positive: true, icon: TrendingUp },
  ];

  const topPages = [
    { page: '/home', views: '8,432', percentage: 45 },
    { page: '/services', views: '4,218', percentage: 32 },
    { page: '/portfolio', views: '3,102', percentage: 28 },
    { page: '/about', views: '2,847', percentage: 22 },
    { page: '/contact', views: '1,932', percentage: 18 },
  ];

  const trafficSources = [
    { source: 'Direct', value: 42, color: 'bg-blue-500' },
    { source: 'Organic Search', value: 28, color: 'bg-emerald-500' },
    { source: 'Social Media', value: 18, color: 'bg-purple-500' },
    { source: 'Referral', value: 12, color: 'bg-orange-500' },
  ];

  const devices = [
    { device: 'Desktop', icon: Monitor, value: 58, color: 'text-blue-500' },
    { device: 'Mobile', icon: Smartphone, value: 38, color: 'text-emerald-500' },
    { device: 'Tablet', icon: Monitor, value: 4, color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <AdminSidebar onLogout={handleLogout} />
      
      <div className="flex-1 ml-[280px]">
        <AdminHeader title="Analytics" onLogout={handleLogout} />
        
        <main className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">Analytics Overview</h1>
            <p className="text-gray-500">Track your website performance</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center">
                    <stat.icon size={20} className="text-gray-400" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Top Pages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-6">Top Pages</h2>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div key={page.page} className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 w-6">{index + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium">{page.page}</span>
                        <span className="text-gray-400 text-sm">{page.views} views</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${page.percentage}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Traffic Sources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-6">Traffic Sources</h2>
              <div className="space-y-4">
                {trafficSources.map((source) => (
                  <div key={source.source} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${source.color}`} />
                    <span className="flex-1 text-gray-300">{source.source}</span>
                    <span className="text-white font-medium">{source.value}%</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <h3 className="text-sm font-medium text-gray-500 mb-4">Devices</h3>
                <div className="space-y-3">
                  {devices.map((device) => (
                    <div key={device.device} className="flex items-center gap-3">
                      <device.icon size={16} className={device.color} />
                      <span className="flex-1 text-gray-300">{device.device}</span>
                      <span className="text-white font-medium">{device.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Chart Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 bg-gray-900 border border-gray-800 rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-6">Visitors Over Time</h2>
            <div className="h-64 flex items-end justify-between gap-2">
              {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((height, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.7 + index * 0.05, duration: 0.5 }}
                  className="flex-1 bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg"
                />
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
