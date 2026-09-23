// components/DashboardBlogs/BlogsEmptyState.tsx
import React from 'react';
import { FileText, Plus, Search } from 'lucide-react';

interface BlogsEmptyStateProps {
  hasBlogs: boolean;
  onCreate: () => void;
}

const BlogsEmptyState: React.FC<BlogsEmptyStateProps> = ({
  hasBlogs,
  onCreate,
}) => {
  return (
    <div className="rounded-2xl border border-muted bg-white py-16 px-6 text-center">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--surface)] flex items-center justify-center mb-5">
        {hasBlogs ? (
          <Search className="w-7 h-7 text-muted-foreground" />
        ) : (
          <FileText className="w-7 h-7 text-muted-foreground" />
        )}
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2">
        {hasBlogs ? 'No blogs match your filters' : 'No blogs yet'}
      </h3>

      <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
        {hasBlogs
          ? 'Try adjusting your search or category filter to find what you are looking for.'
          : 'Get started by publishing your first article — it takes less than a minute.'}
      </p>

      {!hasBlogs && (
        <button
          type="button"
          onClick={onCreate}
          className="
            inline-flex items-center gap-2
            px-5 py-2.5 rounded-xl
            bg-navy text-white text-sm font-semibold
            hover:bg-navy-deep
            transition-colors
          "
        >
          <Plus className="w-4 h-4" />
          Create Your First Blog
        </button>
      )}
    </div>
  );
};

export default BlogsEmptyState;