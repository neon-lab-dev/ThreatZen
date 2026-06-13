import { motion } from "framer-motion";
import { Landmark, Building2, LineChart, Coins, HeartPulse, Factory, ShoppingBag, GraduationCap, ShieldCheck, Cpu } from "lucide-react";

const list = [
  { icon: Landmark, label: "Banking" },
  { icon: Building2, label: "NBFC" },
  { icon: LineChart, label: "Stock Broking" },
  { icon: Coins, label: "FinTech" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: Factory, label: "Manufacturing" },
  { icon: ShoppingBag, label: "Retail" },
  { icon: GraduationCap, label: "Education" },
  { icon: ShieldCheck, label: "Government" },
  { icon: Cpu, label: "Technology" },
];

export function Industries() {
  return (
    <section className="py-24 lg:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-widest uppercase text-[var(--brand)]">Industries</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold capitalize">Securing regulated <span className="text-[var(--brand)]">industries</span></h2>
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {list.map((i, idx) => (
            <motion.div
              key={i.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 5) * 0.05 }}
              className="group rounded-2xl bg-card border border-border p-5 flex flex-col items-center text-center hover:border-[var(--brand)]/40 hover:shadow-elegant transition-all"
            >
              <div className="size-12 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] grid place-items-center group-hover:scale-110 transition-transform">
                <i.icon className="size-6" />
              </div>
              <p className="mt-3 text-sm font-semibold">{i.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
