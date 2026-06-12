import React from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, Hash, Mail, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 py-12 transition-colors duration-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand/Theme Section */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white font-sans">
              Number Intelligence Challenge
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm font-sans leading-relaxed">
              An interactive mathematical exploration suite developed for <strong>National Mathematics Day 2026</strong>, celebrating the 139th birth anniversary of legendary mathematician <strong>Srinivasa Ramanujan</strong> (1887–1920).
            </p>
            <p className="text-xs text-indigo-600/80 dark:text-indigo-400/80 italic font-serif">
              "An equation for me has no meaning unless it expresses a thought of God." — Srinivasa Ramanujan
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 font-sans">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/mind-reader" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Mathematical Mind Reader
                </NavLink>
              </li>
              <li>
                <NavLink to="/probability" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Probability Challenge
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  About Mathematics
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact / Social Section */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 font-sans">
              Connect
            </h4>
            <div className="flex space-x-3 mb-4">
              <a href="#" className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-900/50 shadow-sm transition-all duration-300" aria-label="Github">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-900/50 shadow-sm transition-all duration-300" aria-label="Website">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-900/50 shadow-sm transition-all duration-300" aria-label="Mail">
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-500 flex items-center gap-1">
              <Hash className="w-3.5 h-3.5" /> MathDay2026
            </p>
          </div>

        </div>

        <div className="border-t border-slate-200/60 dark:border-slate-800/60 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 dark:text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Number Intelligence Challenge. Built for academic celebrations.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for National Mathematics Day
          </p>
        </div>
      </div>
    </footer>
  );
};
