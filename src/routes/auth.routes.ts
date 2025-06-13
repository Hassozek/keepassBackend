import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const router = Router();

// Register new user
router.post('/register', authController.validateRegister, authController.register);

// Login user
router.post('/auth', authController.validateLogin, authController.login);

export default router;
