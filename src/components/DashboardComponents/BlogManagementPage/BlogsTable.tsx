import React from 'react';
import BlogsTableRow from './BlogsTableRow';
import type { Blog } from '../../../lib/blogApi';

interface BlogsTableProps {
  blogs: Blog[];
  onEdit: (blog: Blog) => void;
  onDelete: (blog: Blog) => void;
}

const BlogsTable: React.FC<BlogsTableProps> = ({ blogs, onEdit, onDelete }) => {
  return (
    <div className="rounded-2xl border border-muted bg-white overflow-hidden">
      {/* Desktop / tablet table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--surface)] border-b border-muted">
              <Th>Article</Th>
              <Th>Category</Th>
              <Th>Tags</Th>
              <Th className="whitespace-nowrap">Published</Th>
              <Th className="text-right whitespace-nowrap">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <BlogsTableRow
                key={blog._id}
                blog={blog}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="md:hidden divide-y divide-muted">
        {blogs.map((blog) => (
          <BlogsTableRow
            key={blog._id}
            blog={blog}
            onEdit={onEdit}
            onDelete={onDelete}
            variant="mobile"
          />
        ))}
      </div>
    </div>
  );
};

const Th: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <th
    className={`
      text-left px-5 py-3
      text-[11px] font-semibold uppercase tracking-wider
      text-muted-foreground
      ${className}
    `}
  >
    {children}
  </th>
);

export default BlogsTable;