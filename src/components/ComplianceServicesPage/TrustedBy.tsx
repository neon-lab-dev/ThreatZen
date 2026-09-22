// components/ComplianceServicesPage/TrustedBy.tsx
import React, { useEffect, useRef, useState } from 'react';

const badges = [
  {
    name: 'ISO',
    sub: '27001',
    desc: 'Information Security',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
        />
      </svg>
    ),
  },
  {
    name: 'AICPA',
    sub: 'SOC 2',
    desc: 'Service Organization',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
        />
      </svg>
    ),
  },
  {
    name: 'GDPR',
    sub: 'EU',
    desc: 'Data Protection',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
  },
];

const TrustedBy: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background border-y border-muted overflow-hidden"
    >
      {/* Soft ambient glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand opacity-[0.06] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 right-0 w-[500px] h-[300px] bg-brand-glow opacity-[0.04] blur-[140px] rounded-full pointer-events-none" />

      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15,23,42,0.06) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* ===== Left: Message + CTA ===== */}
          <div
            className={`
              lg:col-span-5 transition-all duration-700
              ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="h-px w-6 bg-brand" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand">
                Trusted Standards
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-[1.15] tracking-tight mb-4">
              Trusted by{' '}
              <span className="text-brand">compliance-driven</span>{' '}
              organizations
            </h2>

            <p className="text-base text-muted-foreground leading-relaxed mb-7 max-w-md">
              We align with globally recognized frameworks and standards so your business stays
              audit-ready, always.
            </p>

            {/* CTA */}
            <a
              href="#contact"
              className="
                group inline-flex items-center gap-2
                px-5 py-3 rounded-xl
                bg-navy text-white font-semibold text-sm
                hover:bg-navy-deep
                transition-all duration-300
              "
            >
              Talk to a Compliance Expert
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* ===== Right: Badges ===== */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {badges.map((b, i) => (
                <div
                  key={b.name}
                  className={`
                    group relative rounded-2xl bg-white border border-muted
                    p-5 lg:p-6 overflow-hidden
                    hover:border-brand/40 hover:shadow-lg hover:shadow-navy/5
                    transition-all duration-500
                    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                  style={{ transitionDelay: `${150 + i * 120}ms` }}
                >
                  {/* Corner accent on hover */}
                  <div className="absolute top-0 left-0 w-12 h-12 bg-brand/0 group-hover:bg-brand/5 rounded-br-full transition-colors duration-500" />

                  {/* Icon */}
                  <div className="relative w-11 h-11 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4 group-hover:bg-brand group-hover:text-navy-deep transition-all duration-300">
                    {b.icon}
                  </div>

                  {/* Name + sub */}
                  <div className="relative flex items-baseline gap-1.5 mb-1">
                    <span className="text-lg font-bold text-foreground tracking-tight">
                      {b.name}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {b.sub}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="relative text-xs text-muted-foreground leading-relaxed">
                    {b.desc}
                  </p>

                  {/* Bottom brand accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </div>
              ))}
            </div>

            {/* Supporting microcopy */}
            <p
              className={`
                text-xs text-muted-foreground mt-5 text-center lg:text-left
                transition-all duration-700 delay-500
                ${visible ? 'opacity-100' : 'opacity-0'}
              `}
            >
              Plus support for DPDP 2023, HIPAA, PCI DSS, SOC 1, ISO 27017 and more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;