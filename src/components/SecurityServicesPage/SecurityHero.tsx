import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MagneticButton } from "../ComplianceServicesPage/ComplianceHero";

const SecurityHero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.6 });
  const smoothY = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.6 });

  const bgX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], [40, -40]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [40, -40]);
  const glow2X = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const glow2Y = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);

  /* ===== Mouse-tracked parallax ===== */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  /* ===== Entrance trigger ===== */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative isolate overflow-hidden bg-background min-h-[85vh] lg:min-h-[90vh] flex items-center"
    >
      {/* ===== Background image with parallax ===== */}
      <motion.div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-[0.15]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80')`,
          scale: 1.08,
          x: bgX,
          y: bgY,
        }}
      />

      {/* ===== Light overlay ===== */}
      <div className="absolute inset-0 -z-10 bg-background/85" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/70 to-background" />

      {/* ===== Brand glows with parallax ===== */}
      <motion.div
        className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-brand opacity-[0.12] blur-[150px] rounded-full pointer-events-none"
        style={{ x: glowX, y: glowY }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-glow opacity-[0.09] blur-[150px] rounded-full pointer-events-none"
        style={{ x: glow2X, y: glow2Y }}
      />

      {/* ===== Dot grid ===== */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.5] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15,23,42,0.08) 1px, transparent 0)`,
          backgroundSize: "44px 44px",
        }}
      />

      {/* ===== Top accent line ===== */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />

      {/* ===== Floating particles ===== */}
      <div className="absolute top-[22%] left-[12%] w-1.5 h-1.5 rounded-full bg-brand opacity-40 animate-float-a" />
      <div className="absolute top-[65%] right-[18%] w-1 h-1 rounded-full bg-brand opacity-30 animate-float-b" />
      <div className="absolute bottom-[28%] left-[22%] w-1 h-1 rounded-full bg-brand/60 opacity-40 animate-float-c" />

      {/* ===== Content ===== */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-4xl w-full">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-muted shadow-sm mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
              </span>
              <span className="text-xs font-medium text-foreground tracking-[0.18em] uppercase">
                Security Services
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground tracking-tight leading-[1.08] mb-6">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%", opacity: 0 }}
                  animate={visible ? { y: "0%", opacity: 1 } : {}}
                  transition={{
                    duration: 0.9,
                    delay: 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block"
                >
                  End-to-End{" "}
                  <span className="relative inline-block">
                    <span className="text-brand relative z-10">
                      Security Solutions
                    </span>
                    {/* Glow behind brand text */}
                    <span className="absolute inset-0 blur-2xl bg-brand opacity-20 -z-0" />
                  </span>
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%", opacity: 0 }}
                  animate={visible ? { y: "0%", opacity: 1 } : {}}
                  transition={{
                    duration: 0.9,
                    delay: 0.33,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block"
                >
                  for All Industries
                </motion.span>
              </span>
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12"
            >
              ThreatZen delivers end-to-end cybersecurity solutions — from risk
              assessments to incident response — helping your business stay
              secure, compliant, and resilient in a dynamic digital landscape.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <a href="/services">
                <MagneticButton variant="primary">
                  Get a Free Security Risk Assessment
                </MagneticButton>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== Bottom fade ===== */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* ===== Floating animation keyframes ===== */}
      <style>{`
        @keyframes float-a {
          0%, 100% { transform: translate(0, 0); opacity: 0.4; }
          50% { transform: translate(12px, -18px); opacity: 0.7; }
        }
        @keyframes float-b {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          50% { transform: translate(-14px, -12px); opacity: 0.6; }
        }
        @keyframes float-c {
          0%, 100% { transform: translate(0, 0); opacity: 0.4; }
          50% { transform: translate(10px, 14px); opacity: 0.6; }
        }
        .animate-float-a { animation: float-a 9s ease-in-out infinite; }
        .animate-float-b { animation: float-b 7s ease-in-out infinite; }
        .animate-float-c { animation: float-c 6s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-float-a, .animate-float-b, .animate-float-c {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default SecurityHero;
