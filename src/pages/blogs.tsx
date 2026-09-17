import React, { useState } from "react";
import BlogHero from "../components/BlogPage/BlogHero";
import BlogGrid from "../components/BlogPage/BlogGrid";
import BlogPagination from "../components/BlogPage/BlogPagination";

const Blogs: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div className="min-h-screen bg-background">
      <BlogHero />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Content Grid */}
        <section id="blogs" className="py-12 lg:py-16 border-t border-muted">
          <BlogGrid
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <BlogPagination
            currentPage={currentPage}
            totalPages={8}
            onPageChange={setCurrentPage}
          />
        </section>
      </div>
    </div>
  );
};

export default Blogs;
