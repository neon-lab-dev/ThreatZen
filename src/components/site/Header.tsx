/* eslint-disable react-hooks/set-state-in-effect */
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ShieldCheck, ChevronDown } from "lucide-react";
import logo from "../../assets/threatzen-logo.png";

/* ============================================================
   Navigation config
   ============================================================ */

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  {
    label: "Services",
    // dropdown items
    children: [
      { to: "/compliance-services", label: "Compliance Services" },
      { to: "/cybersecurity-services", label: "Cybersecurity Services" },
    ],
  },
  { to: "/industries", label: "Industries" },
  { to: "/blogs", label: "Blogs" },
] as const;

export function Header() {
  const location = useLocation();
  const pathname = location.pathname;

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const isHomePage = pathname === "/";

  /* ===== Scroll state ===== */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ===== Close menus on route change ===== */
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  /* ===== Theme-aware colors ===== */
  const getTextColor = () => {
    if (!isHomePage) return "text-foreground";
    return scrolled ? "text-foreground" : "text-white";
  };

  const getHeaderBg = () => {
    if (!isHomePage) {
      return "bg-background/85 backdrop-blur-md border-b border-border shadow-sm";
    }
    return scrolled
      ? "bg-background/85 backdrop-blur-md border-b border-border shadow-sm"
      : "bg-transparent text-white";
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${getHeaderBg()}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* ===== Logo ===== */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="bg-white/95 dark:bg-white/95 rounded-lg px-2 py-1 shadow-sm">
              <img src={logo} alt="ThreatZen™" className="h-7 lg:h-8 w-auto" />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className={`font-display font-semibold text-sm ${getTextColor()}`}>
                ThreatZen<sup className="text-[0.55em] ml-0.5 font-semibold">™</sup>
              </span>
              <span
                className={`text-[10px] font-semibold tracking-[0.18em] uppercase ${getTextColor()}`}
              >
                Next-Gen <span className="text-brand">Cyber</span> Resilience
              </span>
            </div>
          </Link>

          {/* ===== Desktop Nav ===== */}
          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => {
              // Dropdown item
              if ("children" in item) {
                const isActive = item.children.some((c) => pathname === c.to);
                return (
                  <DesktopDropdown
                    key={item.label}
                    label={item.label}
                    items={item.children}
                    isActive={isActive}
                    textColor={getTextColor()}
                    open={servicesOpen}
                    setOpen={setServicesOpen}
                  />
                );
              }

              // Plain link
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${getTextColor()} hover:underline`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* ===== CTA ===== */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] hover:bg-[var(--brand-glow)] text-navy-deep px-5 py-2.5 text-sm font-semibold shadow-brand transition-all hover:-translate-y-0.5"
            >
              <ShieldCheck className="size-4" />
              Book Consultation
            </Link>
          </div>

          {/* ===== Mobile Menu Button ===== */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* ===== Mobile Menu ===== */}
        {open && (
          <div className="lg:hidden pb-4 animate-fade-in text-foreground">
            <div className="flex flex-col gap-1 bg-card border border-border rounded-xl p-3 shadow-elegant">
              {nav.map((item) => {
                // Mobile dropdown
                if ("children" in item) {
                  return (
                    <div key={item.label} className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md hover:bg-muted"
                        aria-expanded={mobileServicesOpen}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`size-4 transition-transform duration-200 ${
                            mobileServicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {mobileServicesOpen && (
                        <div className="ml-3 mt-1 flex flex-col gap-1 border-l-2 border-brand/30 pl-3 animate-fade-in">
                          {item.children.map((child) => (
                            <Link
                              key={child.to}
                              to={child.to}
                              onClick={() => setOpen(false)}
                              className="px-3 py-2 text-sm font-medium rounded-md text-foreground hover:text-foreground hover:bg-muted"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                // Mobile plain link
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2.5 text-sm font-medium rounded-md hover:bg-muted text-foreground"
                  >
                    {item.label}
                  </Link>
                );
              })}

              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 text-center rounded-full bg-[var(--brand)] text-navy-deep px-5 py-2.5 text-sm font-semibold"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/* ============================================================
   Desktop Dropdown
   ============================================================ */

interface DesktopDropdownProps {
  label: string;
  items: readonly { to: string; label: string }[];
  isActive: boolean;
  textColor: string;
  open: boolean;
  setOpen: (v: boolean) => void;
}

function DesktopDropdown({
  label,
  items,
  isActive,
  textColor,
  open,
  setOpen,
}: DesktopDropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ===== Close on click outside ===== */
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, setOpen]);

  /* ===== Hover handling with small delay ===== */
  const handleEnter = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`
          flex items-center gap-1 px-3 py-2 text-sm font-medium
          rounded-md transition-colors ${textColor}
          hover:underline
          ${isActive ? "text-brand" : ""}
        `}
      >
        {label}
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`
          absolute top-full left-0 pt-3
          transition-all duration-200
          ${
            open
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-1 pointer-events-none"
          }
        `}
      >
        <div
          className="
            min-w-[240px] rounded-2xl overflow-hidden
            bg-white border border-muted
            shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)]
          "
          role="menu"
        >
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              role="menuitem"
              className="
                group flex items-center gap-3 px-5 py-3.5
                text-sm font-medium text-foreground
                hover:bg-brand/5 hover:text-brand
                transition-colors
                border-b border-muted last:border-b-0
              "
            >
              {/* Left accent bar on hover */}
              <span className="w-0.5 h-4 rounded-full bg-brand scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
              <span className="flex-1">{item.label}</span>
              <svg
                className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}