import { Router } from 'express';
import * as faqController from '../controllers/faq.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public
router.get('/', faqController.getAllFAQs);
router.get('/:id', faqController.getFAQById);

// Admin (auth required)
router.post('/', authenticate, faqController.createFAQ);
router.put('/:id', authenticate, faqController.updateFAQ);
router.delete('/:id', authenticate, faqController.deleteFAQ);

export default router;
