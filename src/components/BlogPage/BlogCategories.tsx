// components/BlogPage/BlogCategories.tsx
import React from "react";

interface BlogCategoriesProps {
  categories: { name: string; count: number }[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const BlogCategories: React.FC<BlogCategoriesProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div
      className="
        w-full
        -mx-6 px-6 sm:mx-0 sm:px-0
        overflow-x-auto sm:overflow-x-visible
        scrollbar-hide
        [scrollbar-width:none] [-ms-overflow-style:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
      <div className="flex sm:flex-wrap gap-2 w-max sm:w-auto min-w-full sm:min-w-0">
        {categories.map((category) => {
          const isActive = activeCategory === category.name;
          return (
            <button
              key={category.name}
              type="button"
              onClick={() => onCategoryChange(category.name)}
              className={`
                shrink-0
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                transition-all duration-200 cursor-pointer
                ${
                  isActive
                    ? "bg-brand text-navy-deep"
                    : "bg-surface text-muted-foreground hover:bg-muted hover:text-foreground"
                }
              `}
            >
              {category.name}
              <span
                className={`
                  ml-2 text-xs
                  ${isActive ? "text-navy-deep" : "text-muted-foreground"}
                `}
              >
                {category.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BlogCategories;
