import express from 'express'
import donationController from '../controllers/donationController.js'
import { requireAuth } from '../middleware/auth.js'

const router = express.Router()

// All donations require authentication; userId will always be set.
router.post('/create', requireAuth, donationController.createDonation)
router.get('/campaign/:id', donationController.getDonationsByCampaign)
router.get('/user/:id', donationController.getDonationsByUser)
router.get('/top-donors', donationController.getTopDonors)

export default router
