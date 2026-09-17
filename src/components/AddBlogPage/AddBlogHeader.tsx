// components/AddBlogPage/AddBlogHeader.tsx
import React from 'react';

const AddBlogHeader: React.FC = () => {
  return (
    <header className="border-b border-[var(--muted)] bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-6">

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-[var(--foreground)] tracking-tight">
              Create a new article
            </h1>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">
              Write, format, and publish your post in one place.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand)]/10 border border-[var(--brand)]/20">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--brand)] opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--brand)]" />
            </span>
            <span className="text-xs font-medium text-[var(--brand)] tracking-wide uppercase">
              Draft mode
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AddBlogHeader;