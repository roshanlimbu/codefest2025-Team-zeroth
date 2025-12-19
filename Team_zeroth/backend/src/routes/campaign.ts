
import express from 'express';
import { campaignController } from '../controllers/campaignController.js';
import { upload } from '../services/multer.js';

const router = express.Router();


router.post('/upload/test', upload.array('media', 5), (req, res) => {
    console.log("uploaded the files.");
    console.log(req.files);
    res.json({ message: 'Files uploaded successfully', files: req.files });
});

router.get('/categories', campaignController.getCategories);




router.post('createcampaign', upload.array('media', 5), campaignController.createCampaign);
router.get('getcampaign', campaignController.getAllCampaigns);
router.get('getcampaign/:id', campaignController.getCampaignById);
router.put('getcampaign/:id', campaignController.updateCampaign);
router.delete('getcampaign/:id', campaignController.deleteCampaign);

export default router;
