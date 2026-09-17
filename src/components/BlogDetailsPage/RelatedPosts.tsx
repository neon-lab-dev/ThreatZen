import React from 'react';
import BlogCard from '../BlogPage/BlogCard';

const relatedPosts = [
  {
    id: 1,
    category: 'Threat Intelligence',
    title: 'Inside a Live SOC: How We Detected a Supply Chain Attack in 4 Minutes',
    excerpt: 'A detailed walkthrough of a real incident where our 24/7 SOC identified and contained a sophisticated supply chain compromise.',
    author: 'Arjun Mehta',
    authorInitials: 'AM',
    date: 'Dec 16, 2025',
    readTime: '6 min read',
  },
  {
    id: 2,
    category: 'Security Operations',
    title: 'MTTD vs MTTR: Which Metric Actually Matters for Your Security Program?',
    excerpt: 'Everyone tracks mean time to detect and respond. But which one drives better outcomes? We analyzed data from 500+ incidents.',
    author: 'Vikram Singh',
    authorInitials: 'VS',
    date: 'Dec 8, 2025',
    readTime: '6 min read',
  },
  {
    id: 3,
    category: 'Cyber Insurance',
    title: 'Ransomware Claims: What Actually Happens After You File',
    excerpt: 'A step-by-step breakdown of the claims process, from first notification to final settlement, based on 200+ incidents.',
    author: 'Rahul Desai',
    authorInitials: 'RD',
    date: 'Dec 4, 2025',
    readTime: '8 min read',
  },
];

const RelatedPosts: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-foreground">
          Related Articles
        </h2>
        <a 
          href="/blogs" 
          className="text-sm font-medium text-navy hover:text-brand transition-colors inline-flex items-center gap-1"
        >
          View all
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;