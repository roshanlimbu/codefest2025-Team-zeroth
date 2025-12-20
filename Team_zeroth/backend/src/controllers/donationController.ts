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
                include: { campaign: { include: { milestones: true }, select: { id: true, title: true, milestones: true } } },
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
                campaignMilestones: (d.campaign && Array.isArray(d.campaign.milestones)) ? d.campaign.milestones.map((m: any) => ({
                    id: m.id,
                    title: m.title,
                    target: typeof m.target === 'bigint' ? Number(m.target) : Number(m.target || 0),
                    raisedAmount: typeof m.raisedAmount === 'bigint' ? Number(m.raisedAmount) : Number(m.raisedAmount || 0),
                    isFulfilled: (typeof m.target === 'bigint' ? Number(m.target) : Number(m.target || 0)) <= (typeof m.raisedAmount === 'bigint' ? Number(m.raisedAmount) : Number(m.raisedAmount || 0)) || !!m.isCompleted
                })) : []
            }))

            return res.json({ ok: true, donations: transformed })
        } catch (err) {
            next(err)
        }
    }
    ,
    // Get top donors ranked by total donated amount (public)
    getTopDonors: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const limitStr = (req.query?.limit as string) || '10'
            const limit = Math.min(100, Math.max(1, Number(limitStr) || 10))

            // Group donations by userId and sum amounts for registered donors only
            const groups = await prisma.donation.groupBy({
                by: ['userId'],
                where: { userId: { not: null } },
                _sum: { amount: true },
                _count: { id: true },
                orderBy: { _sum: { amount: 'desc' } },
                take: limit * 2 // fetch extra, filter below
            });

            const userIds = groups.map(g => g.userId).filter((id): id is string => typeof id === 'string');
            const users = userIds.length ? await prisma.user.findMany({ where: { id: { in: userIds } }, select: { id: true, name: true, type: true } }) : [];
            const userMap: Record<string, any> = {};
            users.forEach(u => { userMap[u.id] = u });

            // Only include users with type DONOR
            const filteredGroups = groups.filter(g => g.userId && userMap[g.userId]?.type === 'DONOR').slice(0, limit);

            const transformed = filteredGroups.map((g, idx) => ({
                rank: idx + 1,
                userId: g.userId || null,
                name: g.userId ? (userMap[g.userId]?.name || 'User') : 'Anonymous/Guest',
                totalAmount: typeof g._sum.amount === 'bigint' ? Number(g._sum.amount) : Number(g._sum.amount || 0),
                donationsCount: g._count?.id || 0
            }));

            return res.json({ ok: true, donors: transformed });
        } catch (err) {
            next(err)
        }
    }
};

export default donationController;
