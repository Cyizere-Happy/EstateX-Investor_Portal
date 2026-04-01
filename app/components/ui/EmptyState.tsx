'use client';

import { type ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({ title, description, icon, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`ex-empty ${className}`}>
      {icon ? (
        <div className="ex-empty__icon">{icon}</div>
      ) : (
        <div className="ex-empty__icon">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
      )}
      <h3 className="ex-empty__title">{title}</h3>
      {description && <p className="ex-empty__desc">{description}</p>}
      {action && <div className="ex-empty__action">{action}</div>}
    </div>
  );
}
