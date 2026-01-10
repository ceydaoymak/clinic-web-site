import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogPostById,
  getBlogPostBySlug,
  getPublishedBlogPosts,
  getAllBlogPosts,
  createSlug,
} from '../services/blog.service';

export const getBlogPosts = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const publishedOnly = req.query.published === 'true';

    const result = publishedOnly
      ? await getPublishedBlogPosts(page, limit)
      : await getAllBlogPosts(page, limit);

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBlogPostByIdController = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const post = await getBlogPostById(id);

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json(post);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBlogPost = async (req: AuthRequest, res: Response) => {
  try {
    const { slug } = req.params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    if (!post.published && !req.userId) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json(post);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createBlogPostController = async (req: AuthRequest, res: Response) => {
  try {
    const { title, excerpt, content, coverImage, published } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const slug = createSlug(title);
    const existing = await getBlogPostBySlug(slug);
    
    if (existing) {
      return res.status(400).json({ error: 'A post with this title already exists' });
    }

    const post = await createBlogPost({
      title,
      slug,
      excerpt,
      content,
      coverImage,
      published: published || false,
      authorId: req.userId,
    });

    res.status(201).json(post);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBlogPostController = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, coverImage, published } = req.body;

    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const existing = await getBlogPostById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content !== undefined) updateData.content = content;
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (published !== undefined) updateData.published = published;

    if (title && title !== existing.title) {
      const newSlug = createSlug(title);
      const slugExists = await getBlogPostBySlug(newSlug);
      if (slugExists && slugExists.id !== id) {
        return res.status(400).json({ error: 'A post with this title already exists' });
      }
      updateData.slug = newSlug;
    }

    const post = await updateBlogPost(id, updateData);
    res.json(post);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBlogPostController = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const existing = await getBlogPostById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    await deleteBlogPost(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

