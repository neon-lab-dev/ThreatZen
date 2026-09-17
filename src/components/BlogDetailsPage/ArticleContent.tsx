import React from 'react';

const ArticleContent: React.FC = () => {
  return (
    <div className="prose prose-lg max-w-none">
      {/* Lead Paragraph */}
      <p className="text-xl text-muted-foreground leading-relaxed mb-8">
        When a Fortune 500 manufacturing company in Pune discovered ransomware on a Friday evening, 
        they had a choice: pay the $2.4M demand or lose three weeks of production. They chose neither. 
        Here's how they recovered in 72 hours.
      </p>

      {/* Section */}
      <h2 id="the-landscape" className="text-2xl font-bold text-foreground mt-12 mb-6 scroll-mt-24">
        The 2025 Threat Landscape
      </h2>

      <p className="text-foreground leading-relaxed mb-6">
        Ransomware has evolved from a nuisance to an existential threat for Indian enterprises. 
        Our analysis of 200+ incidents over the past 18 months reveals three critical shifts:
      </p>

      <ul className="space-y-3 mb-8">
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] mt-2.5 flex-shrink-0" />
          <span className="text-foreground">
            <strong className="font-semibold">Double extortion is now standard.</strong> Attackers steal data first, 
            then encrypt, ensuring leverage even if backups exist.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] mt-2.5 flex-shrink-0" />
          <span className="text-foreground">
            <strong className="font-semibold">Initial access takes hours, not days.</strong> Compromised credentials 
            from infostealer malware remain the #1 vector, appearing on dark web markets within 24 hours.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] mt-2.5 flex-shrink-0" />
          <span className="text-foreground">
            <strong className="font-semibold">Recovery without payment is possible.</strong> Organizations with 
            mature backup strategies and incident response plans recovered in under 5 days on average.
          </span>
        </li>
      </ul>

      {/* Callout Box */}
      <div className="bg-[var(--surface)] border-l-4 border-[var(--brand)] rounded-r-xl p-6 my-10">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--brand)]/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Key Finding</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Organizations that conducted regular tabletop exercises recovered 3.2x faster than those 
              that didn't. The investment in preparation pays for itself many times over.
            </p>
          </div>
        </div>
      </div>

      {/* Another Section */}
      <h2 id="the-playbook" className="text-2xl font-bold text-foreground mt-12 mb-6 scroll-mt-24">
        The Resilience Playbook
      </h2>

      <p className="text-foreground leading-relaxed mb-6">
        Based on our analysis, here are the five pillars that consistently separated resilient 
        organizations from those that struggled:
      </p>

      <h3 id="pillar-1" className="text-lg font-semibold text-foreground mt-8 mb-4 scroll-mt-24">
        1. Assume Breach Mentality
      </h3>

      <p className="text-foreground leading-relaxed mb-6">
        The most resilient organizations don't ask "if" they'll be breached — they ask "when" and "how 
        will we know." This shift in mindset drives investment in detection capabilities, not just prevention.
      </p>

      <h3 id="pillar-2" className="text-lg font-semibold text-foreground mt-8 mb-4 scroll-mt-24">
        2. Segmented, Tested Backups
      </h3>

      <p className="text-foreground leading-relaxed mb-6">
        3-2-1 backup strategies are table stakes. The differentiator is regular restoration testing. 
        We found that 40% of organizations had never tested a full restore before an actual incident.
      </p>

      {/* Code/Technical Block */}
      <div className="bg-navy-deep rounded-xl p-6 my-8 overflow-x-auto">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <pre className="text-sm text-white/80 font-mono">
          <code>{`# Backup verification checklist
1. Immutable backup storage configured
2. Air-gapped copy in separate region
3. Restoration tested within last 30 days
4. Recovery time objective (RTO) documented
5. Recovery point objective (RPO) < 1 hour`}</code>
        </pre>
      </div>

      {/* Continue with more sections... */}
      <h3 id="pillar-3" className="text-lg font-semibold text-foreground mt-8 mb-4 scroll-mt-24">
        3. 24/7 Detection and Response
      </h3>

      <p className="text-foreground leading-relaxed mb-6">
        The average dwell time — from initial compromise to detection — was 11 days for organizations 
        without 24/7 monitoring, compared to 4.2 hours for those with a dedicated SOC.
      </p>

      <blockquote className="border-l-4 border-navy pl-6 my-8 italic text-muted-foreground">
        "The difference between a minor incident and a catastrophic breach often comes down to 
        how quickly you detect and contain. Every hour matters."
        <footer className="mt-3 not-italic text-sm font-medium text-foreground">
          — Vikram Singh, SOC Director
        </footer>
      </blockquote>

      <h3 id="pillar-4" className="text-lg font-semibold text-foreground mt-8 mb-4 scroll-mt-24">
        4. Coordinated Response
      </h3>

      <p className="text-foreground leading-relaxed mb-6">
        Ransomware response involves security, legal, communications, and insurance teams. Organizations 
        with pre-established response bridges contained incidents 4x faster.
      </p>

      <h3 id="pillar-5" className="text-lg font-semibold text-foreground mt-8 mb-4 scroll-mt-24">
        5. Financial Protection
      </h3>

      <p className="text-foreground leading-relaxed mb-6">
        Cyber insurance doesn't prevent attacks, but it provides the financial runway to make 
        decisions based on business logic rather than cash constraints.
      </p>

      {/* Conclusion */}
      <h2 id="conclusion" className="text-2xl font-bold text-foreground mt-12 mb-6 scroll-mt-24">
        The Bottom Line
      </h2>

      <p className="text-foreground leading-relaxed mb-6">
        Ransomware resilience isn't about any single technology or process. It's about building 
        defense in depth across people, process, and technology — and then testing it relentlessly.
      </p>

      <p className="text-foreground leading-relaxed">
        The organizations that recover quickly aren't lucky. They're prepared. And in 2025, 
        preparation is the only variable you can control.
      </p>
    </div>
  );
};

export default ArticleContent;