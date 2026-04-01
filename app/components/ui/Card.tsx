'use client';

import { type ReactNode, type CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  hover?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}

export default function Card({
  children, className = '', padding = 'md', hover = false, onClick, style,
}: CardProps) {
  return (
    <div
      className={`ex-card ex-card--pad-${padding} ${hover ? 'ex-card--hover' : ''} ${onClick ? 'ex-card--clickable' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={style}
    >
      {children}
    </div>
  );
}

