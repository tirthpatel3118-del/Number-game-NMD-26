import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none transition-all duration-300 shadow-sm"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        {/* Sun Icon */}
        <span
          className={`absolute inset-0 flex items-center justify-center transform transition-all duration-500 ease-out ${
            theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        >
          <Sun className="w-5 h-5 text-amber-500 fill-amber-100 dark:fill-none" />
        </span>

        {/* Moon Icon */}
        <span
          className={`absolute inset-0 flex items-center justify-center transform transition-all duration-500 ease-out ${
            theme === 'light' ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        >
          <Moon className="w-5 h-5 text-indigo-400 fill-indigo-950 dark:fill-none" />
        </span>
      </div>
    </button>
  );
};
