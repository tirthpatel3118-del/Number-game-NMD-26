import React from 'react';

interface CardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  interactive?: boolean;
  mathTheme?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  footer,
  interactive = false,
  mathTheme = false,
  className = '',
}) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800/80
        bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-xl shadow-slate-100/40 dark:shadow-none
        transition-all duration-300
        ${interactive ? 'hover:-translate-y-1 hover:shadow-2xl hover:border-indigo-200 dark:hover:border-indigo-900/50 hover:shadow-indigo-500/5' : ''}
        ${mathTheme ? 'math-grid' : ''}
        ${className}
      `}
    >
      {/* Decorative math symbol top border for mathTheme */}
      {mathTheme && (
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-indigo-500 to-emerald-400" />
      )}

      {/* Card Header */}
      {(title || subtitle) && (
        <div className="p-6 pb-4 border-b border-slate-50 dark:border-slate-800/50">
          {title && (
            <h3 className="text-xl font-bold text-slate-800 dark:text-white font-sans flex items-center gap-2">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 font-sans">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Card Body */}
      <div className="p-6">{children}</div>

      {/* Card Footer */}
      {footer && (
        <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-50 dark:border-slate-800/50">
          {footer}
        </div>
      )}
    </div>
  );
};
