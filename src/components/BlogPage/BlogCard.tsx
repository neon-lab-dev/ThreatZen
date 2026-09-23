import React from "react";

interface BlogCardProps {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  authorInitials: string;
  date: string;
  slug: string;
  readTime: string;
  image?: string;
  variant?: "default" | "compact";
}

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80";

const BlogCard: React.FC<BlogCardProps> = ({
  category,
  title,
  excerpt,
  date,
  readTime,
  slug,
  image = DEFAULT_IMAGE,
  variant = "default",
}) => {
  if (variant === "compact") {
    return (
      <a href={`/blog/${slug}`} className="group flex gap-4 py-5 border-b border-muted last:border-0">
        <div className="w-20 h-20 rounded-xl bg-[var(--surface)] flex-shrink-0 overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-medium text-[var(--brand)] tracking-wide uppercase">
            {category}
          </span>
          <h4 className="text-sm font-semibold text-foreground mt-1 leading-snug group-hover:text-navy transition-colors line-clamp-2">
            {title}
          </h4>
          <div className="text-xs text-muted-foreground mt-2">
            {date} · {readTime}
          </div>
        </div>
      </a>
    );
  }

  return (
    <a href={`/blog/${slug}`} className="group bg-[var(--card)] rounded-2xl border border-muted overflow-hidden hover:border-[var(--brand)]/30 shadow-lg hover:shadow-navy/5 transition-all duration-300 flex flex-col cursor-pointer">
      {/* Image */}
      <div className="aspect-[16/9] bg-[var(--surface)] relative overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle gradient overlay for badge legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm text-xs font-medium text-navy border border-white/40 shadow-sm">
            {category}
          </span>
        </div>

        {/* Read time pill */}
        <div className="absolute top-4 right-4">
          <span className="px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-sm text-xs font-medium text-white border border-white/10">
            {readTime}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-foreground leading-snug mb-3 group-hover:text-navy transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-2">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-muted mt-auto">
          <span className="text-xs text-muted-foreground">{date}</span>

          <a
            href={`/blog/${slug}`}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy group-hover:text-[var(--brand)] transition-colors duration-300"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </a>
  );
};

export default BlogCard;
