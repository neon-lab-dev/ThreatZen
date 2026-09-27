import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import BlogHero from "../components/BlogPage/BlogHero";
import BlogGrid from "../components/BlogPage/BlogGrid";

const Blogs: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Cybersecurity Blog & Insights | ThreatZen</title>
        <meta
          name="description"
          content="Expert insights on VAPT, ISO 27001, SOC 2, GDPR, DPDP & managed security from ThreatZen. Stay ahead of cyber threats with guides for Indian enterprises."
        />
        <link rel="canonical" href="https://www.threatzen.in/blogs" />
      </Helmet>

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