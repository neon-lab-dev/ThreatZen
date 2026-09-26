/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import FormField from "./FormField";
import ImageUploader from "./ImageUploader";
import RichTextEditor from "./RichTextEditor";
import TagsInput from "./TagsInput";
import { blogApi, type Blog } from "../../lib/blogApi";

const READ_TIMES = [
  "3 min read",
  "5 min read",
  "6 min read",
  "8 min read",
  "10 min read",
  "12 min read",
  "15 min read",
  "20 min read",
];

interface FormState {
  title: string;
  shortDescription: string;
  category: string;
  readTime: string;
  content: string;
  imageFile: File | null;
  tags: string[];
  slug?: string;
  existingImageUrl: string;
}

const initialState: FormState = {
  title: "",
  shortDescription: "",
  category: "",
  readTime: "",
  content: "",
  imageFile: null,
  slug: "",
  tags: [],
  existingImageUrl: "",
};

interface FormErrors {
  title?: string;
  shortDescription?: string;
  category?: string;
  readTime?: string;
  content?: string;
  imageFile?: string;
  tags?: string;
  slug?: string;
}

interface BlogFormProps {
  /** If provided, the form runs in EDIT mode */
  slug?: string;
}

const BlogForm: React.FC<BlogFormProps> = ({ slug }) => {
  const navigate = useNavigate();
  const isEditMode = Boolean(slug);

  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [isFetching, setIsFetching] = useState(isEditMode);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [blogId, setBlogId] = useState<string | null>(null);

  /* ===== Load existing blog when editing ===== */
  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    setIsFetching(true);
    setFetchError(null);

    (async () => {
      try {
        const res = await blogApi.getBlogBySlug(slug);
        if (cancelled) return;

        const blog: Blog = res.data;

        setBlogId(blog._id ?? blog.id ?? null);
        setForm({
          title: blog.title ?? "",
          shortDescription: blog.shortDescription ?? "",
          category: blog.category ?? "",
          readTime: blog.readTime ?? "",
          content: blog.content ?? "",
          imageFile: null,
          slug: blog.slug ?? "",
          tags: blog.tags ?? [],
          existingImageUrl: blog.imageUrl ?? "",
        });
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setFetchError(
            "Failed to load this blog. It may have been removed or the link is invalid.",
          );
        }
      } finally {
        if (!cancelled) setIsFetching(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  /* ===== Validation ===== */
  const validate = (): boolean => {
    const next: FormErrors = {};

    if (!form.title.trim()) next.title = "Title is required.";
    else if (form.title.trim().length < 5)
      next.title = "Title must be at least 5 characters.";

    if (!form.shortDescription.trim())
      next.shortDescription = "Short description is required.";
    else if (form.shortDescription.trim().length < 20)
      next.shortDescription = "Description must be at least 20 characters.";
    else if (form.shortDescription.trim().length > 220)
      next.shortDescription = "Keep it under 220 characters.";

    if (!form.category) next.category = "Please choose a category.";
    if (!form.readTime) next.readTime = "Please choose a read time.";

    // Image required only in create mode; in edit mode an existing image is fine
    if (!form.imageFile && !form.existingImageUrl) {
      next.imageFile = "Featured image is required.";
    }

    if (!form.slug) next.slug = "Please choose a slug.";

    if (form.tags.length === 0) next.tags = "Please add at least one tag.";

    const stripped = form.content.replace(/<[^>]*>/g, "").trim();
    if (!stripped) next.content = "Content cannot be empty.";
    else if (stripped.length < 50)
      next.content = "Content should be at least 50 characters.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  /* ===== Submit (create or update) ===== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditMode) {
        if (!blogId) throw new Error("Missing blog ID — cannot update.");

        const res = await blogApi.updateBlog({
          id: blogId,
          imageFile: form.imageFile,
          title: form.title.trim(),
          category: form.category,
          shortDescription: form.shortDescription.trim(),
          readTime: form.readTime,
          content: form.content,
          slug: form.slug ?? "",
          tags: form.tags,
        });

        const ok = res?.success !== false;
        if (!ok) throw new Error(res?.message || "Failed to update blog.");

        toast.success("Blog updated successfully!");
        setSubmitted(true);

        setTimeout(() => navigate("/admin/management/blogs"), 900);
      } else {
        if (!form.imageFile) return;

        const res = await blogApi.addBlog({
          imageFile: form.imageFile,
          title: form.title.trim(),
          slug: form.slug ?? "",
          category: form.category,
          shortDescription: form.shortDescription.trim(),
          readTime: form.readTime,
          content: form.content,
          tags: form.tags,
        });

        const ok = res?.success !== false;
        if (!ok) throw new Error(res?.message || "Failed to publish blog.");

        toast.success("Blog published successfully!");
        setSubmitted(true);

        setTimeout(() => navigate("/admin/management/blogs"), 900);
      }
    } catch (err) {
      console.error(err);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosMsg = (err as any)?.response?.data?.message;
      toast.error(
        axiosMsg ||
          (err instanceof Error
            ? err.message
            : "Something went wrong. Please try again."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (isEditMode) {
      // On edit, "reset" doesn't clear the form — it's safer to just blur / reload.
      // Simple approach: reload the page to re-fetch original values.
      window.location.reload();
      return;
    }
    setForm(initialState);
    setErrors({});
    setSubmitted(false);
  };

  /* ===== Loading state for edit ===== */
  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
        <p className="text-sm text-muted-foreground">Loading blog…</p>
      </div>
    );
  }

  /* ===== Fetch error ===== */
  if (fetchError) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center max-w-lg mx-auto">
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-red-700 mb-2">
          Could not load blog
        </h2>
        <p className="text-sm text-red-600 mb-6">{fetchError}</p>
        <button
          type="button"
          onClick={() => navigate("/dashboard/blogs")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-deep transition-colors"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ===== Section: Basic Info ===== */}
      <div className="bg-white rounded-3xl border border-muted p-6 lg:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Basic information
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Title, summary, and categorization of your article.
          </p>
        </div>

        <div className="space-y-5">
          <FormField
            label="Blog Title"
            name="title"
            value={form.title}
            onChange={(v) => update("title", v)}
            placeholder="e.g. The 2025 Ransomware Playbook"
            required
            error={errors.title}
            hint="Use a clear, descriptive title — max 120 characters recommended."
          />

          <FormField
            label="Slug"
            name="slug"
            value={form.slug || ""}
            onChange={(v) => update("slug", v)}
            placeholder="e.g. the-2025-ransomware-playbook"
            required
            error={errors.slug}
          />

          <FormField
            label="Short Description"
            name="shortDescription"
            as="textarea"
            rows={3}
            value={form.shortDescription}
            onChange={(v) => update("shortDescription", v)}
            placeholder="A one or two sentence summary that appears on the blog listing."
            required
            error={errors.shortDescription}
            hint={`${form.shortDescription.length}/220 characters`}
          />

          <div className="grid sm:grid-cols-2 gap-5">
            <FormField
              label="Category"
              name="category"
              value={form.category}
              onChange={(v) => update("category", v)}
              placeholder="e.g. Threat Intelligence"
              required
              error={errors.category}
            />

            <div>
              <label
                htmlFor="readTime"
                className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
              >
                Read Time <span className="text-brand">*</span>
              </label>
              <select
                id="readTime"
                value={form.readTime}
                onChange={(e) => update("readTime", e.target.value)}
                className={`
                  w-full rounded-xl bg-white border px-4 py-3 text-sm text-foreground
                  focus:outline-none focus:ring-2 transition-all duration-200
                  ${
                    errors.readTime
                      ? "border-red-400 focus:ring-red-200 focus:border-red-400"
                      : "border-muted focus:ring-brand/30 focus:border-brand"
                  }
                `}
              >
                <option value="">Select read time</option>
                {READ_TIMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {errors.readTime && (
                <p className="mt-1.5 text-xs text-red-500">{errors.readTime}</p>
              )}
            </div>
          </div>

          <TagsInput
            label="Tags"
            value={form.tags}
            onChange={(tags) => update("tags", tags)}
            placeholder="Type a tag and press Enter (e.g. Ransomware, Zero Trust)"
            maxTags={10}
            maxTagLength={24}
            error={errors.tags}
            hint="Add up to 10 tags. Press Enter or comma to add."
          />
        </div>
      </div>

      {/* ===== Section: Featured Image ===== */}
      <div className="bg-white rounded-3xl border border-muted p-6 lg:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Featured image
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {isEditMode
              ? "Leave as-is to keep the current image, or replace it."
              : "This image will be shown on the blog card and the article header."}
          </p>
        </div>

        <ImageUploader
          onFileChange={(file) => update("imageFile", file)}
          initialUrl={form.existingImageUrl}
          onRemove={() => update("existingImageUrl", "")}
          onError={(msg) => toast.error(msg)}
        />
        {errors.imageFile && (
          <p className="mt-2 text-xs text-red-500">{errors.imageFile}</p>
        )}
      </div>

      {/* ===== Section: Content ===== */}
      <div className="bg-white rounded-3xl border border-muted p-6 lg:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Content</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Use the toolbar to format text, insert links, images, tables, and
            code.
          </p>
        </div>

        <RichTextEditor
          value={form.content}
          onChange={(html) => update("content", html)}
          error={errors.content}
        />
      </div>

      {/* ===== Actions ===== */}
      <div className="sticky bottom-4 z-10">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-muted shadow-lg shadow-navy/5 px-5 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {submitted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-brand" />
                <span className="text-brand font-medium">
                  {isEditMode ? "Blog updated" : "Blog published"} —
                  redirecting…
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4" />
                <span>
                  {isEditMode
                    ? "Edit the fields and save your changes."
                    : "Fill all required fields, then publish."}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-surface transition-colors disabled:opacity-50"
            >
              {isEditMode ? "Discard changes" : "Reset"}
            </button>

            <button
              type="submit"
              disabled={isSubmitting || submitted}
              className="inline-flex items-center gap-2 rounded-xl bg-navy hover:bg-navy-deep text-white px-6 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  {isEditMode ? "Saving…" : "Publishing…"}
                </>
              ) : submitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  {isEditMode ? "Saved" : "Published"}
                </>
              ) : isEditMode ? (
                "Save Changes"
              ) : (
                "Publish Blog"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BlogForm;
