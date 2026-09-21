import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../BlogPage/BlogCard';
import { blogApi, type Blog } from '../../lib/blogApi';

interface MostPopularProps {
  tags: string[];
  slug?: string;
  limit?: number;
}

const MostPopular: React.FC<MostPopularProps> = ({tags, slug, limit = 4 }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ===== Fetch all blogs on mount ===== */
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
        if (!cancelled) setError('Unable to load articles.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ===== Exclude current article, take first N ===== */
  const popularPosts = useMemo(() => {
    return blogs.filter((post) => post.slug !== slug).slice(0, limit);
  }, [blogs, slug, limit]);

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

  return (
    <div className="space-y-10">
      {/* ===== Popular Posts ===== */}
      <div>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Most Popular
        </h3>

        <div className="space-y-1 mt-2">
          {/* Loading skeletons */}
          {loading &&
            Array.from({ length: limit }).map((_, i) => (
              <CompactSkeleton key={i} />
            ))}

          {/* Error */}
          {!loading && error && (
            <p className="text-xs text-muted-foreground py-3">{error}</p>
          )}

          {/* Empty */}
          {!loading && !error && popularPosts.length === 0 && (
            <p className="text-xs text-muted-foreground py-3">
              No other articles yet.
            </p>
          )}

          {/* Cards */}
          {!loading &&
            !error &&
            popularPosts.map((post) => (
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
                variant="compact"
              />
            ))}
        </div>
      </div>

      {/* ===== Tags ===== */}
      <div>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-5">
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag:string) => (
            <Link
              key={tag}
              to={`/blogs?tag=${encodeURIComponent(tag)}`}
              className="px-3 py-1.5 rounded-lg bg-[var(--surface)] text-xs font-medium text-muted-foreground hover:bg-navy hover:text-white transition-all duration-200"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ===== Compact loading skeleton ===== */
const CompactSkeleton: React.FC = () => (
  <div className="flex gap-4 py-5 border-b border-muted last:border-0 animate-pulse">
    <div className="w-20 h-20 rounded-xl bg-[var(--surface)] flex-shrink-0" />
    <div className="flex-1 space-y-2 py-1">
      <div className="h-3 bg-[var(--surface)] rounded w-24" />
      <div className="h-4 bg-[var(--surface)] rounded w-full" />
      <div className="h-4 bg-[var(--surface)] rounded w-3/4" />
      <div className="h-3 bg-[var(--surface)] rounded w-32 mt-1" />
    </div>
  </div>
);

export default MostPopular;