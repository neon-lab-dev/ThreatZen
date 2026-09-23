import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { blogApi, type Blog } from '../../lib/blogApi';
import BlogsToolbar from '../../components/DashboardComponents/BlogManagementPage/BlogsToolbar';
import BlogsEmptyState from '../../components/DashboardComponents/BlogManagementPage/BlogsEmptyState';
import BlogsTable from '../../components/DashboardComponents/BlogManagementPage/BlogsTable';
import DeleteConfirmDialog from '../../components/DashboardComponents/BlogManagementPage/DeleteConfirmDialog';

const BlogManagement: React.FC = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);

  /* ===== Fetch blogs ===== */
  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await blogApi.getAllBlogs();
      setBlogs(res.data ?? []);
    } catch (err) {
      console.error(err);
      setError('Failed to load blogs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await blogApi.getAllBlogs();
        if (!cancelled) setBlogs(res.data ?? []);
      } catch (err) {
        console.error(err);
        if (!cancelled)
          setError('Failed to load blogs. Please try again.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  /* ===== Dynamic categories ===== */
  const categories = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => b.category && set.add(b.category));
    return ['All', ...Array.from(set).sort()];
  }, [blogs]);

  /* ===== Filtered ===== */
  const filtered = useMemo(() => {
    let result = blogs;

    if (categoryFilter !== 'All') {
      result = result.filter((b) => b.category === categoryFilter);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.slug.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          (b.tags ?? []).some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [blogs, categoryFilter, search]);

  /* ===== Edit → navigate to edit route ===== */
  const handleEdit = (blog: Blog) => {
    navigate(`/dashboard/blogs/edit/${blog._id}`);
  };

  return (
    <div className="space-y-6">
      {/* ===== Page header ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
            Blog Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create, edit, and manage all blog articles.
          </p>
        </div>

        <Link 
          to="/admin/management/blog/add"
          className="
            inline-flex items-center justify-center gap-2
            px-5 py-2.5 rounded-xl
            bg-navy text-white text-sm font-semibold
            hover:bg-navy-deep
            transition-colors
            whitespace-nowrap
            self-start sm:self-auto
          "
        >
          <Plus className="w-4 h-4" />
         Add New Blog
        </Link>
      </div>

      {/* ===== Toolbar ===== */}
      <BlogsToolbar
        search={search}
        onSearchChange={setSearch}
        category={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categories={categories}
        total={blogs.length}
        filtered={filtered.length}
      />

      {/* ===== Content ===== */}
      {loading ? (
        <BlogsTableSkeleton />
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-sm text-red-600 font-medium mb-4">{error}</p>
          <button
            type="button"
            onClick={fetchBlogs}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-navy text-white text-sm font-semibold hover:bg-navy-deep transition-colors"
          >
            Retry
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <BlogsEmptyState
          hasBlogs={blogs.length > 0}
          onCreate={() => navigate('/blogs/add')}
        />
      ) : (
        <BlogsTable
          blogs={filtered}
          onEdit={handleEdit}
          onDelete={(blog) => setDeleteTarget(blog)}
        />
      )}

      {/* ===== Delete confirm ===== */}
      <DeleteConfirmDialog
        blog={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onSuccess={() => setDeleteTarget(null)}
      />
    </div>
  );
};

/* ===== Table skeleton ===== */
const BlogsTableSkeleton: React.FC = () => (
  <div className="rounded-2xl border border-muted bg-white overflow-hidden">
    <div className="h-12 bg-[var(--surface)] border-b border-muted" />
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="flex items-center gap-4 px-5 py-4 border-b border-muted last:border-b-0 animate-pulse"
      >
        <div className="w-16 h-12 rounded-lg bg-[var(--surface)]" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-[var(--surface)] rounded w-2/3" />
          <div className="h-3 bg-[var(--surface)] rounded w-1/3" />
        </div>
        <div className="h-8 w-16 bg-[var(--surface)] rounded-lg" />
        <div className="h-8 w-16 bg-[var(--surface)] rounded-lg" />
      </div>
    ))}
  </div>
);

export default BlogManagement;