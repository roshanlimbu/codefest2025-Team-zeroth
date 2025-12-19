import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { campaignController } from '../controllers/campaignController.js';

const router = express.Router();

// Admin-only: list all campaigns for moderation
router.get('/', requireAuth, campaignController.adminGetAllCampaigns);

export default router;
