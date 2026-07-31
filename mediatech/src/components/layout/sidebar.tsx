"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type SidebarProps = {
  navItems: NavItem[];
  role: string;
};

export function Sidebar({ navItems, role }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo__icon">
          <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="18" fill="#3E4FEA" />
            <text x="18" y="23" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="Space Grotesk">M</text>
          </svg>
        </div>
        <span className="sidebar-logo__text">MediaHub</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn("sidebar-nav__item", isActive && "sidebar-nav__item--active")}
            >
              <span className="sidebar-nav__icon">{item.icon}</span>
              <span className="sidebar-nav__label">{item.label}</span>
            </Link>
          );
        })}
      </nav>


      <div className="sidebar-footer">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="sidebar-signout"
        >
          <ArrowRightOnRectangleIcon className="w-4 h-4" />
          <span>Sign out</span>
        </button>
        <button className="sidebar-collapse btn-ghost btn-sm">
          Collapse view
        </button>
      </div>

      <style>{`
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 18px 16px 14px;
          border-bottom: 1px solid var(--color-border);
        }
        .sidebar-logo__text {
          font-size: 15px;
          font-weight: 700;
          color: var(--color-dark);
          font-family: var(--font-space-grotesk);
        }
        .sidebar-nav {
          flex: 1;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow-y: auto;
        }
        .sidebar-nav__item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 10px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          font-family: var(--font-inter);
          color: var(--color-grey-blue);
          text-decoration: none;
          transition: background 0.12s ease, color 0.12s ease;
        }
        .sidebar-nav__item:hover {
          background: var(--color-muted);
          color: var(--color-dark);
        }
        .sidebar-nav__item--active {
          background: #eef0fd;
          color: var(--color-primary);
        }
        .sidebar-nav__icon {
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .sidebar-footer {
          padding: 12px 8px;
          border-top: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .sidebar-signout {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 10px;
          border-radius: 8px;
          font-size: 14px;
          font-family: var(--font-inter);
          color: var(--color-grey-blue);
          background: none;
          border: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
          transition: background 0.12s, color 0.12s;
        }
        .sidebar-signout:hover {
          background: #fddde5;
          color: var(--color-danger);
        }
        .sidebar-collapse {
          font-size: 12px;
          color: var(--color-grey-blue);
          padding: 6px 10px;
          border-radius: 6px;
          cursor: pointer;
          background: none;
          border: none;
          text-align: left;
        }
        .sidebar-collapse:hover {
          background: var(--color-muted);
          color: var(--color-dark);
        }
      `}</style>
    </aside>
  );
}
