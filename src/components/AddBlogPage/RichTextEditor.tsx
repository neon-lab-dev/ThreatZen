/* eslint-disable @typescript-eslint/no-explicit-any */
// components/AddBlogPage/RichTextEditor.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  ImagePlus,
  Table as TableIcon,
  Undo2,
  Redo2,
  Minus,
} from 'lucide-react';
import { Table } from '@tiptap/extension-table';
import { FontSize, TextStyle } from '@tiptap/extension-text-style';

const lowlight = createLowlight(common);

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  error?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start writing your article…',
  error,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: { levels: [1, 2, 3] },
      }),
      TextStyle,
      FontSize,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            'text-[var(--brand)] underline underline-offset-2 hover:text-[var(--brand-glow)]',
        },
      }),
      Image.configure({
        HTMLAttributes: { class: 'rounded-xl max-w-full h-auto my-4' },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class:
            'rounded-xl bg-[var(--navy-deep)] text-white/90 p-4 text-sm font-mono overflow-x-auto',
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: [
          // Base
          'prose prose-slate max-w-none focus:outline-none min-h-[420px] px-5 py-4',

          // Headings
          'prose-headings:font-bold prose-headings:text-[var(--foreground)]',
          'prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl',

          // Body text
          'prose-p:text-[var(--foreground)] prose-p:leading-relaxed',
          'prose-a:text-[var(--brand)] prose-strong:text-[var(--foreground)]',
          'prose-code:bg-[var(--surface)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none',

          // Blockquotes
          'prose-blockquote:border-l-4 prose-blockquote:border-[var(--brand)] prose-blockquote:bg-[var(--surface)] prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic',

          // === LISTS ===
          '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3',
          '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3',
          '[&_ul_ul]:list-[circle]',
          '[&_ul_ul_ul]:list-[square]',
          '[&_li]:my-1 [&_li]:text-[var(--foreground)] [&_li]:leading-relaxed',
          '[&_li>p]:my-0',

          // === TABLES ===
          '[&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_table]:table-auto',
          '[&_table]:overflow-hidden [&_table]:rounded-lg [&_table]:border [&_table]:border-[var(--muted)]',
          '[&_th]:bg-[var(--surface)] [&_th]:font-semibold [&_th]:text-[var(--foreground)]',
          '[&_th]:border [&_th]:border-[var(--muted)] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left',
          '[&_td]:border [&_td]:border-[var(--muted)] [&_td]:px-3 [&_td]:py-2',
          '[&_td]:text-[var(--foreground)] [&_td]:align-top',
          '[&_tbody_tr:nth-child(even)]:bg-[var(--surface)]/40',
          '[&_.selectedCell]:bg-[var(--brand)]/10',
          '[&_.selectedCell]:border-[var(--brand)]/40',
          '[&_.column-resize-handle]:bg-[var(--brand)] [&_.column-resize-handle]:w-0.5',
          '[&_.column-resize-handle]:absolute [&_.column-resize-handle]:top-0 [&_.column-resize-handle]:bottom-0',

          // === Placeholder ===
          '[&_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]',
          '[&_p.is-editor-empty:first-child::before]:text-[var(--muted-foreground)]',
          '[&_p.is-editor-empty:first-child::before]:float-left',
          '[&_p.is-editor-empty:first-child::before]:h-0',
          '[&_p.is-editor-empty:first-child::before]:pointer-events-none',
        ].join(' '),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external value changes (e.g. form reset)
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-1.5">
        Content <span className="text-[var(--brand)]">*</span>
      </label>

      <div
        className={`
          rounded-2xl bg-white border overflow-hidden transition-all duration-200
          ${
            error
              ? 'border-red-400 ring-2 ring-red-100'
              : 'border-[var(--muted)] focus-within:border-[var(--brand)] focus-within:ring-2 focus-within:ring-[var(--brand)]/20'
          }
        `}
      >
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
      </div>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
};

/* ============ Toolbar ============ */

const Toolbar: React.FC<{ editor: Editor }> = ({ editor }) => {
  const handleAddLink = () => {
    const previous = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Enter URL', previous ?? 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  };

  const handleAddImage = () => {
    const url = window.prompt('Paste image URL');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const handleInsertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 px-2 py-2 border-b border-[var(--muted)] bg-[var(--surface)]/60">
      {/* History */}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
      >
        <Undo2 className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
      >
        <Redo2 className="w-4 h-4" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Headings */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        active={editor.isActive('heading', { level: 1 })}
        title="Heading 1"
      >
        <Heading1 className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive('heading', { level: 2 })}
        title="Heading 2"
      >
        <Heading2 className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive('heading', { level: 3 })}
        title="Heading 3"
      >
        <Heading3 className="w-4 h-4" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Font Size */}
      <FontSizeSelect editor={editor} />

      <ToolbarDivider />

      {/* Inline marks */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive('underline')}
        title="Underline"
      >
        <UnderlineIcon className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive('strike')}
        title="Strikethrough"
      >
        <Strikethrough className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive('code')}
        title="Inline code"
      >
        <Code className="w-4 h-4" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Alignment */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        active={editor.isActive({ textAlign: 'left' })}
        title="Align left"
      >
        <AlignLeft className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        active={editor.isActive({ textAlign: 'center' })}
        title="Align center"
      >
        <AlignCenter className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        active={editor.isActive({ textAlign: 'right' })}
        title="Align right"
      >
        <AlignRight className="w-4 h-4" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Lists & blocks */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
        title="Bullet list"
      >
        <List className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
        title="Numbered list"
      >
        <ListOrdered className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive('blockquote')}
        title="Quote"
      >
        <Quote className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive('codeBlock')}
        title="Code block"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
          />
        </svg>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Divider"
      >
        <Minus className="w-4 h-4" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Insert */}
      <ToolbarButton
        onClick={handleAddLink}
        active={editor.isActive('link')}
        title="Add link"
      >
        <Link2 className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={handleAddImage} title="Insert image">
        <ImagePlus className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={handleInsertTable} title="Insert table">
        <TableIcon className="w-4 h-4" />
      </ToolbarButton>

      {/* Table controls — visible only when inside a table */}
      {editor.isActive('table') && (
        <>
          <ToolbarDivider />
          <button
            type="button"
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            className="px-2 py-1 text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-md hover:bg-[var(--muted)] transition-colors"
          >
            + Col
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().addRowAfter().run()}
            className="px-2 py-1 text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-md hover:bg-[var(--muted)] transition-colors"
          >
            + Row
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().deleteColumn().run()}
            className="px-2 py-1 text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-md hover:bg-[var(--muted)] transition-colors"
          >
            − Col
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().deleteRow().run()}
            className="px-2 py-1 text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-md hover:bg-[var(--muted)] transition-colors"
          >
            − Row
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().deleteTable().run()}
            className="px-2 py-1 text-xs font-medium text-red-500 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            Delete table
          </button>
        </>
      )}
    </div>
  );
};

