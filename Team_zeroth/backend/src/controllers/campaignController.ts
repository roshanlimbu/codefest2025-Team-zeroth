
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

            const { title, category, location, description, links } = req.body;

            if (!title || !category || !description) {
                return res.status(400).json({ error: 'Missing required fields: title, category, description' });
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


            const campaign = await prisma.campaign.create({
                data: {
                    title,
                    category: category as CampaignCategory,
                    location: location || '',
                    description,
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
                },
                include: {
                    links: true,
                    milestones: true
                }
            });

            return res.status(201).json(campaign);
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
                    }
                },
                orderBy: { createdAt: 'desc' }
            });
            return res.json(campaigns);
        } catch (err) {
            next(err);
        }
    },

    // Get single campaign by ID
    getCampaignById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.body;
            if (!id) return res.status(400).json({ error: 'Campaign ID is required' });

            const campaign = await prisma.campaign.findUnique({
                where: { id },
                include: {
                    links: true,
                    milestones: true,
                    creator: {
                        select: { name: true, email: true }
                    }
                }
            });

            if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
            return res.json(campaign);
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

            const { title, category, location, description, status } = req.body;

            const campaign = await prisma.campaign.update({
                where: { id },
                data: {
                    title,
                    category: category as CampaignCategory,
                    location,
                    description,
                    status: status as CampaignStatus
                }
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

};
