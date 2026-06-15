import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Lock, Activity } from "lucide-react";
import hero from "../../assets/hero-cyber.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero text-white pt-32 lg:pt-40 pb-24 lg:pb-32">
      <div aria-hidden className="absolute inset-0 cyber-grid opacity-40" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full"
        style={{ background: "var(--gradient-glow)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-[9px] sm:text-xs font-semibold tracking-[0.18em]">
              <span className="size-1.5 rounded-full bg-[var(--brand)] pulse-ring" />

              <span className="whitespace-nowrap">
                Threat<span className="text-[var(--brand)]">Z</span>en
                <sup className="-top-1 -ml-1 relative">™</sup>
              </span>
              <span className={`font-semibold tracking-[0.18em] uppercase`}>
                Next-Gen <span className="text-[var(--brand)]">Cyber</span>{" "}
                Resilience
              </span>
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-balance">
              Protecting
              <br className="hidden sm:block" />
              <span className="text-gradient-brand">Your Business</span> from
              Modern Cyber Threats
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/75 max-w-2xl leading-relaxed">
              Protect your business against evolving cyber threats while
              ensuring compliance with industry regulations through
              comprehensive security assessments, audits, consulting and managed
              security services.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--brand)] text-[var(--navy-deep)] px-6 py-3.5 text-sm font-semibold shadow-brand hover:bg-[var(--brand-glow)] transition-all hover:-translate-y-0.5"
              >
                Schedule Consultation
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full glass-dark text-white px-6 py-3.5 text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-white/60">
              {["ISO 27001", "PCI DSS", "SOC 2", "CERT-IN", "RBI", "SEBI"].map(
                (b) => (
                  <span key={b} className="font-medium tracking-wider">
                    {b}
                  </span>
                ),
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-brand border border-white/10">
              <img
                src={hero}
                alt="Cybersecurity operations dashboard"
                width={1280}
                height={1024}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)]/60 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -left-4 top-10 glass-dark rounded-2xl p-3 pr-4 flex items-center gap-3 shadow-elegant"
            >
              <div className="size-9 rounded-xl bg-[var(--brand)]/20 grid place-items-center text-[var(--brand)]">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <p className="text-xs text-white/60">Threats Blocked</p>
                <p className="text-sm font-semibold text-white">12,847 today</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -right-4 bottom-10 glass-dark rounded-2xl p-3 pr-4 flex items-center gap-3 shadow-elegant"
            >
              <div className="size-9 rounded-xl bg-[var(--brand)]/20 grid place-items-center text-[var(--brand)]">
                <Activity className="size-5" />
              </div>
              <div>
                <p className="text-xs text-white/60">SOC Uptime</p>
                <p className="text-sm font-semibold text-white">99.99%</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute right-8 -top-5 glass-dark rounded-xl p-2.5 flex items-center gap-2"
            >
              <Lock className="size-4 text-[var(--brand)]" />
              <span className="text-xs font-medium text-white">Compliant</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
