import express from 'express';
import { campaignController } from '../controllers/campaignController.js';
import { upload } from '../services/multer.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();


// passed
// router.post('/upload/test', upload.array('media', 5), (req, res) => {
//     console.log("uploaded the files.");
//     console.log(req.files);
//     res.json({ message: 'Files uploaded successfully', files: req.files });
// });

router.get('/categories', campaignController.getCategories);

// Protected routes - require authentication
router.post('/createcampaign', requireAuth, upload.array('media', 5), campaignController.createCampaign);
router.get('/getcampaign', campaignController.getAllCampaigns);
router.get('/getcampaignbyid', campaignController.getCampaignById);
router.get('/mine', requireAuth, campaignController.getMyCampaigns);
router.put('/getcampaign', requireAuth, campaignController.updateCampaign);
// Admin-only campaign moderation
router.put('/admin/update-status', requireAuth, campaignController.adminUpdateStatus);

export default router;
