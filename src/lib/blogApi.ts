/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/blogApi.ts
import axios from 'axios';

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || 'https://threatzen-server.vercel.app';

/* ============================================================
   Types
   ============================================================ */

export interface Blog {
  _id: string;
  id?: string;
  imageUrl: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  readTime: string;
  content: string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AddBlogRequest {
  imageFile: File;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  readTime: string;
  content: string;
  tags?: string[];
}

export interface AddBlogResponse {
  success: boolean;
  message: string;
  data?: Blog;
}

export interface GetAllBlogsResponse {
  success: boolean;
  message?: string;
  data: Blog[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface GetBlogBySlugResponse {
  success: boolean;
  message?: string;
  data: Blog;
}

/** Optional query params for pagination / filtering */
export interface GetBlogsParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

/* ============================================================
   Utilities
   ============================================================ */

/**
 * Convert a title into a URL-safe slug.
 * e.g. "The 2025 Ransomware Playbook!" → "the-2025-ransomware-playbook"
 */
export const slugify = (input: string): string =>
  input
    .toLowerCase()
    .trim()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9\s-]/g, '')    // remove special chars
    .replace(/\s+/g, '-')            // spaces → dashes
    .replace(/-+/g, '-')             // collapse dashes
    .replace(/^-+|-+$/g, '');        // trim dashes

/* ============================================================
   Axios instance (shared config + auth interceptor)
   ============================================================ */

const http = axios.create({
  baseURL: API_BASE,
});

// Attach auth token if present
http.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ============================================================
   API
   ============================================================ */

export const blogApi = {
  /**
   * Create a new blog post with a featured image.
   * Sends multipart/form-data to POST /api/v1/blog/add
   */
  async addBlog(payload: AddBlogRequest): Promise<AddBlogResponse> {
    const formData = new FormData();

    formData.append('file', payload.imageFile);
    formData.append('title', payload.title);
    formData.append('slug', payload.slug);
    formData.append('category', payload.category);
    formData.append('shortDescription', payload.shortDescription);
    formData.append('readTime', payload.readTime);
    formData.append('content', payload.content);
    payload?.tags?.forEach((tag) => formData.append('tags', tag));

    const { data } = await http.post<AddBlogResponse>(
      '/api/v1/blog/add',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return data;
  },

  /**
   * Fetch all blog posts. Supports optional pagination/filter params.
   * GET /api/v1/blog/get-all
   */
  async getAllBlogs(params?: GetBlogsParams): Promise<GetAllBlogsResponse> {
    const { data } = await http.get<GetAllBlogsResponse>(
      '/api/v1/blog',
      {
        params: {
          page: params?.page,
          limit: params?.limit,
          category: params?.category,
          search: params?.search,
        },
      }
    );

    return data;
  },

  /**
   * Fetch a single blog post by its slug.
   * GET /api/v1/blog/:slug
   */
  async getBlogBySlug(slug: string): Promise<GetBlogBySlugResponse> {
    const { data } = await http.get<GetBlogBySlugResponse>(
      `/api/v1/blog/slug/${slug}`
    );

    return data;
  },

  /**
 * Update an existing blog post.
 * PATCH /api/v1/blog/update/:id  (multipart/form-data)
 */
  async updateBlog(payload: any): Promise<any> {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('slug', payload.slug);
    formData.append('category', payload.category);
    formData.append('shortDescription', payload.shortDescription);
    formData.append('readTime', payload.readTime);
    formData.append('content', payload.content);

    if (payload.tags) {
      payload.tags.forEach((tag: string) => formData.append('tags', tag));
    }

    // Only send a new file if one was picked
    if (payload.imageFile) {
      formData.append('file', payload.imageFile);
    }

    const { data } = await http.put<any>(
      `/api/v1/blog/update/${payload.id}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    return data;
  },


  async deleteBlog(id: string): Promise<any> {
    const { data } = await http.delete<any>(
      `/api/v1/blog/delete/${encodeURIComponent(id)}`
    );

    return data;
  },

};