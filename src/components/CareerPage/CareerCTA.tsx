// components/CareerPage/CareerCTA.tsx
import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { APPLY_EMAIL } from './jobs';

const CareerCTA: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 lg:py-24">
      {/* Glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand opacity-[0.08] blur-[160px] rounded-full pointer-events-none"
      />

      {/* Top accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-[1.15] mb-4">
          Don't see the right role?
        </h2>
        <p className="text-base text-white/65 leading-relaxed max-w-2xl mx-auto mb-8">
          We're always looking for smart people who care about security. Send us
          your resume and tell us what you'd like to work on.
        </p>

        <a
          href={`mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(
            'General Application — ThreatZen'
          )}`}
          className="
            group inline-flex items-center gap-2
            rounded-full bg-brand text-navy-deep
            px-6 py-3.5 text-sm font-semibold
            shadow-[0_0_0_0_rgba(76,192,138,0.5)]
            hover:shadow-[0_0_40px_-4px_rgba(76,192,138,0.7)]
            hover:-translate-y-0.5
            transition-all duration-300
          "
        >
          <Mail className="w-4 h-4" />
          Send a General Application
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
};

export default CareerCTA;