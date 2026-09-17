import React from 'react';
import ArticleHero from '../components/BlogDetailsPage/ArticleHero';
import ArticleContent from '../components/BlogDetailsPage/ArticleContent';
import ShareButtons from '../components/BlogDetailsPage/ShareButtons';
import RelatedPosts from '../components/BlogDetailsPage/RelatedPosts';
import MostPopular from '../components/BlogDetailsPage/MostPopular';

const BlogDetails: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <ArticleHero />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 py-16">
          {/* Article Content */}
          <article className="lg:col-span-8">
            <ArticleContent />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <MostPopular />
              <ShareButtons />
            </div>
          </aside>
        </div>

        {/* Related Posts */}
        <section className="py-16 border-t border-muted">
          <RelatedPosts />
        </section>
      </div>
    </div>
  );
};

export default BlogDetails;