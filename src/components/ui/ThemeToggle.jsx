'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = (dark) => {
      setIsDark(dark);
      document.documentElement.classList.toggle('dark', dark);
    };

    applyTheme(savedTheme ? savedTheme === 'dark' : media.matches);
    const followSystemTheme = (event) => {
      if (!localStorage.getItem('theme')) applyTheme(event.matches);
    };
    media.addEventListener('change', followSystemTheme);
    return () => media.removeEventListener('change', followSystemTheme);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        aria-label="Loading theme preference"
        className="relative w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800"
      />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: reduceMotion ? 0 : isDark ? 180 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.3 }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-yellow-400" />
        ) : (
          <Sun className="w-5 h-5 text-orange-500" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
