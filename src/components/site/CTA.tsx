import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-hero text-white p-10 lg:p-16 text-center">
          <div aria-hidden className="absolute inset-0 cyber-grid opacity-30" />
          <div aria-hidden className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full" style={{ background: "var(--gradient-glow)" }} />
          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Ready to strengthen your security posture?</h2>
            <p className="mt-4 text-white/75 text-lg">Get a complimentary security assessment from our senior consultants.</p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--brand)] hover:bg-[var(--brand-glow)] text-[var(--navy-deep)] px-7 py-4 text-sm font-semibold shadow-brand transition-all hover:-translate-y-0.5">
              Book Consultation <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
