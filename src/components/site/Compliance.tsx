import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

const frameworks = [
  "ISO 27001", "PCI DSS", "SOC 2", "CERT-IN", "RBI Guidelines",
  "SEBI Cybersecurity Framework", "SEBI CSCRF", "IRDAI Security Guidelines",
  "DPDP Act (India)", "Account Aggregator (AAP) Audit",
  "Data Protection Controls", "Risk Management Frameworks",
];

export function Compliance() {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <p className="text-sm font-semibold tracking-widest uppercase text-[var(--brand)]">Compliance</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">Expertise across global & Indian frameworks</h2>
          <p className="mt-5 text-muted-foreground text-lg">
            From international standards to sector-specific Indian regulations,
            we help you achieve, evidence and maintain compliance.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="relative pl-8 border-l-2 border-dashed border-border space-y-4">
            {frameworks.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative"
              >
                <span className="absolute -left-[42px] top-3 size-4 rounded-full bg-[var(--brand)] ring-4 ring-[var(--brand)]/20" />
                <div className="rounded-xl bg-card border border-border p-5 hover:border-[var(--brand)]/40 transition-colors flex items-center gap-3">
                  <BadgeCheck className="size-5 text-[var(--brand)] shrink-0" />
                  <span className="font-semibold">{f}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
