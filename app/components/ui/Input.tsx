'use client';

import { type InputHTMLAttributes, type ReactNode, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export default function Input({
  label, error, hint, icon, fullWidth = true,
  type = 'text', className = '', id, ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || label?.toLowerCase().replace(/\s/g, '-');
  const isPassword = type === 'password';

  return (
    <div className={`ex-input-group ${fullWidth ? 'ex-input-group--full' : ''} ${className}`}>
      {label && <label htmlFor={inputId} className="ex-input__label">{label}</label>}
      <div className={`ex-input__wrapper ${error ? 'ex-input__wrapper--error' : ''}`}>
        {icon && <span className="ex-input__icon">{icon}</span>}
        <input
          id={inputId}
          type={isPassword && showPassword ? 'text' : type}
          className="ex-input"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="ex-input__toggle"
            onClick={() => setShowPassword(v => !v)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              {showPassword ? (
                <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></>
              ) : (
                <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
              )}
            </svg>
          </button>
        )}
      </div>
      {error && <span className="ex-input__error">{error}</span>}
      {hint && !error && <span className="ex-input__hint">{hint}</span>}
    </div>
  );
}
