// components/DashboardBlogs/BlogsToolbar.tsx
import React from 'react';
import { Search, Filter } from 'lucide-react';

interface BlogsToolbarProps {
  search: string;
  onSearchChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  categories: string[];
  total: number;
  filtered: number;
}

const BlogsToolbar: React.FC<BlogsToolbarProps> = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  total,
  filtered,
}) => {
  const isFiltering =
    search.trim().length > 0 || category !== 'All';

  return (
    <div
      className="
        rounded-2xl border border-muted bg-white
        p-4 sm:p-5
        flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4
      "
    >
      {/* Search */}
      <div className="relative flex-1 min-w-0">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, slug, or tag…"
          className="
            w-full pl-10 pr-4 py-2.5
            rounded-xl bg-[var(--surface)] border border-muted
            text-sm text-foreground placeholder:text-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand
            transition-all
          "
        />
      </div>

      {/* Category filter */}
      <div className="relative flex items-center gap-2 flex-shrink-0">
        <div className="relative">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="
              pl-9 pr-9 py-2.5
              rounded-xl bg-[var(--surface)] border border-muted
              text-sm font-medium text-foreground
              appearance-none cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand
              transition-all
              min-w-[160px]
            "
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Categories' : c}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* Count */}
      <div className="text-xs text-muted-foreground whitespace-nowrap self-start lg:self-auto lg:pl-2">
        {isFiltering ? (
          <>
            <span className="font-semibold text-foreground">{filtered}</span>
            {' of '}
            <span>{total}</span>
            {' shown'}
          </>
        ) : (
          <>
            <span className="font-semibold text-foreground">{total}</span>
            {' total'}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogsToolbar;