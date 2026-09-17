// components/AddBlogPage/ImageUploader.tsx
import React, { useRef, useState } from 'react';

interface ImageUploaderProps {
  value?: string;
  onUploaded: (url: string) => void;
  onError?: (message: string) => void;
  upload: (file: File) => Promise<string>;
}

const MAX_SIZE_MB = 5;
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onUploaded,
  onError,
  upload,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(value);
  const [progress, setProgress] = useState(0);

  const handleFile = async (file: File) => {
    if (!ACCEPTED.includes(file.type)) {
      onError?.('Please upload a JPG, PNG, WEBP, or GIF image.');
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      onError?.(`Image must be smaller than ${MAX_SIZE_MB}MB.`);
      return;
    }

    // Optimistic local preview
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    setIsUploading(true);
    setProgress(10);

    try {
      // Simulated progress ticks for UX
      const interval = setInterval(() => {
        setProgress((p) => (p < 85 ? p + 5 : p));
      }, 120);

      const url = await upload(file);
      clearInterval(interval);
      setProgress(100);

      setPreview(url);
      onUploaded(url);
    } catch (err) {
      console.error(err);
      onError?.('Image upload failed. Please try again.');
      setPreview(value);
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setProgress(0);
      }, 400);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-1.5">
        Featured Image <span className="text-[var(--brand)]">*</span>
      </label>

      {!preview ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            relative cursor-pointer rounded-2xl border-2 border-dashed px-6 py-12 text-center
            transition-all duration-200
            ${
              isDragging
                ? 'border-[var(--brand)] bg-[var(--brand)]/5'
                : 'border-[var(--muted)] bg-[var(--surface)] hover:border-[var(--brand)]/50 hover:bg-[var(--brand)]/[0.03]'
            }
          `}
        >
          <div className="w-12 h-12 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-[var(--brand)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </div>

          <p className="text-sm font-medium text-[var(--foreground)]">
            Click to upload or drag & drop
          </p>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            PNG, JPG, WEBP or GIF · Max {MAX_SIZE_MB}MB
          </p>

          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED.join(',')}
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden border border-[var(--muted)]">
          <img
            src={preview}
            alt="Featured preview"
            className="w-full aspect-[16/9] object-cover"
          />

          {/* Action bar */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur text-xs font-semibold text-[var(--foreground)] hover:bg-white transition-colors shadow-sm"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => {
                setPreview(undefined);
                onUploaded('');
              }}
              className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur text-xs font-semibold text-red-500 hover:bg-white transition-colors shadow-sm"
            >
              Remove
            </button>
          </div>

          {/* Upload progress overlay */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
              <div className="w-48 h-1.5 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full bg-[var(--brand)] transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-medium text-white">
                Uploading… {progress}%
              </span>
            </div>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(',')}
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
};

export default ImageUploader;