import React from 'react';
import { Card } from './Card';

interface StatisticsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  progress?: number; // optional progress value from 0 to 100
  progressColor?: string;
  description?: string;
  className?: string;
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  icon,
  progress,
  progressColor = 'bg-indigo-600 dark:bg-indigo-400',
  description,
  className = '',
}) => {
  return (
    <Card interactive className={`p-6 flex flex-col justify-between font-sans ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold uppercase tracking-wider">
            {title}
          </span>
          <span className="text-3xl font-extrabold font-mono text-slate-800 dark:text-white leading-none">
            {value}
          </span>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl text-slate-650 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-slate-850">
          {icon}
        </div>
      </div>

      {progress !== undefined && (
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
            <span>Completion / Rate</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${progressColor}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {description && (
        <p className="text-xs text-slate-450 dark:text-slate-500 pt-2 leading-relaxed">
          {description}
        </p>
      )}
    </Card>
  );
};
