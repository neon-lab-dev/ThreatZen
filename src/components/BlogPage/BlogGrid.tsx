import React from 'react';
import BlogCard from './BlogCard';
import BlogCategories from './BlogCategories';

interface BlogGridProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const blogPosts = [
  {
    id: 1,
    category: 'Threat Intelligence',
    title: 'Inside a Live SOC: How We Detected a Supply Chain Attack in 4 Minutes',
    excerpt: 'A detailed walkthrough of a real incident where our 24/7 SOC identified and contained a sophisticated supply chain compromise before it spread.',
    author: 'Arjun Mehta',
    authorInitials: 'AM',
    date: 'Dec 16, 2025',
    readTime: '6 min read',
  },
  {
    id: 2,
    category: 'Compliance',
    title: 'DPDP 2023: What Changed in the Final Rules and What It Means for Your Business',
    excerpt: 'The long-awaited final rules are here. We break down the key changes and provide a practical compliance checklist for Indian enterprises.',
    author: 'Kavita Nair',
    authorInitials: 'KN',
    date: 'Dec 14, 2025',
    readTime: '9 min read',
  },
  {
    id: 3,
    category: 'Cyber Insurance',
    title: 'Why Insurers Are Now Asking for Your SOC 2 Report (And How to Prepare)',
    excerpt: 'The cyber insurance market has hardened. We explain the new underwriting requirements and how to position your security posture for better terms.',
    author: 'Rahul Desai',
    authorInitials: 'RD',
    date: 'Dec 12, 2025',
    readTime: '7 min read',
  },
  {
    id: 4,
    category: 'Threat Intelligence',
    title: 'The Rise of AI-Powered Phishing: Detection Strategies That Actually Work',
    excerpt: 'AI-generated phishing emails now bypass traditional filters. Here are the detection techniques and user training approaches that are proving effective.',
    author: 'Priya Sharma',
    authorInitials: 'PS',
    date: 'Dec 10, 2025',
    readTime: '5 min read',
  },
  {
    id: 5,
    category: 'Security Operations',
    title: 'MTTD vs MTTR: Which Metric Actually Matters for Your Security Program?',
    excerpt: 'Everyone tracks mean time to detect and respond. But which one drives better outcomes? We analyzed data from 500+ incidents to find out.',
    author: 'Vikram Singh',
    authorInitials: 'VS',
    date: 'Dec 8, 2025',
    readTime: '6 min read',
  },
  {
    id: 6,
    category: 'Compliance',
    title: 'ISO 27001:2022 Transition: A Practical Guide for Indian Organizations',
    excerpt: 'The transition deadline is approaching. Here is your complete roadmap for migrating from the 2013 to the 2022 version of the standard.',
    author: 'Ananya Reddy',
    authorInitials: 'AR',
    date: 'Dec 6, 2025',
    readTime: '11 min read',
  },
  {
    id: 7,
    category: 'Cyber Insurance',
    title: 'Ransomware Claims: What Actually Happens After You File',
    excerpt: 'A step-by-step breakdown of the claims process, from first notification to final settlement, based on our experience with 200+ incidents.',
    author: 'Rahul Desai',
    authorInitials: 'RD',
    date: 'Dec 4, 2025',
    readTime: '8 min read',
  },
  {
    id: 8,
    category: 'Security Operations',
    title: 'Building a Threat Hunting Program from Scratch: Lessons from the Field',
    excerpt: 'Threat hunting sounds great in theory. Here is how to build a practical program that delivers value from day one, even with limited resources.',
    author: 'Arjun Mehta',
    authorInitials: 'AM',
    date: 'Dec 2, 2025',
    readTime: '10 min read',
  },
];

const BlogGrid: React.FC<BlogGridProps> = ({ activeCategory, onCategoryChange }) => {
  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div>
      <div className='flex items-center justify-between pb-8 border-b border-muted'>
        {/* Category Filter */}
      <BlogCategories 
        activeCategory={activeCategory} 
        onCategoryChange={onCategoryChange} 
      />
       {/* Search */}
      <div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            className=" px-4 py-3 pl-11 rounded-xl bg-[var(--surface)] border border-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)] transition-all"
          />
          <svg 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
      </div>
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-foreground">
          {activeCategory === 'All' ? 'Latest Articles' : activeCategory}
        </h2>
        <span className="text-sm text-muted-foreground">
          {filteredPosts.length} articles
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-[var(--surface)] flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No articles found</h3>
          <p className="text-sm text-muted-foreground">
            Try selecting a different category
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogGrid;