/* eslint-disable react-hooks/set-state-in-effect */
// components/AddBlogPage/ImageUploader.tsx
import React, { useEffect, useRef, useState } from 'react';

const MAX_SIZE_MB = 5;
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

interface ImageUploaderProps {
  /** Called when a file is chosen or cleared. `null` means "no new file". */
  onFileChange: (file: File | null) => void;
  /** Optional: existing image URL (from the server) to show as the initial preview */
  initialUrl?: string;
  /** Optional: called when the user removes the currently displayed image */
  onRemove?: () => void;
  onError?: (message: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onFileChange,
  initialUrl,
  onRemove,
  onError,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);

  // Sync external initialUrl changes (e.g. after fetch)
  useEffect(() => {
    if (initialUrl && !file) {
      setPreview(initialUrl);
    }
  }, [initialUrl, file]);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFile = (incoming: File) => {
    if (!ACCEPTED.includes(incoming.type)) {
      onError?.('Please upload a JPG, PNG, WEBP, or GIF image.');
      return;
    }
    if (incoming.size > MAX_SIZE_MB * 1024 * 1024) {
      onError?.(`Image must be smaller than ${MAX_SIZE_MB}MB.`);
      return;
    }

    if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview);

    const localUrl = URL.createObjectURL(incoming);
    setFile(incoming);
    setPreview(localUrl);
    onFileChange(incoming);
  };

  const handleRemove = () => {
    if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
    onFileChange(null);
    onRemove?.();
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const incoming = e.dataTransfer.files?.[0];
    if (incoming) handleFile(incoming);
  };

  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
        Featured Image <span className="text-brand">*</span>
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
                ? 'border-brand bg-brand/5'
                : 'border-muted bg-surface hover:border-brand/50 hover:bg-brand/[0.03]'
            }
          `}
        >
          <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-brand"
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

          <p className="text-sm font-medium text-foreground">
            Click to upload or drag & drop
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PNG, JPG, WEBP or GIF · Max {MAX_SIZE_MB}MB
          </p>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden border border-muted">
          <img
            src={preview}
            alt="Featured preview"
            className="w-full aspect-[16/9] object-cover"
          />

          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur text-xs font-semibold text-foreground hover:bg-white transition-colors shadow-sm"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur text-xs font-semibold text-red-500 hover:bg-white transition-colors shadow-sm"
            >
              Remove
            </button>
          </div>

          {file && (
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
              <p className="text-[11px] text-white/90 truncate">
                {file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB
                <span className="ml-2 text-brand">· New</span>
              </p>
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
          const incoming = e.target.files?.[0];
          if (incoming) handleFile(incoming);
        }}
      />
    </div>
  );
};

export default ImageUploader;