import React from "react";

const AddBlogHeader: React.FC = () => {
  return (
    <div className="mb-10">
      <h1 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
        Add New Blog
      </h1>
      <p className="text-sm text-muted-foreground mt-1">
        Create, edit, and manage all blog articles.
      </p>
    </div>
  );
};

export default AddBlogHeader;
