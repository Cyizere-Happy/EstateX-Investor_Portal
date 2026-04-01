'use client';

import { type CSSProperties } from 'react';

interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export default function ProgressBar({
  value, label, showPercentage = true, size = 'md', color, className = '', style,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`ex-progress ${className}`} style={style}>
      {(label || showPercentage) && (
        <div className="ex-progress__header">
          {label && <span className="ex-progress__label">{label}</span>}
          {showPercentage && <span className="ex-progress__value">{Math.round(clampedValue)}%</span>}
        </div>
      )}
      <div className={`ex-progress__track ex-progress__track--${size}`}>
        <div
          className="ex-progress__fill"
          style={{ width: `${clampedValue}%`, ...(color ? { background: color } : {}) }}
        />
      </div>
    </div>
  );
}

