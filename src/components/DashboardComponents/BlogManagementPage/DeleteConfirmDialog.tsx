/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { blogApi, type Blog } from "../../../lib/blogApi";

interface DeleteConfirmDialogProps {
  blog: Blog | null;
  onCancel: () => void;
  onSuccess: (id: string) => void;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  blog,
  onCancel,
  onSuccess,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  /* Reset internal state when a new blog is targeted */
  useEffect(() => {
    if (blog) {
      setIsDeleting(false);
      setDeleted(false);
    }
  }, [blog]);

  /* Escape + scroll lock */
  useEffect(() => {
    if (!blog) return;

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isDeleting && !deleted) onCancel();
    };

    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [blog, isDeleting, deleted, onCancel]);

  /* ===== Delete handler ===== */
  const handleConfirm = async () => {
    if (!blog || isDeleting || deleted) return;

    setIsDeleting(true);

    try {
      const id = blog._id ?? blog.id;
      if (!id) throw new Error("Missing blog ID.");

      const res = await blogApi.deleteBlog(id);

      // Accept both `{ success: true }` and successful 200s without a flag
      const ok = res?.success !== false;
      if (!ok) throw new Error(res?.message || "Failed to delete blog.");

      setDeleted(true);
      toast.success("Blog deleted successfully.");

      // Short pause so the user sees the success state, then reload the page
      setTimeout(() => {
        onSuccess(id);
        window.location.reload();
      }, 600);
    } catch (err) {
      console.error(err);

      // Prefer backend error message if available
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosMsg = (err as any)?.response?.data?.message;
      toast.error(
        axiosMsg ||
          (err instanceof Error ? err.message : "Failed to delete blog."),
      );

      setIsDeleting(false);
    }
  };

  /* ===== Backdrop click ===== */
  const handleBackdrop = () => {
    if (!isDeleting && !deleted) onCancel();
  };

  return (
    <AnimatePresence>
      {blog && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBackdrop}
            className="fixed inset-0 z-[60] h-screen bg-navy-deep/60 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            className="
              fixed z-[70] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              w-[calc(100%-2rem)] max-w-md
              rounded-2xl bg-white border border-muted
              shadow-[0_30px_80px_-30px_rgba(15,23,42,0.5)]
              overflow-hidden
            "
          >
            {/* Header */}
            <div className="flex items-start gap-4 p-5 sm:p-6">
              <div
                className={`
                  flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center
                  transition-colors duration-300
                  ${
                    deleted
                      ? "bg-brand/10 border border-brand/20"
                      : "bg-red-50 border border-red-100"
                  }
                `}
              >
                {deleted ? (
                  <CheckCircle2 className="w-5 h-5 text-brand" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h2
                  id="delete-dialog-title"
                  className="text-base sm:text-lg font-bold text-foreground leading-tight"
                >
                  {deleted ? "Blog deleted" : "Delete this blog?"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {deleted ? (
                    <>
                      <span className="font-semibold text-foreground">
                        "{blog.title}"
                      </span>{" "}
                      has been removed.
                    </>
                  ) : (
                    <>
                      This will permanently remove{" "}
                      <span className="font-semibold text-foreground">
                        "{blog.title}"
                      </span>
                      . This action cannot be undone.
                    </>
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() => !isDeleting && !deleted && onCancel()}
                disabled={isDeleting || deleted}
                className="flex-shrink-0 p-1.5 -mt-1 -mr-1 rounded-lg hover:bg-[var(--surface)] transition-colors disabled:opacity-40 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Actions */}
            <div className="px-5 sm:px-6 py-4 bg-[var(--surface)]/50 border-t border-muted flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
              <button
                type="button"
                onClick={onCancel}
                disabled={isDeleting || deleted}
                className="
                  inline-flex items-center justify-center
                  px-4 py-2.5 rounded-xl
                  text-sm font-semibold
                  text-foreground
                  border border-muted bg-white
                  hover:bg-[var(--surface)]
                  transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={isDeleting || deleted}
                className={`
                  inline-flex items-center justify-center gap-2
                  px-4 py-2.5 rounded-xl
                  text-sm font-semibold text-white
                  transition-colors
                  disabled:cursor-not-allowed cursor-pointer
                  ${
                    deleted
                      ? "bg-brand"
                      : "bg-red-500 hover:bg-red-600 disabled:opacity-60"
                  }
                `}
              >
                {isDeleting ? (
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
                    Deleting…
                  </>
                ) : deleted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Deleted
                  </>
                ) : (
                  "Delete Blog"
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmDialog;
