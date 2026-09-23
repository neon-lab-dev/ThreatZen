import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, Lock, Activity, CheckCircle2 } from "lucide-react";
import hero from "../../assets/hero-cyber.jpg";

/* ============================================================
   Animated counter
   ============================================================ */
const useCountUp = (target: number, start: boolean, duration = 1600) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();

    const tick = (now: number) => {
      const elapsed = now - t0;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return value;
};

/* ============================================================
   Certifications
   ============================================================ */
const CERTIFICATIONS = [
  "ISO 27001",
  "PCI DSS",
  "SOC 2",
  "CERT-IN",
  "RBI",
  "SEBI",
  "DPDP",
  "GDPR",
  "CCPA",
];

/* ============================================================
   Component
   ============================================================ */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  /* Desktop detection */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* Mouse parallax — desktop only */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 100, damping: 20, mass: 0.7 });
  const smoothY = useSpring(rawY, { stiffness: 100, damping: 20, mass: 0.7 });

  const imageX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const imageY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || !isDesktop) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [rawX, rawY, isDesktop]);

  /* Entrance */
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 50);
    const t2 = setTimeout(() => setStatsVisible(true), 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  /* Counters */
  const threatsBlocked = useCountUp(12847, statsVisible, 1800);
  const retention = useCountUp(98, statsVisible, 1600);
  const vulnerabilities = useCountUp(500, statsVisible, 1700);

  return (
    <section
      ref={heroRef}
      className="
        relative isolate w-full overflow-hidden text-white bg-navy-deep
        pt-24 pb-16
        sm:pt-28 sm:pb-20
        lg:pt-40 lg:pb-32
      "
    >
      {/* ==================================================
          BACKGROUND — all absolutely positioned, no overflow
          ================================================== */}

      {/* Base gradient */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-navy-deep via-navy to-navy-deep" />

      {/* Cyber grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(76,192,138,0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(76,192,138,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 40%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 40%, black 20%, transparent 75%)",
        }}
      />

      {/* Dot texture */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top glow — properly centered, clipped by section overflow-hidden */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 -top-40 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] lg:w-[1000px] lg:h-[1000px] rounded-full pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(76,192,138,0.20) 0%, transparent 60%)",
        }}
      />

      {/* Bottom-right glow */}
      <div
        aria-hidden
        className="absolute -bottom-40 -right-40 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] rounded-full bg-brand-glow opacity-[0.08] blur-[120px] pointer-events-none -z-10"
      />

      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent -z-10" />

      {/* Floating particles (hidden on very small screens) */}
      <div className="hidden sm:block absolute top-[22%] left-[8%] w-1.5 h-1.5 rounded-full bg-brand opacity-60 animate-float-a" />
      <div className="hidden sm:block absolute top-[68%] right-[12%] w-1 h-1 rounded-full bg-brand opacity-50 animate-float-b" />
      <div className="hidden sm:block absolute bottom-[20%] left-[18%] w-1 h-1 rounded-full bg-white opacity-30 animate-float-c" />

      {/* ==================================================
          CONTENT — grid with min-w-0 to prevent overflow
          ================================================== */}
      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* ============ LEFT: Copy ============ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 min-w-0 text-center lg:text-left"
          >
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 max-w-full"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand" />
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.14em] sm:tracking-[0.18em] text-white/90 whitespace-nowrap">
                Threat<span className="text-brand">Z</span>en
                <sup className="relative -top-1 -ml-0.5 text-[0.65em]">™</sup>
                — Cybersecurity, Compliance & Technology
              </span>
              <span className="hidden xs:inline text-white/40 text-[10px] sm:text-xs">
                ·
              </span>
              <span className="hidden xs:inline text-[10px] sm:text-xs font-semibold tracking-[0.14em] sm:tracking-[0.18em] text-white/70 whitespace-nowrap">
                Cyber Resilience
              </span>
            </motion.div>

            {/* H1 */}
            <h1
              className="
                mt-5 sm:mt-6 font-bold tracking-tight text-balance
                text-[1.75rem] leading-[1.15]
                xs:text-[2rem] xs:leading-[1.12]
                sm:text-[2.75rem] sm:leading-[1.08]
                lg:text-[3.5rem] lg:leading-[1.05]
                xl:text-[4rem]
              "
            >
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={visible ? { y: "0%" } : {}}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  One Partner.
                </motion.span>
              </span>
              <span className="block">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={visible ? { y: "0%" } : {}}
                  transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  Every Layer of{" "}
                  <span className="relative inline-block">
                    <span className="text-brand relative z-10">Cyber Risk</span>
                    <span className="absolute inset-0 blur-2xl bg-brand opacity-25 -z-0" />
                  </span>{" "}
                  Covered.
                </motion.span>
              </span>
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="
                mt-5 sm:mt-6
                text-sm sm:text-base lg:text-lg
                text-white/70 leading-relaxed
                max-w-2xl mx-auto lg:mx-0
              "
            >
              ThreatZen brings{" "}
              <span className="text-white font-medium">VAPT</span>,{" "}
              <span className="text-white font-medium">ISO 27001 &amp; SOC 2 compliance</span>,{" "}
              <span className="text-white font-medium">secure-by-design engineering</span>, and{" "}
              <span className="text-white font-medium">managed security</span> together
              under one accountable partner. Trusted by fintech, healthtech, retail,
              and D2C businesses.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="
                mt-7 sm:mt-8
                flex flex-col sm:flex-row sm:flex-wrap
                gap-3 sm:gap-4
                justify-center lg:justify-start
                w-full sm:w-auto
              "
            >
              <Link
                to="/contact"
                className="
                  group relative inline-flex items-center justify-center gap-2
                  rounded-full overflow-hidden
                  bg-brand text-navy-deep
                  px-5 sm:px-6 py-3 sm:py-3.5
                  text-[13px] sm:text-sm font-semibold
                  shadow-[0_0_0_0_rgba(76,192,138,0.5)]
                  hover:shadow-[0_0_40px_-4px_rgba(76,192,138,0.7)]
                  hover:-translate-y-0.5
                  transition-all duration-300
                  w-full sm:w-auto
                  whitespace-nowrap
                "
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out" />
                <span className="relative">Book a Free Risk Consultation</span>
                <ArrowRight className="relative size-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/services"
                className="
                  group inline-flex items-center justify-center gap-2
                  rounded-full bg-white/[0.06] border border-white/15
                  text-white px-5 sm:px-6 py-3 sm:py-3.5
                  text-[13px] sm:text-sm font-semibold
                  backdrop-blur-sm
                  hover:bg-white/[0.12] hover:border-white/30
                  transition-all duration-300
                  w-full sm:w-auto
                  whitespace-nowrap
                "
              >
                Explore Our Services
              </Link>
            </motion.div>

            {/* Proof strip — 3 columns, mobile-tuned */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="
                mt-10 sm:mt-12 pt-6 sm:pt-8
                border-t border-white/10
                grid grid-cols-3 gap-3 sm:gap-6
              "
            >
              <ProofStat value={`${retention}%`} label="Client Retention" />
              <ProofStat
                value={`${vulnerabilities}+`}
                label="Vulnerabilities Remediated"
                shortLabel="Vulns Fixed"
              />
              <ProofStat value="99.9%" label="Compliance Rate" />
            </motion.div>

            {/* Certification marquee */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="mt-8 sm:mt-10"
            >
              <p
                className="
                  text-[10px] font-semibold tracking-[0.2em] uppercase
                  text-white/40 mb-3
                  text-center lg:text-left
                "
              >
                Certified &amp; Compliant
              </p>

              {/* Marquee — bounded inside the parent, no negative margins */}
              <div className="relative w-full overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-12 bg-gradient-to-r from-navy-deep to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-12 bg-gradient-to-l from-navy-deep to-transparent z-10 pointer-events-none" />

                <div className="flex gap-5 sm:gap-6 animate-marquee-slow whitespace-nowrap w-max">
                  {[...CERTIFICATIONS, ...CERTIFICATIONS].map((cert, i) => (
                    <span
                      key={`${cert}-${i}`}
                      className="
                        flex-shrink-0 inline-flex items-center gap-2
                        text-[10px] sm:text-[11px] font-semibold
                        tracking-[0.12em] uppercase text-white/60
                      "
                    >
                      <CheckCircle2 className="w-3 h-3 text-brand/70 flex-shrink-0" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ============ RIGHT: Visual ============ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative min-w-0 mt-4 sm:mt-6 lg:mt-0"
          >
            {/* Desktop offset frame */}
            <div className="hidden lg:block absolute inset-0 -translate-x-3 translate-y-3 rounded-3xl border border-brand/20 pointer-events-none" />

            {/* Image */}
            <motion.div
              style={isDesktop ? { x: imageX, y: imageY } : undefined}
              className="
                relative rounded-2xl sm:rounded-3xl overflow-hidden
                shadow-[0_20px_60px_-25px_rgba(76,192,138,0.4)]
                border border-white/10
              "
            >
              <img
                src={hero}
                alt="Cybersecurity operations dashboard"
                width={1280}
                height={1024}
                className="w-full h-auto block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent" />
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand opacity-20 blur-[60px] rounded-full pointer-events-none" />
            </motion.div>

            {/* ============ Floating cards — DESKTOP ONLY ============ */}
            {isDesktop && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="
                    absolute -left-4 top-12
                    rounded-2xl bg-white/[0.08] border border-white/15
                    backdrop-blur-md p-3 pr-4 flex items-center gap-3
                    shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]
                  "
                >
                  <div className="size-9 rounded-xl bg-brand/20 grid place-items-center text-brand">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/60 tracking-wider uppercase">
                      Threats Blocked
                    </p>
                    <p className="text-sm font-semibold text-white tabular-nums">
                      {threatsBlocked.toLocaleString()}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="
                    absolute -right-4 bottom-12
                    rounded-2xl bg-white/[0.08] border border-white/15
                    backdrop-blur-md p-3 pr-4 flex items-center gap-3
                    shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]
                  "
                >
                  <div className="size-9 rounded-xl bg-brand/20 grid place-items-center text-brand">
                    <Activity className="size-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/60 tracking-wider uppercase">
                      SOC Uptime
                    </p>
                    <p className="text-sm font-semibold text-white">99.99%</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  className="
                    absolute right-8 -top-5
                    rounded-xl bg-white/[0.08] border border-white/15
                    backdrop-blur-md px-3 py-2 flex items-center gap-2
                  "
                >
                  <Lock className="size-3.5 text-brand" />
                  <span className="text-[11px] font-medium text-white">
                    Compliant
                  </span>
                  <span className="relative flex h-1.5 w-1.5 ml-0.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-60 animate-ping" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand" />
                  </span>
                </motion.div>
              </>
            )}

            {/* ============ Mobile stat chips — MOBILE / TABLET ONLY ============ */}
            {!isDesktop && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="mt-4 sm:mt-5 grid grid-cols-3 gap-2 sm:gap-3"
              >
                <MobileStat
                  icon={<ShieldCheck className="size-4" />}
                  label="Blocked"
                  value={threatsBlocked.toLocaleString()}
                />
                <MobileStat
                  icon={<Activity className="size-4" />}
                  label="Uptime"
                  value="99.99%"
                />
                <MobileStat
                  icon={<Lock className="size-4" />}
                  label="Status"
                  value="Compliant"
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ============ Inline keyframes ============ */}
      <style>{`
        @keyframes float-a {
          0%, 100% { transform: translate(0, 0); opacity: 0.6; }
          50% { transform: translate(12px, -18px); opacity: 0.9; }
        }
        @keyframes float-b {
          0%, 100% { transform: translate(0, 0); opacity: 0.5; }
          50% { transform: translate(-14px, -12px); opacity: 0.8; }
        }
        @keyframes float-c {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          50% { transform: translate(10px, 14px); opacity: 0.6; }
        }
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-float-a { animation: float-a 9s ease-in-out infinite; }
        .animate-float-b { animation: float-b 7s ease-in-out infinite; }
        .animate-float-c { animation: float-c 6s ease-in-out infinite; }
        .animate-marquee-slow { animation: marquee-slow 30s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-float-a, .animate-float-b, .animate-float-c, .animate-marquee-slow {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ============================================================
   Sub-components
   ============================================================ */

interface ProofStatProps {
  value: string;
  label: string;
  shortLabel?: string;
}

function ProofStat({ value, label, shortLabel }: ProofStatProps) {
  return (
    <div className="text-center lg:text-left min-w-0">
      <div
        className="
          font-bold text-brand tabular-nums tracking-tight
          text-xl sm:text-2xl lg:text-3xl
        "
      >
        {value}
      </div>
      <div
        className="
          mt-1 text-white/55 leading-snug
          text-[10px] sm:text-xs lg:text-sm
        "
      >
        <span className="sm:hidden">{shortLabel ?? label}</span>
        <span className="hidden sm:inline">{label}</span>
      </div>
    </div>
  );
}

interface MobileStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function MobileStat({ icon, label, value }: MobileStatProps) {
  return (
    <div
      className="
        rounded-xl bg-white/[0.06] border border-white/15
        backdrop-blur-md px-2 sm:px-3 py-2 sm:py-2.5
        flex flex-col items-center text-center gap-0.5 sm:gap-1
        min-w-0
      "
    >
      <div className="text-brand">{icon}</div>
      <p className="text-[9px] text-white/50 tracking-wider uppercase">
        {label}
      </p>
      <p className="text-[11px] sm:text-xs font-semibold text-white tabular-nums truncate max-w-full">
        {value}
      </p>
    </div>
  );
}