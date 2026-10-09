// pages/Career.tsx
import React, { useMemo, useState } from 'react';
import CareerHero from '../components/CareerPage/CareerHero';
import CareerFilters from '../components/CareerPage/CareerFilters';
import JobsList from '../components/CareerPage/JobsList';
import CareerEmptyState from '../components/CareerPage/CareerEmptyState';
import CareerCTA from '../components/CareerPage/CareerCTA';
import { jobs } from '../components/CareerPage/jobs';

const Career: React.FC = () => {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [workMode, setWorkMode] = useState<'All' | 'Remote' | 'Hybrid' | 'On-site'>('All');

  const filteredJobs = useMemo(() => {
    let result = jobs;

    if (department !== 'All') {
      result = result.filter((j) => j.department === department);
    }

    if (workMode !== 'All') {
      result = result.filter((j) => j.workMode === workMode);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.department.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [search, department, workMode]);

  return (
    <div className="min-h-screen bg-background">
      <CareerHero totalOpenings={jobs.length} />

      <section id="openings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Section heading */}
        <div className="max-w-3xl mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-brand" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand">
              Open Positions
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-[1.12]">
            Find your next role at <span className="text-brand">ThreatZen</span>
          </h2>
          <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
            We're hiring across engineering, security, compliance, and operations.
            Every role is fully remote-friendly or Bengaluru-based.
          </p>
        </div>

        {/* Filters */}
        <CareerFilters
          search={search}
          onSearchChange={setSearch}
          department={department}
          onDepartmentChange={setDepartment}
          workMode={workMode}
          onWorkModeChange={setWorkMode}
          total={jobs.length}
          filtered={filteredJobs.length}
        />

        {/* List */}
        <div className="mt-8">
          {filteredJobs.length === 0 ? (
            <CareerEmptyState />
          ) : (
            <JobsList jobs={filteredJobs} />
          )}
        </div>
      </section>

      <CareerCTA />
    </div>
  );
};

export default Career;