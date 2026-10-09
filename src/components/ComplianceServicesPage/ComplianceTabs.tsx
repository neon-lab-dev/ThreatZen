// components/ComplianceServicesPage/ComplianceTabs.tsx
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

/* ============================================================
   Data — single source of truth
   ============================================================ */

interface Section {
  title: { normal: string; highlight: string };
  details: string[];
}

interface InfoBlock {
  title: string;
  pointers: string[];
}

interface TabContent {
  key: string;
  sections: Section[];
  industriesAndGeographies: InfoBlock[];
}

const tabs: TabContent[] = [
  {
    key: 'ISO 27001',
    sections: [
      {
        title: { normal: 'About', highlight: 'ISO 27001' },
        details: [
          'Establish a robust information security management system (ISMS) to protect sensitive data',
          'Implement security controls and risk management processes aligned with ISO 27001 standards',
          'Achieve ISO 27001 certification to demonstrate your commitment to information security',
          'Enhance organizational resilience and safeguard against cyber threats and data breaches',
        ],
      },
      {
        title: {
          normal: 'How We Strengthen Your',
          highlight: 'Security & Compliance Posture?',
        },
        details: [
          "Ensure the confidentiality, integrity, and availability of your organisation's information assets.",
          'Mitigate risks associated with data breaches, cyber attacks, and regulatory non-compliance.',
          'Build trust and credibility with customers, partners, and stakeholders.',
          'Differentiate your organisation in the marketplace and gain a competitive advantage.',
        ],
      },
    ],
    industriesAndGeographies: [
      {
        title: 'Industries',
        pointers: [
          'Finance Industries',
          'SaaS Industries',
          'Healthcare Industries',
          'B2B Industries',
          'All Industries',
        ],
      },
      {
        title: 'Geographies',
        pointers: [
          'India',
          'United States of America',
          'United Kingdom',
          'European Union',
          'Global',
        ],
      },
    ],
  },
  {
    key: 'SOC2',
    sections: [
      {
        title: { normal: 'About', highlight: 'SOC2' },
        details: [
          'Implement a system of controls to manage and protect sensitive data',
          'Ensure security, availability, processing integrity, confidentiality, and privacy of information',
          'Obtain SOC2 certification to demonstrate adherence to industry-standard practices',
          'Reduce the risk of data breaches and maintain trust with clients and partners',
        ],
      },
      {
        title: { normal: 'Why do you need', highlight: 'us?' },
        details: [
          'Ensure your organization meets rigorous security and compliance standards',
          'Build credibility and trust with clients by demonstrating control effectiveness',
          'Mitigate risks associated with data breaches, unauthorized access, and operational failures',
          'Maintain a competitive advantage by showcasing strong internal controls',
        ],
      },
    ],
    industriesAndGeographies: [
      {
        title: 'Geographies',
        pointers: [
          'India',
          'United States of America',
          'United Kingdom',
          'European Union',
          'Global',
        ],
      },
      {
        title: 'Industries',
        pointers: [
          'Finance Industries',
          'SaaS Industries',
          'Healthcare Industries',
          'B2B Industries',
          'All Industries',
        ],
      },
    ],
  },
  {
    key: 'HIPAA',
    sections: [
      {
        title: { normal: 'About', highlight: 'HIPAA' },
        details: [
          'Secure protected health information (PHI) using encryption and controlled access',
          'Establish policies and protocols to comply with HIPAA standards',
          'Preserve patient privacy and keep sensitive health information confidential',
          'Reduce the risk of data breaches and avoid penalties related to HIPAA violations',
        ],
      },
      {
        title: { normal: 'Why do you need', highlight: 'us?' },
        details: [
          'Guarantee the protection and confidentiality of patient health data',
          'Prevent expensive fines and legal issues due to HIPAA breaches',
          'Foster trust and reliability with patients and healthcare collaborators',
          'Showcase your dedication to upholding rigorous data security standards',
        ],
      },
    ],
    industriesAndGeographies: [
      {
        title: 'Geographies',
        pointers: [
          'India',
          'United States of America',
          'United Kingdom',
          'European Union',
          'Global',
        ],
      },
      {
        title: 'Industries',
        pointers: [
          'Finance Industries',
          'SaaS Industries',
          'Healthcare Industries',
          'B2B Industries',
          'All Industries',
        ],
      },
    ],
  },
  {
    key: 'GDPR',
    sections: [
      {
        title: { normal: 'About', highlight: 'GDPR' },
        details: [
          'Apply data security practices such as encryption and pseudonymization',
          'Secure clear consent for data processing and maintain transparency in handling information',
          'Adhere to EU data protection laws to safeguard personal privacy rights',
          'Prevent significant penalties and harm to reputation caused by GDPR breaches',
        ],
      },
      {
        title: { normal: 'Why do you need', highlight: 'us?' },
        details: [
          'Safeguard personal information and privacy rights in accordance with GDPR',
          'Strengthen data security measures to reduce the chance of breaches',
          'Foster confidence among customers and stakeholders by showing GDPR adherence',
          'Keep up with regulatory updates to retain a market advantage',
        ],
      },
    ],
    industriesAndGeographies: [
      {
        title: 'Geographies',
        pointers: [
          'India',
          'United States of America',
          'United Kingdom',
          'European Union',
          'Global',
        ],
      },
      {
        title: 'Industries',
        pointers: [
          'Finance Industries',
          'SaaS Industries',
          'Healthcare Industries',
          'B2B Industries',
          'All Industries',
        ],
      },
    ],
  },
  {
    key: 'DPDP’23',
    sections: [
      {
        title: { normal: 'About', highlight: 'DPDP’23' },
        details: [
          'Adopt data security strategies to comply with Data Protection and Privacy Regulations',
          'Protect personal information using encryption, access restrictions, and data minimization',
          'Obtain DPDP certification to showcase your dedication to safeguarding privacy rights',
          'Lower the chances of data breaches and avoid penalties related to DPDP violations',
        ],
      },
      {
        title: { normal: 'Why do you need', highlight: 'us?' },
        details: [
          'Safeguard personal information and privacy rights according to DPDP regulations',
          'Improve data protection measures to reduce the likelihood of breaches',
          'Earn trust from customers and stakeholders by proving DPDP compliance',
          'Keep pace with regulatory updates to sustain a competitive advantage',
        ],
      },
    ],
    industriesAndGeographies: [
      {
        title: 'Geographies',
        pointers: [
          'India',
          'United States of America',
          'United Kingdom',
          'European Union',
          'Global',
        ],
      },
      {
        title: 'Industries',
        pointers: [
          'Finance Industries',
          'SaaS Industries',
          'Healthcare Industries',
          'B2B Industries',
          'All Industries',
        ],
      },
    ],
  },
  {
    key: 'GRC Automation',
    sections: [
      {
        title: { normal: 'About', highlight: 'GRC Automation' },
        details: [
          'Automate governance, risk, and compliance workflows to optimize operations',
          'Deploy GRC Automation solutions to maintain regulatory adherence and minimize manual tasks',
          'Increase efficiency and precision in handling governance, risk, and compliance processes',
          'Reduce risks and enhance decision-making with real-time insights from GRC Automation',
        ],
      },
      {
        title: { normal: 'Why do you need', highlight: 'us?' },
        details: [
          'Boost productivity and cut operational expenses through GRP process automation',
          'Maintain uniformity and standardization in compliance activities throughout the organisation',
          'Remain flexible and adaptive to evolving regulatory demands using GRC Automation',
          'Utilize technology to proactively detect and manage risks within your business environment',
        ],
      },
    ],
    industriesAndGeographies: [
      {
        title: 'Geographies',
        pointers: [
          'India',
          'United States of America',
          'United Kingdom',
          'European Union',
          'Global',
        ],
      },
      {
        title: 'Industries',
        pointers: [
          'Finance Industries',
          'SaaS Industries',
          'Healthcare Industries',
          'B2B Industries',
          'All Industries',
        ],
      },
    ],
  },
  {
    key: 'PCI DSS',
    sections: [
      {
        title: { normal: 'About', highlight: 'PCI DSS' },
        details: [
          'Protect payment card information using encryption, access restrictions, and network segmentation',
          'Adhere to PCI DSS requirements to secure sensitive cardholder data',
          'Obtain PCI DSS certification to show dedication to safe payment processing',
          'Reduce the likelihood of data breaches and financial damages caused by PCI DSS violations',
        ],
      },
      {
        title: { normal: 'Why do you need', highlight: 'us?' },
        details: [
          'Safeguard sensitive payment card information and block unauthorized access to cardholder data',
          'Build customer trust and credibility by guaranteeing secure payment processing',
          'Prevent expensive fines, sanctions, and damage to reputation from PCI DSS breaches',
          'Maintain compliance with industry standards and uphold a competitive advantage in the market',
        ],
      },
    ],
    industriesAndGeographies: [
      {
        title: 'Geographies',
        pointers: [
          'India',
          'United States of America',
          'United Kingdom',
          'European Union',
          'Global',
        ],
      },
      {
        title: 'Industries',
        pointers: [
          'Finance Industries',
          'SaaS Industries',
          'Healthcare Industries',
          'B2B Industries',
          'All Industries',
        ],
      },
    ],
  },
  {
    key: 'CCPA',
    sections: [
      {
        title: { normal: 'About', highlight: 'CCPA' },
        details: [
          'Safeguard consumer privacy rights and foster trust with your clientele',
          'Improve data governance and transparency in managing personal data',
          'Prevent costly fines and legal repercussions due to CCPA breaches',
          'Showcase your dedication to honoring consumer privacy and data protection laws',
        ],
      },
      {
        title: { normal: 'Why do you need', highlight: 'us?' },
        details: [
          'Adopt data privacy practices to meet California Consumer Privacy Act (CCPA) standards',
          'Offer consumers clear visibility and control over their personal data',
          'Maintain adherence to CCPA regulations to safeguard consumer privacy',
          'Reduce the risk of legal penalties and fines stemming from CCPA violations',
        ],
      },
    ],
    industriesAndGeographies: [
      {
        title: 'Geographies',
        pointers: [
          'India',
          'United States of America',
          'United Kingdom',
          'European Union',
          'Global',
        ],
      },
      {
        title: 'Industries',
        pointers: [
          'Finance Industries',
          'SaaS Industries',
          'Healthcare Industries',
          'B2B Industries',
          'All Industries',
        ],
      },
    ],
  },
];

