"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Crumb = { label: string; href?: string };

type TopHeaderProps = {
  breadcrumbs: Crumb[];
  balance?: number;
  reserved?: number;
  bonus?: number;
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
};

export function TopHeader({
  breadcrumbs,
  balance = 0,
  reserved = 0,
  bonus = 0,
  userName = "",
  userAvatar,
  notificationCount = 0,
}: TopHeaderProps) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="top-header">
      {/* Breadcrumbs */}
      <nav className="header-breadcrumb">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="header-breadcrumb__item">
            {i > 0 && <span className="header-breadcrumb__sep">›</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="header-breadcrumb__link">
                {crumb.label}
              </Link>
            ) : (
              <span className="header-breadcrumb__current">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      {/* Right side */}
      <div className="header-right">
        {/* Wallet info */}
        <div className="header-wallet">
          <span className="header-wallet__item">
            Balance: <strong>${balance.toFixed(2)}</strong>
          </span>
          <span className="header-wallet__sep" />
          <span className="header-wallet__item">
            Reserved: <strong>${reserved.toFixed(2)}</strong>
          </span>
          <span className="header-wallet__sep" />
          <span className="header-wallet__item">
            Bonus: <strong>${bonus.toFixed(2)}</strong>
          </span>
        </div>

        {/* Actions */}
        <div className="header-actions">
          {/* Notifications */}
          <Link href="/notifications" className="header-icon-btn" aria-label="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {notificationCount > 0 && (
              <span className="header-notif-badge">{notificationCount > 9 ? "9+" : notificationCount}</span>
            )}
          </Link>

          {/* Avatar */}
          <Link href="/profile" className="header-avatar" aria-label="Profile">
            {userAvatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={userAvatar} alt={userName} width={32} height={32} />
            ) : (
              <span>{initials || "U"}</span>
            )}
          </Link>
        </div>
      </div>

      <style>{`
        .header-breadcrumb {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-wrap: wrap;
        }
        .header-breadcrumb__item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          font-family: var(--font-inter);
        }
        .header-breadcrumb__sep { color: var(--color-grey-blue); }
        .header-breadcrumb__link { color: var(--color-grey-blue); text-decoration: none; }
        .header-breadcrumb__link:hover { color: var(--color-primary); }
        .header-breadcrumb__current { color: var(--color-dark); font-weight: 500; }
        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .header-wallet {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-family: var(--font-inter);
          color: var(--color-grey-blue);
        }
        .header-wallet strong { color: var(--color-dark); }
        .header-wallet__sep {
          width: 1px;
          height: 14px;
          background: var(--color-border);
          display: block;
        }
        .header-actions { display: flex; align-items: center; gap: 8px; }
        .header-icon-btn {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-grey-blue);
          text-decoration: none;
          position: relative;
          transition: background 0.12s;
        }
        .header-icon-btn:hover { background: var(--color-muted); color: var(--color-dark); }
        .header-notif-badge {
          position: absolute;
          top: 2px; right: 2px;
          background: var(--color-danger);
          color: white;
          font-size: 9px;
          font-weight: 700;
          border-radius: 10px;
          padding: 0 4px;
          min-width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-inter);
        }
        .header-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--color-primary);
          color: white;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          overflow: hidden;
          font-family: var(--font-inter);
          flex-shrink: 0;
        }
        .header-avatar img { width: 100%; height: 100%; object-fit: cover; }
        @media (max-width: 768px) {
          .header-wallet { display: none; }
        }
      `}</style>
    </header>
  );
}
