
import express from 'express';
import { campaignController, upload } from '../controllers/campaignController.js';

const router = express.Router();

// Public routes (or protected if middleware is added)
router.get('/categories', campaignController.getCategories);

router.post('/', upload.array('media', 5), campaignController.createCampaign); // Limit to 5 files
router.get('/', campaignController.getAllCampaigns);
router.get('/:id', campaignController.getCampaignById);
router.put('/:id', campaignController.updateCampaign);
router.delete('/:id', campaignController.deleteCampaign);

export default router;
