import React from 'react';
import { Badge } from './Badge';

interface HeroAction {
  label: string;
  onClick: () => void;
  variant: 'primary' | 'secondary' | 'outline' | 'math' | 'danger';
  icon?: React.ReactNode;
}

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  badgeText?: string;
  badgeVariant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'gold' | 'teal';
  actions?: HeroAction[];
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  badgeText,
  badgeVariant = 'primary',
  actions = [],
  className = '',
}) => {
  return (
    <div className={`text-center max-w-4xl mx-auto space-y-6 py-6 sm:py-10 ${className}`}>
      {badgeText && (
        <div className="inline-flex items-center justify-center">
          <Badge variant={badgeVariant} size="md" className="py-1 px-3">
            {badgeText}
          </Badge>
        </div>
      )}
      
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight font-sans">
        {title}
      </h1>
      
      <p className="text-base sm:text-lg md:text-xl text-slate-650 dark:text-slate-405 font-sans max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>

      {actions.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`
                inline-flex items-center justify-center font-sans font-semibold rounded-xl transition-all duration-300 transform active:scale-95 px-5 py-2.5 text-sm md:px-7 md:py-3.5 md:text-base shadow-md
                ${
                  action.variant === 'math'
                    ? 'bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white shadow-indigo-500/20'
                    : action.variant === 'primary'
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600'
                    : action.variant === 'outline'
                    ? 'border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-350 shadow-none'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200'
                }
              `}
            >
              {action.label}
              {action.icon && <span className="ml-2">{action.icon}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
