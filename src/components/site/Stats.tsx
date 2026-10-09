import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Security Assessments", description : "Vulnerability assessment and penetration testing" },
  { value: 25, suffix: "+", label: "Compliance Engagements", description : "Support across security and compliance frameworks" },
  { value:5, suffix: "+", label: "Industries Served", description : "Solutions tailored to diverse business needs" },
  { value: 24, suffix: "/7", label: "Customer Support", description : "From assessment and planning to implementation support" },
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
    <section className="py-20 lg:py-24 bg-navy-deep text-white relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 cyber-grid opacity-25" />
      <div aria-hidden className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full" style={{ background: "var(--gradient-glow)" }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-[740px] mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-brand">Why ThreatZen</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold capitalize">Security That <span className="text-brand">Delivers.</span>
          <br />
          Compliance That Builds Trust.
          </h2>
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
              <p className="mt-3 font-semibold text-white">{s.label}</p>
                <p className="mt-2 text-xs text-white/50">{s.description}</p>
            
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
