import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Trophy, Calendar, Clock } from 'lucide-react';

interface ScoreCardProps {
  username: string;
  game: 'mind_reader' | 'probability_challenge';
  score: number;
  rank?: number;
  duration: number;
  date: string;
  difficulty: 'easy' | 'medium' | 'hard';
  className?: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  username,
  game,
  score,
  rank,
  duration,
  date,
  difficulty,
  className = '',
}) => {
  const isTopThree = rank !== undefined && rank <= 3;
  const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : null;

  return (
    <Card 
      className={`relative overflow-hidden p-4 border border-slate-100 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md ${className}`}
      interactive
    >
      <div className="flex items-center justify-between gap-4 font-sans">
        <div className="flex items-center space-x-3.5">
          {rank !== undefined && (
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm font-bold font-mono">
              {medal || `#${rank}`}
            </div>
          )}
          
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
              {username}
              {isTopThree && <Trophy className="w-3.5 h-3.5 text-amber-500 fill-amber-100 dark:fill-none" />}
            </h4>
            
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-550">
              <Badge variant={game === 'mind_reader' ? 'primary' : 'success'} size="sm">
                {game === 'mind_reader' ? 'Mind Reader' : 'Probability'}
              </Badge>
              <Badge variant={difficulty === 'hard' ? 'danger' : difficulty === 'medium' ? 'warning' : 'success'} size="sm">
                {difficulty}
              </Badge>
            </div>
          </div>
        </div>

        <div className="text-right space-y-1.5 font-sans">
          <div className="text-lg font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
            {score}
          </div>
          
          <div className="flex items-center gap-2 text-[10px] text-slate-450 justify-end">
            <span className="flex items-center gap-0.5">
              <Clock className="w-3 h-3" /> {duration}s
            </span>
            <span className="flex items-center gap-0.5">
              <Calendar className="w-3 h-3" /> {date}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
