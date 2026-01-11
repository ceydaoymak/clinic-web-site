import { Router } from 'express';
import * as commentController from '../controllers/comment.controller';

const router = Router();

router.get('/', commentController.getComments);
router.post('/', commentController.createComment);
router.post('/admin', commentController.createAdminComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

export default router;
