import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import logo from "../../assets/threatzen-logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/solutions", label: "Solutions" },
  { to: "/industries", label: "Industries" },
  { to: "/partners", label: "Partners" },
  // { to: "/about", label: "About" },
];

export function Header() {
  const pathname = window.location.pathname;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHomePage = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Determine text color based on page and scroll state
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
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="bg-white/95 dark:bg-white/95 rounded-lg px-2 py-1 shadow-sm">
              <img src={logo} alt="ThreatZen™" className="h-7 lg:h-8 w-auto" />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className={`font-display font-semibold text-sm ${getTextColor()}`}>
                ThreatZen<sup className="text-[0.55em] ml-0.5 font-semibold">™</sup>
              </span>
              <span className={`text-[10px] font-semibold tracking-[0.18em] uppercase ${getTextColor()}`}>
                Next-Gen <span className="text-[var(--brand)]">Cyber</span> Resilience
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${getTextColor()} hover:text-foreground`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className={`text-sm font-medium ${getTextColor()}`}
            >
              Get Assessment
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] hover:bg-[var(--brand-glow)] text-[var(--navy-deep)] px-5 py-2.5 text-sm font-semibold shadow-brand transition-all hover:-translate-y-0.5"
            >
              <ShieldCheck className="size-4" />
              Book Consultation
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1 bg-card border border-border rounded-xl p-3 shadow-elegant">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium rounded-md hover:bg-muted"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 text-center rounded-full bg-[var(--brand)] text-[var(--navy-deep)] px-5 py-2.5 text-sm font-semibold"
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