/* ============ Font Size Dropdown ============ */

const FONT_SIZES: { label: string; value: any | null }[] = [
  { label: 'Default', value: null },
  { label: '12', value: '12px' },
  { label: '14', value: '14px' },
  { label: '16', value: '16px' },
  { label: '18', value: '18px' },
  { label: '20', value: '20px' },
  { label: '24', value: '24px' },
  { label: '28', value: '28px' },
  { label: '32', value: '32px' },
  { label: '40', value: '40px' },
  { label: '48', value: '48px' },
];

const FontSizeSelect: React.FC<{ editor: Editor }> = ({ editor }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Current size from the active selection
  const current =
    (editor.getAttributes('textStyle').fontSize as any | undefined) ??
    null;

  const displayValue = current
    ? FONT_SIZES.find((s) => s.value === current)?.label ?? 'Default'
    : 'Default';

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        title="Font size"
        className={`
          flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium
          transition-all duration-150 min-w-[78px] justify-between
          ${
            current
              ? 'bg-[var(--brand)]/15 text-[var(--brand)]'
              : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]'
          }
        `}
      >
        <span className="tabular-nums">
          {displayValue === 'Default' ? 'Size' : `${displayValue}px`}
        </span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          className="
            absolute top-full left-0 mt-1 z-20 w-32 py-1
            rounded-xl bg-white border border-[var(--muted)]
            shadow-lg shadow-[var(--navy)]/10
            max-h-72 overflow-y-auto
          "
        >
          {FONT_SIZES.map((size) => {
            const isActive = current === size.value;
            return (
              <button
                key={size.label}
                type="button"
                onClick={() => {
                  if (size.value === null) {
                    editor.chain().focus().unsetFontSize().run();
                  } else {
                    editor.chain().focus().setFontSize(size.value).run();
                  }
                  setOpen(false);
                }}
                className={`
                  w-full text-left px-3 py-1.5 text-sm
                  flex items-center justify-between gap-2
                  transition-colors
                  ${
                    isActive
                      ? 'bg-[var(--brand)]/10 text-[var(--brand)] font-semibold'
                      : 'text-[var(--foreground)] hover:bg-[var(--surface)]'
                  }
                `}
              >
                <span
                  className="truncate"
                  style={{
                    fontSize:
                      size.value === null
                        ? undefined
                        : `min(${size.value}, 18px)`,
                  }}
                >
                  {size.value === null ? 'Default' : `${size.label} px`}
                </span>
                {isActive && (
                  <svg
                    className="w-3.5 h-3.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* ============ Shared sub-components ============ */

const ToolbarButton: React.FC<{
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  children: React.ReactNode;
}> = ({ onClick, active, disabled, title, children }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`
      p-2 rounded-md transition-all duration-150
      disabled:opacity-40 disabled:cursor-not-allowed
      ${
        active
          ? 'bg-[var(--brand)]/15 text-[var(--brand)]'
          : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]'
      }
    `}
  >
    {children}
  </button>
);

const ToolbarDivider = () => (
  <div className="w-px h-5 bg-[var(--muted)] mx-1" />
);

export default RichTextEditor;