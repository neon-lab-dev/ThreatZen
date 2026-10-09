// components/CareerPage/JobCard.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Briefcase,
  Clock,
  ChevronDown,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { type Job, timeAgo, buildApplyMailto } from './jobs';

interface JobCardProps {
  job: Job;
  index: number;
}

const JobCard: React.FC<JobCardProps> = ({ job, index }) => {
  const [open, setOpen] = useState(false);

  const mailto = buildApplyMailto(job);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.5,
        delay: (index % 6) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        rounded-2xl bg-white border border-muted
        hover:border-brand/40
        transition-all duration-300
        overflow-hidden
      "
    >
      {/* Header row */}
      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* Left: title + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex px-2.5 py-1 rounded-md bg-brand/10 text-brand text-[10px] font-semibold tracking-wide uppercase">
                {job.department}
              </span>
              {job.urgent && (
                <span className="inline-flex px-2.5 py-1 rounded-md bg-red-50 text-red-500 border border-red-100 text-[10px] font-semibold tracking-wide uppercase">
                  Urgent
                </span>
              )}
              <span className="text-[11px] text-muted-foreground">
                Posted {timeAgo(job.postedAt)}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug mb-3">
              {job.title}
            </h3>

            {/* Meta pills */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand/70" />
                {job.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-brand/70" />
                {job.type} · {job.experience}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand/70" />
                {job.workMode}
              </span>
            </div>
          </div>

          {/* Right: Apply button */}
          <div className="flex-shrink-0">
            <a
              href={mailto}
              className="
                inline-flex items-center justify-center gap-2
                px-5 py-2.5 rounded-xl
                bg-brand text-navy-deep
                text-sm font-semibold
                shadow-[0_0_0_0_rgba(76,192,138,0.5)]
                hover:shadow-[0_0_30px_-4px_rgba(76,192,138,0.6)]
                hover:-translate-y-0.5
                transition-all duration-300
                w-full sm:w-auto
              "
            >
              <Mail className="w-4 h-4" />
              Apply Now
            </a>
          </div>
        </div>

        {/* Short description */}
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          {job.description}
        </p>

        {/* Expand toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="
            mt-4 inline-flex items-center gap-1.5
            text-xs font-semibold text-brand
            hover:text-brand-glow transition-colors
          "
        >
          {open ? 'Show less' : 'View full details'}
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Expanded details */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-6 border-t border-muted pt-5 space-y-6">
              {/* Responsibilities */}
              <div>
                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-4 h-px bg-brand" />
                  Responsibilities
                </h4>
                <ul className="space-y-2">
                  {job.responsibilities.map((r, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand mt-0.5 flex-shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-4 h-px bg-brand" />
                  Requirements
                </h4>
                <ul className="space-y-2">
                  {job.requirements.map((r, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand mt-0.5 flex-shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Perks */}
              {job.perks && job.perks.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-4 h-px bg-brand" />
                    What we offer
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {job.perks.map((p) => (
                      <span
                        key={p}
                        className="px-3 py-1 rounded-full text-[11px] font-medium bg-brand/10 text-brand border border-brand/20"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Apply CTA */}
              <div className="pt-4 border-t border-muted flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  Send your resume to{' '}
                  <span className="font-semibold text-foreground">
                    contact@threatzen.com
                  </span>{' '}
                  with the subject line pre-filled.
                </p>
                <a
                  href={mailto}
                  className="
                    inline-flex items-center justify-center gap-2
                    px-5 py-2.5 rounded-xl
                    bg-navy text-white
                    text-sm font-semibold
                    hover:bg-navy-deep
                    transition-colors
                    whitespace-nowrap
                    self-start sm:self-auto
                  "
                >
                  <Mail className="w-4 h-4" />
                  Apply via Email
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default JobCard;