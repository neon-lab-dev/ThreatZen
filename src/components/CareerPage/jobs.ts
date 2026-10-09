// components/CareerPage/jobs.ts
export interface Job {
  id: string;
  title: string;
  department:
    | 'Engineering'
    | 'Security'
    | 'Compliance'
    | 'Design'
    | 'Sales'
    | 'Marketing'
    | 'Operations';
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experience: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  postedAt: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  perks?: string[];
  urgent?: boolean;
  /** Number of open positions for this role */
  openings?: number;
}

export const jobs: Job[] = [
  {
    id: 'sales-consultant',
    title: 'Sales Consultant',
    department: 'Sales',
    location: 'Bengaluru, India',
    type: 'Full-time',
    experience: '2–6 years',
    workMode: 'Remote',
    postedAt: '2025-01-20',
    openings: 2,
    description:
      'Drive new business for ThreatZen’s cybersecurity and compliance services. You will own the full sales cycle, build relationships with CISOs and CTOs, and help mid-market and enterprise clients navigate their security journey.',
    responsibilities: [
      'Own the full sales cycle from prospecting to close',
      'Build relationships with CISOs, CTOs, and CFOs',
      'Coordinate with delivery teams on proposals and onboarding',
      'Represent ThreatZen at industry events and conferences',
      'Maintain accurate pipeline and forecast data in CRM',
    ],
    requirements: [
      '2+ years in B2B SaaS, IT services, or cybersecurity sales',
      'Track record of meeting or exceeding annual quotas',
      'Strong network in BFSI, healthcare, or regulated industries',
      'Consultative, technical, and coachable',
      'Excellent written and verbal communication',
    ],
    perks: [
      'Attractive commission structure',
      'Travel allowance',
      'Health insurance',
    ],
    urgent: true,
  },
  {
    id: 'cybersecurity-head',
    title: 'Cybersecurity Head',
    department: 'Security',
    location: 'Bengaluru, India',
    type: 'Full-time',
    experience: '10+ years',
    workMode: 'Remote',
    postedAt: '2025-01-15',
    openings: 1,
    description:
      'Lead ThreatZen’s cybersecurity practice — owning strategy, delivery excellence, and team growth. You will set the vision for our SOC, VAPT, and managed security services while serving as a trusted advisor to our enterprise clients.',
    responsibilities: [
      'Define and execute the cybersecurity service strategy',
      'Lead and scale the SOC, VAPT, and consulting teams',
      'Own delivery quality and client satisfaction across all engagements',
      'Serve as executive sponsor on strategic accounts',
      'Represent ThreatZen at industry forums and with regulators',
      'Drive R&D into emerging threats and detection capabilities',
    ],
    requirements: [
      '10+ years in cybersecurity with 4+ years leading teams',
      'Deep expertise in SOC operations, IR, and threat intelligence',
      'Hands-on background in VAPT, cloud security, or red teaming',
      'Experience managing enterprise clients and P&L responsibility',
      'Industry certifications (CISSP, CISM, OSCP, or equivalent)',
      'Strong executive presence and communication skills',
    ],
    perks: [
      'Leadership role with equity potential',
      'Health insurance for family',
      'Conference and certification budget',
      'Hybrid work',
    ],
    urgent: true,
  },
];

export const APPLY_EMAIL = 'contact@threatzen.com';

/** Department options derived from jobs */
export const departments = [
  'All',
  ...Array.from(new Set(jobs.map((j) => j.department))).sort(),
];

/** Simple "x days ago" formatter */
export const timeAgo = (iso: string): string => {
  const days = Math.floor(
    (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24)
  );
  if (days <= 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} wk ago`;
  return `${Math.floor(days / 30)} mo ago`;
};

/** Build the mailto link for a job */
export const buildApplyMailto = (job: Job): string => {
  const subject = `Application for ${job.title} (${job.id})`;
  const body = [
    `Hi ThreatZen Team,`,
    ``,
    `I'd like to apply for the ${job.title} role.`,
    ``,
    `Name:`,
    `Phone:`,
    `Current Location:`,
    `Total Experience:`,
    `LinkedIn / Portfolio:`,
    ``,
    `Please find my resume attached.`,
    ``,
    `Thanks,`,
  ].join('\n');

  return `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
};

/** Total open positions across all jobs */
export const totalOpenings = jobs.reduce(
  (sum, job) => sum + (job.openings ?? 1),
  0
);