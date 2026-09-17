// components/AddBlogPage/FormField.tsx
import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  hint?: string;
  as?: 'input' | 'textarea';
  rows?: number;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required,
  error,
  hint,
  as = 'input',
  rows = 3,
}) => {
  const baseClasses = `
    w-full rounded-xl bg-white border px-4 py-3 text-sm
    text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/70
    focus:outline-none focus:ring-2 transition-all duration-200
    ${
      error
        ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
        : 'border-[var(--muted)] focus:ring-[var(--brand)]/30 focus:border-[var(--brand)]'
    }
  `;

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-1.5"
      >
        {label}
        {required && <span className="text-[var(--brand)]"> *</span>}
      </label>

      {as === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClasses}
        />
      )}

      {error ? (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-[var(--muted-foreground)]">{hint}</p>
      ) : null}
    </div>
  );
};

export default FormField;