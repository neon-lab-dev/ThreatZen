import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, User, ChevronDown } from 'lucide-react';

interface DashboardHeaderProps {
  /** Opens the mobile sidebar drawer */
  onMenuClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* Close dropdown on outside click / Escape */
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  /* Greeting based on time of day */
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <header
      className="
        sticky top-0 z-30
        bg-white/85 backdrop-blur-md
        border-b border-muted
        h-16 lg:h-20
      "
    >
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* ===== Left: Mobile menu + Greeting ===== */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-[var(--surface)] transition-colors flex-shrink-0"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>

          {/* Greeting */}
          <div className="min-w-0">
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-tight truncate">
              {greeting},
            </p>
            <p className="text-sm sm:text-base font-semibold text-foreground leading-tight truncate">
              Welcome back, Admin 👋
            </p>
          </div>
        </div>

        {/* ===== Right: Notifications + Logout ===== */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

          {/* Profile dropdown */}
          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className="
                flex items-center gap-2 p-1 pr-2 rounded-full
                hover:bg-[var(--surface)]
                transition-colors
              "
            >
              <span className="w-8 h-8 rounded-full bg-navy text-white text-xs font-semibold flex items-center justify-center">
                AD
              </span>
              <ChevronDown
                className={`
                  w-3.5 h-3.5 text-muted-foreground
                  transition-transform duration-200
                  ${menuOpen ? 'rotate-180' : ''}
                  hidden sm:block
                `}
              />
            </button>

            {/* Dropdown panel */}
            {menuOpen && (
              <div
                className="
                  absolute right-0 top-full mt-2 z-40
                  min-w-[220px] py-1.5
                  rounded-xl bg-white border border-muted
                  shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)]
                  overflow-hidden
                "
                role="menu"
              >
                {/* Header */}
                <div className="px-4 py-3 border-b border-muted">
                  <p className="text-sm font-semibold text-foreground">
                    Admin User
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    admin@threatzen.in
                  </p>
                </div>

                {/* Profile link */}
                <button
                  type="button"
                  className="
                    w-full flex items-center gap-3 px-4 py-2.5
                    text-sm text-foreground
                    hover:bg-[var(--surface)]
                    transition-colors
                  "
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/dashboard/profile');
                  }}
                >
                  <User className="w-4 h-4 text-muted-foreground" />
                  Profile
                </button>

                {/* Logout */}
                <div className="border-t border-muted mt-1 pt-1">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      w-full flex items-center gap-3 px-4 py-2.5
                      text-sm text-red-500
                      hover:bg-red-50
                      transition-colors
                    "
                  >
                    <LogOut className="w-4 h-4" />
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Prominent logout button — desktop only */}
          <button
            type="button"
            onClick={handleLogout}
            className="
              hidden sm:inline-flex items-center gap-2
              px-3.5 py-2 rounded-lg
              text-sm font-semibold
              text-foreground
              border border-muted bg-white
              hover:border-red-300 hover:text-red-500 hover:bg-red-50
              transition-all duration-200
            "
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;