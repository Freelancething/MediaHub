"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { BellIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activityStatus, setActivityStatus] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          {/* More options button */}
          <button className="header-icon-btn" aria-label="More options">
            <span style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: 1 }}>⋯</span>
          </button>

          {/* Notifications */}
          <Link href="/notifications" className="header-icon-btn" aria-label="Notifications">
            <BellIcon className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="header-notif-badge">{notificationCount > 9 ? "9+" : notificationCount}</span>
            )}
          </Link>

          {/* Profile Dropdown Area */}
          <div className="profile-dropdown-container" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              className="header-avatar-trigger"
              aria-label="Toggle profile menu"
            >
              <div className="header-avatar">
                {userAvatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={userAvatar} alt={userName} width={32} height={32} />
                ) : (
                  <span>{initials || "SK"}</span>
                )}
              </div>
            </button>

            {dropdownOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-user-info">
                  <div className="user-role">Media Partner</div>
                  <div className="user-name">{userName || "Seshu Kumari"}</div>
                </div>
                
                <div className="dropdown-divider" />
                
                <div className="dropdown-section">
                  <button className="dropdown-item dropdown-item-wallet">
                    <span>Balance</span>
                    <ChevronDownIcon className="w-4 h-4 text-grey-blue" />
                  </button>
                  <Link href="/account-settings" className="dropdown-item">
                    Account Settings
                  </Link>
                  <Link href="/reviews" className="dropdown-item">
                    My Rating & Reviews
                  </Link>
                  <Link href="/referral" className="dropdown-item">
                    Referral Program
                  </Link>
                  <button className="dropdown-item text-primary">
                    Switch to Buyer
                  </button>
                  <button 
                    onClick={() => signOut({ callbackUrl: "/" })} 
                    className="dropdown-item text-danger"
                  >
                    Log out
                  </button>
                </div>

                <div className="dropdown-divider" />

                <div className="dropdown-footer-status">
                  <span className="status-label">Activity status</span>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={activityStatus}
                      onChange={(e) => setActivityStatus(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            )}
          </div>
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
          background: none;
          border: none;
          text-decoration: none;
          position: relative;
          transition: background 0.12s;
          cursor: pointer;
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
        
        .profile-dropdown-container {
          position: relative;
        }
        .header-avatar-trigger {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }
        .header-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #677F9B;
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

        /* Profile Dropdown modal styled matching reference */
        .profile-dropdown {
          position: absolute;
          top: 40px;
          right: 0;
          width: 240px;
          background: white;
          border-radius: 12px;
          border: 1px solid var(--color-border);
          box-shadow: 0 10px 30px rgba(17,44,62,0.12);
          z-index: 50;
          padding: 16px 0 12px;
          display: flex;
          flex-direction: column;
        }
        .dropdown-user-info {
          padding: 0 20px 12px;
        }
        .dropdown-user-info .user-role {
          font-size: 11px;
          color: var(--color-grey-blue);
          text-transform: uppercase;
          font-family: var(--font-inter);
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .dropdown-user-info .user-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-dark);
          font-family: var(--font-space-grotesk);
          margin-top: 2px;
        }
        .dropdown-divider {
          height: 1px;
          background: #EEF0FD;
          margin: 4px 0;
        }
        .dropdown-section {
          display: flex;
          flex-direction: column;
          padding: 6px 0;
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
          font-size: 13.5px;
          font-family: var(--font-inter);
          color: var(--color-dark);
          text-decoration: none;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
        }
        .dropdown-item:hover {
          background: #F5F8FA;
        }
        .dropdown-item.text-primary {
          color: var(--color-primary);
          font-weight: 500;
        }
        .dropdown-item.text-danger {
          color: var(--color-danger);
        }
        .dropdown-item-wallet {
          font-weight: 500;
        }
        
        .dropdown-footer-status {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px 4px;
        }
        .status-label {
          font-size: 13.5px;
          font-family: var(--font-inter);
          color: var(--color-grey-blue);
        }

        /* Toggle switch */
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 38px;
          height: 20px;
        }
        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .toggle-slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background-color: #DCDCE5;
          transition: .3s;
          border-radius: 20px;
        }
        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 14px;
          width: 14px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .3s;
          border-radius: 50%;
        }
        input:checked + .toggle-slider {
          background-color: #4cd964;
        }
        input:checked + .toggle-slider:before {
          transform: translateX(18px);
        }

        @media (max-width: 768px) {
          .header-wallet { display: none; }
        }
      `}</style>
    </header>
  );
}
