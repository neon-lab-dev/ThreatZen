import React from 'react';
import BlogCard from '../BlogPage/BlogCard';

const popularPosts = [
  {
    id: 1,
    category: 'Threat Intelligence',
    title: 'The 2025 Ransomware Playbook for Indian Enterprises',
    author: 'Priya Sharma',
    authorInitials: 'PS',
    date: 'Dec 18, 2025',
    readTime: '8 min read',
    excerpt: '',
  },
  {
    id: 2,
    category: 'Compliance',
    title: 'DPDP 2023 Final Rules: Complete Compliance Checklist',
    author: 'Kavita Nair',
    authorInitials: 'KN',
    date: 'Dec 14, 2025',
    readTime: '9 min read',
    excerpt: '',
  },
  {
    id: 3,
    category: 'Cyber Insurance',
    title: 'How to Get Better Cyber Insurance Terms in 2026',
    author: 'Rahul Desai',
    authorInitials: 'RD',
    date: 'Dec 12, 2025',
    readTime: '7 min read',
    excerpt: '',
  },
  {
    id: 4,
    category: 'Security Operations',
    title: 'Building a 24/7 SOC Without Breaking the Budget',
    author: 'Vikram Singh',
    authorInitials: 'VS',
    date: 'Dec 8, 2025',
    readTime: '6 min read',
    excerpt: '',
  },
];

const tags = [
  'Ransomware',
  'Zero Trust',
  'Cloud Security',
  'Incident Response',
  'Threat Hunting',
  'Data Privacy',
  'SOC 2',
  'ISO 27001',
  'Penetration Testing',
  'Security Awareness',
];

const MostPopular: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Popular Posts */}
      <div>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Most Popular
        </h3>
        <div className="space-y-1">
          {popularPosts.map((post) => (
            <BlogCard key={post.id} {...post} variant="compact" />
          ))}
        </div>
      </div>

      {/* tags */}
      <div>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-5">
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              className="px-3 py-1.5 rounded-lg bg-[var(--surface)] text-xs font-medium text-muted-foreground hover:bg-navy hover:text-white transition-all duration-200"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostPopular;