// components/SecurityServicesPage/ManagedServices.tsx
import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Monitor,
  Flame,
  Radar,
  Activity,
  Lock,
  Crosshair,
  ArrowRight,
} from 'lucide-react';

/* ============================================================
   Data
   ============================================================ */

interface ServiceItem {
  id: string;
  number: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  longDesc: string;
  tags: string[];
}

const services: ServiceItem[] = [
  {
    id: 'antivirus',
    number: '01',
    icon: ShieldCheck,
    title: 'Antivirus',
    desc: 'Protects systems from malware and malicious activity through continuous threat detection.',
    longDesc:
      'Signature-based and behavioral engines work in tandem to catch known malware families and zero-day variants. Cloud-based reputation, heuristic analysis, and rollback protection keep your endpoints clean.',
    tags: ['Signature Detection', 'Heuristics', 'Auto-Rollback'],
  },
  {
    id: 'edr',
    number: '02',
    icon: Monitor,
    title: 'EDR',
    desc: 'Endpoint Detection and Response — real-time visibility into every endpoint.',
    longDesc:
      'Deep telemetry from processes, network connections, and file activity gives your SOC the context to detect, investigate, and contain threats before they spread laterally.',
    tags: ['Process Telemetry', 'Threat Hunting', 'Containment'],
  },
  {
    id: 'firewall',
    number: '03',
    icon: Flame,
    title: 'Firewall',
    desc: 'Network perimeter defense with stateful inspection and threat filtering.',
    longDesc:
      'Next-gen firewall with application awareness, TLS inspection, and IPS. Enforces zero-trust segmentation policies across on-prem and cloud workloads.',
    tags: ['Stateful Inspection', 'App Control', 'IPS'],
  },
  {
    id: 'xdr',
    number: '04',
    icon: Radar,
    title: 'XDR',
    desc: 'Extended Detection and Response — unified telemetry across endpoints, network, and cloud.',
    longDesc:
      'Correlates signals across every layer to cut through alert noise. One incident view for your analysts, backed by automated response playbooks and MITRE mapping.',
    tags: ['Cross-Layer', 'Correlation', 'Automation'],
  },
  {
    id: 'siem',
    number: '05',
    icon: Activity,
    title: 'SIEM',
    desc: 'Security Information and Event Management — centralized logging and correlation.',
    longDesc:
      'Ingest, normalize, and correlate logs from across your stack. Detect anomalies, meet compliance retention requirements, and give auditors a single source of truth.',
    tags: ['Log Ingestion', 'Correlation', 'Retention'],
  },
  {
    id: 'dlp',
    number: '06',
    icon: Lock,
    title: 'DLP',
    desc: 'Data Loss Prevention — stops sensitive data from leaving your organization.',
    longDesc:
      'Policy-based controls that identify, classify, and protect PII, financial data, and IP — whether at rest, in motion, or in use. Blocks accidental leaks and insider threats.',
    tags: ['Classification', 'Policy Enforcement', 'Insider Risk'],
  },
  {
    id: 'vapt',
    number: '07',
    icon: Crosshair,
    title: 'VAPT',
    desc: 'Vulnerability Assessment and Penetration Testing — find weaknesses before attackers do.',
    longDesc:
      'Manual and automated testing across network, web, mobile, and cloud. Findings mapped to MITRE ATT&CK, ranked by business impact, and delivered with remediation guidance.',
    tags: ['MITRE Mapped', 'Impact-Ranked', 'Remediation Plan'],
  },
];

/* ============================================================
   Component
   ============================================================ */

