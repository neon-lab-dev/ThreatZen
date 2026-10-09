// components/CareerPage/CareerFilters.tsx
import React from 'react';
import { Search, Briefcase, MapPin } from 'lucide-react';
import { departments } from './jobs';

interface CareerFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  department: string;
  onDepartmentChange: (v: string) => void;
  workMode: 'All' | 'Remote' | 'Hybrid' | 'On-site';
  onWorkModeChange: (v: 'All' | 'Remote' | 'Hybrid' | 'On-site') => void;
  total: number;
  filtered: number;
}

const WORK_MODES: ('All' | 'Remote' | 'Hybrid' | 'On-site')[] = [
  'All',
  'Remote',
  'Hybrid',
  'On-site',
];

const CareerFilters: React.FC<CareerFiltersProps> = ({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  workMode,
  onWorkModeChange,
  total,
  filtered,
}) => {
  const isFiltering = search.trim() || department !== 'All' || workMode !== 'All';

  return (
    <div className="rounded-2xl border border-muted bg-white p-4 sm:p-5 space-y-4">
      {/* Search + Selects */}
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search roles, locations, keywords…"
            className="
              w-full pl-10 pr-4 py-2.5
              rounded-xl bg-surface border border-muted
              text-sm text-foreground placeholder:text-muted-foreground
              focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand
              transition-all
            "
          />
        </div>

        {/* Department */}
        <div className="relative flex-shrink-0">
          <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <select
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="
              w-full lg:w-44 pl-9 pr-9 py-2.5
              rounded-xl bg-surface border border-muted
              text-sm font-medium text-foreground
              appearance-none cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand
              transition-all
            "
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d === 'All' ? 'All Departments' : d}
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

        {/* Work mode */}
        <div className="relative flex-shrink-0">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <select
            value={workMode}
            onChange={(e) =>
              onWorkModeChange(e.target.value as typeof workMode)
            }
            className="
              w-full lg:w-36 pl-9 pr-9 py-2.5
              rounded-xl bg-surface border border-muted
              text-sm font-medium text-foreground
              appearance-none cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand
              transition-all
            "
          >
            {WORK_MODES.map((m) => (
              <option key={m} value={m}>
                {m === 'All' ? 'All Modes' : m}
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
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          {isFiltering ? (
            <>
              Showing{' '}
              <span className="font-semibold text-foreground">{filtered}</span> of{' '}
              <span>{total}</span> roles
            </>
          ) : (
            <>
              <span className="font-semibold text-foreground">{total}</span>{' '}
              open roles
            </>
          )}
        </span>

        {isFiltering && (
          <button
            type="button"
            onClick={() => {
              onSearchChange('');
              onDepartmentChange('All');
              onWorkModeChange('All');
            }}
            className="text-brand hover:text-brand-glow font-medium transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
};

export default CareerFilters;