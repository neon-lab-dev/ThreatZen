// components/SecurityServicesPage/SecurityFAQ.tsx
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: 'What are the common types of cyber threats that businesses face?',
    a: 'Businesses face threats such as phishing attacks, ransomware, malware, insider threats, and DDoS attacks. At ThreatZen, we help identify and mitigate these risks with proactive strategies.',
  },
  {
    q: 'Do you provide end-to-end cybersecurity solutions?',
    a: 'Yes. From risk assessments and vulnerability testing to incident response and compliance, we offer a complete suite of cybersecurity services tailored to your environment.',
  },
  {
    q: 'Which industries are most at risk of cyberattacks?',
    a: 'Finance, healthcare, legal, manufacturing, and technology face the highest risk — but any organization holding sensitive data is a target. We tailor our approach to your specific industry and regulatory landscape.',
  },
  {
    q: 'How long does a typical cybersecurity assessment take?',
    a: 'Most assessments complete within 2 to 4 weeks, depending on scope and system complexity. Our team delivers a prioritized remediation roadmap at the end of the engagement.',
  },
  {
    q: 'Do you offer vulnerability assessments and penetration testing?',
    a: 'Yes. Our VAPT services cover network, web, mobile, and cloud environments. Findings are mapped to MITRE ATT&CK and delivered with impact-ranked remediation guidance.',
  },
  {
    q: 'Can you work with our existing IT or security team?',
    a: 'Absolutely. We frequently augment internal teams — providing specialist depth in areas like threat hunting, compliance, incident response, and security architecture.',
  },
  {
    q: 'What cybersecurity frameworks and standards do you follow?',
    a: 'We align with ISO 27001, SOC 2, NIST CSF, CIS Controls, DPDP Act 2023, GDPR, HIPAA, PCI DSS, and SEBI CSCRF. Our team maps controls across frameworks to reduce duplication.',
  },
  {
    q: 'Do you provide post-incident response support?',
    a: 'Yes. Our Cyber Force pod activates within 60 minutes of escalation — coordinating forensics, legal, insurer, and communications teams to contain incidents and accelerate recovery.',
  },
];

const SecurityFAQ: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? -1 : i);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-20 lg:py-28 overflow-hidden"
    >
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.12] tracking-tight">
            <span className="text-foreground">Frequently Asked </span>
            <span className="text-brand">Questions</span>
          </h2>
        </motion.div>

        {/* FAQ list */}
        <div className="space-y-1">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border-b border-muted"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                >
                  <span
                    className={`
                      text-base lg:text-lg font-semibold leading-snug
                      transition-colors duration-200
                      ${isOpen ? 'text-foreground' : 'text-foreground/80 group-hover:text-foreground'}
                    `}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`
                      flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5
                      transition-all duration-300
                      ${
                        isOpen
                          ? 'bg-brand text-navy-deep rotate-180'
                          : 'bg-[var(--surface)] text-muted-foreground group-hover:bg-brand/10 group-hover:text-brand'
                      }
                    `}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-sm lg:text-base text-muted-foreground leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SecurityFAQ;