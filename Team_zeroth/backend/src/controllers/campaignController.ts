
import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma.js';
import { CampaignCategory, CampaignStatus } from '../../generated/prisma/index.js';
import { upload } from '../services/multer.js';


export const campaignController = {
    // Get all campaign categories (enums)
    getCategories: (req: Request, res: Response) => {
        const categories = Object.values(CampaignCategory);
        return res.json({ categories });
    },

    // Create a new campaign
    createCampaign: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const creatorId = (req as any).user?.id;
            if (!creatorId) {
                return res.status(401).json({ error: 'Not authenticated' });
            }

            const { title, category, location, description: rawDescription, links } = req.body;

            if (!title || !category || !rawDescription) {
                return res.status(400).json({ error: 'Missing required fields: title, category, description' });
            }

            const description = String(rawDescription || '').trim();
            const MAX_DESCRIPTION = 10000;
            const safeDescription = description.length > MAX_DESCRIPTION ? description.slice(0, MAX_DESCRIPTION) : description;

            const rawCat = String(category || '').trim().toLowerCase();
            const CATEGORY_MAP: Record<string, string> = {
                medical: 'MEDICAL',
                health: 'MEDICAL',
                disaster: 'DISASTER',
                education: 'EDUCATION',
                housing: 'HOUSING',
                livelihood: 'LIVELIHOOD',
                community: 'LIVELIHOOD',
                other: 'OTHER',
            };

            const mappedCategory = CATEGORY_MAP[rawCat] || rawCat.toUpperCase();

            // Validate mappedCategory is a valid CampaignCategory
            const validCategories = Object.values(CampaignCategory) as string[];
            if (!validCategories.includes(mappedCategory)) {
                return res.status(400).json({ error: `Invalid category. Valid categories: ${validCategories.join(', ')}` });
            }

            // Handle file uploads
            const files = req.files as Express.Multer.File[];
            const mediaData = files?.map(file => ({
                url: `/uploads/${file.filename}`, 
                type: file.mimetype.startsWith('image/') ? 'IMAGE' : 'VIDEO'
            })) || [];

            let parsedLinks = [];

            try {
                if (links) parsedLinks = typeof links === 'string' ? JSON.parse(links) : links;
            } catch (e) {
                return res.status(400).json({ 
                    error: 'Invalid JSON format for links. Expected format: [{"label":"string","url":"string"}]',
                    received: links
                });
            }


            // Parse milestones from request
            let parsedMilestones: any[] = [];
            if (req.body.milestones) {
                try {
                    parsedMilestones = typeof req.body.milestones === 'string'
                        ? JSON.parse(req.body.milestones)
                        : req.body.milestones;
                } catch (e) {
                    return res.status(400).json({ error: 'Invalid milestones format. Expected array.' });
                }
            }

            const campaign = await prisma.campaign.create({
                data: {
                    title,
                    category: mappedCategory as CampaignCategory,
                    location: location || '',
                    description: safeDescription,
                    creatorId,
                    status: CampaignStatus.DRAFT,
                    media: mediaData as any, // Store as JSON
                    ...(parsedLinks.length > 0 && {
                        links: {
                            create: parsedLinks.map((link: any) => ({
                                userId: creatorId,
                                label: link.label,
                                url: link.url
                            }))
                        }
                    }),
                    ...(parsedMilestones.length > 0 && {
                        milestones: {
                            create: parsedMilestones.map((m: any) => ({
                                userId: creatorId,
                                title: m.title,
                                description: m.description,
                                targetDate: m.targetDate ? new Date(m.targetDate) : new Date(),
                                target: BigInt(m.target || 0),
                                raisedAmount: BigInt(m.raisedAmount || 0),
                                isCompleted: !!m.isCompleted
                            }))
                        }
                    })
                },
                include: {
                    links: true,
                    milestones: true
                }
            });

            return res.status(201).json({
                ...campaign,
                milestones: (campaign.milestones || []).map(m => ({
                    ...m,
                    target: typeof m.target === 'bigint' ? Number(m.target) : m.target,
                    raisedAmount: typeof m.raisedAmount === 'bigint' ? Number(m.raisedAmount) : m.raisedAmount
                }))
            });
        } catch (err) {
            next(err);
        }
    },

    // Get all campaigns
    getAllCampaigns: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const campaigns = await prisma.campaign.findMany({
                include: {
                    creator: {
                        select: { name: true, email: true }
                    },
                    links: true,
                    milestones: true,
                    donations: true,
                },
                orderBy: { createdAt: 'desc' }
            });

            // Transform campaigns to include computed fields frontend expects
            const transformed = campaigns.map(c => {
                // media stored as JSON array of { url, type }
                const media = (c.media as any) || [];
                const heroImage = Array.isArray(media) && media.length > 0 ? media[0].url : null;

                // Compute fund target and raised from milestones
                const fundTarget = (c.milestones || []).reduce((sum: number, m: any) => {
                    const t = typeof m.target === 'bigint' ? Number(m.target) : Number(m.target || 0);
                    return sum + (isNaN(t) ? 0 : t);
                }, 0);

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
                    milestones: (c.milestones || []).map((m: any) => ({
                        ...m,
                        target: typeof m.target === 'bigint' ? Number(m.target) : m.target,
                        raisedAmount: typeof m.raisedAmount === 'bigint' ? Number(m.raisedAmount) : m.raisedAmount,
                    })),
                    creator: c.creator,
                    fundTarget,
                    fundRaised,
                };
            });

            return res.json(transformed);
        } catch (err) {
            next(err);
        }
    },

    // Get single campaign by ID
    getCampaignById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Accept id from body, query or params
            const id = req.body?.id || req.query?.id || req.params?.id;
            if (!id) return res.status(400).json({ error: 'Campaign ID is required' });

            const campaign = await prisma.campaign.findUnique({
                where: { id },
                include: {
                    links: true,
                    milestones: true,
                    donations: true,
                    creator: {
                        select: { name: true, email: true }
                    }
                }
            });

            if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

            // Transform to match frontend expectations (heroImage, fundTarget, fundRaised)
            const media = (campaign.media as any) || [];
            const heroImage = Array.isArray(media) && media.length > 0 ? media[0].url : null;

            const fundTarget = (campaign.milestones || []).reduce((sum: number, m: any) => {
                const t = typeof m.target === 'bigint' ? Number(m.target) : Number(m.target || 0);
                return sum + (isNaN(t) ? 0 : t);
            }, 0);

            let fundRaised = 0;
            if ((campaign.milestones || []).length > 0) {
                fundRaised = (campaign.milestones || []).reduce((sum: number, m: any) => {
                    const r = typeof m.raisedAmount === 'bigint' ? Number(m.raisedAmount) : Number(m.raisedAmount || 0);
                    return sum + (isNaN(r) ? 0 : r);
                }, 0);
            } else if ((campaign.donations || []).length > 0) {
                fundRaised = (campaign.donations || []).reduce((sum: number, d: any) => {
                    const a = typeof d.amount === 'bigint' ? Number(d.amount) : Number(d.amount || 0);
                    return sum + (isNaN(a) ? 0 : a);
                }, 0);
            }

            return res.json({
                id: campaign.id,
                title: campaign.title,
                category: campaign.category,
                location: campaign.location,
                heroImage,
                description: campaign.description,
                status: campaign.status,
                createdAt: campaign.createdAt,
                links: campaign.links || [],
                milestones: (campaign.milestones || []).map((m: any) => ({
                    ...m,
                    target: typeof m.target === 'bigint' ? Number(m.target) : m.target,
                    raisedAmount: typeof m.raisedAmount === 'bigint' ? Number(m.raisedAmount) : m.raisedAmount,
                })),
                creator: campaign.creator,
                fundTarget,
                fundRaised,
            });
        } catch (err) {
            next(err);
        }
    },

    // Update campaign
    updateCampaign: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.body;
            if (!id) return res.status(400).json({ error: 'Campaign ID is required' });

            // Get authenticated user
            const userId = (req as any).user?.id;
            if (!userId) {
                return res.status(401).json({ error: 'Not authenticated' });
            }

            // Verify the campaign belongs to the user
            const existingCampaign = await prisma.campaign.findUnique({ where: { id } });
            if (!existingCampaign) {
                return res.status(404).json({ error: 'Campaign not found' });
            }
            if (existingCampaign.creatorId !== userId) {
                return res.status(403).json({ error: 'Not authorized to update this campaign' });
            }

            const { title, category, location, description: updDesc, status } = req.body;

            // Truncate update description as well
            const updatedDescription = updDesc ? String(updDesc).trim().slice(0, 10000) : undefined;

            const updateData: any = {};
            if (title !== undefined) updateData.title = title;
            if (category !== undefined) updateData.category = category as CampaignCategory;
            if (location !== undefined) updateData.location = location;
            if (updatedDescription !== undefined) updateData.description = updatedDescription;
            if (status !== undefined) updateData.status = status as CampaignStatus;

            const campaign = await prisma.campaign.update({
                where: { id },
                data: updateData
            });

            return res.json(campaign);
        } catch (err) {
            // Handle record not found for update
            if ((err as any).code === 'P2025') {
                return res.status(404).json({ error: 'Campaign not found' });
            }
            next(err);
        }
    },

    // Admin: update campaign status (approve/reject/verify etc.)
    adminUpdateStatus: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, status } = req.body;
            if (!id || !status) return res.status(400).json({ error: 'Campaign id and status are required' });

            // Validate status
            const validStatuses = Object.values(CampaignStatus) as string[];
            if (!validStatuses.includes(status)) return res.status(400).json({ error: `Invalid status. Valid: ${validStatuses.join(', ')}` });

            // Check requester is admin by reading session via cookie
            const sid = (req as any).sessionId || req.cookies?.[process.env.COOKIE_NAME ?? 'sid'];
            if (!sid) return res.status(401).json({ error: 'Not authenticated' });

            const session = await prisma.session.findUnique({ where: { id: sid }, include: { user: true } });
            if (!session) return res.status(401).json({ error: 'Invalid session' });
            if (session.user.type !== 'ADMIN') return res.status(403).json({ error: 'Admin only' });

            const updated = await prisma.campaign.update({ where: { id }, data: { status: status as any } });
            return res.json({ message: 'Campaign status updated', campaign: updated });
        } catch (err) {
            next(err);
        }
    }
