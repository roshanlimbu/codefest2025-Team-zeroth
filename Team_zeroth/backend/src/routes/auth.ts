import express from 'express';
import { auth } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../services/multer.js';

const router = express.Router();
router.post('/register', auth.register);
router.post('/verifyOTP', auth.verifyOTP);
router.post('/login', auth.login);
router.post('/logout', auth.logOut);
router.post('/verifyKYC', auth.verifyKYC);

router.post('/submitKYC', requireAuth, upload.fields([
    { name: 'citizenship', maxCount: 2 },
    { name: 'passport', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
    { name: 'signature', maxCount: 1 }
]), auth.submitKYC);


export default router;
