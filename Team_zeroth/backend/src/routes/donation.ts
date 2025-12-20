import express from 'express'
import donationController from '../controllers/donationController.js'

const router = express.Router()

// Public endpoint to create a donation. Auth optional (userId attached if session present).
router.post('/create', donationController.createDonation)
router.get('/campaign/:id', donationController.getDonationsByCampaign)
router.get('/user/:id', donationController.getDonationsByUser)
router.get('/top-donors', donationController.getTopDonors)

export default router
