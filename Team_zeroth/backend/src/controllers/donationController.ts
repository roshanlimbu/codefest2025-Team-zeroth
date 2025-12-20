import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma.js';

const donationController = {
    // Create a donation and allocate it to the first incomplete milestone (if any)
    createDonation: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { campaignId, amount, anonymous = false, message = '' } = req.body;
            if (!campaignId || amount === undefined || amount === null) {
                return res.status(400).json({ error: 'campaignId and amount are required' });
            }

            const amt = BigInt(Math.max(0, Number(amount)));

            const campaign = await prisma.campaign.findUnique({
                where: { id: campaignId },
                include: { milestones: true }
            });

            if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

            const userId = (req as any).user?.id || null;

            const donation = await prisma.donation.create({
                data: {
                    campaignId,
                    userId,
                    amount: amt,
                    anonymous: !!anonymous,
                    message,
                },
                include: { user: { select: { name: true } } }
            });

            // Allocate funds to first incomplete milestone if present
            const milestones = campaign.milestones || [];
            const next = milestones.find(m => {
                const t = typeof m.target === 'bigint' ? m.target : BigInt(Number(m.target || 0));
                const r = typeof m.raisedAmount === 'bigint' ? m.raisedAmount : BigInt(Number(m.raisedAmount || 0));
                return t > r;
            });

            if (next) {
                const t = (typeof next.target === 'bigint') ? next.target : BigInt(Number(next.target || 0));
                const r = (typeof next.raisedAmount === 'bigint') ? next.raisedAmount : BigInt(Number(next.raisedAmount || 0));
                const remaining = t - r;
                const toAdd = amt <= remaining ? amt : remaining;

                await prisma.campaignMilestone.update({
                    where: { id: next.id },
                    data: { raisedAmount: r + toAdd }
                });
            }

            // Transform BigInt amount to number for JSON serialization
            const transformedDonation = {
                id: donation.id,
                campaignId: donation.campaignId,
                userId: donation.userId,
                amount: typeof donation.amount === 'bigint' ? Number(donation.amount) : Number(donation.amount || 0),
                anonymous: !!donation.anonymous,
                message: donation.message || '',
                createdAt: donation.createdAt,
                donorName: donation.anonymous ? null : (donation.user ? donation.user.name : null),
            }

            return res.status(201).json({ ok: true, donation: transformedDonation });
        } catch (err) {
            next(err);
        }
    },
    // Get donations for a campaign
    getDonationsByCampaign: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Normalize campaign id from params or query
            let rawId: any = req.params?.id ?? req.query?.id
            let campaignIdStr: string | undefined
            if (Array.isArray(rawId)) campaignIdStr = rawId[0]
            else if (typeof rawId === 'string') campaignIdStr = rawId
            else if (rawId != null) campaignIdStr = String(rawId)

            if (!campaignIdStr) return res.status(400).json({ error: 'Campaign ID is required' })

            // cast to any because generated prisma types may be out-of-sync during development
            const donations: any[] = await prisma.donation.findMany({
                where: { campaignId: campaignIdStr },
                include: { user: { select: { name: true } } },
                orderBy: { createdAt: 'desc' }
            }) as any

            const transformed = donations.map((d: any) => ({
                id: d.id,
                amount: typeof d.amount === 'bigint' ? Number(d.amount) : Number(d.amount || 0),
                anonymous: !!d.anonymous,
                message: d.message || '',
                createdAt: d.createdAt,
                donorName: d.anonymous ? null : (d.user ? d.user.name : null),
            }))

            return res.json({ ok: true, donations: transformed })
        } catch (err) {
            next(err)
        }
    }
    ,
    // Get donations for a user (donor)
    getDonationsByUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let rawId: any = req.params?.id ?? req.query?.id
            let userIdStr: string | undefined
            if (Array.isArray(rawId)) userIdStr = rawId[0]
            else if (typeof rawId === 'string') userIdStr = rawId
            else if (rawId != null) userIdStr = String(rawId)

            if (!userIdStr) return res.status(400).json({ error: 'User ID is required' })

            const donations: any[] = await prisma.donation.findMany({
                where: { userId: userIdStr },
                include: { campaign: { select: { id: true, title: true } } },
                orderBy: { createdAt: 'desc' }
            }) as any

            const transformed = donations.map((d: any) => ({
                id: d.id,
                amount: typeof d.amount === 'bigint' ? Number(d.amount) : Number(d.amount || 0),
                anonymous: !!d.anonymous,
                message: d.message || '',
                createdAt: d.createdAt,
                campaignId: d.campaign ? d.campaign.id : null,
                campaignTitle: d.campaign ? d.campaign.title : null,
            }))

            return res.json({ ok: true, donations: transformed })
        } catch (err) {
            next(err)
        }
    }
};

export default donationController;
