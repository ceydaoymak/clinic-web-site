import { Router } from 'express';
import { uploadMedia, getMedia, deleteMediaController } from '../controllers/media.controller';
import { authenticate } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', authenticate, getMedia);
router.post('/upload', authenticate, upload.single('file'), uploadMedia);
router.delete('/:id', authenticate, deleteMediaController);

export default router;

