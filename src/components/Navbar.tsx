import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Binary, Trophy, BarChart3, HelpCircle, Sparkles, Compass } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'Mind Reader', path: '/mind-reader', icon: Binary },
    { name: 'Probability', path: '/probability', icon: Compass },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { name: 'Statistics', path: '/statistics', icon: BarChart3 },
    { name: 'About Math', path: '/about', icon: HelpCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <NavLink to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white shadow-md shadow-indigo-500/10 group-hover:scale-105 transition-transform duration-300">
              <Binary className="w-5 h-5" />
            </div>
            <span className="font-sans font-extrabold text-lg md:text-xl tracking-tight bg-gradient-to-r from-slate-900 to-indigo-950 dark:from-white dark:to-slate-300 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              NumIntel <span className="text-indigo-600 dark:text-indigo-400">Challenge</span>
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-350
                    ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
            <div className="pl-3 border-l border-slate-200 dark:border-slate-800 ml-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button & theme toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 border-t border-slate-100 dark:border-slate-900' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 bg-white dark:bg-slate-950/95 backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200
                  ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
