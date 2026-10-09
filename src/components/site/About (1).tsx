import { motion } from "framer-motion";
import {
  CheckCircle2,
  Shield,
  Target,
  LineChart,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { FaLinkedin } from "react-icons/fa";
import ayushiImg from "../../assets/Ayushi_Jaiswal.jpg";

const stats = [
  { value: "98%", label: "Client Retention Rate", icon: Users },
  { value: "500+", label: "Vulnerabilities Remediated", icon: Shield },
  { value: "100+", label: "Clients", icon: Award },
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
    <>
      <Helmet>
        <title>About ThreatZen | Certified Cyber Resilience Partner</title>
        <meta
          name="description"
          content="Meet ThreatZen: CISSP, CISA & ISO 27001 certified experts delivering pentesting, vCISO, and compliance across banking, fintech, and healthcare in India."
        />
        <link rel="canonical" href="https://www.threatzen.in/about" />
      </Helmet>
      <section className="py-24 lg:py-32 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header with stronger positioning */}
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ===== Top heading block ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <p className="text-sm font-semibold tracking-widest uppercase text-brand">
          Trusted Security Partner
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
          Beyond Compliance, Building{' '}
          <span className="text-brand">Cyber Resilience</span>
        </h2>
        <p className="mt-5 text-muted-foreground text-base sm:text-lg leading-relaxed">
          ThreatZen isn't just another security consultancy. We're your strategic
          partner in navigating the complex threat landscape, combining deep
          domain expertise with practical, business-aligned solutions.
        </p>
      </motion.div>

      {/* ===== Founder card ===== */}
      <motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
  className="max-w-4xl mx-auto mb-8 xl:mb-12"
>
  <div
    className="
      relative rounded-3xl overflow-hidden
      bg-gradient-to-br from-navy-deep via-navy to-navy-deep
      shadow-[0_30px_80px_-30px_rgba(15,23,42,0.4)]
    "
  >
    {/* Ambient glows */}
    <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-brand opacity-[0.15] blur-[120px] rounded-full pointer-events-none" />
    <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-brand-glow opacity-[0.10] blur-[120px] rounded-full pointer-events-none" />

    {/* Dot texture */}
    <div
      className="absolute inset-0 opacity-[0.05] pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '28px 28px',
      }}
    />

    {/* Top accent line */}
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />

    {/* Content grid */}
    <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 p-6 sm:p-8 lg:p-10">
      {/* ===== Left: CEO image ===== */}
      <div className="md:col-span-4 flex justify-center md:justify-start">
        <div className="relative">
          {/* Decorative offset frame */}
          <div className="absolute inset-0 -translate-x-3 translate-y-3 rounded-3xl border border-brand/30 pointer-events-none" />

          {/* Image */}
          <div className="relative w-48 h-56 sm:w-56 sm:h-64 md:w-full md:h-auto md:aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_-20px_rgba(76,192,138,0.3)]">
            <img
              src={ayushiImg}
              alt="Ayushi Jaiswal, Founder of ThreatZen"
              className="w-full h-full object-cover object-center"
            />

            {/* Soft gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent pointer-events-none" />

            {/* Bottom name strip on image — subtle */}
            <div className="absolute bottom-0 inset-x-0 p-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-white/85">
                  Founder
                </span>
              </div>
            </div>
          </div>

          {/* Verified badge */}
          <span className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-brand border-[3px] border-navy-deep flex items-center justify-center shadow-lg">
            <svg
              className="w-4 h-4 text-navy-deep"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* ===== Right: Content ===== */}
      <div className="md:col-span-8 flex flex-col justify-center text-center md:text-left">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-3 justify-center md:justify-start">
          <span className="h-px w-6 bg-brand" />
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand">
            Meet the Founder
          </span>
        </div>

        {/* Name */}
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
          Ayushi Jaiswal
        </h3>

        {/* Title */}
        <p className="mt-2 text-sm font-semibold text-brand">
          Founder &amp; CEO, ThreatZen
        </p>

        {/* Divider */}
        <div className="my-5 h-px bg-gradient-to-r from-brand/40 via-brand/20 to-transparent md:mx-0 mx-auto w-24 md:w-full max-w-[300px]" />

        {/* Bio */}
        <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl mx-auto md:mx-0">
          Ayushi holds an MBA from Swami Vivekananda Subharti University, Meerut,
          and brings prior customer support experience from Groww. At ThreatZen,
          she is focused on building a customer-centric cybersecurity and
          compliance company.
        </p>

        {/* LinkedIn CTA */}
        <div className="mt-6 flex justify-center md:justify-start">
          <a
            href="https://www.linkedin.com/in/ayushi-jaiswal-7340841a8"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group inline-flex items-center gap-2
              px-5 py-2.5 rounded-xl
              bg-white/[0.06] border border-white/15 backdrop-blur-sm
              text-sm font-semibold text-white
              hover:bg-brand hover:border-brand hover:text-navy-deep
              transition-all duration-300
            "
          >
            <FaLinkedin className="w-4 h-4" />
            Connect on LinkedIn
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</motion.div>
    </div>

          {/* Stats Grid - Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-6 rounded-2xl bg-card border shadow-sm"
              >
                <stat.icon className="size-8 text-brand mx-auto mb-3" />
                <p className="text-3xl lg:text-4xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
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
              <h3 className="text-2xl font-bold mb-4">
                Why Leading Enterprises Choose ThreatZen
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                In today's threat environment, compliance alone isn't enough. We
                help organizations build security programs that are both
                auditable and effective, reducing real-world risk while meeting
                regulatory requirements.
              </p>

              {/* Differentiators */}
              <div className="space-y-4 mb-8">
                {differentiators.map((diff) => (
                  <div
                    key={diff.title}
                    className="flex gap-4 p-4 rounded-xl bg-muted/30 border"
                  >
                    <diff.icon className="size-6 text-brand shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">{diff.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {diff.description}
                      </p>
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
                    <CheckCircle2 className="size-5 text-brand shrink-0" />
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
                  <Shield className="size-12 text-brand mb-4" />
                  <h3 className="text-xl font-bold mb-2">
                    Certified Excellence
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Our team holds industry's most respected certifications,
                    ensuring world-class expertise for every engagement.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {certifications.map((cert) => (
                      <span
                        key={cert}
                        className="px-3 py-1 bg-background rounded-full text-xs font-medium border"
                      >
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
                    <div
                      key={industry}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="size-1.5 rounded-full bg-[var(--brand)]" />
                      {industry}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl bg-[var(--brand)] text-white p-6 text-center">
                <p className="font-semibold mb-2">
                  Ready to strengthen your security posture?
                </p>
                <p className="text-sm opacity-90 mb-4">
                  Get a complimentary security consultation
                </p>
                <a
                  href="/contact"
                  className="px-6 py-2 bg-white text-brand rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
                >
                  Talk to an Expert →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
