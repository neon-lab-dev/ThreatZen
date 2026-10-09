// components/CareerPage/CareerEmptyState.tsx
import React from 'react';
import { Search, Mail } from 'lucide-react';

const CareerEmptyState: React.FC = () => {
  return (
    <div className="rounded-2xl border border-muted bg-white py-14 px-6 text-center">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--surface)] flex items-center justify-center mb-5">
        <Search className="w-7 h-7 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        No roles match your filters
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
        Try adjusting your filters, or send us a general application — we're
        always looking for talented people.
      </p>
      <a
        href="mailto:contact@threatzen.com?subject=General%20Application"
        className="
          inline-flex items-center gap-2
          px-5 py-2.5 rounded-xl
          bg-navy text-white text-sm font-semibold
          hover:bg-navy-deep transition-colors
        "
      >
        <Mail className="w-4 h-4" />
        Send a General Application
      </a>
    </div>
  );
};

export default CareerEmptyState;