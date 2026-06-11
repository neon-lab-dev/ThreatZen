import { motion } from "framer-motion";

const cases = [
  {
    tag: "Stock Broking",
    title: "Stock Broking Firm Security Assessment",
    desc: "End-to-end VAPT, configuration review and SEBI alignment for a regional broker, helping strengthen security posture and reduce operational risks.",
  },
  {
    tag: "FinTech",
    title: "Cloud Security Review for FinTech",
    desc: "AWS landing zone assessment, IAM hardening and continuous monitoring rollout, ensuring improved visibility, governance, and threat detection.",
  },
  {
    tag: "Compliance",
    title: "Compliance Readiness Assessment",
    desc: "ISO 27001 gap analysis, control design and audit preparation in 90 days, enabling a smoother certification process and stronger compliance framework.",
  },
];

export function CaseStudies() {
  return (
    <section className="py-24 lg:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-[var(--brand)]">Case Studies</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">Recent engagements</h2>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:shadow-elegant transition-all"
            >
              <div className="h-44 bg-gradient-to-br from-[var(--navy)] via-[var(--navy-deep)] to-[var(--brand)]/40 relative">
                <div aria-hidden className="absolute inset-0 cyber-grid opacity-30" />
                <span className="absolute top-4 left-4 text-xs font-medium px-3 py-1 rounded-full bg-white/90 text-[var(--navy-deep)]">{c.tag}</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold leading-tight">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                {/* <a href="#" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand)] group-hover:gap-2 transition-all">
                  Read case study <ArrowUpRight className="size-4" />
                </a> */}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