const ManagedServices: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  // First row is open by default; sticky behaviour keeps a row open once hovered
  const [activeId, setActiveId] = useState<string | null>(services[0].id);

  return (
    <section
      ref={sectionRef}
      className="relative bg-surface py-20 lg:py-28 overflow-hidden"
    >
      {/* ===== Ambient ===== */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand opacity-[0.06] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-glow opacity-[0.05] blur-[160px] rounded-full pointer-events-none" />

      {/* ===== Dot texture ===== */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15,23,42,0.06) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* ===== Heading ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-14 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-px w-6 bg-brand" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand">
              Managed Security
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.12] tracking-tight text-foreground mb-5">
            The full security stack,
            <br />
            <span className="text-brand">run by ThreatZen.</span>
          </h2>

          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
            Seven integrated defense layers — deployed, monitored, and tuned by our
            SOC team. No tool sprawl, no finger-pointing, one accountable partner.
          </p>
        </motion.div>

        {/* ===== Stacked service rows ===== */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand/20 to-transparent hidden lg:block" />

          <div className="space-y-1">
            {services.map((service, i) => (
              <ServiceRow
                key={service.id}
                service={service}
                index={i}
                inView={inView}
                isActive={activeId === service.id}
                onActivate={() => setActiveId(service.id)}
                onDeactivate={() => {
                  /* sticky: keep last hovered row open */
                }}
              />
            ))}
          </div>
        </div>

        {/* ===== Footer CTA ===== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 lg:mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-muted"
        >
          <p className="text-sm text-muted-foreground max-w-xl">
            Need a specific capability layered in, or a legacy tool replaced? Our team
            integrates with your existing stack — no rip-and-replace required.
          </p>

          <a
            href="/services"
            className="
              group inline-flex items-center gap-2
              px-6 py-3.5 rounded-xl
              bg-navy text-white font-semibold text-sm
              hover:bg-navy-deep
              transition-all duration-300
              whitespace-nowrap
            "
          >
            Explore the full stack
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

/* ============================================================
   ServiceRow
   ============================================================ */

interface ServiceRowProps {
  service: ServiceItem;
  index: number;
  inView: boolean;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

const ServiceRow: React.FC<ServiceRowProps> = ({
  service,
  index,
  inView,
  isActive,
  onActivate,
  onDeactivate,
}) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onClick={onActivate}
      className={`
        group relative rounded-2xl border cursor-pointer
        transition-all duration-300
        ${
          isActive
            ? 'border-brand/30 bg-white shadow-[0_20px_50px_-25px_rgba(76,192,138,0.25)]'
            : 'border-transparent bg-transparent hover:border-muted'
        }
      `}
    >
      <div className="relative flex items-center gap-4 lg:gap-8 px-4 lg:px-6 py-5 lg:py-6">
        {/* Left accent bar — expands on hover */}
        <div
          className={`
            absolute left-0 top-1/2 -translate-y-1/2
            w-1 rounded-r-full bg-brand
            transition-all duration-500
            ${isActive ? 'h-16 lg:h-20 opacity-100' : 'h-0 opacity-0'}
          `}
        />

        {/* Number */}
        <div
          className={`
            flex-shrink-0 w-14 lg:w-16 text-right
            text-2xl lg:text-3xl font-bold tabular-nums tracking-tight
            transition-colors duration-300
            ${isActive ? 'text-brand' : 'text-muted-foreground/40'}
          `}
        >
          {service.number}
        </div>

        {/* Divider */}
        <div className="flex-shrink-0 h-10 w-px bg-muted hidden sm:block" />

        {/* Icon badge */}
        <div
          className={`
            flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center
            transition-all duration-300
            ${
              isActive
                ? 'bg-brand text-navy-deep scale-105'
                : 'bg-brand/10 text-brand'
            }
          `}
        >
          <Icon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3
              className={`
                text-lg lg:text-xl font-bold tracking-tight
                transition-colors duration-300
                ${isActive ? 'text-brand' : 'text-foreground'}
              `}
            >
              {service.title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 lg:line-clamp-1">
            {service.desc}
          </p>
        </div>

        {/* Tags — desktop only */}
        <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
          {service.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="
                px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wide uppercase
                bg-[var(--muted)] text-muted-foreground
                border border-muted
              "
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <div
          className={`
            flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center
            transition-all duration-300
            ${
              isActive
                ? 'bg-brand text-navy-deep rotate-0'
                : 'bg-[var(--surface)] text-muted-foreground -rotate-45'
            }
          `}
        >
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Expanded long description — appears below on hover/active */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 lg:px-6 pb-6 pl-4 lg:pl-[7.5rem]">
              <div className="pt-4 border-t border-muted">
                <p className="text-sm text-foreground/75 leading-relaxed max-w-3xl">
                  {service.longDesc}
                </p>

                {/* Full tag list on expand */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                        px-3 py-1 rounded-full text-[11px] font-medium
                        bg-brand/10 text-brand border border-brand/20
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManagedServices;