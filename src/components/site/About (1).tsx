import { motion } from "framer-motion";
import { CheckCircle2, Shield, Target, LineChart, Users, Award, TrendingUp } from "lucide-react";

const stats = [
  { value: "98%", label: "Client Retention Rate", icon: Users },
  { value: "500+", label: "Vulnerabilities Remediated", icon: Shield },
  { value: "50+", label: "Enterprise Clients", icon: Award },
  { value: "99.9%", label: "Compliance Success Rate", icon: TrendingUp },
];

const differentiators = [
  {
    title: "Offensive Security Mindset",
    description: "We think like attackers to build better defenses",
    icon: Target,
  },
  {
    title: "Regulatory Excellence",
    description: "Mastery of RBI, SEBI, IRDAI, HIPAA, PCI-DSS, SOC2",
    icon: Shield,
  },
  {
    title: "ROI-Driven Approach",
    description: "Every recommendation balances security with business impact",
    icon: LineChart,
  },
];

const certifications = [
  "ISO 27001 Lead Auditor",
  "CISSP",
  "CISA",
  "CEH",
  "CRISC",
  "GDPR Practitioner",
];

export function About() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with stronger positioning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-[var(--brand)]">Trusted Security Partner</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Beyond Compliance, Building{" "}
            <span className="text-[var(--brand)]">
               Cyber Resilience
            </span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            ThreatZen isn't just another security consultancy. We're your strategic partner in 
            navigating the complex threat landscape, combining deep domain expertise with 
            practical, business-aligned solutions.
          </p>
        </motion.div>

        {/* Stats Grid - Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-6 rounded-2xl bg-card border shadow-sm">
              <stat.icon className="size-8 text-[var(--brand)] mx-auto mb-3" />
              <p className="text-3xl lg:text-4xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left Column - Core Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Why Leading Enterprises Choose ThreatZen</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              In today's threat environment, compliance alone isn't enough. We help organizations 
              build security programs that are both auditable and effective, reducing real-world 
              risk while meeting regulatory requirements.
            </p>

            {/* Differentiators */}
            <div className="space-y-4 mb-8">
              {differentiators.map((diff) => (
                <div key={diff.title} className="flex gap-4 p-4 rounded-xl bg-muted/30 border">
                  <diff.icon className="size-6 text-[var(--brand)] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">{diff.title}</h4>
                    <p className="text-sm text-muted-foreground">{diff.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Key offerings list */}
            <ul className="space-y-3">
              {[
                "Penetration Testing & Red Teaming",
                "Compliance Automation & Gap Assessment",
                "Managed SOC & 24x7 Threat Monitoring",
                "Cloud Security Posture Management (CSPM)",
                "vCISO & Security Program Development",
                "Incident Response & Forensics",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-[var(--brand)] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column - Visual & Credentials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Hero visual card */}
            <div className="rounded-2xl bg-gradient-to-br from-[var(--brand)]/10 to-[var(--brand)]/5 border-2 border-[var(--brand)]/20 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--brand)]/20 rounded-full blur-3xl" />
              <div className="relative">
                <Shield className="size-12 text-[var(--brand)] mb-4" />
                <h3 className="text-xl font-bold mb-2">Certified Excellence</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Our team holds industry's most respected certifications, ensuring 
                  world-class expertise for every engagement.
                </p>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                    <span key={cert} className="px-3 py-1 bg-background rounded-full text-xs font-medium border">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Industry focus */}
            <div className="rounded-2xl bg-card border p-6">
              <h3 className="font-semibold mb-4">Industry Specialization</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "🏦 Banking & Financial Services",
                  "💳 FinTech & Payments",
                  "🏥 Healthcare & Pharma",
                  "🛍️ E-commerce & Retail",
                  "📱 SaaS & Technology",
                  "⚡ Energy & Critical Infrastructure",
                ].map((industry) => (
                  <div key={industry} className="flex items-center gap-2 text-sm">
                    <div className="size-1.5 rounded-full bg-[var(--brand)]" />
                    {industry}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-[var(--brand)] text-white p-6 text-center">
              <p className="font-semibold mb-2">Ready to strengthen your security posture?</p>
              <p className="text-sm opacity-90 mb-4">Get a complimentary security consultation</p>
              <a href="/contact" className="px-6 py-2 bg-white text-[var(--brand)] rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
                Talk to an Expert →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}