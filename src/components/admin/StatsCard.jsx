'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

const StatsCard = ({ title, value, change, changeType, icon: Icon, color, delay = 0 }) => {
  const isPositive = changeType === 'positive';

  const colorClasses = {
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    green: 'from-emerald-500 to-teal-500',
    orange: 'from-orange-500 to-red-500',
    indigo: 'from-indigo-500 to-purple-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="admin-stat-card"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`admin-stat-card__icon bg-gradient-to-br ${colorClasses[color] || colorClasses.blue}`}>
          <Icon size={24} className="text-white" />
        </div>
        {change && (
          <div className={`admin-stat-card__change ${isPositive ? 'is-positive' : 'is-negative'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{change}</span>
          </div>
        )}
      </div>
      
      <div className="admin-stat-card__value">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
          className="text-3xl font-bold text-white mb-1"
        >
          {value}
        </motion.h3>
        <p>{title}</p>
      </div>
      <ArrowUpRight className="admin-stat-card__arrow" size={17} />
    </motion.div>
  );
};

export default StatsCard;
