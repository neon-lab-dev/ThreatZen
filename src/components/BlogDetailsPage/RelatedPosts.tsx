// components/BlogDetailsPage/RelatedPosts.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../BlogPage/BlogCard';
import { blogApi, type Blog } from '../../lib/blogApi';

interface RelatedPostsProps {
  /** Category of the current article — we filter by this */
  category: string;
  /** Slug of the current article — excluded from the results */
  currentSlug?: string;
  /** Optional: how many to show. Defaults to 3 */
  limit?: number;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({
  category,
  currentSlug,
  limit = 3,
}) => {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ===== Fetch all blogs once ===== */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await blogApi.getAllBlogs();
        if (!cancelled) {
          setPosts(res.data ?? []);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setError('Failed to load related articles.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ===== Filter by category, exclude current, cap at `limit` ===== */
  const relatedPosts = useMemo(() => {
    return posts
      .filter((post) => post.category === category)
      .filter((post) => post.slug !== currentSlug)
      .slice(0, limit);
  }, [posts, category, currentSlug, limit]);

  /* ===== Date formatter ===== */
  const formatDate = (iso?: string) => {
    if (!iso) return '';
    try {
      return new Date(iso).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  /* ===== Hide section if nothing to show and not loading ===== */
  if (!loading && !error && relatedPosts.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-foreground">
          Related Articles
        </h2>
        <Link
          to="/blogs"
          className="text-sm font-medium text-navy hover:text-brand transition-colors inline-flex items-center gap-1"
        >
          View all
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: limit }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="text-center py-10 rounded-2xl border border-muted bg-[var(--surface)]/50">
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      )}

      {/* Cards */}
      {!loading && !error && relatedPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPosts.map((post) => (
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
    </div>
  );
};

/* ===== Loading skeleton ===== */
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

export default RelatedPosts;