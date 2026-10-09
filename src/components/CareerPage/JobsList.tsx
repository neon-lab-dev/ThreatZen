// components/CareerPage/JobsList.tsx
import React from 'react';
import JobCard from './JobCard';
import { type Job } from './jobs';

interface JobsListProps {
  jobs: Job[];
}

const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
  return (
    <div className="space-y-4">
      {jobs.map((job, i) => (
        <JobCard key={job.id} job={job} index={i} />
      ))}
    </div>
  );
};

export default JobsList;