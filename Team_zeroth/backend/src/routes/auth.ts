import express from 'express';
import { auth } from '../controllers/authController.js';

const router = express.Router();
router.post('/register', auth.register);
router.post('/verifyOTP', auth.verifyOTP);
router.post('/login', auth.login);
router.post('/logout', auth.logOut);
router.post('/verifyKYC', auth.verifyKYC);


export default router;
