import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma.js';
import argon2 from 'argon2';
import axios from 'axios';
import { genCsrfToken } from '../utils/utils.js';
import { v4 as uuidv4 } from 'uuid';


export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // `requireAuth` middleware attaches `req.user = { id, email }`
        const userId = (req as any).user?.id;
        if (!userId) return res.status(401).json({ error: 'Not authenticated' });

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                type: true,
                phoneNumber: true,
                kycVerified: true,
            }
        });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Also fetch user's campaigns (lightweight payload) so frontend can show them on dashboard
        const campaigns = await prisma.campaign.findMany({
            where: { creatorId: userId },
            include: {
                links: true,
                milestones: true,
                donations: true,
            },
            orderBy: { createdAt: 'desc' }
        });

        // Transform campaigns to include computed fields frontend expects
        const transformed = (campaigns || []).map(c => {
            const media = (c as any).media || [];
            const heroImage = Array.isArray(media) && media.length > 0 ? media[0].url : null;

            const fundTarget = (c.milestones || []).reduce((sum: number, m: any) => {
                const t = typeof m.target === 'bigint' ? Number(m.target) : Number(m.target || 0);
                return sum + (isNaN(t) ? 0 : t);
            }, 0);

            // If milestones exist, derive raised amount from milestone `raisedAmount`.
            // Otherwise fall back to summing direct donations for the campaign (handles legacy or no-milestone campaigns).
            let fundRaised = 0;
            if ((c.milestones || []).length > 0) {
                fundRaised = (c.milestones || []).reduce((sum: number, m: any) => {
                    const r = typeof m.raisedAmount === 'bigint' ? Number(m.raisedAmount) : Number(m.raisedAmount || 0);
                    return sum + (isNaN(r) ? 0 : r);
                }, 0);
            } else if ((c.donations || []).length > 0) {
                fundRaised = (c.donations || []).reduce((sum: number, d: any) => {
                    const a = typeof d.amount === 'bigint' ? Number(d.amount) : Number(d.amount || 0);
                    return sum + (isNaN(a) ? 0 : a);
                }, 0);
            }

            return {
                id: c.id,
                title: c.title,
                category: c.category,
                location: c.location,
                heroImage,
                description: c.description,
                status: c.status,
                createdAt: c.createdAt,
                links: c.links || [],
                milestones: c.milestones || [],
                fundTarget,
                fundRaised,
            };
        });

        const payload = { ok: true, user, campaigns: transformed };

        // Safely serialize BigInt values (Prisma may return BigInt for IDs/amounts)
        const safe = JSON.parse(JSON.stringify(payload, (_key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        return res.json(safe);
    } catch (err) {
        next(err);
    }
}
