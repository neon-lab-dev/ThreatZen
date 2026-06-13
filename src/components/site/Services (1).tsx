import { motion } from "framer-motion";
import {
  ShieldAlert, Globe, Smartphone, Code2, Network, Cloud,
  Eye, Briefcase, FileCheck, ScrollText, Banknote, Layers,
  Lock, Server, Activity,
} from "lucide-react";

const services = [
  { icon: ShieldAlert, title: "Vulnerability Assessment & Penetration Testing", desc: "Identify and remediate security vulnerabilities before attackers exploit them." },
  { icon: Globe, title: "Web Application Security", desc: "Comprehensive security testing for modern web applications and portals." },
  { icon: Smartphone, title: "Mobile Application Security", desc: "Android and iOS application security assessments aligned to OWASP MASVS." },
  { icon: Code2, title: "API Security Assessment", desc: "Secure modern APIs, microservices and third-party integrations." },
  { icon: Network, title: "Network Security Assessment", desc: "Internal and external network security evaluations and hardening." },
  { icon: Cloud, title: "Cloud Security Assessment", desc: "AWS, Azure and GCP security reviews against industry benchmarks." },
  { icon: Eye, title: "SOC Services", desc: "24x7 Security Operations Center monitoring, detection and response." },
  { icon: Activity, title: "EDR / XDR Deployment", desc: "Deploy and tune CrowdStrike, SentinelOne, Sophos and Palo Alto endpoint defense." },
  { icon: Lock, title: "DLP & Data Security", desc: "Data leak prevention with GTB, Zscaler, miniOrange and Data Resolve." },
  { icon: Smartphone, title: "MDM / UEM", desc: "Mobile device management via Scalefusion, Hexnode and 42Gears." },
  { icon: Server, title: "SIEM & Data Infrastructure", desc: "SIEM engineering, log analytics and secure data server (HP, NetApp) rollouts." },
  { icon: Briefcase, title: "Cybersecurity Consulting", desc: "Security strategy, governance and implementation guidance." },
  { icon: FileCheck, title: "Compliance Audits", desc: "ISO 27001, PCI DSS, SOC 2, CERT-IN, RBI, IRDAI & ISNP audits." },
  { icon: ScrollText, title: "DPDP Act Advisory", desc: "End-to-end Digital Personal Data Protection Act readiness, gap analysis & DPO support." },
  { icon: Banknote, title: "SEBI CSCRF Compliance", desc: "Cyber Security & Cyber Resilience Framework implementation for SEBI-regulated entities." },
  { icon: Layers, title: "AAP / Account Aggregator Audit", desc: "Security & compliance audits for Account Aggregator ecosystem participants." },
];

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-widest uppercase text-[var(--brand)]">What we do</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">Our <span className="text-[var(--brand)]">Core Services</span></h2>
          <p className="mt-4 text-muted-foreground text-lg">
            End-to-end offensive, defensive and advisory services that secure
            every layer of your business.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative rounded-2xl p-6 bg-card border border-border hover:border-[var(--brand)]/40 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-[var(--brand)]/0 to-transparent group-hover:via-[var(--brand)]/70 transition-all" />
              <div className="size-12 rounded-xl bg-[var(--brand)]/10 text-[var(--brand)] grid place-items-center group-hover:bg-[var(--brand)] group-hover:text-[var(--navy-deep)] transition-colors">
                <s.icon className="size-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold leading-tight">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
