import { Router } from 'express';
import { loginController } from '../controllers/auth.controller';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/errorHandler';

const router = Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidationErrors,
  ],
  loginController
);

export default router;

