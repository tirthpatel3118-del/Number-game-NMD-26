import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'gold' | 'teal';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center font-semibold rounded-full font-sans tracking-wide transition-all';
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] uppercase',
    md: 'px-2.5 py-1 text-xs',
  };

  const variantClasses = {
    primary: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40',
    secondary: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50',
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40',
    warning: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40',
    danger: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-100 dark:border-rose-900/40',
    gold: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/40 shadow-sm shadow-yellow-500/5',
    teal: 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400 border border-teal-100 dark:border-teal-900/40',
  };

  return (
    <span className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
