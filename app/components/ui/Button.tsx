'use client';

import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  children, variant = 'primary', size = 'md', loading = false,
  icon, fullWidth = false, className = '', disabled, ...props
}: ButtonProps) {
  return (
    <button
      className={`ex-btn ex-btn--${variant} ex-btn--${size} ${fullWidth ? 'ex-btn--full' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="ex-btn__spinner" />
      ) : icon ? (
        <span className="ex-btn__icon">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}
