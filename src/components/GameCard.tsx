import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';

interface GameCardProps {
  title: string;
  description: string;
  badges: string[];
  actionLabel: string;
  onAction: () => void;
  icon: React.ReactNode;
  complexity?: string;
  className?: string;
}

export const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  badges,
  actionLabel,
  onAction,
  icon,
  complexity,
  className = '',
}) => {
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          {icon}
          {title}
        </span>
      }
      interactive
      mathTheme
      footer={
        <Button variant="primary" fullWidth onClick={onAction}>
          {actionLabel}
        </Button>
      }
      className={`flex flex-col justify-between h-full ${className}`}
    >
      <div className="space-y-4">
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {complexity && (
            <Badge variant="teal" size="sm">
              {complexity}
            </Badge>
          )}
          {badges.map((badge, idx) => (
            <Badge key={idx} variant="primary" size="sm">
              {badge}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};
