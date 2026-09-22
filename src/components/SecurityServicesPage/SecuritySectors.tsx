// components/SecurityServicesPage/SecuritySectors.tsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Truck,
  Factory,
  DollarSign,
  Heart,
  BarChart3,
  Smartphone,
  Network,
  Building2,
  ShoppingBag,
  HandHeart,
  Store,
} from 'lucide-react';

/* ============================================================
   Sectors — deduplicated
   ============================================================ */

const sectors = [
  { icon: Truck, label: 'Logistics', tag: 'Supply Chain' },
  { icon: Factory, label: 'Manufacturing', tag: 'OT & ICS' },
  { icon: DollarSign, label: 'Fintech', tag: 'BFSI' },
  { icon: Heart, label: 'Health', tag: 'HIPAA' },
  { icon: BarChart3, label: 'B2B', tag: 'Enterprise' },
  { icon: Smartphone, label: 'Consumer Tech', tag: 'SaaS' },
  { icon: Network, label: 'B2C', tag: 'Digital' },
  { icon: HandHeart, label: 'D2C', tag: 'Commerce' },
  { icon: Building2, label: 'Real Estate', tag: 'Property' },
  { icon: ShoppingBag, label: 'Retail & E-com', tag: 'PCI DSS' },
  { icon: HandHeart, label: 'Non Profits & Public', tag: 'GovTech' },
  { icon: Store, label: 'Marketplace', tag: 'Platforms' },
];

/* ============================================================
   Component
   ============================================================ */

const SecuritySectors: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  // Duplicate for seamless loop
  const marqueeItems = [...sectors, ...sectors];

  return (
    <section
      ref={sectionRef}
      className="relative bg-navy-deep py-20 lg:py-28 overflow-hidden"
    >
      {/* ===== Ambient glows ===== */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand opacity-[0.07] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-glow opacity-[0.05] blur-[160px] rounded-full pointer-events-none" />

      {/* ===== Dot texture ===== */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* ===== Top + bottom accent lines ===== */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />

      {/* ===== Heading ===== */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 mb-14 lg:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-px w-6 bg-brand" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand">
              Industries We Secure
            </span>
            <span className="h-px w-6 bg-brand" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.12] tracking-tight">
            <span className="text-white">Compliance Solutions</span>
            <br />
            <span className="text-white">Across </span>
            <span className="relative inline-block">
              <span className="text-brand relative z-10">Sectors</span>
              {/* Underline accent */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute bottom-1 left-0 right-0 h-[3px] bg-brand/30 rounded-full origin-left"
              />
            </span>
          </h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-sm sm:text-base text-white/55 leading-relaxed max-w-2xl mx-auto mt-5"
          >
            Purpose-built security and compliance frameworks for every industry
            we serve — from regulated finance to fast-moving D2C brands.
          </motion.p>
        </motion.div>
      </div>

      {/* ===== Scrolling sectors strip ===== */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden"
      >
        {/* Edge fade masks — match navy-deep background */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-navy-deep via-navy-deep/80 to-transparent z-10 pointer-events-none" />

        {/* Marquee track — pauses on hover */}
        <div
          className="flex gap-5 marquee-track hover:[animation-play-state:paused]"
          style={{ width: 'max-content' }}
        >
          {marqueeItems.map((s, i) => (
            <SectorCard key={i} {...s} />
          ))}
        </div>
      </motion.div>

      {/* ===== "Also serving" footer ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="relative max-w-7xl mx-auto px-6 lg:px-8 mt-10 text-center"
      >
        <p className="text-xs text-white/40">
          Also serving{' '}
          <span className="text-white/80 font-medium">
            Education, Media, Legal, Insurance, Travel &amp; Hospitality
          </span>{' '}
          and more.
        </p>
      </motion.div>

      {/* ===== Keyframes ===== */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 45s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

/* ============================================================
   SectorCard
   ============================================================ */

interface SectorCardProps {
  icon: React.ElementType;
  label: string;
  tag: string;
}

const SectorCard: React.FC<SectorCardProps> = ({ icon: Icon, label, tag }) => {
  return (
    <div
      className="
        group relative flex-shrink-0 w-[200px] rounded-2xl
        bg-gradient-to-br from-white/[0.05] to-white/[0.015]
        border border-white/10 backdrop-blur-sm
        p-5
        hover:border-brand/40
        hover:bg-gradient-to-br hover:from-brand/[0.08] hover:to-white/[0.02]
        hover:shadow-[0_20px_50px_-20px_rgba(76,192,138,0.35)]
        hover:-translate-y-1
        transition-all duration-300
        overflow-hidden
      "
    >
      {/* Corner glow on hover */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand opacity-0 blur-[40px] rounded-full transition-opacity duration-500 group-hover:opacity-25 pointer-events-none" />

      {/* Icon + tag row */}
      <div className="relative flex items-center justify-between mb-4">
        {/* Icon badge */}
        <div className="w-11 h-11 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all duration-300">
          <Icon className="w-5 h-5 text-brand group-hover:text-navy-deep transition-colors duration-300" />
        </div>

        {/* Tag chip */}
        <span className="text-[10px] font-medium tracking-wider uppercase text-white/50 bg-white/[0.06] px-2 py-1 rounded-md border border-white/10">
          {tag}
        </span>
      </div>

      {/* Label */}
      <span className="relative block text-sm font-semibold text-white/90 leading-snug group-hover:text-brand transition-colors duration-300">
        {label}
      </span>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand to-brand-glow scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
    </div>
  );
};

export default SecuritySectors;