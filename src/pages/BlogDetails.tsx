/* eslint-disable react-hooks/set-state-in-effect */
// pages/BlogDetails.tsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ArticleHero from '../components/BlogDetailsPage/ArticleHero';
import ArticleContent from '../components/BlogDetailsPage/ArticleContent';
import ShareButtons from '../components/BlogDetailsPage/ShareButtons';
import RelatedPosts from '../components/BlogDetailsPage/RelatedPosts';
import MostPopular from '../components/BlogDetailsPage/MostPopular';
import { blogApi, type Blog } from '../lib/blogApi';

const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ===== Fetch by slug ===== */
  useEffect(() => {
    if (!slug) {
      setError('Missing article identifier.');
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await blogApi.getBlogBySlug(slug);
        if (!cancelled) {
          setBlog(res.data);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const axiosErr = err as any;
          setError(
            axiosErr?.response?.status === 404
              ? 'This article could not be found.'
              : 'Failed to load this article. Please try again.'
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  /* ===== Loading state ===== */
  if (loading) {
    return <BlogDetailsSkeleton />;
  }

  /* ===== Error state ===== */
  if (error || !blog) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5">
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
          <h1 className="text-2xl font-bold text-foreground mb-3">
            Article unavailable
          </h1>
          <p className="text-muted-foreground mb-6">
            {error ?? 'Something went wrong loading this article.'}
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-deep transition-colors"
          >
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
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  /* ===== Render ===== */
  return (
    <div className="min-h-screen bg-background">
      <ArticleHero blog={blog} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 py-16">
          {/* Article Content */}
          <article className="lg:col-span-8">
            <ArticleContent content={blog.content} />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <MostPopular tags={blog.tags} slug={blog.slug} />
              <ShareButtons
                title={blog.title}
                url={typeof window !== 'undefined' ? window.location.href : ''}
              />
              
            </div>
          </aside>
        </div>

        {/* Related Posts */}
        <section className="py-16 border-t border-muted">
          <RelatedPosts
            category={blog.category}
            currentSlug={blog.slug}
          />
        </section>
      </div>
    </div>
  );
};

/* ===== Full-page loading skeleton ===== */
const BlogDetailsSkeleton: React.FC = () => (
  <div className="min-h-screen bg-background animate-pulse">
    {/* Hero skeleton */}
    <div className="bg-white border-b border-muted">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-16 lg:pt-20 pb-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <div className="h-3 bg-[var(--surface)] rounded w-12" />
            <div className="h-3 bg-[var(--surface)] rounded w-8" />
            <div className="h-3 bg-[var(--surface)] rounded w-24" />
          </div>

          {/* Category pill */}
          <div className="h-6 bg-[var(--surface)] rounded-full w-40" />

          {/* Title */}
          <div className="space-y-3">
            <div className="h-9 bg-[var(--surface)] rounded w-full" />
            <div className="h-9 bg-[var(--surface)] rounded w-4/5" />
          </div>

          {/* Subtitle */}
          <div className="space-y-2 pt-2">
            <div className="h-4 bg-[var(--surface)] rounded w-full" />
            <div className="h-4 bg-[var(--surface)] rounded w-3/4" />
          </div>
        </div>

        {/* Feature image skeleton */}
        <div className="mt-8 aspect-[16/9] bg-[var(--surface)] rounded-3xl" />
      </div>
    </div>

    {/* Body skeleton */}
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-8 space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-[var(--surface)] rounded"
              style={{ width: `${60 + ((i * 13) % 40)}%` }}
            />
          ))}
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="h-64 bg-[var(--surface)] rounded-2xl" />
          <div className="h-40 bg-[var(--surface)] rounded-2xl" />
        </div>
      </div>
    </div>
  </div>
);

export default BlogDetails;