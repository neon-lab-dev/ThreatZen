import React from 'react';

interface BlogCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { name: 'All', count: 24 },
  { name: 'Threat Intelligence', count: 8 },
  { name: 'Compliance', count: 6 },
  { name: 'Cyber Insurance', count: 5 },
  { name: 'Security Operations', count: 5 },
];

const BlogCategories: React.FC<BlogCategoriesProps> = ({ 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onCategoryChange(category.name)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
            ${activeCategory === category.name
              ? 'bg-brand text-navy-deep'
              : 'bg-[var(--surface)] text-muted-foreground hover:bg-muted hover:text-foreground'
            }
          `}
        >
          {category.name}
          <span className={`
            ml-2 text-xs
            ${activeCategory === category.name ? 'text-navy-deep' : 'text-muted-foreground'}
          `}>
            {category.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default BlogCategories;