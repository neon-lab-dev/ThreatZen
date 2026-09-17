import React, { useEffect, useRef, useState } from "react";

const BlogHero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [counts, setCounts] = useState({ articles: 0, readers: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Mouse-tracking parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    };

    const el = heroRef.current;
    el?.addEventListener("mousemove", handleMouseMove);
    return () => el?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animated counter on mount
  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts({
        articles: Math.floor(eased * 150),
        readers: Math.floor(eased * 12),
      });

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  // Smooth scroll to #blogs
  const handleScrollToBlogs = () => {
    const target = document.getElementById("blogs");
    if (!target) return;

    setIsScrolling(true);

    // Calculate position with a small offset for any sticky header
    const headerOffset = 0;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // Reset the pressed state after the scroll animation
    setTimeout(() => setIsScrolling(false), 800);
  };

  return (
    <section
      ref={heroRef}
      className="relative bg-navy-deep overflow-hidden isolate min-h-[85vh] flex items-center py-10"
    >
      {/* ===== Ambient Background Layers ===== */}

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep" />

      {/* Dot grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
          }}
        />
      </div>

      {/* Brand glow — follows mouse subtly */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[160px] opacity-[0.09] transition-transform duration-700 ease-out pointer-events-none"
        style={{
          background: "var(--brand)",
          transform: `translate(calc(33% + ${mousePosition.x * 40}px), calc(-50% + ${mousePosition.y * 40}px))`,
        }}
      />

      {/* Secondary cool glow */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.06] transition-transform duration-700 ease-out pointer-events-none"
        style={{
          background: "var(--brand-glow)",
          transform: `translate(calc(-25% + ${mousePosition.x * -30}px), calc(50% + ${mousePosition.y * -30}px))`,
        }}
      />

      {/* Center ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 w-[900px] h-[500px] rounded-full blur-[180px] opacity-[0.05] pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          background: "var(--brand)",
          transform: `translate(calc(-50% + ${mousePosition.x * 20}px), calc(-50% + ${mousePosition.y * 20}px))`,
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-brand opacity-40 animate-float-slow" />
      <div className="absolute top-[60%] right-[15%] w-1.5 h-1.5 rounded-full bg-brand opacity-30 animate-float-medium" />
      <div className="absolute bottom-[25%] left-[25%] w-1 h-1 rounded-full bg-white opacity-20 animate-float-fast" />
      <div className="absolute top-[35%] right-[25%] w-1.5 h-1.5 rounded-full bg-white opacity-25 animate-float-slow" />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      {/* ===== Content — Centered ===== */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-4xl w-full">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-sm mb-8 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
              </span>
              <span className="text-sm font-medium text-white/80 tracking-wide uppercase">
                Insights & Resources
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              <span className="block animate-fade-in-up animation-delay-100">
                Security intelligence
              </span>
              <span className="block animate-fade-in-up animation-delay-200">
                for{" "}
                <span className="relative inline-block">
                  <span className="text-brand relative z-10">modern teams</span>
                  <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-brand/30 rounded-full origin-center animate-underline-grow animation-delay-700" />
                  <span className="absolute inset-0 blur-2xl bg-brand opacity-20 -z-0" />
                </span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
              Expert analysis, threat intelligence, and compliance guidance from
              the front lines of cyber resilience. Stay ahead of what&apos;s
              coming next.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mt-14 pt-8 border-t border-white/10 animate-fade-in-up animation-delay-500">
              <StatItem
                value={`${counts.articles}+`}
                label="Articles Published"
                accent={false}
              />
              <Divider />
              <StatItem
                value={`${counts.readers}K+`}
                label="Monthly Readers"
                accent={false}
              />
              <Divider />
              <StatItem
                value="Weekly"
                label="Threat Updates"
                accent={true}
                live={true}
              />
            </div>
            {/* ===== Scroll Indicator — anchored to bottom ===== */}
            <div className="absolute -bottom-30 left-1/2 -translate-x-1/2 hidden md:block animate-fade-in-up animation-delay-700">
              <button
                type="button"
                onClick={handleScrollToBlogs}
                aria-label="Scroll to blog articles"
                className={`
      group relative flex flex-col items-center gap-2.5
      focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50
      focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep
      rounded-full px-4 py-2 transition-all duration-300 cursor-pointer
      ${isScrolling ? "opacity-60 scale-95" : "opacity-100"}
    `}
              >
                {/* Label */}
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40 group-hover:text-white/70 transition-colors duration-300">
                  Explore Articles
                </span>

                {/* Arrow wrapper with bounce animation */}
                <span
                  className={`
        relative flex items-center justify-center
        w-9 h-9 rounded-full
        border border-white/10 bg-white/[0.04] backdrop-blur-sm
        group-hover:border-brand/40 group-hover:bg-brand/10
        transition-all duration-300
        ${isScrolling ? "" : "animate-bounce-down"}
      `}
                >
                  {/* Subtle glow ring on hover */}
                  <span className="absolute inset-0 rounded-full bg-brand opacity-0 blur-md group-hover:opacity-30 transition-opacity duration-500" />

                  {/* Chevron */}
                  <svg
                    className="relative w-4 h-4 text-white/70 group-hover:text-brand transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>

                {/* Fade trail beneath — reinforces downward motion */}
                <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-0.5 h-5 w-px bg-gradient-to-b from-white/20 to-transparent animate-trail-pulse" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Inline keyframes ===== */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes underline-grow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.7; }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-14px) translateX(-8px); opacity: 0.6; }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-10px) translateX(6px); opacity: 0.5; }
        }
        @keyframes bounce-down {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }
        @keyframes trail-pulse {
          0%, 100% {
            opacity: 0;
            transform: translate(-50%, 0) scaleY(0.6);
          }
          50% {
            opacity: 0.6;
            transform: translate(-50%, 6px) scaleY(1);
          }
        }

        .animate-fade-in-up {
          opacity: 0;
          animation: fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-underline-grow {
          transform: scaleX(0);
          animation: underline-grow 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 5s ease-in-out infinite;
        }
        .animate-bounce-down {
          animation: bounce-down 2s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
        .animate-trail-pulse {
          animation: trail-pulse 2s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-700 { animation-delay: 0.7s; }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-up,
          .animate-underline-grow,
          .animate-float-slow,
          .animate-float-medium,
          .animate-float-fast,
          .animate-bounce-down,
          .animate-trail-pulse,
          .animate-ping {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};

/* ===== Sub-components ===== */

interface StatItemProps {
  value: string;
  label: string;
  accent?: boolean;
  live?: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, accent, live }) => (
  <div className="group flex flex-col items-center text-center">
    <div className="flex items-center gap-2">
      <div
        className={`text-2xl font-bold tabular-nums transition-colors duration-300 ${
          accent ? "text-brand" : "text-white"
        }`}
      >
        {value}
      </div>
      {live && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-70 animate-ping" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand" />
        </span>
      )}
    </div>
    <div className="text-sm text-white/50 mt-1 transition-colors duration-300 group-hover:text-white/70">
      {label}
    </div>
  </div>
);

const Divider: React.FC = () => (
  <div className="w-px h-10 bg-white/10 hidden sm:block" />
);

export default BlogHero;
