// components/ComplianceServicesPage/ComplianceHero.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ============================================================
   Data
   ============================================================ */

const stats = [
  {
    icon: "shield",
    value: 100,
    suffix: "+",
    label: "Security Experts",
    display: "01",
  },
  {
    icon: "check",
    value: 15,
    suffix: "+",
    label: "Verified Protocols",
    display: "02",
  },
  {
    icon: "cube",
    value: 500,
    suffix: "+",
    label: "Custom Solutions",
    display: "03",
  },
  {
    icon: "bolt",
    value: 24,
    suffix: "/7",
    label: "Robust Updates",
    display: "04",
  },
];

const HEADLINE_LINES = [
  { text: "Compliance Made Simple", accent: false },
  { text: "for Your Business", accent: true },
];

/* ============================================================
   Typewriter hook
   ============================================================ */

const useTypewriter = (text: string, speed = 45, start = true, delay = 0) => {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) return;
    let i = 0;
    let raf: number;
    const t0 = performance.now() + delay;

    const tick = (now: number) => {
      if (now < t0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - t0;
      const target = Math.min(text.length, Math.floor(elapsed / speed));
      if (target !== i) {
        i = target;
        setDisplay(text.slice(0, i));
      }
      if (i >= text.length) {
        setDone(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, speed, start, delay]);

  return { display, done };
};

/* ============================================================
   Component
   ============================================================ */

const ComplianceHero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  /* ===== Mouse-tracked values (smoothed) ===== */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.6 });
  const smoothY = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.6 });

  /* ===== Derived parallax transforms ===== */
  const bgX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);
  const glow1X = useTransform(smoothX, [-0.5, 0.5], [40, -40]);
  const glow1Y = useTransform(smoothY, [-0.5, 0.5], [40, -40]);
  const glow2X = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const glow2Y = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);
  const spotlightX = useTransform(smoothX, [-0.5, 0.5], ["30%", "70%"]);
  const spotlightY = useTransform(smoothY, [-0.5, 0.5], ["30%", "70%"]);

  /* ===== Mouse tracking ===== */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rawX.set(x);
      rawY.set(y);
    };

    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  /* ===== Entrance trigger ===== */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  /* ===== Typewriter for the subheading ===== */
  const subText =
    "From ISO 27001 to SOC 2, DORA, GDPR, HIPAA, PCI DSS, EU AI Act and other regulations — compliance doesn't stop at certification.";
  const { display: subDisplay, done: subDone } = useTypewriter(
    subText,
    18,
    visible,
    900,
  );

  return (
    <section
      ref={heroRef}
      className="relative isolate overflow-hidden bg-navy-deep min-h-[85vh] lg:min-h-[92vh] flex items-center"
    >
      {/* ===== Background image with parallax ===== */}
      <motion.div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')`,
          scale: 1.08,
          x: bgX,
          y: bgY,
        }}
      />

      {/* ===== Overlays ===== */}
      <div className="absolute inset-0 -z-10 bg-navy-deep/85" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-deep/70 via-navy-deep/60 to-navy-deep" />

      {/* ===== Cursor spotlight (subtle) ===== */}
      <motion.div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) =>
              `radial-gradient(600px circle at ${x} ${y}, rgba(76,192,138,0.10), transparent 40%)`,
          ),
        }}
      />

      {/* ===== Brand glows with mouse parallax ===== */}
      <motion.div
        className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-brand opacity-[0.12] blur-[150px] rounded-full pointer-events-none"
        style={{ x: glow1X, y: glow1Y }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-glow opacity-[0.08] blur-[150px] rounded-full pointer-events-none"
        style={{ x: glow2X, y: glow2Y }}
      />

      {/* ===== Dot grid ===== */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "44px 44px",
        }}
      />

      {/* ===== Floating particles ===== */}
      <div className="absolute top-[22%] left-[12%] w-1.5 h-1.5 rounded-full bg-brand opacity-50 animate-float-a" />
      <div className="absolute top-[65%] right-[18%] w-1 h-1 rounded-full bg-brand opacity-40 animate-float-b" />
      <div className="absolute bottom-[28%] left-[22%] w-1 h-1 rounded-full bg-white opacity-25 animate-float-c" />
      <div className="absolute top-[35%] right-[28%] w-1.5 h-1.5 rounded-full bg-white opacity-20 animate-float-a" />

      {/* ===== Top + bottom accent lines ===== */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />

      {/* ===== Content ===== */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-4xl w-full">
            {/* ===== Badge ===== */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
              </span>
              <span className="text-xs font-medium text-white/85 tracking-[0.18em] uppercase">
                Compliance Services
              </span>
              <span className="ml-1 px-2 py-0.5 rounded-full bg-brand/15 text-brand text-[10px] font-semibold tracking-wider uppercase border border-brand/25">
                New
              </span>
            </motion.div>

            {/* ===== Heading ===== */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-6">
              {HEADLINE_LINES.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "100%", opacity: 0 }}
                    animate={visible ? { y: "0%", opacity: 1 } : {}}
                    transition={{
                      duration: 0.9,
                      delay: 0.15 + i * 0.18,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="block"
                  >
                    {line.accent ? (
                      <span className="relative inline-block">
                        <span className="text-brand relative z-10">
                          {line.text}
                        </span>
                        {/* Glow behind */}
                        <span className="absolute inset-0 blur-2xl bg-brand opacity-25 -z-0" />
                        {/* Animated underline */}
                        <motion.span
                          initial={{ scaleX: 0 }}
                          animate={visible ? { scaleX: 1 } : {}}
                          transition={{
                            duration: 0.9,
                            delay: 0.9,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="absolute bottom-1 left-0 right-0 h-[3px] bg-brand/30 rounded-full origin-left"
                        />
                      </span>
                    ) : (
                      line.text
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* ===== Subheading with typewriter ===== */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-lg lg:text-xl text-white/65 leading-relaxed max-w-2xl mx-auto mb-10 min-h-[3.5rem] lg:min-h-[4rem]"
            >
              {subDisplay}
              {!subDone && (
                <span className="inline-block w-[2px] h-[1em] bg-brand align-middle ml-0.5 animate-blink" />
              )}
            </motion.p>

            {/* ===== CTAs ===== */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-wrap items-center justify-center gap-4 mb-16"
            >
              <a href="/services">
              <MagneticButton variant="primary">
                Explore Our Solutions
              </MagneticButton>
              </a>
              <a href="/contact">
                <MagneticButton variant="secondary">
                Book Your Free Demo
              </MagneticButton>
              </a>
            </motion.div>

            {/* ===== Stats Row ===== */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 1 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 pt-10 border-t border-white/10"
            >
              {stats.map((s, i) => (
                <StatItem key={s.label} stat={s} index={i} visible={visible} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== Scroll cue ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-medium text-white/40 tracking-[0.2em] uppercase">
          Scroll
        </span>
        <div className="relative w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
          <motion.span
            className="w-1 h-1.5 rounded-full bg-brand"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* ===== Keyframes ===== */}
      <style>{`
        @keyframes float-a {
          0%, 100% { transform: translate(0, 0); opacity: 0.5; }
          50% { transform: translate(12px, -18px); opacity: 0.8; }
        }
        @keyframes float-b {
          0%, 100% { transform: translate(0, 0); opacity: 0.4; }
          50% { transform: translate(-14px, -12px); opacity: 0.7; }
        }
        @keyframes float-c {
          0%, 100% { transform: translate(0, 0); opacity: 0.25; }
          50% { transform: translate(10px, 14px); opacity: 0.55; }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-float-a { animation: float-a 9s ease-in-out infinite; }
        .animate-float-b { animation: float-b 7s ease-in-out infinite; }
        .animate-float-c { animation: float-c 6s ease-in-out infinite; }
        .animate-blink { animation: blink 1s steps(1) infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-float-a, .animate-float-b, .animate-float-c, .animate-blink {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

/* ============================================================
   MagneticButton
   ============================================================ */

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = "primary",
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 20 });
  const sy = useSpring(y, { stiffness: 250, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.15);
    y.set(relY * 0.25);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden";

  const styles =
    variant === "primary"
      ? "bg-brand text-navy-deep hover:bg-brand-glow shadow-[0_0_0_0_rgba(76,192,138,0.5)] hover:shadow-[0_0_40px_-4px_rgba(76,192,138,0.6)]"
      : "bg-white/[0.06] border border-white/20 text-white backdrop-blur-sm hover:bg-white/[0.12] hover:border-white/30";

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      type="button"
      className={`${base} ${styles} cursor-pointer`}
    >
      {/* Shine sweep on primary */}
      {variant === "primary" && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out cursor-pointer" />
      )}
      <span className="relative">{children}</span>
      {variant === "primary" ? (
        <svg
          className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
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
      ) : (
        <svg
          className="relative w-4 h-4 transition-transform duration-300 group-hover:scale-110"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
          />
        </svg>
      )}
    </motion.button>
  );
};

/* ============================================================
   StatItem — animated counter + icon
   ============================================================ */

interface StatItemProps {
  stat: (typeof stats)[number];
  index: number;
  visible: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ stat, index, visible }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const duration = 1400 + index * 100;
    const delay = 1000 + index * 120;
    const t0 = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - t0 - delay;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * stat.value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, stat.value, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 1 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col items-center text-center"
    >
      <div className="text-xs font-mono text-brand/70 mb-1.5 tracking-widest tabular-nums group-hover:text-brand transition-colors">
        {stat.display}
      </div>
      <div className="flex items-baseline gap-0.5 mb-1">
        <span className="text-2xl lg:text-3xl font-bold text-white tabular-nums tracking-tight">
          {value}
        </span>
        <span className="text-xl lg:text-2xl font-bold text-brand tabular-nums">
          {stat.suffix}
        </span>
      </div>
      <div className="text-xs sm:text-sm text-white/60 group-hover:text-white/85 transition-colors">
        {stat.label}
      </div>
    </motion.div>
  );
};

export default ComplianceHero;
