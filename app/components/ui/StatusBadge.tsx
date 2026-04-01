'use client';

import { STATUS_COLORS } from '@/lib/constants';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const colors = STATUS_COLORS[status] || STATUS_COLORS['pending'];
  const label = status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <span
      className={`ex-badge ${className}`}
      style={{ background: colors.bg, color: colors.text }}
    >
      {label}
    </span>
  );
}
