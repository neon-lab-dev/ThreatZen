// components/AddBlogPage/TagsInput.tsx
import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';

interface TagsInputProps {
  label?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  maxTagLength?: number;
  error?: string;
  hint?: string;
}

const TagsInput: React.FC<TagsInputProps> = ({
  label = 'Tags',
  value,
  onChange,
  placeholder = 'Type a tag and press Enter…',
  maxTags = 10,
  maxTagLength = 24,
  error,
  hint,
}) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (raw: string) => {
    const tag = raw.trim().replace(/,+$/, '');
    if (!tag) return;
    if (tag.length > maxTagLength) return;
    if (value.length >= maxTags) return;

    // case-insensitive duplicate check
    const exists = value.some(
      (t) => t.toLowerCase() === tag.toLowerCase()
    );
    if (exists) {
      setInput('');
      return;
    }

    onChange([...value, tag]);
    setInput('');
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
      return;
    }

    if (e.key === 'Backspace' && !input && value.length > 0) {
      // Remove the last tag on backspace when input is empty
      removeTag(value.length - 1);
    }
  };

  const handleBlur = () => {
    // Commit whatever is in the input on blur
    if (input.trim()) addTag(input);
  };

  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
        {label}
      </label>

      <div
        onClick={() => inputRef.current?.focus()}
        className={`
          flex flex-wrap items-center gap-2 min-h-[48px]
          rounded-xl bg-white border px-3 py-2 cursor-text
          transition-all duration-200
          ${
            error
              ? 'border-red-400 ring-2 ring-red-100'
              : 'border-muted focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20'
          }
        `}
      >
        {/* Existing tags */}
        {value.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="
              inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1
              rounded-md bg-brand/10 border border-brand/20
              text-xs font-medium text-brand
            "
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(i);
              }}
              className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-brand/20 transition-colors"
              aria-label={`Remove ${tag}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        {/* Input */}
        {value.length < maxTags && (
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder={value.length === 0 ? placeholder : ''}
            className="
              flex-1 min-w-[140px] bg-transparent border-none outline-none
              text-sm text-foreground placeholder:text-muted-foreground/70
              py-1
            "
          />
        )}

        {value.length >= maxTags && (
          <span className="text-xs text-muted-foreground italic py-1">
            Max {maxTags} tags reached
          </span>
        )}
      </div>

      {/* Footer: count + hint/error */}
      <div className="mt-1.5 flex items-center justify-between">
        {error ? (
          <p className="text-xs text-red-500">{error}</p>
        ) : hint ? (
          <p className="text-xs text-muted-foreground">{hint}</p>
        ) : (
          <span />
        )}
        <span className="text-xs text-muted-foreground tabular-nums">
          {value.length}/{maxTags}
        </span>
      </div>
    </div>
  );
};

export default TagsInput;