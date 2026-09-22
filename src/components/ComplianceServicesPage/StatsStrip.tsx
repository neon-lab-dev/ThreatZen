// components/ComplianceServicesPage/StatsStrip.tsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Building2, Users, Briefcase } from 'lucide-react';

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  hint: string;
}

const stats: Stat[] = [
  {
    icon: Award,
    value: 2,
    suffix: '+',
    label: 'Years in Business',
    hint: 'Building trust since day one',
  },
  {
    icon: Building2,
    value: 20,
    suffix: '+',
    label: 'Industries Served',
    hint: 'From BFSI to healthcare',
  },
  {
    icon: Users,
    value: 150,
    suffix: '+',
    label: 'Organizations Supported',
    hint: 'Across India, US, UK, EU',
  },
  {
    icon: Briefcase,
    value: 75,
    suffix: '+',
    label: 'Active Engagements',
    hint: 'Running right now',
  },
];

/* ===== Animated counter hook ===== */
const useCountUp = (target: number, start: boolean, duration = 1600) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();

    const tick = (now: number) => {
      const elapsed = now - t0;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return value;
};

const StatsStrip: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-20 lg:py-24 overflow-hidden"
    >
      {/* ===== Ambient glows ===== */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand opacity-[0.08] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-brand-glow opacity-[0.06] blur-[160px] rounded-full pointer-events-none" />

      {/* ===== Dot texture ===== */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15,23,42,0.06) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* ===== Top + bottom accent lines ===== */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* ===== Heading ===== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-brand" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand">
              By The Numbers
            </span>
            <span className="h-px w-6 bg-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Trusted at scale, delivered with{' '}
            <span className="text-brand">precision</span>
          </h2>
        </motion.div>

        {/* ===== Stats grid ===== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   StatCard
   ============================================================ */

interface StatCardProps {
  stat: Stat;
  index: number;
  inView: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index, inView }) => {
  const Icon = stat.icon;
  const count = useCountUp(stat.value, inView, 1400 + index * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative"
    >
      <div
        className="
          relative rounded-2xl overflow-hidden h-full
          bg-white
          border border-muted
          p-5 lg:p-6
          shadow-sm
          transition-all duration-500
          group-hover:border-brand/40
          group-hover:shadow-[0_20px_50px_-20px_rgba(76,192,138,0.35)]
        "
      >
        {/* Radial glow */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-brand opacity-0 blur-[50px] rounded-full transition-opacity duration-500 group-hover:opacity-30 pointer-events-none" />

        {/* Icon */}
        <div className="relative w-10 h-10 rounded-xl bg-brand/10 border border-brand/25 flex items-center justify-center mb-4 group-hover:bg-brand group-hover:border-brand transition-all duration-300">
          <Icon className="w-4 h-4 text-brand group-hover:text-navy-deep transition-colors duration-300" />
        </div>

        {/* Value */}
        <div className="relative flex items-baseline gap-0.5 mb-1">
          <span className="text-3xl lg:text-4xl font-bold text-foreground tabular-nums tracking-tight">
            {count}
          </span>
          <span className="text-2xl lg:text-3xl font-bold text-brand tabular-nums">
            {stat.suffix}
          </span>
        </div>

        {/* Label */}
        <div className="relative text-sm font-medium text-foreground mb-1">
          {stat.label}
        </div>

        {/* Hint */}
        <div className="relative text-xs text-muted-foreground leading-relaxed">
          {stat.hint}
        </div>

        {/* Bottom accent bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand to-brand-glow scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
      </div>
    </motion.div>
  );
};

export default StatsStrip;