/* ============================================================
   Component
   ============================================================ */

const ComplianceTabs: React.FC = () => {
  const [active, setActive] = useState<string>(tabs[0].key);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const activeTab = tabs.find((t) => t.key === active);

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
                {tabs.map((tab, i) => {
                  const isActive = active === tab.key;
                  return (
                    <motion.button
                      key={tab.key}
                      type="button"
                      onClick={() => setActive(tab.key)}
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
                        <span>{tab.key}</span>

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
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                    <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-brand">
                      Framework Overview
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={activeTab?.key}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="text-2xl lg:text-3xl font-bold text-white tracking-tight"
                    >
                      {activeTab?.key}
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
                      {/* Sections */}
                      {activeTab?.sections.map((section, i) => (
                        <div key={i}>
                          <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-4 h-px bg-brand" />
                            {section.title.normal}{' '}
                            <span className="text-brand">
                              {section.title.highlight}
                            </span>
                          </h4>
                          <ul className="space-y-2.5">
                            {section.details.map((item, j) => (
                              <BulletItem
                                key={j}
                                text={item}
                                delay={i * 0.15 + j * 0.04}
                              />
                            ))}
                          </ul>
                        </div>
                      ))}

                      {/* Industries + Geographies */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-white/10">
                        {activeTab?.industriesAndGeographies.map((info, i) => (
                          <div key={i}>
                            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                              <span className="w-4 h-px bg-brand" />
                              {info.title}
                            </h4>
                            <ul className="space-y-2">
                              {info.pointers.map((pointer, j) => (
                                <PillItem
                                  key={pointer}
                                  text={pointer}
                                  delay={0.3 + i * 0.05 + j * 0.03}
                                />
                              ))}
                            </ul>
                          </div>
                        ))}
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