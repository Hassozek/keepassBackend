import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Routes for user management

// Register user - already defined in auth.routes.ts, but included here for completeness
router.post('/register', authController.validateRegister, authController.register);

export default router;
