
export interface Comment {
  id: string;
  initials: string;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  author: User;
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  total: number;
  pages: number;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  icon?: string;
  image?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  url: string;
  createdAt: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

