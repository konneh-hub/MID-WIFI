import express from 'express';
import { body } from 'express-validator';
import { loginAdmin } from '../controllers/authController.js';
import { validateRequest } from '../middleware/validate.js';

const router = express.Router();

router.post('/login', body('email').isEmail(), body('password').isLength({ min: 6 }), validateRequest, loginAdmin);

export default router;
