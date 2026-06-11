const clients = [
  {
    name: "ALB Stock Broking",
    description:
      "A leading stock brokerage firm handling millions of daily transactions and sensitive financial data.",
    challenge:
      "Vulnerable to cyber threats including DDoS attacks, unauthorized access attempts, and compliance gaps with SEBI cybersecurity norms.",
    solution:
      "Implemented multi-layered security architecture including 24/7 SOC monitoring, advanced endpoint protection, and real-time threat intelligence.",
    results:
      "Zero security breaches | 100% SEBI compliance achieved | 60% faster threat response",
  },
  {
    name: "Restrologic Pvt Ltd",
    description:
      "A fast-growing restaurant management software company serving 500+ restaurants across India.",
    challenge:
      "Customer payment data at risk, weak access controls, and no disaster recovery plan in place.",
    solution:
      "Deployed PCI-DSS compliant payment gateway integration, RBAC implementation, and automated backup systems with ransomware protection.",
    results:
      "PCI-DSS certified | 99.99% data integrity | Zero payment fraud incidents",
  },
  {
    name: "Nirman Share Broking",
    description:
      "An established share broking firm with 50,000+ active retail investors and growing digital footprint.",
    challenge:
      "Phishing attacks targeting customers, unsecured APIs, and lack of employee security awareness.",
    solution:
      "Launched customer awareness campaigns, API security hardening, MFA enforcement, and comprehensive VAPT assessments.",
    results:
      "95% reduction in phishing incidents | ISO 27001 ready | 100% API security coverage",
  },
];

export function Clients() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-sm font-mono font-semibold tracking-widest uppercase text-[var(--brand)] border-b border-[var(--brand)]/30 pb-1">
            Client Work
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real results for real businesses. Here's what we've built together.
          </p>
        </div>

        {/* Client List */}
        <div className="space-y-20">
          {clients.map((client, idx) => (
            <div
              key={client.name}
              className="border-b border-border/60 pb-20 last:border-0 last:pb-0"
            >
              {/* Client Name & Number */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-5xl font-black text-[var(--brand)]">
                  {(idx + 1).toString().padStart(2, "0")}
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  {client.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xl text-muted-foreground max-w-4xl mb-8">
                {client.description}
              </p>

              {/* Challenge & Solution Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-red-500/5 p-6 rounded-2xl border-l-4 border-red-500">
                  <div className="flex items-center gap-2 mb-3">
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span className="font-semibold text-red-500">
                      Challenge
                    </span>
                  </div>
                  <p className="text-muted-foreground">{client.challenge}</p>
                </div>

                <div className="bg-[var(--brand)]/5 p-6 rounded-2xl border-l-4 border-[var(--brand)]">
                  <div className="flex items-center gap-2 mb-3">
                    <svg
                      className="w-5 h-5 text-[var(--brand)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span className="font-semibold text-[var(--brand)]">
                      Our Solution
                    </span>
                  </div>
                  <p className="text-muted-foreground">{client.solution}</p>
                </div>
              </div>

              {/* Results Banner */}
              <div className="bg-foreground/5 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  <span className="font-semibold">Key Results:</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {client.results.split(" | ").map((result) => (
                    <span
                      key={result}
                      className="text-sm font-medium text-[var(--brand)]"
                    >
                      {result}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Selected client work — shared with permission
          </p>
        </div>
      </div>
    </section>
  );
}
