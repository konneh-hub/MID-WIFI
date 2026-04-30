import express from 'express';
import { body } from 'express-validator';
import { loginAdmin, loginStudent, logout, getCurrentUser } from '../controllers/authController.js';
import { validateRequest } from '../middleware/validate.js';

const router = express.Router();

router.post('/login', body('email').isEmail(), body('password').isLength({ min: 6 }), validateRequest, loginAdmin);
router.post('/student/login', body('email').isEmail(), body('password').isLength({ min: 6 }), validateRequest, loginStudent);
router.post('/logout', logout);
router.get('/me', getCurrentUser);

export default router;
