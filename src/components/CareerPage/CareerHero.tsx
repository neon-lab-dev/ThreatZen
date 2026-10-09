// components/CareerPage/CareerHero.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Users, Globe } from "lucide-react";

interface CareerHeroProps {
  totalOpenings: number;
}

const CareerHero: React.FC<CareerHeroProps> = ({ totalOpenings }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const scrollToOpenings = () => {
    document.getElementById("openings")?.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { icon: Sparkles, value: `${totalOpenings}`, label: "Open Roles" },
    { icon: Users, value: "1+", label: "Year Building" },
    { icon: Globe, value: "Remote", label: "Friendly" },
  ];

  return (
    <section className="relative overflow-hidden bg-navy-deep pt-24 pb-16 sm:pt-28 lg:pt-32 lg:pb-24">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep" />

      {/* Grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(76,192,138,0.10) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(76,192,138,0.10) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)",
        }}
      />

      {/* Glow */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(76,192,138,0.20) 0%, transparent 60%)",
        }}
      />

      {/* Top accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md px-4 py-2 mb-6"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand" />
            </span>
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-white/85">
              Careers at ThreatZen
            </span>
          </motion.div>

          {/* H1 */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={visible ? { y: "0%" } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block"
              >
                Build the future of
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={visible ? { y: "0%" } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block"
              >
                <span className="text-brand">cyber resilience.</span>
              </motion.span>
            </span>
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto"
          >
            Join a team that helps businesses across India and beyond stay
            secure, compliant, and resilient. We're small, we ship fast, and
            every role makes an impact.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <button
              type="button"
              onClick={scrollToOpenings}
              className="
                group inline-flex items-center gap-2
                rounded-full bg-brand text-navy-deep
                px-6 py-3.5 text-sm font-semibold
                shadow-[0_0_0_0_rgba(76,192,138,0.5)]
                hover:shadow-[0_0_40px_-4px_rgba(76,192,138,0.7)]
                hover:-translate-y-0.5
                transition-all duration-300
              "
            >
              View Open Roles
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <a
              href="mailto:contact@threatzen.com?subject=General%20Application"
              className="
                inline-flex items-center gap-2
                rounded-full bg-white/[0.06] border border-white/15
                text-white px-6 py-3.5 text-sm font-semibold
                backdrop-blur-sm
                hover:bg-white/[0.12] hover:border-white/30
                transition-all duration-300
              "
            >
              Send a General Application
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
          >
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center mb-2">
                    <Icon className="w-4 h-4 text-brand" />
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-white tabular-nums">
                    {s.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/55 mt-0.5">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CareerHero;
