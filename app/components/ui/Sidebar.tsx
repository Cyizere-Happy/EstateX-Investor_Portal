'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROLE_NAV_MAP, type NavItem } from '@/lib/constants';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  if (!user) return null;

  const navItems: NavItem[] = ROLE_NAV_MAP[user.role] || [];

  return (
    <aside className="ex-sidebar">
      <div className="ex-sidebar__header">
        <Link href="/" className="ex-sidebar__logo">
          <span className="ex-sidebar__logo-icon">EX</span>
          <span className="ex-sidebar__logo-text">EstateX</span>
        </Link>
      </div>

      <nav className="ex-sidebar__nav">
        <ul className="ex-sidebar__list">
          {navItems.map((item) => {
            // Exact match for root portal dashboards to avoid false positives on child routes
            const isDashboard = ['/investor', '/owner', '/admin', '/notary'].includes(item.href);
            const isActive = isDashboard
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`ex-sidebar__link ${isActive ? 'ex-sidebar__link--active' : ''}`}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="ex-sidebar__link-icon">
                    <path d={item.icon} />
                  </svg>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="ex-sidebar__footer">
        <Link href="/" className="ex-sidebar__link">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span>Home</span>
        </Link>
        <button onClick={logout} className="ex-sidebar__link ex-sidebar__link--logout">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
