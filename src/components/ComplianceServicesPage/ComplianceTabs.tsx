// components/ComplianceServicesPage/ComplianceTabs.tsx
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

const frameworks = [
  'ISO 27001',
  'SOC2',
  'HIPAA',
  'GDPR',
  'DPDP 23',
  'DORA Automation',
  'PCI DSS',
  'CCPA',
];

interface ComplianceContent {
  title: string;
  about: string[];
  strengthen: string[];
  industries: string[];
  geographies: string[];
}

const contentByFramework: Record<string, ComplianceContent> = {
  'ISO 27001': {
    title: 'ISO 27001',
    about: [
      'Establish a robust information security management system (ISMS) to protect sensitive data.',
      'Implement security controls and risk management processes aligned with ISO 27001 standards.',
      'Achieve ISO 27001 certification to demonstrate your commitment to information security.',
      'Enhance organizational resilience and safeguard against cyber threats and data breaches.',
    ],
    strengthen: [
      'Enhance data security to build greater trust and confidence among stakeholders.',
      'Mitigate risks associated with data breaches, cyber attacks, and regulatory non-compliance.',
      'Build trust and credibility with customers, partners, and stakeholders.',
      'Differentiate your organization in the marketplace and gain a competitive advantage.',
    ],
    industries: [
      'Banking and Finance',
      'Legal Industries',
      'Healthcare Industries',
      'Education',
      'All Industries',
    ],
    geographies: ['India', 'United States of America', 'United Kingdom', 'European Union', 'Other'],
  },
};

const defaultContent: ComplianceContent = {
  title: 'Framework',
  about: [
    'Establish a robust governance framework tailored to your organization.',
    'Implement controls aligned with industry best practices.',
    'Achieve certification to demonstrate your commitment to compliance.',
    'Enhance resilience and reduce regulatory risk.',
  ],
  strengthen: [
    'Build greater trust among stakeholders.',
    'Mitigate regulatory and security risks.',
    'Build credibility with customers and partners.',
    'Differentiate in the marketplace.',
  ],
  industries: [
    'Banking and Finance',
    'Legal Industries',
    'Healthcare Industries',
    'Education',
    'All Industries',
  ],
  geographies: ['India', 'United States of America', 'United Kingdom', 'European Union', 'Other'],
};

