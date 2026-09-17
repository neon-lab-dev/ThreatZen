import React from 'react';
import AddBlogHeader from '../components/AddBlogPage/AddBlogHeader';
import BlogForm from '../components/AddBlogPage/BlogForm';

const AddBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-background py-10 lg:py-20" >
      <AddBlogHeader />
      <main className="max-w-5xl mx-auto px-6 lg:px-8 mt-6">
        <BlogForm />
      </main>
    </div>
  );
};

export default AddBlog;