,
    // Get campaigns for the authenticated user (for dashboard)
    getMyCampaigns: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).user?.id;
            if (!userId) return res.status(401).json({ error: 'Not authenticated' });

            // Optional query param to filter by status (e.g., ?status=LIVE)
            const statusFilter = req.query?.status as string | undefined;

            const where: any = { creatorId: userId };
            if (statusFilter) where.status = statusFilter as any;

            const campaigns = await prisma.campaign.findMany({
                where,
                include: {
                    links: true,
                    milestones: true,
                    donations: true,
                    creator: { select: { id: true, name: true, email: true } }
                },
                orderBy: { createdAt: 'desc' }
            });

            const transformed = campaigns.map(c => {
                const media = (c.media as any) || [];
                const heroImage = Array.isArray(media) && media.length > 0 ? media[0].url : null;

                const fundTarget = (c.milestones || []).reduce((sum: number, m: any) => {
                    const t = typeof m.target === 'bigint' ? Number(m.target) : Number(m.target || 0);
                    return sum + (isNaN(t) ? 0 : t);
                }, 0);

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
                    milestones: (c.milestones || []).map((m: any) => ({
                        ...m,
                        target: typeof m.target === 'bigint' ? Number(m.target) : m.target,
                        raisedAmount: typeof m.raisedAmount === 'bigint' ? Number(m.raisedAmount) : m.raisedAmount,
                    })),
                    donations: (c.donations || []).map((d: any) => ({
                        ...d,
                        amount: typeof d.amount === 'bigint' ? Number(d.amount) : d.amount,
                    })),
                    creator: c.creator,
                    fundTarget,
                    fundRaised,
                };
            });

            return res.json(transformed);
        } catch (err) {
            next(err);
        }
    },
    adminGetAllCampaigns: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const sid = req.cookies?.[process.env.COOKIE_NAME ?? 'sid'];
            if (!sid) return res.status(401).json({ error: 'Not authenticated' });
            const session = await prisma.session.findUnique({ where: { id: sid }, include: { user: true } });
            if (!session) return res.status(401).json({ error: 'Invalid session' });
            if (session.user.type !== 'ADMIN') return res.status(403).json({ error: 'Admin only' });

            const campaigns = await prisma.campaign.findMany({
                include: {
                    creator: true,
                    links: true,
                    milestones: true,
                    donations: true,
                },
                orderBy: { createdAt: 'desc' }
            });

            const transformed = campaigns.map(c => {
                const media = (c.media as any) || [];
                const heroImage = Array.isArray(media) && media.length > 0 ? media[0].url : null;

                const fundTarget = (c.milestones || []).reduce((sum: number, m: any) => {
                    const t = typeof m.target === 'bigint' ? Number(m.target) : Number(m.target || 0);
                    return sum + (isNaN(t) ? 0 : t);
                }, 0);

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
                    milestones: (c.milestones || []).map((m: any) => ({
                        ...m,
                        target: typeof m.target === 'bigint' ? Number(m.target) : m.target,
                        raisedAmount: typeof m.raisedAmount === 'bigint' ? Number(m.raisedAmount) : m.raisedAmount,
                    })),
                    donations: (c.donations || []).map((d: any) => ({
                        ...d,
                        amount: typeof d.amount === 'bigint' ? Number(d.amount) : d.amount,
                    })),
                    creator: c.creator,
                    fundTarget,
                    fundRaised,
                };
            });

            return res.json(transformed);
        } catch (err) {
            next(err);
        }
    }

};