const ComplianceTabs: React.FC = () => {
  const [active, setActive] = useState<string>('ISO 27001');
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const content = contentByFramework[active] ?? { ...defaultContent, title: active };

  return (
    <section
      ref={sectionRef}
      className="relative bg-navy-deep py-20 lg:py-28 overflow-hidden"
    >
      {/* ===== Ambient glows ===== */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-brand opacity-[0.07] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-brand-glow opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />

      {/* ===== Dot texture ===== */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* ===== Top accent line ===== */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* ================= Left: Framework list ================= */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="h-px w-6 bg-brand" />
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand">
                  Frameworks
                </span>
              </div>

              {/* Title — forced to 2 lines */}
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-[1.15] tracking-tight mb-10">
                <span className="block">Secure Compliance,</span>
                <span className="block text-brand">Simplified</span>
              </h2>

              {/* Framework list */}
              <nav className="flex flex-col space-y-1">
                {frameworks.map((f, i) => {
                  const isActive = active === f;
                  return (
                    <motion.button
                      key={f}
                      type="button"
                      onClick={() => setActive(f)}
                      initial={{ opacity: 0, x: -12 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: 0.15 + i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`
                        group relative text-left px-4 py-3 rounded-xl
                        text-sm font-medium
                        transition-all duration-300
                        ${
                          isActive
                            ? 'bg-white/[0.08] text-white'
                            : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                        }
                      `}
                    >
                      {/* Left accent indicator */}
                      <span
                        className={`
                          absolute left-0 top-1/2 -translate-y-1/2
                          w-1 rounded-r-full bg-brand
                          transition-all duration-300
                          ${
                            isActive
                              ? 'h-6 opacity-100'
                              : 'h-0 opacity-0 group-hover:h-4 group-hover:opacity-60'
                          }
                        `}
                      />

                      <span className="relative flex items-center justify-between gap-3">
                        <span>{f}</span>

                        {/* Active dot */}
                        {isActive && (
                          <motion.span
                            layoutId="active-framework-dot"
                            className="w-1.5 h-1.5 rounded-full bg-brand"
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}
                      </span>
                    </motion.button>
                  );
                })}
              </nav>
            </motion.div>
          </div>

          {/* ================= Right: Content card ================= */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Decorative offset frame */}
              <div className="absolute inset-0 -translate-x-2 -translate-y-2 lg:-translate-x-3 lg:-translate-y-3 rounded-3xl border border-brand/20 pointer-events-none" />

              <div className="relative rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-sm shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] overflow-hidden">
                {/* Header strip */}
                <div className="relative px-8 lg:px-10 pt-8 lg:pt-10 pb-6 border-b border-white/10">
                  {/* Small accent */}
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                    <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-brand">
                      Framework Overview
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={content.title}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="text-2xl lg:text-3xl font-bold text-white tracking-tight"
                    >
                      {content.title}
                    </motion.h3>
                  </AnimatePresence>
                </div>

                {/* Body — animated on framework change */}
                <div className="px-8 lg:px-10 py-8 lg:py-9">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-8"
                    >
                      {/* About */}
                      <div>
                        <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                          <span className="w-4 h-px bg-brand" />
                          About {content.title}
                        </h4>
                        <ul className="space-y-2.5">
                          {content.about.map((item, i) => (
                            <BulletItem key={i} text={item} delay={i * 0.04} />
                          ))}
                        </ul>
                      </div>

                      {/* Strengthen */}
                      <div>
                        <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                          <span className="w-4 h-px bg-brand" />
                          How We Strengthen Your Security &amp; Compliance Posture
                        </h4>
                        <ul className="space-y-2.5">
                          {content.strengthen.map((item, i) => (
                            <BulletItem key={i} text={item} delay={0.15 + i * 0.04} />
                          ))}
                        </ul>
                      </div>

                      {/* Industries + Geographies */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-white/10">
                        <div>
                          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                            <span className="w-4 h-px bg-brand" />
                            Industries
                          </h4>
                          <ul className="space-y-2">
                            {content.industries.map((item, i) => (
                              <PillItem
                                key={item}
                                text={item}
                                delay={0.3 + i * 0.03}
                              />
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                            <span className="w-4 h-px bg-brand" />
                            Geographies
                          </h4>
                          <ul className="space-y-2">
                            {content.geographies.map((item, i) => (
                              <PillItem
                                key={item}
                                text={item}
                                delay={0.35 + i * 0.03}
                              />
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   Bullet item — check icon + text with stagger
   ============================================================ */

const BulletItem: React.FC<{ text: string; delay: number }> = ({ text, delay }) => (
  <motion.li
    initial={{ opacity: 0, x: -8 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
    className="group flex items-start gap-2.5 text-sm text-white/60 leading-relaxed"
  >
    <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-brand/15 border border-brand/30 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-colors duration-300">
      <Check
        className="w-2.5 h-2.5 text-brand group-hover:text-navy-deep transition-colors duration-300"
        strokeWidth={3}
      />
    </span>
    <span className="group-hover:text-white transition-colors duration-300">
      {text}
    </span>
  </motion.li>
);

/* ============================================================
   Pill item — industry / geography tag
   ============================================================ */

const PillItem: React.FC<{ text: string; delay: number }> = ({ text, delay }) => (
  <motion.li
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay, ease: [0.22, 1, 0.36, 1] }}
    className="text-sm text-white/70 leading-relaxed"
  >
    <span className="inline-flex items-center gap-2">
      <span className="w-1 h-1 rounded-full bg-brand flex-shrink-0" />
      {text}
    </span>
  </motion.li>
);

export default ComplianceTabs;