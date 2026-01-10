import { Router } from 'express';
import {
  getServices,
  getService,
  createServiceController,
  updateServiceController,
  deleteServiceController,
} from '../controllers/service.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', getServices);
router.get('/:slug', getService);
router.post('/', authenticate, createServiceController);
router.put('/:id', authenticate, updateServiceController);
router.delete('/:id', authenticate, deleteServiceController);

export default router;

