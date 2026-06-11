import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Security Assessments" },
  { value: 25, suffix: "+", label: "Compliance Engagements" },
  { value: 15, suffix: "+", label: "Industries Served" },
  { value: 100, suffix: "%", label: "Client-Focused Approach" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, value, { duration: 1.6, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, value, mv]);

  useEffect(() => rounded.on("change", (v) => {
    if (ref.current) ref.current.textContent = `${v}${suffix}`;
  }), [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function Stats() {
  return (
    <section className="py-20 lg:py-24 bg-[var(--navy-deep)] text-white relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 cyber-grid opacity-25" />
      <div aria-hidden className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full" style={{ background: "var(--gradient-glow)" }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-[var(--brand)]">Why ThreatZen</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">Outcomes that speak for themselves</h2>
        </div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-dark rounded-2xl p-8 text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold text-gradient-brand">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-sm text-white/70">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
