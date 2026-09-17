import React from 'react';

const ArticleHero: React.FC = () => {
  return (
    <section className="relative bg-white overflow-hidden pt-16">
      {/* Subtle grid pattern — light */}
      <div className="absolute inset-0 opacity-[0.35] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15,23,42,0.06) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Soft brand glow — top right */}
      <div className="absolute -top-32 -right-24 w-[500px] h-[500px] bg-[var(--brand)] opacity-[0.10] blur-[140px] rounded-full pointer-events-none" />

      {/* Soft navy glow — bottom left */}
      <div className="absolute -bottom-32 -left-24 w-[500px] h-[500px] bg-[var(--navy)] opacity-[0.06] blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 lg:pt-20 pb-12">
        <div>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <a
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </a>
            <svg
              className="w-3 h-3 text-muted-foreground/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <a
              href="/blog"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </a>
            <svg
              className="w-3 h-3 text-muted-foreground/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-foreground font-medium">Threat Intelligence</span>
          </nav>

          {/* Category & Read Time */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-3 py-1.5 rounded-full bg-[var(--brand)]/12 text-[var(--brand)] text-xs font-semibold tracking-wide uppercase border border-[var(--brand)]/20">
              Threat Intelligence
            </span>
            <span className="text-sm text-muted-foreground">8 min read</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40 hidden sm:block" />
            <span className="text-sm text-muted-foreground hidden sm:block">
              Dec 18, 2025
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-[1.15] mb-6">
            The 2025 Ransomware Playbook: How Indian Enterprises Are Building Resilience
          </h1>

          {/* Subtitle / Lede */}
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-10">
            Ransomware attacks on Indian enterprises grew 67% year-over-year. We analyzed 200+
            incidents to understand what separates organizations that recover in days from those
            that take months.
          </p>
        </div>

        {/* ===== Feature Image ===== */}
       <div className="rounded-3xl overflow-hidden border border-muted shadow-[0_20px_60px_-20px_rgba(15,23,42,0.15)] flex items-center justify-center mt-4">
            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80"
              alt="Ransomware resilience illustration"
              className="w-full h-auto aspect-[16/9] object-cover"
              loading="eager"
            />
          </div>
      </div>
    </section>
  );
};

export default ArticleHero;