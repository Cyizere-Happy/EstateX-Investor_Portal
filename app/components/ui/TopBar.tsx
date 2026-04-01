'use client';

import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function TopBar() {
  const { user } = useAuth();
  const pathname = usePathname();

  // Generate breadcrumb from pathname
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumb = segments.map((s, i) => ({
    label: s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    isLast: i === segments.length - 1,
  }));

  return (
    <header className="ex-topbar">
      <div className="ex-topbar__left">
        <nav className="ex-topbar__breadcrumb" aria-label="Breadcrumb">
          {breadcrumb.map((item, i) => (
            <span key={i} className={item.isLast ? 'ex-topbar__crumb--active' : 'ex-topbar__crumb'}>
              {item.label}
              {!item.isLast && <span className="ex-topbar__crumb-sep">/</span>}
            </span>
          ))}
        </nav>
      </div>

      <div className="ex-topbar__right">
        <div className="ex-topbar__search">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input type="text" placeholder="Search..." className="ex-topbar__search-input" />
        </div>

        <button className="ex-topbar__icon-btn" aria-label="Notifications">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
          <span className="ex-topbar__badge">3</span>
        </button>

        <div className="ex-topbar__user">
          <div className="ex-topbar__avatar">
            {user?.first_name?.[0]}{user?.last_name?.[0]}
          </div>
          <div className="ex-topbar__user-info">
            <span className="ex-topbar__user-name">{user?.first_name} {user?.last_name}</span>
            <span className="ex-topbar__user-role">{user?.role?.replace('_', ' ')}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
