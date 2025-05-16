import express from 'express';
import { login, getMe } from '../controller/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', login);

// GET /auth/me
router.get('/me', authenticateToken, getMe);

export default router;