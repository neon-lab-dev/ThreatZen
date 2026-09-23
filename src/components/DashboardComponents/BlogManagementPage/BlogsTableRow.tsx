import React from 'react';
import { Pencil, Trash2, ExternalLink, Calendar } from 'lucide-react';
import type { Blog } from '../../../lib/blogApi';
import { Link } from 'react-router-dom';

interface BlogsTableRowProps {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (blog: Blog) => void;
  variant?: 'row' | 'mobile';
}

const formatDate = (iso?: string) => {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
};

const BlogsTableRow: React.FC<BlogsTableRowProps> = ({
  blog,
  onEdit,
  onDelete,
  variant = 'row',
}) => {
  if (variant === 'mobile') {
    return (
      <div className="p-4 flex gap-3">
        {/* Image */}
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-[var(--surface)] flex-shrink-0">
          {blog.imageUrl ? (
            <img
              src={blog.imageUrl}
              alt={blog.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-navy/10 to-brand/10" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 mb-1.5">
            {blog.title}
          </h3>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex px-2 py-0.5 rounded-md bg-brand/10 text-brand text-[10px] font-semibold tracking-wide uppercase">
              {blog.category}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {formatDate(blog.createdAt)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
            to={`/admin/management/blog/edit/${blog?.slug}`}
              onClick={() => onEdit(blog)}
              className="
                inline-flex items-center gap-1.5
                px-3 py-1.5 rounded-lg
                text-xs font-medium
                bg-[var(--surface)] border border-muted
                hover:border-navy/30 hover:bg-navy/5 hover:text-navy
                transition-all
              "
            >
              <Pencil className="w-3 h-3" />
              Edit
            </Link>
            <button
              type="button"
              onClick={() => onDelete(blog)}
              className="
                inline-flex items-center gap-1.5
                px-3 py-1.5 rounded-lg
                text-xs font-medium
                bg-[var(--surface)] border border-muted
                hover:border-red-300 hover:bg-red-50 hover:text-red-500
                transition-all
              "
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ===== Desktop row ===== */
  return (
    <tr className="group border-b border-muted last:border-b-0 hover:bg-[var(--surface)]/60 transition-colors">
      {/* Article */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3 min-w-0">
          {/* Thumbnail */}
          <div className="w-16 h-12 rounded-lg overflow-hidden bg-[var(--surface)] flex-shrink-0 border border-muted">
            {blog.imageUrl ? (
              <img
                src={blog.imageUrl}
                alt={blog.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-navy/10 to-brand/10" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-foreground leading-snug line-clamp-1 group-hover:text-navy transition-colors">
              {blog.title}
            </div>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
              <span className="truncate max-w-[260px]">/{blog.slug}</span>
              <a
                href={`/blog/${blog.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-brand transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-5 py-4">
        <span className="inline-flex px-2.5 py-1 rounded-md bg-brand/10 text-brand text-[10px] font-semibold tracking-wide uppercase whitespace-nowrap">
          {blog.category}
        </span>
      </td>

      {/* Tags */}
      <td className="px-5 py-4">
        <div className="flex flex-wrap gap-1 max-w-[220px]">
          {(blog.tags ?? []).length > 0 ? (
            <>
              {(blog.tags ?? []).slice(0, 2).map((tag:string) => (
                <span
                  key={tag}
                  className="
                    inline-flex px-2 py-0.5 rounded-md
                    bg-[var(--surface)] border border-muted
                    text-[10px] font-medium text-muted-foreground
                    whitespace-nowrap
                  "
                >
                  {tag}
                </span>
              ))}
              {(blog.tags ?? []).length > 2 && (
                <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-medium text-muted-foreground">
                  +{(blog.tags ?? []).length - 2}
                </span>
              )}
            </>
          ) : (
            <span className="text-xs text-muted-foreground">—</span>
          )}
        </div>
      </td>

      {/* Date */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap">
          <Calendar className="w-3 h-3" />
          {formatDate(blog.createdAt)}
        </div>
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex items-center justify-end gap-2">
          <Link
            to={`/admin/management/blog/edit/${blog?.slug}`}
            className="
              inline-flex items-center gap-1.5
              px-3 py-1.5 rounded-lg
              text-xs font-semibold
              border border-muted bg-white
              text-foreground
              hover:border-navy/40 hover:bg-navy/5 hover:text-navy
              transition-all duration-200
            "
            title="Edit"
          >
            <Pencil className="w-3 h-3" />
            Edit
          </Link>

          <button
            type="button"
            onClick={() => onDelete(blog)}
            className="
              inline-flex items-center gap-1.5
              px-3 py-1.5 rounded-lg
              text-xs font-semibold
              border border-muted bg-white
              text-foreground
              hover:border-red-300 hover:bg-red-50 hover:text-red-500
              transition-all duration-200 cursor-pointer
            "
            title="Delete"
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BlogsTableRow;