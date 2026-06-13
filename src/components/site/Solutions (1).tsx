import { motion } from "framer-motion";
import { Banknote, Coins, CloudCog, Database, Fingerprint, Users2, GraduationCap, ServerCog } from "lucide-react";

const items = [
  { icon: Banknote, title: "Banking Security" },
  { icon: Coins, title: "FinTech Security" },
  { icon: CloudCog, title: "Cloud Security" },
  { icon: Database, title: "Data Protection" },
  { icon: Fingerprint, title: "Identity Management" },
  { icon: Users2, title: "Third Party Risk" },
  { icon: GraduationCap, title: "Security Awareness" },
  { icon: ServerCog, title: "Managed Security" },
];

export function Solutions() {
  return (
    <section className="py-24 lg:py-32 bg-surface relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-sm font-semibold tracking-widest uppercase text-[var(--brand)]">Solutions</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">Cyber Resilience, Built for <span className="text-[var(--brand)]">Business</span></h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Protecting your business through intelligent security, risk advisory, and compliance expertise.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
              className="group rounded-2xl bg-card p-6 border border-border hover:bg-[var(--navy-deep)] hover:text-white transition-all duration-300 cursor-pointer"
            >
              <div className="size-11 rounded-xl bg-[var(--brand)]/15 text-[var(--brand)] grid place-items-center group-hover:bg-[var(--brand)] group-hover:text-[var(--navy-deep)] transition-colors">
                <s.icon className="size-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold">{s.title}</h3>
              {/* <p className="mt-1 text-sm opacity-70">Learn more →</p> */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
