// components/BlogPage/BlogGrid.tsx
import React, { useEffect, useMemo, useState } from "react";
import BlogCard from "./BlogCard";
import BlogCategories from "./BlogCategories";
import { blogApi, type Blog } from "../../lib/blogApi";

interface BlogGridProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const BlogGrid: React.FC<BlogGridProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  /* ===== Fetch blogs on mount ===== */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await blogApi.getAllBlogs();
        if (!cancelled) {
          setBlogs(res.data ?? []);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError("Failed to load articles. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ===== Build dynamic category list from fetched blogs ===== */
  const categories = useMemo(() => {
    const counts = new Map<string, number>();

    blogs.forEach((post) => {
      const c = post.category?.trim();
      if (!c) return;
      counts.set(c, (counts.get(c) ?? 0) + 1);
    });

    // Alphabetical order for stability
    const sorted = Array.from(counts.entries()).sort((a, b) =>
      a[0].localeCompare(b[0]),
    );

    return [
      { name: "All", count: blogs.length },
      ...sorted.map(([name, count]) => ({ name, count })),
    ];
  }, [blogs]);

  /* ===== Filter by category + search ===== */
  const filteredPosts = useMemo(() => {
    let result = blogs;

    if (activeCategory !== "All") {
      result = result.filter((post) => post.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.shortDescription?.toLowerCase().includes(q) ||
          post.category.toLowerCase().includes(q) ||
          (post.tags ?? []).some((t) => t.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [blogs, activeCategory, search]);

  /* ===== Format date helper ===== */
  const formatDate = (iso?: string) => {
    if (!iso) return "";
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-muted">
        {/* Category Filter — full width on mobile, flexible on desktop */}
        <div className="w-full lg:flex-1 min-w-0">
          <BlogCategories
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>

        {/* Search — full width on mobile, fixed-ish on desktop */}
        <div className="w-full lg:w-auto lg:flex-shrink-0">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full lg:w-72 px-4 py-2.5 pl-11 rounded-xl bg-[var(--surface)] border border-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)] transition-all"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between mt-4 mb-8">
        <h2 className="text-xl font-semibold text-foreground">
          {activeCategory === "All" ? "Latest Articles" : activeCategory}
        </h2>
        <span className="text-sm text-muted-foreground">
          {loading ? "Loading…" : `${filteredPosts.length} articles`}
        </span>
      </div>

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-7 h-7 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            Something went wrong
          </h3>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-[var(--navy)] text-white text-sm font-medium hover:bg-[var(--navy-deep)] transition-colors"
          >
            Try again
          </button>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && filteredPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard
              key={post._id}
              category={post.category}
              title={post.title}
              excerpt={post.shortDescription}
              author=""
              authorInitials=""
              date={formatDate(post.createdAt)}
              readTime={post.readTime}
              image={post.imageUrl}
              slug={post.slug}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-[var(--surface)] flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-7 h-7 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No articles found
          </h3>
          <p className="text-sm text-muted-foreground">
            {search
              ? "Try a different search term or category"
              : "Try selecting a different category"}
          </p>
        </div>
      )}
    </div>
  );
};

/* ===== Loading Skeleton Card ===== */
const SkeletonCard: React.FC = () => (
  <div className="bg-white rounded-2xl border border-muted overflow-hidden animate-pulse">
    <div className="aspect-[16/9] bg-[var(--surface)]" />
    <div className="p-6 space-y-3">
      <div className="h-5 bg-[var(--surface)] rounded w-4/5" />
      <div className="h-5 bg-[var(--surface)] rounded w-3/5" />
      <div className="h-4 bg-[var(--surface)] rounded w-full mt-4" />
      <div className="h-4 bg-[var(--surface)] rounded w-2/3" />
      <div className="pt-5 border-t border-muted flex justify-between items-center">
        <div className="h-3 bg-[var(--surface)] rounded w-20" />
        <div className="h-3 bg-[var(--surface)] rounded w-16" />
      </div>
    </div>
  </div>
);

export default BlogGrid;
