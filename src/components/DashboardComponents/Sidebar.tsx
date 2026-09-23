import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import { navItems } from "./navItems";

interface SidebarProps {
  /** Mobile drawer open state */
  open: boolean;
  /** Called when the mobile drawer should close */
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  /* Group items by section */
  const sections = navItems.reduce<Record<string, typeof navItems>>(
    (acc, item) => {
      const key = item.section ?? "General";
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {},
  );

  const handleLogout = () => {
    // TODO: wire to your actual logout (clear token, call API, etc.)
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* ===== Mobile overlay ===== */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* ===== Sidebar ===== */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64
          flex flex-col
          bg-navy-deep text-white
          border-r border-white/5
          transform transition-transform duration-300 ease-out
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* ===== Logo ===== */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-white/[0.06] flex-shrink-0">
          <NavLink to="/" className="flex items-center gap-2" onClick={onClose}>
            <span className="font-bold text-base tracking-tight">
              Threat<span className="text-brand">Z</span>en
              <sup className="relative -top-1 text-[0.6em]">™</sup>
            </span>
          </NavLink>

          {/* Mobile close */}
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 -mr-1.5 rounded-md hover:bg-white/[0.06] transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4 text-white/60" />
          </button>
        </div>

        {/* ===== Nav ===== */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
          {Object.entries(sections).map(([section, items]) => (
            <div key={section}>
              <p className="px-3 mb-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/30">
                {section}
              </p>

              <div className="space-y-1">
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === "/dashboard"}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `
                          group relative flex items-center gap-3
                          px-3 py-2.5 rounded-lg
                          text-sm font-medium
                          transition-all duration-200
                          ${
                            isActive
                              ? "bg-brand/10 text-white"
                              : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                          }
                        `
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {/* Left accent bar */}
                          <span
                            className={`
                              absolute left-0 top-1/2 -translate-y-1/2
                              w-1 rounded-r-full bg-brand
                              transition-all duration-300
                              ${isActive ? "h-5 opacity-100" : "h-0 opacity-0"}
                            `}
                          />

                          {/* Icon */}
                          <span
                            className={`
                              flex items-center justify-center w-8 h-8 rounded-lg
                              transition-colors duration-200
                              ${
                                isActive
                                  ? "bg-brand/15 text-brand"
                                  : "bg-white/[0.04] text-white/50 group-hover:text-white/80"
                              }
                            `}
                          >
                            <Icon className="w-4 h-4" />
                          </span>

                          {/* Label */}
                          <span className="flex-1">{item.label}</span>

                          {/* Badge */}
                          {item.badge && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-brand text-navy-deep">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* ===== Sign Out ===== */}
        <div className="p-3 border-t border-white/[0.06] flex-shrink-0">
          <button
            type="button"
            onClick={handleLogout}
            className="
              group flex items-center gap-3 w-full
              px-3 py-2.5 rounded-lg
              text-sm font-medium
              text-white/60 hover:text-red-400
              hover:bg-red-500/[0.08]
              transition-all duration-200
            "
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] group-hover:bg-red-500/10 transition-colors">
              <LogOut className="w-4 h-4" />
            </span>
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
