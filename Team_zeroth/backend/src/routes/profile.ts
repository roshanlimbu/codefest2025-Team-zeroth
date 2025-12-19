import express from 'express';
import { requireAuth, AuthedRequest } from '../middleware/auth.js';
import { getProfile } from '../controllers/profileController.js';
const router = express.Router();

router.get('/profile', requireAuth, getProfile);

export default router;
