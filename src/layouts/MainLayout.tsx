import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { ArrowLeft } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isWelcomeScreen = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300 relative font-sans overflow-x-hidden">
      {/* Dynamic background math grid and glow */}
      <div className="absolute inset-0 math-grid pointer-events-none z-0 opacity-80" />
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full math-bg-glow pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full math-bg-glow pointer-events-none z-0" />

      {/* Minimalistic Navigation header for inner game views */}
      {!isWelcomeScreen && (
        <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-sm font-extrabold text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-800 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Exit to Welcome Hub</span>
            </button>
            
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">
                National Mathematics Day 2026
              </span>
              <ThemeToggle />
            </div>
          </div>
        </header>
      )}

      {/* Main page content */}
      <main className="flex-grow relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex flex-col justify-center">
        {children}
      </main>

      {/* Minimal exhibition footer */}
      <footer className="py-4 border-t border-slate-100 dark:border-slate-900 text-center text-[10px] text-slate-400 dark:text-slate-600 z-10 bg-white/30 dark:bg-slate-950/30 backdrop-blur-sm">
        © {new Date().getFullYear()} Number Intelligence Challenge • National Mathematics Day Exhibition
      </footer>
    </div>
  );
};
