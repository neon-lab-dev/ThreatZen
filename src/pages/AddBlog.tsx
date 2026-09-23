import React from "react";
import AddBlogHeader from "../components/AddBlogPage/AddBlogHeader";
import BlogForm from "../components/AddBlogPage/BlogForm";
import { useParams } from "react-router-dom";

const AddBlog: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-8 min-h-screen bg-background">
      <AddBlogHeader />
      <BlogForm slug={slug} />
    </div>
  );
};

export default AddBlog;
