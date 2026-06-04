'use client';

import { motion } from 'framer-motion';
import { Globe, Database, Layout, Server, Check, TrendingUp } from 'lucide-react';

const DashboardVisual = () => {
  const cards = [
    {
      icon: Globe,
      title: 'Web Application',
      status: 'Live',
      metrics: [
        { label: 'VISITORS', value: '12.5K', trend: '+24%' },
        { label: 'PERFORMANCE', value: '98%', trend: '+5%' },
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Server,
      title: 'API Backend',
      status: 'Active',
      metrics: [
        { label: 'REQUESTS', value: '1.2M', trend: '+18%' },
        { label: 'UPTIME', value: '99.9%', trend: '' },
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Database,
      title: 'Database',
      status: 'Healthy',
      metrics: [
        { label: 'QUERIES', value: '45K/s', trend: '+12%' },
        { label: 'STORAGE', value: '2.4TB', trend: '' },
      ],
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Layout,
      title: 'Mobile App',
      status: 'Live',
      metrics: [
        { label: 'DOWNLOADS', value: '50K+', trend: '+32%' },
        { label: 'RATING', value: '4.9★', trend: '' },
      ],
      color: 'from-orange-500 to-red-500'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-purple-500/10 to-cyan-500/20 rounded-3xl blur-3xl" />
      
      {/* Main Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative bg-gray-900 dark:bg-gray-950 rounded-2xl border border-gray-800 p-6 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-mono">PRODUCTION</span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group bg-gray-800/50 hover:bg-gray-800 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600 transition-all duration-300"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                    <card.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white">{card.title}</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 text-xs">
                  <Check className="w-3 h-3" />
                  <span>{card.status}</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-3">
                {card.metrics.map((metric, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-gray-500 font-mono tracking-wider">{metric.label}</span>
                      {metric.trend && (
                        <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                          <TrendingUp className="w-2.5 h-2.5" />
                          {metric.trend}
                        </span>
                      )}
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${card.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${60 + Math.random() * 35}%` }}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.2, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-white">99.9%</div>
              <div className="text-[10px] text-gray-500">UPTIME</div>
            </div>
            <div className="w-px h-8 bg-gray-800" />
            <div className="text-center">
              <div className="text-lg font-bold text-white">24/7</div>
              <div className="text-[10px] text-gray-500">SUPPORT</div>
            </div>
            <div className="w-px h-8 bg-gray-800" />
            <div className="text-center">
              <div className="text-lg font-bold text-white">&lt;50ms</div>
              <div className="text-[10px] text-gray-500">RESPONSE</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-gray-400">All systems operational</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardVisual;
