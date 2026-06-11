const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-32 pb-24">
        <article className="mx-auto max-w-4xl px-4 sm:px-6 prose prose-slate prose-lg">
          <h1 className="text-4xl font-bold tracking-tight">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-muted-foreground border-l-4 border-[var(--brand)] pl-4">
            <strong>Effective Date:</strong> January 1, 2026
            <br />
            <strong>Last Updated:</strong> June 11, 2026
          </p>

          <section id="acceptance">
            <h2 className="mt-10 text-2xl font-semibold">
              1. Acceptance of Terms
            </h2>
            <p className="mt-2">
              By accessing or using the ThreatZen™ website (
              <strong className="text-foreground">www.threatzen.com</strong>),
              services, applications, or platforms (collectively, the "
              <strong>Services</strong>"), you agree to be bound by these Terms
              & Conditions ("<strong>Terms</strong>"). If you do not agree,
              please do not use our Services.
            </p>
            <p className="mt-4">
              These Terms constitute a legally binding agreement between you ("
              <strong>User</strong>", "<strong>you</strong>", or "
              <strong>your</strong>") and ThreatZen, Inc. ("
              <strong>ThreatZen</strong>", "<strong>we</strong>", "
              <strong>us</strong>", or "<strong>our</strong>"). By using our
              Services, you represent that you are at least{" "}
              <strong>18 years old</strong> or accessing under parental/guardian
              supervision.
            </p>
          </section>

          <section id="services">
            <h2 className="mt-10 text-2xl font-semibold">2. Our Services</h2>
            <p className="mt-2">
              ThreatZen provides next-generation cybersecurity solutions
              including but not limited to:
            </p>
            <ul className="mt-2 list-disc pl-6">
              <li>Security assessments and penetration testing</li>
              <li>Threat detection and incident response</li>
              <li>Managed security services (MSSP)</li>
              <li>
                Compliance consulting (GDPR, CCPA, HIPAA, ISO 27001, SOC2)
              </li>
              <li>Security awareness training</li>
              <li>Security orchestration and automation (SOAR)</li>
              <li>Vulnerability management</li>
            </ul>
            <p className="mt-4">
              <strong>Service Agreements:</strong> Specific terms for contracted
              services will be detailed in separate{" "}
              <strong>Master Service Agreements (MSA)</strong>,{" "}
              <strong>Statements of Work (SOW)</strong>, or{" "}
              <strong>Subscription License Agreements</strong>. In case of
              conflict, those agreements take precedence over these general
              Terms.
            </p>
          </section>

          <section id="use">
            <h2 className="mt-10 text-2xl font-semibold">
              3. Acceptable Use Policy
            </h2>
            <p className="mt-2">
              You agree <strong>NOT</strong> to:
            </p>
            <ul className="mt-2 list-disc pl-6">
              <li>
                Use our Services for any illegal, unauthorized, or malicious
                purpose
              </li>
              <li>
                Attempt to bypass, disable, or circumvent any security measures
              </li>
              <li>
                Launch cyberattacks including but not limited to: DDoS, SQL
                injection, XSS, ransomware, or phishing against ThreatZen
                infrastructure
              </li>
              <li>
                Scan, probe, or test our system vulnerabilities without explicit
                written permission
              </li>
              <li>
                Reverse engineer, decompile, or disassemble our software or
                proprietary technology
              </li>
              <li>
                Access data not intended for you or log into a server/account
                you're not authorized to access
              </li>
              <li>
                Interfere with or disrupt the integrity of our Services or data
              </li>
              <li>
                Upload malicious code (viruses, worms, trojans, backdoors, time
                bombs)
              </li>
              <li>
                Use automated scripts (bots, scrapers, crawlers) without prior
                consent
              </li>
              <li>
                Share credentials or allow unauthorized access to your account
              </li>
              <li>
                Submit false or misleading information during inquiries or
                registrations
              </li>
              <li>
                Violate any applicable local, state, national, or international
                laws
              </li>
            </ul>
            <p className="mt-4 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <strong>⚠️ Violation Warning:</strong> Unauthorized scanning,
              penetration attempts, or cyberattacks against ThreatZen will be
              reported to law enforcement under the{" "}
              <strong>Computer Fraud and Abuse Act (CFAA)</strong>,{" "}
              <strong>UK Computer Misuse Act 1990</strong>, and similar global
              cybercrime statutes. We maintain full audit logs and cooperate
              with criminal prosecutions.
            </p>
          </section>

          <section id="ip">
            <h2 className="mt-10 text-2xl font-semibold">
              4. Intellectual Property
            </h2>
            <h3 className="mt-4 text-xl font-medium">4.1 Our IP</h3>
            <p>
              All content on our website and within our Services including but
              not limited to: text, graphics, logos, icons, images, audio clips,
              video clips, source code, software, algorithms, threat
              intelligence feeds, documentation, and trademarks ("
              <strong>ThreatZen IP</strong>") are owned by ThreatZen or its
              licensors and protected by{" "}
              <strong>
                US and international copyright, trademark, patent, and trade
                secret laws
              </strong>
              .
            </p>

            <h3 className="mt-6 text-xl font-medium">4.2 Limited License</h3>
            <p>
              We grant you a{" "}
              <strong>
                non-exclusive, non-transferable, revocable license
              </strong>{" "}
              to access and use our website for personal, informational, or
              internal business purposes. You may not reproduce, distribute,
              modify, create derivative works of, publicly display, or
              commercially exploit any ThreatZen IP without our prior written
              consent.
            </p>

            <h3 className="mt-6 text-xl font-medium">4.3 Trademarks</h3>
            <p>
              "<strong>ThreatZen</strong>", "
              <strong>Next-Gen Cyber Resilience</strong>", the ThreatZen logo,
              and all related marks are registered and unregistered trademarks
              of ThreatZen, Inc. Other product and company names mentioned may
              be trademarks of their respective owners.
            </p>

            <h3 className="mt-6 text-xl font-medium">4.4 User Content</h3>
            <p>
              If you submit feedback, suggestions, or ideas ("
              <strong>User Content</strong>"), you grant ThreatZen an{" "}
              <strong>
                irrevocable, perpetual, royalty-free, worldwide license
              </strong>{" "}
              to use, modify, and incorporate that content without compensation.
              Do not submit confidential or proprietary information unless under
              a separate Non-Disclosure Agreement (NDA).
            </p>
          </section>

          <section id="liability">
            <h2 className="mt-10 text-2xl font-semibold">
              5. Limitation of Liability
            </h2>
            <p className="mt-2">
              <strong>To the maximum extent permitted by law:</strong>
            </p>
            <ul className="mt-2 list-disc pl-6">
              <li>
                ThreatZen shall not be liable for any{" "}
                <strong>
                  indirect, incidental, special, consequential, or punitive
                  damages
                </strong>
                , including loss of profits, data, goodwill, or business
                interruption
              </li>
              <li>
                Our total aggregate liability for any claim arising from these
                Terms or your use of Services shall not exceed{" "}
                <strong>$1,000 USD</strong> or the amount you paid us in the
                past 12 months (whichever is greater)
              </li>
              <li>
                We are not responsible for cybersecurity incidents beyond our
                reasonable control including zero-day exploits, nation-state
                attacks, or vulnerabilities in third-party software/hardware
              </li>
              <li>
                We do not guarantee uninterrupted, error-free, or completely
                secure Services despite reasonable efforts
              </li>
            </ul>
            <p className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
              <strong>Jurisdictional Notice:</strong> Some jurisdictions do not
              allow exclusion of certain warranties or limitation of liability,
              so these limitations may not apply to you. This does not limit
              liability for fraud, death, or personal injury caused by our
              negligence.
            </p>
          </section>

          <section id="indemnification">
            <h2 className="mt-10 text-2xl font-semibold">6. Indemnification</h2>
            <p className="mt-2">
              You agree to <strong>indemnify, defend, and hold harmless</strong>{" "}
              ThreatZen, its officers, directors, employees, agents, and
              affiliates from any claims, damages, losses, liabilities, costs,
              or expenses (including reasonable legal fees) arising from:
            </p>
            <ul className="mt-2 list-disc pl-6">
              <li>Your violation of these Terms</li>
              <li>Your violation of applicable laws or third-party rights</li>
              <li>Your misuse of our Services</li>
              <li>
                Any malicious activity originating from your IP address or
                account (including compromised credentials)
              </li>
            </ul>
          </section>

          <section id="termination">
            <h2 className="mt-10 text-2xl font-semibold">7. Termination</h2>
            <p className="mt-2">
              We reserve the right to <strong>suspend or terminate</strong> your
              access to our Services{" "}
              <strong>immediately and without notice</strong> if we believe you
              have violated these Terms or engaged in harmful conduct. Upon
              termination:
            </p>
            <ul className="mt-2 list-disc pl-6">
              <li>Your right to use Services ceases immediately</li>
              <li>
                We may delete or de-identify your data, unless retention is
                required by law
              </li>
              <li>
                Sections on Intellectual Property, Limitation of Liability,
                Indemnification, and Governing Law survive termination
              </li>
            </ul>
          </section>

          <section id="governing-law">
            <h2 className="mt-10 text-2xl font-semibold">
              8. Governing Law & Dispute Resolution
            </h2>
            <h3 className="mt-4 text-xl font-medium">8.1 Governing Law</h3>
            <p>
              These Terms are governed by the laws of the{" "}
              <strong>State of Texas</strong> and the{" "}
              <strong>United States of America</strong>, without regard to
              conflict of law principles. The{" "}
              <strong>
                United Nations Convention on Contracts for the International
                Sale of Goods (CISG)
              </strong>{" "}
              does not apply.
            </p>

            <h3 className="mt-6 text-xl font-medium">8.2 Dispute Resolution</h3>
            <p>
              Any dispute arising from these Terms shall first be attempted to
              resolve through <strong>good-faith negotiation</strong>. If
              unresolved within 30 days, the dispute shall be submitted to{" "}
              <strong>binding arbitration</strong> administered by the{" "}
              <strong>American Arbitration Association (AAA)</strong> in{" "}
              <strong>Austin, Texas</strong>, under its Commercial Arbitration
              Rules. Judgment on the arbitration award may be entered in any
              court having jurisdiction.
            </p>

            <p className="mt-4">
              <strong>Exceptions:</strong> Either party may seek{" "}
              <strong>injunctive relief</strong> in a court of competent
              jurisdiction to protect intellectual property or confidential
              information without arbitration.
            </p>

            <h3 className="mt-6 text-xl font-medium">
              8.3 Class Action Waiver
            </h3>
            <p>
              <strong>
                YOU AGREE TO ARBITRATE DISPUTES ON AN INDIVIDUAL BASIS ONLY AND
                WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION, COLLECTIVE
                ACTION, OR REPRESENTATIVE PROCEEDING.
              </strong>
            </p>
          </section>

          <section id="disclaimer">
            <h2 className="mt-10 text-2xl font-semibold">
              9. Disclaimer of Warranties
            </h2>
            <p className="mt-2">
              <strong>
                YOUR USE OF OUR SERVICES IS AT YOUR SOLE RISK. OUR SERVICES ARE
                PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY
                KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </strong>
            </p>
            <ul className="mt-2 list-disc pl-6">
              <li>Merchantability or fitness for a particular purpose</li>
              <li>Non-infringement of third-party rights</li>
              <li>Uninterrupted, secure, or error-free operation</li>
              <li>
                That our security measures will prevent all cyberattacks or data
                breaches
              </li>
              <li>
                That threats, vulnerabilities, or compliance gaps will be
                completely identified
              </li>
            </ul>
            <p className="mt-4">
              Our content is for{" "}
              <strong>general informational purposes only</strong> and does not
              constitute professional security, legal, or compliance advice. You
              should consult qualified professionals before making decisions
              based on our content.
            </p>
          </section>
        </article>
      </main>
      ]
    </div>
  );
};

export default TermsAndConditions;
