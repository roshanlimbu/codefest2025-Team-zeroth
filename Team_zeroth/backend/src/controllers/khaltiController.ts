import { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import prisma from '../prisma.js'

const KHALTI_API_BASE = process.env.KHALTI_API_BASE || 'https://dev.khalti.com/api/v2'
const KHALTI_SECRET = process.env.KHALTI_SECRET_KEY || process.env.KHALTI_KEY || ''

if (!KHALTI_SECRET) {
  console.warn('KHALTI_SECRET_KEY is not set — Khalti requests will fail. Set KHALTI_SECRET_KEY in backend/.env or env vars.');
}

const khaltiController = {
  initiate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!KHALTI_SECRET) return res.status(500).json({ error: 'KHALTI_SECRET_KEY not configured on server' })
      const { amount, purchase_order_id, purchase_order_name, return_url, website_url, customer_info } = req.body
      if (!amount || !purchase_order_id || !purchase_order_name || !return_url || !website_url) {
        return res.status(400).json({ error: 'Missing required fields: amount, purchase_order_id, purchase_order_name, return_url, website_url' })
      }

      const payload = {
        amount,
        purchase_order_id,
        purchase_order_name,
        return_url,
        website_url,
        customer_info,
      }

      const resp = await axios.post(`${KHALTI_API_BASE}/epayment/initiate/`, payload, {
        headers: {
          Authorization: `Key ${KHALTI_SECRET}`,
          'Content-Type': 'application/json'
        }
      })

      return res.json({ ok: true, data: resp.data })
    } catch (err: any) {
      const status = err.response?.status || 500
      const data = err.response?.data || { message: err.message }
      return res.status(status).json({ error: 'Khalti initiate failed', details: data })
    }
  },

  lookup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!KHALTI_SECRET) return res.status(500).json({ error: 'KHALTI_SECRET_KEY not configured on server' })
      const { pidx } = req.body
      if (!pidx) return res.status(400).json({ error: 'pidx is required' })

      const resp = await axios.post(`${KHALTI_API_BASE}/epayment/lookup/`, { pidx }, {
        headers: { Authorization: `Key ${KHALTI_SECRET}`, 'Content-Type': 'application/json' }
      })

      return res.json({ ok: true, data: resp.data })
    } catch (err: any) {
      const status = err.response?.status || 500
      const data = err.response?.data || { message: err.message }
      return res.status(status).json({ error: 'Khalti lookup failed', details: data })
    }
  }

  ,
  // Confirm a Khalti payment (lookup by pidx) and persist donation server-side
  confirm: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!KHALTI_SECRET) return res.status(500).json({ error: 'KHALTI_SECRET_KEY not configured on server' })
      const { pidx, campaignId, anonymous = false, message = '' } = req.body
      if (!pidx || !campaignId) return res.status(400).json({ error: 'pidx and campaignId are required' })

      // lookup on Khalti
      const resp = await axios.post(`${KHALTI_API_BASE}/epayment/lookup/`, { pidx }, {
        headers: { Authorization: `Key ${KHALTI_SECRET}`, 'Content-Type': 'application/json' }
      })

      const data = resp.data
      // Khalti returns an object with status; consider 'Completed' as success
      const status = data?.status || data?.payment?.status || null
      if (!status || status !== 'Completed') {
        return res.status(400).json({ error: 'payment not completed', details: data })
      }

      // Determine amount in paisa -> convert to NPR
      const total_amount = data?.total_amount ?? data?.payment?.amount ?? null
      const amountPaisa = Number(total_amount || 0)
      const amount = Math.round(amountPaisa / 100)

      const userId = (req as any).user?.id || null
      // Check existing donation by khaltiPidx to ensure idempotency
      try {
        console.log(`[khalti/confirm] lookup existing donation for pidx=${pidx}`)
        const existing = await prisma.donation.findUnique({ where: { khaltiPidx: pidx } })
        if (existing) {
          console.log(`[khalti/confirm] existing donation found id=${existing.id}`)
          return res.json({ ok: true, data: { donationId: existing.id, amount: typeof existing.amount === 'bigint' ? Number(existing.amount) : existing.amount, khaltiPidx: existing.khaltiPidx || null, alreadyExists: true } })
        }

        // Persist donation with khaltiPidx
        console.log(`[khalti/confirm] creating donation for campaign=${campaignId} amount=${amount} pidx=${pidx}`)
        const donation = await prisma.donation.create({
          data: {
            campaignId,
            userId,
            amount: BigInt(Math.max(0, amount)),
            anonymous: !!anonymous,
            message: message || `Khalti pidx:${pidx}`,
            khaltiPidx: pidx
          }
        })

        console.log(`[khalti/confirm] created donation id=${donation.id} khaltiPidx=${pidx}`)

        return res.json({ ok: true, data: { donationId: donation.id, amount: typeof donation.amount === 'bigint' ? Number(donation.amount) : donation.amount, khaltiPidx: pidx } })
      } catch (dbErr: any) {
        // Handle unique constraint race: if another process inserted same pidx, return that record
        if (dbErr?.code === 'P2002' || dbErr?.code === '23505') {
          const found = await prisma.donation.findUnique({ where: { khaltiPidx: pidx } })
          if (found) return res.json({ ok: true, data: { donationId: found.id, amount: typeof found.amount === 'bigint' ? Number(found.amount) : found.amount, alreadyExists: true } })
        }
        throw dbErr
      }
    } catch (err: any) {
      const status = err.response?.status || 500
      const data = err.response?.data || { message: err.message }
      return res.status(status).json({ error: 'Khalti confirm failed', details: data })
    }
  }

  ,
  // Debug: return donation by khaltiPidx
  debug: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pidx = req.params?.pidx
      if (!pidx) return res.status(400).json({ error: 'pidx param required' })
      const found = await prisma.donation.findUnique({ where: { khaltiPidx: pidx } })
      return res.json({ ok: true, data: found })
    } catch (err: any) {
      const status = err.response?.status || 500
      const data = err.response?.data || { message: err.message }
      return res.status(status).json({ error: 'khalti debug failed', details: data })
    }
  }
}

export default khaltiController
