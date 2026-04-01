'use client';

import { type ReactNode } from 'react';
import Card from './Card';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: { value: string; positive: boolean };
  className?: string;
}

export default function StatsCard({ label, value, icon, trend, className = '' }: StatsCardProps) {
  return (
    <Card className={`ex-stats-card ${className}`}>
      <div className="ex-stats-card__top">
        <div className="ex-stats-card__icon">{icon}</div>
        {trend && (
          <span className={`ex-stats-card__trend ${trend.positive ? 'ex-stats-card__trend--up' : 'ex-stats-card__trend--down'}`}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              {trend.positive
                ? <path d="M7 14l5-5 5 5H7z" />
                : <path d="M7 10l5 5 5-5H7z" />
              }
            </svg>
            {trend.value}
          </span>
        )}
      </div>
      <div className="ex-stats-card__value">{typeof value === 'number' ? value.toLocaleString() : value}</div>
      <div className="ex-stats-card__label">{label}</div>
    </Card>
  );
}
