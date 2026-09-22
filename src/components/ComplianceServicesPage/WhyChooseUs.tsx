// components/ComplianceServicesPage/WhyChooseUs.tsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ShieldCheck,
  Sparkles,
  Users,
  FileSearch,
  Lock,
  TrendingUp,
  Clock,
  Award,
  Globe,
} from 'lucide-react';

const cards = [
  {
    icon: ShieldCheck,
    title: 'Comprehensive Compliance Assistance',
    body: 'ThreatZen delivers an exhaustive array of compliance services spanning DPDP, GDPR, HIPAA, SOC 2, PCI-DSS, ISO 27001 and other standards — from gap assessment to implementation.',
  },
  {
    icon: Sparkles,
    title: 'Customized and Simple Solutions',
    body: 'Recognizing the uniqueness of every business, we provide tailor-made solutions to address specific security and compliance requirements with a clear, efficient roadmap.',
  },
  {
    icon: Users,
    title: 'Experienced Compliance Professionals',
    body: 'Our team brings extensive experience supporting organizations of all sizes in implementing rigorous, tailored, and secure frameworks aligned with evolving regulations.',
  },
  {
    icon: FileSearch,
    title: 'Gap Assessment & Audit Readiness',
    body: 'Identify control gaps before auditors do. We map existing posture against framework requirements and deliver an actionable remediation plan.',
  },
  {
    icon: Lock,
    title: 'Data Privacy & Protection',
    body: 'End-to-end data governance aligned with DPDP 2023, GDPR, HIPAA and CCPA — covering consent, retention, cross-border transfers and breach response.',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Monitoring & Evidence',
    body: 'Real-time control monitoring with automated evidence collection, so you stay audit-ready every day — not just during certification week.',
  },
  {
    icon: Clock,
    title: 'Fast-Track Certification',
    body: 'Streamlined engagement models designed to compress timelines — most clients reach certification readiness in under 90 days.',
  },
  {
    icon: Award,
    title: 'Industry-Agnostic Expertise',
    body: 'BFSI, healthcare, SaaS, manufacturing, logistics — we speak the language of regulators across every sector we serve.',
  },
  {
    icon: Globe,
    title: 'Multi-Jurisdiction Coverage',
    body: 'Navigate India, US, UK, EU and global regulatory requirements through a single accountable compliance partner.',
  },
];

const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative bg-navy-deep py-20 lg:py-28 overflow-hidden"
    >
      {/* ===== Ambient background glows ===== */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand opacity-[0.06] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-glow opacity-[0.05] blur-[160px] rounded-full pointer-events-none" />

      {/* ===== Diagonal light streaks ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-0 w-[1400px] h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent rotate-[14deg] origin-left" />
        <div className="absolute top-[45%] left-1/4 w-[1200px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-[20deg]" />
        <div className="absolute top-[70%] right-0 w-[1400px] h-px bg-gradient-to-l from-transparent via-brand/25 to-transparent rotate-[-12deg]" />
        <div className="absolute bottom-[10%] left-1/3 w-[1000px] h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rotate-[18deg]" />
      </div>

      {/* ===== Dot grid texture ===== */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '44px 44px',
        }}
      />

      {/* ===== Section heading ===== */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 mb-14 lg:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-px w-6 bg-brand" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand">
              Why ThreatZen
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.12] tracking-tight max-w-4xl">
            <span className="text-brand">ThreatZen</span>{' '}
            <span className="text-white">
              Compliance Solutions Built For Trust &amp; Results
            </span>
          </h2>

          <p className="text-base lg:text-lg text-white/55 leading-relaxed max-w-2xl mt-5">
            Nine reasons organizations choose us as their single accountable partner for
            security, compliance, and cyber resilience.
          </p>
        </motion.div>
      </div>

      {/* ===== Cards grid ===== */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {cards.map((card, i) => (
            <WhyCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   Individual Card
   ============================================================ */

interface CardData {
  icon: React.ElementType;
  title: string;
  body: string;
}

const WhyCard: React.FC<{ card: CardData; index: number }> = ({ card, index }) => {
  const Icon = card.icon;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  // Stagger: cards enter in rows
  const row = Math.floor(index / 3);
  const col = index % 3;
  const delay = row * 0.12 + col * 0.06;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative"
    >
      <div
        className="
          relative rounded-2xl overflow-hidden h-full
          bg-gradient-to-br from-white/[0.05] to-white/[0.015]
          border border-white/10 backdrop-blur-sm
          p-6 lg:p-7
          transition-all duration-500
          group-hover:border-brand/40
          group-hover:bg-gradient-to-br group-hover:from-brand/[0.08] group-hover:to-white/[0.02]
          group-hover:shadow-[0_20px_50px_-20px_rgba(76,192,138,0.25)]
        "
      >
        {/* Radial hover glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand opacity-0 blur-[60px] rounded-full transition-opacity duration-500 group-hover:opacity-20 pointer-events-none" />

        {/* Icon badge */}
        <div className="relative w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-5 group-hover:bg-brand group-hover:border-brand transition-all duration-300">
          <Icon className="w-5 h-5 text-brand group-hover:text-navy-deep transition-colors duration-300" />
        </div>

        {/* Title */}
        <h3 className="relative text-base lg:text-lg font-bold text-white leading-snug mb-3 tracking-tight">
          {card.title}
        </h3>

        {/* Body */}
        <p className="relative text-sm text-white/55 leading-relaxed">
          {card.body}
        </p>

        {/* Bottom accent bar — scales on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand to-brand-glow scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

        {/* Corner number */}
        <div className="absolute top-5 right-5 text-xs font-mono text-white/20 group-hover:text-brand/60 transition-colors duration-300">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>
    </motion.div>
  );
};

export default WhyChooseUs;