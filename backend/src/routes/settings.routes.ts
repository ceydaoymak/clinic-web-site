import { Router } from 'express';
import { getSettingsController, updateSettingsController } from '../controllers/settings.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', getSettingsController);
router.put('/', authenticate, updateSettingsController);

export default router;
