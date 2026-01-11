import { Router } from 'express';
import { sendContactMessage, getMessagesController } from '../controllers/contact.controller';

const router = Router();


router.post('/', sendContactMessage);
router.get('/', getMessagesController);

export default router;
