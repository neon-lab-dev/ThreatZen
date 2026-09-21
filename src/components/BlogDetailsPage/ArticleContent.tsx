// components/BlogDetailsPage/ArticleContent.tsx
import React from 'react';

interface ArticleContentProps {
  content: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  // Guard against empty content
  if (!content || !content.trim()) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No content available for this article.</p>
      </div>
    );
  }

  return (
    <div
      className={[
        // ===== Base typography =====
        'prose prose-lg max-w-none',

        // ===== Headings =====
        'prose-headings:font-bold prose-headings:text-foreground prose-headings:scroll-mt-24',
        'prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-6',
        'prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6',
        'prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4',
        'prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3',

        // ===== Paragraphs =====
        'prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-6',

        // ===== Inline formatting =====
        'prose-strong:text-foreground prose-strong:font-semibold',
        'prose-em:text-foreground',
        'prose-a:text-[var(--brand)] prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-[var(--brand-glow)]',

        // ===== Inline code =====
        'prose-code:bg-[var(--surface)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none',

        // ===== Code blocks (from CodeBlockLowlight) =====
        'prose-pre:bg-[var(--navy-deep)] prose-pre:text-white/90 prose-pre:rounded-xl prose-pre:p-5 prose-pre:text-sm prose-pre:overflow-x-auto prose-pre:my-8',

        // ===== Blockquotes =====
        'prose-blockquote:border-l-4 prose-blockquote:border-[var(--navy)] prose-blockquote:bg-[var(--surface)] prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-foreground prose-blockquote:font-normal prose-blockquote:my-8',

        // ===== LISTS =====
        'prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6',
        'prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6',
        '[&_li]:my-2 [&_li]:text-foreground [&_li]:leading-relaxed',
        '[&_li>p]:my-0',
        '[&_ul_ul]:list-[circle]',
        '[&_ul_ul_ul]:list-[square]',

        // ===== TABLES =====
        'prose-table:my-8 prose-table:w-full prose-table:border-collapse',
        '[&_table]:overflow-hidden [&_table]:rounded-xl [&_table]:border [&_table]:border-muted',
        '[&_th]:bg-[var(--surface)] [&_th]:font-semibold [&_th]:text-foreground',
        '[&_th]:border [&_th]:border-muted [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left',
        '[&_td]:border [&_td]:border-muted [&_td]:px-4 [&_td]:py-2.5',
        '[&_td]:text-foreground [&_td]:align-top',
        '[&_tbody_tr:nth-child(even)]:bg-[var(--surface)]/40',

        // ===== Images =====
        'prose-img:rounded-xl prose-img:my-8 prose-img:shadow-sm',

        // ===== Horizontal rule =====
        'prose-hr:border-muted prose-hr:my-10',
      ].join(' ')}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default ArticleContent;