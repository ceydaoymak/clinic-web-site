import { Router } from 'express';
import {
  getBlogPosts,
  getBlogPost,
  getBlogPostByIdController,
  createBlogPostController,
  updateBlogPostController,
  deleteBlogPostController,
} from '../controllers/blog.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', getBlogPosts);
router.get('/id/:id', authenticate, getBlogPostByIdController);
router.get('/:slug', getBlogPost);
router.post('/', authenticate, createBlogPostController);
router.put('/:id', authenticate, updateBlogPostController);
router.delete('/:id', authenticate, deleteBlogPostController);

export default router;

