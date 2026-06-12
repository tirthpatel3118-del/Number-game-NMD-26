import React from 'react';
import { Star, Trophy, Target, Compass, Binary } from 'lucide-react';
import { Badge } from './Badge';

export type AchievementType = 'ramanujan_apprentice' | 'logarithmic_wizard' | 'stochastic_master' | 'streak_champion' | 'novice';

interface AchievementBadgeProps {
  type: AchievementType;
  unlocked?: boolean;
  className?: string;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  type,
  unlocked = false,
  className = '',
}) => {
  const achievements = {
    ramanujan_apprentice: {
      title: "Ramanujan's Apprentice",
      desc: "Completed 10 computational runs.",
      icon: Trophy,
      badgeColor: 'gold' as const,
      iconColor: 'text-amber-500',
    },
    logarithmic_wizard: {
      title: "Logarithmic Wizard",
      desc: "Predicted a number in under 5 splits.",
      icon: Binary,
      badgeColor: 'primary' as const,
      iconColor: 'text-indigo-500',
    },
    stochastic_master: {
      title: "Stochastic Master",
      desc: "Won Monty Hall by switching.",
      icon: Compass,
      badgeColor: 'teal' as const,
      iconColor: 'text-teal-500',
    },
    streak_champion: {
      title: "Streak Champion",
      desc: "Maintained a 3+ day streak.",
      icon: Target,
      badgeColor: 'warning' as const,
      iconColor: 'text-amber-500',
    },
    novice: {
      title: "Novice Integrator",
      desc: "Played your first game.",
      icon: Star,
      badgeColor: 'secondary' as const,
      iconColor: 'text-slate-400',
    },
  };

  const current = achievements[type] || achievements.novice;
  const Icon = current.icon;

  return (
    <div 
      className={`
        p-4 rounded-2xl border flex items-center space-x-3 transition-all duration-300 font-sans
        ${
          unlocked 
            ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-md shadow-slate-100/30 dark:shadow-none' 
            : 'bg-slate-50 dark:bg-slate-950/40 border-slate-100 dark:border-slate-900 opacity-60'
        }
        ${className}
      `}
    >
      <div className={`p-2.5 rounded-xl ${unlocked ? 'bg-slate-50 dark:bg-slate-800/80' : 'bg-slate-100 dark:bg-slate-900'} ${current.iconColor}`}>
        <Icon className="w-5 h-5" />
      </div>
      
      <div className="space-y-0.5">
        <div className="flex items-center gap-1.5">
          <span className={`text-sm font-bold ${unlocked ? 'text-slate-850 dark:text-white' : 'text-slate-500'}`}>
            {current.title}
          </span>
          <Badge variant={unlocked ? current.badgeColor : 'secondary'} size="sm" className="px-1.5 text-[9px]">
            {unlocked ? 'Unlocked' : 'Locked'}
          </Badge>
        </div>
        <p className="text-[11px] text-slate-500 leading-tight">
          {current.desc}
        </p>
      </div>
    </div>
  );
};
