import React, { useState } from "react";
import BlogHero from "../components/BlogPage/BlogHero";
import BlogGrid from "../components/BlogPage/BlogGrid";

const Blogs: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  return (
    <div className="min-h-screen bg-background">
      <BlogHero />

      <div
        id="blogs"
        className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16 border-t border-muted"
      >
        <BlogGrid
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>
    </div>
  );
};

export default Blogs;
