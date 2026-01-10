import prisma from '../config/database';
import { BlogPost } from '@prisma/client';

export interface CreateBlogPostData {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  published?: boolean;
  authorId: string;
}

export interface UpdateBlogPostData {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  published?: boolean;
}

export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const createBlogPost = async (data: CreateBlogPostData): Promise<BlogPost> => {
  const publishedAt = data.published ? new Date() : null;
  
  return prisma.blogPost.create({
    data: {
      ...data,
      publishedAt,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const updateBlogPost = async (
  id: string,
  data: UpdateBlogPostData
): Promise<BlogPost> => {
  const updateData: any = { ...data };
  
  if (data.published !== undefined) {
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (existing && !existing.published && data.published) {
      updateData.publishedAt = new Date();
    } else if (data.published === false) {
      updateData.publishedAt = null;
    }
  }

  return prisma.blogPost.update({
    where: { id },
    data: updateData,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  await prisma.blogPost.delete({ where: { id } });
};

export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  return prisma.blogPost.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  return prisma.blogPost.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const getPublishedBlogPosts = async (
  page: number = 1,
  limit: number = 10
): Promise<{ posts: BlogPost[]; total: number; pages: number }> => {
  const skip = (page - 1) * limit;
  
  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      skip,
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    }),
    prisma.blogPost.count({ where: { published: true } }),
  ]);

  return {
    posts,
    total,
    pages: Math.ceil(total / limit),
  };
};

export const getAllBlogPosts = async (
  page: number = 1,
  limit: number = 10
): Promise<{ posts: BlogPost[]; total: number; pages: number }> => {
  const skip = (page - 1) * limit;
  
  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    }),
    prisma.blogPost.count(),
  ]);

  return {
    posts,
    total,
    pages: Math.ceil(total / limit),
  };
};

