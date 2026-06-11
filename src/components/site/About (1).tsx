import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const points = [
  "Practical, outcome-driven security engagements",
  "Senior consultants with industry-specific expertise",
  "Frameworks tailored to BFSI, FinTech and Healthcare",
  "Continuous improvement, not point-in-time assessments",
];

export function About() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-[var(--brand)]">About ThreatZen</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">Building trust through security</h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            ThreatZen is a cybersecurity and compliance consulting organization
            focused on helping businesses identify risks, strengthen defenses,
            and achieve regulatory compliance. Our team combines technical
            expertise with industry knowledge to deliver practical security
            solutions that reduce risk and improve resilience.
          </p>

          <ul className="mt-7 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-[var(--brand)] mt-0.5 shrink-0" />
                <span className="text-sm">{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="rounded-3xl bg-hero p-10 text-white relative overflow-hidden">
            <div aria-hidden className="absolute inset-0 cyber-grid opacity-25" />
            <div className="relative grid grid-cols-2 gap-4">
              {[
                { k: "Senior", v: "Expert team" },
                { k: "24x7", v: "SOC ready" },
                { k: "BFSI", v: "Domain depth" },
                { k: "India", v: "Headquartered" },
              ].map((s) => (
                <div key={s.k} className="glass-dark rounded-2xl p-5">
                  <p className="text-2xl font-bold text-gradient-brand">{s.k}</p>
                  <p className="text-sm text-white/70 mt-1">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
