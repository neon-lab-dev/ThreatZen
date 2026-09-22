// components/ComplianceServicesPage/CTASection.tsx
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  /* ===== Mouse parallax ===== */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    };

    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-navy-deep py-20 lg:py-28 overflow-hidden isolate"
    >
      {/* ===== Layered background ===== */}

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Brand glow — top left, follows mouse */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-brand opacity-[0.12] blur-[150px] rounded-full pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)`,
        }}
      />

      {/* Brand glow — bottom right, opposite direction */}
      <div
        className="absolute -bottom-40 -right-40 w-[700px] h-[700px] bg-brand-glow opacity-[0.08] blur-[150px] rounded-full pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * -50}px, ${mousePos.y * -50}px)`,
        }}
      />

      {/* Center ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-brand opacity-[0.04] blur-[180px] rounded-full pointer-events-none" />

      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />

      {/* Floating orbs */}
      <div className="absolute top-[20%] left-[10%] w-1.5 h-1.5 rounded-full bg-brand opacity-50 animate-float-a" />
      <div className="absolute top-[65%] right-[15%] w-1 h-1 rounded-full bg-brand opacity-40 animate-float-b" />
      <div className="absolute bottom-[25%] left-[25%] w-1 h-1 rounded-full bg-white opacity-25 animate-float-c" />

      {/* ===== Content ===== */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ===== Left: Heading + CTA ===== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-sm mb-6">
              <Sparkles className="w-3 h-3 text-brand" />
              <span className="text-xs font-medium text-white/80 tracking-[0.15em] uppercase">
                Get Started
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.08] tracking-tight mb-6">
              <span className="text-white">From Code To </span>
              <span className="relative inline-block">
                <span className="text-brand relative z-10">Compliance</span>
                {/* Animated underline */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-1 left-0 right-0 h-[3px] bg-brand/30 rounded-full origin-left"
                />
                {/* Glow behind word */}
                <span className="absolute inset-0 blur-2xl bg-brand opacity-25 -z-0" />
              </span>
              <span className="text-white"> — Where Innovation Meets Security.</span>
            </h2>

            {/* Subtext */}
            <p className="text-base lg:text-lg text-white/60 leading-relaxed max-w-xl mb-8">
              Let our compliance experts map your regulatory landscape and build a
              framework aligned with your business — not a template.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Primary */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="
                  group relative inline-flex items-center gap-2
                  px-6 py-3.5 rounded-xl
                  bg-brand text-navy-deep font-semibold text-sm
                  overflow-hidden
                  shadow-[0_0_0_0_rgba(76,192,138,0.4)]
                  hover:shadow-[0_0_40px_-4px_rgba(76,192,138,0.6)]
                  transition-all duration-300
                "
              >
                {/* Shine sweep on hover */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out" />

                <span className="relative">Talk to an Expert</span>
                <ArrowRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </motion.button>

              {/* Secondary */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="
                  group inline-flex items-center gap-2
                  px-6 py-3.5 rounded-xl
                  bg-white/[0.06] border border-white/15 text-white
                  font-semibold text-sm backdrop-blur-sm
                  hover:bg-white/[0.12] hover:border-white/25
                  transition-all duration-300
                "
              >
                <Phone className="w-4 h-4 text-brand transition-transform duration-300 group-hover:rotate-12" />
                Book a Call
              </motion.button>
            </div>
          </motion.div>

          {/* ===== Right: Live chat card ===== */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <LiveChatCard />
          </motion.div>
        </div>
      </div>

      {/* ===== Keyframes ===== */}
      <style>{`
        @keyframes float-a {
          0%, 100% { transform: translate(0, 0); opacity: 0.5; }
          50% { transform: translate(12px, -16px); opacity: 0.8; }
        }
        @keyframes float-b {
          0%, 100% { transform: translate(0, 0); opacity: 0.4; }
          50% { transform: translate(-12px, -10px); opacity: 0.7; }
        }
        @keyframes float-c {
          0%, 100% { transform: translate(0, 0); opacity: 0.25; }
          50% { transform: translate(10px, 12px); opacity: 0.5; }
        }
        .animate-float-a { animation: float-a 8s ease-in-out infinite; }
        .animate-float-b { animation: float-b 6.5s ease-in-out infinite; }
        .animate-float-c { animation: float-c 5.5s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-float-a, .animate-float-b, .animate-float-c {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};
/* ============================================================
   Live Chat Preview Card — Continuous Loop
   ============================================================ */

const CHAT_SEQUENCE = [
  { sender: 'bot' as const, text: "Hi there 👋 Welcome to ThreatZen. How can I help you today?" },
  { sender: 'user' as const, text: "Hi — we're preparing for SOC 2 Type II certification." },
  { sender: 'bot' as const, text: "Great! I can route you to a compliance specialist. What's your company size?" },
  { sender: 'user' as const, text: "Around 200 employees, fintech space." },
  { sender: 'bot' as const, text: "Perfect. We work with several BFSI clients on SOC 2. Are you targeting Type I or Type II?" },
  { sender: 'user' as const, text: "Type II. Our customers are asking for it before renewal." },
  { sender: 'bot' as const, text: "Understood. Which trust services criteria are in scope — Security only, or also Availability and Confidentiality?" },
  { sender: 'user' as const, text: "Security and Confidentiality for now." },
  { sender: 'bot' as const, text: "Good — that's a common combo. Do you already have an ISMS in place, or are we starting from scratch?" },
  { sender: 'user' as const, text: "We have ISO 27001 controls documented, but no formal evidence process." },
  { sender: 'bot' as const, text: "That helps a lot — roughly 60% of SOC 2 controls overlap with ISO 27001. We can leverage your existing documentation." },
  { sender: 'user' as const, text: "Nice. How long does a typical Type II readiness + audit take?" },
  { sender: 'bot' as const, text: "For your size and current posture, we'd estimate 10–12 weeks to readiness, then a 3–12 month observation window depending on your auditor." },
  { sender: 'user' as const, text: "Can you help coordinate with the audit firm, or do we handle that separately?" },
  { sender: 'bot' as const, text: "We handle end-to-end — readiness, evidence automation, and auditor coordination with CPA firms we partner with." },
  { sender: 'user' as const, text: "What does pricing typically look like?" },
  { sender: 'bot' as const, text: "Our engagement starts at ₹4.5L for readiness and evidence setup. Final pricing depends on scope and auditor choice." },
  { sender: 'user' as const, text: "That's reasonable. Can we see a proposal by next week?" },
  { sender: 'bot' as const, text: "Absolutely. I'll need your work email and preferred slot for a 30-min scoping call. Which day works best?" },
  { sender: 'user' as const, text: "Tuesday afternoon works. I'll share my email now." },
];

const LiveChatCard: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [cycleKey, setCycleKey] = useState(0); // forces re-mount of messages for clean restart

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;

    // Schedule each message
    CHAT_SEQUENCE.forEach((_, i) => {
      // Delay before the message appears (typing gap)
      const typingStart = elapsed;
      const messageAt = elapsed + 900; // 900ms "typing" pause

      // Show typing indicator (only for bot messages)
      if (CHAT_SEQUENCE[i].sender === 'bot') {
        timers.push(
          setTimeout(() => setShowTyping(true), typingStart + 300)
        );
        timers.push(
          setTimeout(() => setShowTyping(false), messageAt - 100)
        );
      }

      // Reveal the message
      timers.push(
        setTimeout(() => setVisibleCount(i + 1), messageAt)
      );

      // Advance the timeline
      elapsed = messageAt + 800;
    });

    // After all messages, hold for 2.5s, then restart
    const HOLD_AFTER_END = 2500;
    timers.push(
      setTimeout(() => {
        setVisibleCount(0);
        setShowTyping(false);
        setCycleKey((k) => k + 1); // remount for a clean slide-in on restart
      }, elapsed + HOLD_AFTER_END)
    );

    return () => timers.forEach(clearTimeout);
  }, [cycleKey]);

  return (
    <div className="relative">
      {/* Decorative offset frame */}
      <div className="absolute inset-0 -translate-x-2 translate-y-2 lg:-translate-x-3 lg:translate-y-3 rounded-3xl border border-brand/25 pointer-events-none" />

      <div className="relative rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-md overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand to-brand-glow flex items-center justify-center text-navy-deep font-bold text-xs">
                TZ
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-brand border-2 border-navy-deep" />
            </div>

            <div>
              <div className="text-sm font-semibold text-white">ThreatZen Expert</div>
              <div className="text-[11px] text-white/45 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                Online · Avg reply &lt; 2 min
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider">
            Live
          </div>
        </div>

        {/* Messages — fixed height so card doesn't jump */}
        <div
          key={cycleKey}
          className="p-5 space-y-3 h-[280px] overflow-hidden flex flex-col justify-end"
        >
          <AnimatePresence mode="popLayout">
            {CHAT_SEQUENCE.slice(0, visibleCount).map((msg, i) => (
              <ChatBubble key={i} sender={msg.sender}>
                {msg.text}
              </ChatBubble>
            ))}

            {/* Typing indicator */}
            {showTyping && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="flex justify-start"
              >
                <div className="px-4 py-3 rounded-2xl bg-white/[0.06] border border-white/10 rounded-tl-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                    style={{ animationDelay: '0.15s' }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                    style={{ animationDelay: '0.3s' }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/10 flex items-center gap-2">
          <div className="flex-1 px-3.5 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white/35">
            Type your message…
          </div>
          <button
            type="button"
            className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center hover:bg-brand-glow transition-colors"
            aria-label="Send message"
          >
            <ArrowRight className="w-4 h-4 text-navy-deep" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   Chat Bubble
   ============================================================ */

interface ChatBubbleProps {
  sender: 'bot' | 'user';
  children: React.ReactNode;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ sender, children }) => {
  const isBot = sender === 'bot';
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`
          max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed
          ${
            isBot
              ? 'bg-white/[0.06] border border-white/10 text-white/80 rounded-tl-sm'
              : 'bg-brand text-navy-deep font-medium rounded-tr-sm'
          }
        `}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default CTASection;