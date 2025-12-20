import express from 'express'
import khaltiController from '../controllers/khaltiController.js'

const router = express.Router()

// POST /api/payments/khalti/initiate
router.post('/initiate', khaltiController.initiate)

// POST /api/payments/khalti/lookup
router.post('/lookup', khaltiController.lookup)

// POST /api/payments/khalti/confirm
router.post('/confirm', khaltiController.confirm)

// GET /api/payments/khalti/debug/:pidx
router.get('/debug/:pidx', khaltiController.debug)

export default router
