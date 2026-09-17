// lib/blogApi.ts
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export interface AddBlogPayload {
  name: string;
  shortDescription: string;
  category: string;
  readTime: string;
  image: string;       // URL after upload, or base64
  content: string;     // HTML from the editor
}

export interface AddBlogResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    slug: string;
  };
}

export const blogApi = {
  /**
   * Upload an image. Adjust the endpoint if your backend expects
   * a different path (e.g. /api/v1/upload).
   */
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);

    const { data } = await axios.post<{ url: string }>(
      `${API_BASE}/api/v1/upload`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return data.url;
  },

  /**
   * Submit the new blog post.
   */
  async addBlog(payload: AddBlogPayload): Promise<AddBlogResponse> {
    const { data } = await axios.post<AddBlogResponse>(
      `${API_BASE}/api/v1/blog/add`,
      payload,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return data;
  },
};