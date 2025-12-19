
import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { CampaignCategory, CampaignStatus } from '../../generated/prisma/index.js';


const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

export const upload = multer({ storage: storage });


export const campaignController = {
    // Get all campaign categories (enums)
    getCategories: (req: Request, res: Response) => {
        const categories = Object.values(CampaignCategory);
        return res.json({ categories });
    },

    // Create a new campaign
    createCampaign: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title, category, location, description, links, milestones, creatorId } = req.body;

            // Basic validation
            if (!title || !category || !description || !creatorId) {
                return res.status(400).json({ error: 'Missing required fields: title, category, description, creatorId' });
            }

            // Handle file uploads
            const files = req.files as Express.Multer.File[];
            const mediaData = files?.map(file => ({
                userId: creatorId,
                url: `/uploads/${file.filename}`, // URL accessible from frontend
                type: file.mimetype.startsWith('image/') ? 'IMAGE' : 'VIDEO' // Simple type deduction
            })) || [];

            // Parse links and milestones if they are sent as JSON strings (common with FormData)
            let parsedLinks = [];
            let parsedMilestones = [];

            try {
                if (links) parsedLinks = typeof links === 'string' ? JSON.parse(links) : links;
                if (milestones) parsedMilestones = typeof milestones === 'string' ? JSON.parse(milestones) : milestones;
            } catch (e) {
                return res.status(400).json({ error: 'Invalid JSON format for links or milestones' });
            }


            const campaign = await prisma.campaign.create({
                data: {
                    title,
                    category: category as CampaignCategory,
                    location: location || '',
                    description,
                    creatorId,
                    status: CampaignStatus.DRAFT,
                    media: {
                        create: mediaData
                    },
                    links: {
                        create: parsedLinks.map((link: any) => ({
                            userId: creatorId,
                            label: link.label,
                            url: link.url
                        }))
                    },
                    milestones: {
                        create: parsedMilestones.map((ms: any) => ({
                            userId: creatorId,
                            title: ms.title,
                            description: ms.description,
                            targetDate: new Date(ms.targetDate)
                        }))
                    }
                },
                include: {
                    media: true,
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
                    media: true,
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
            const { id } = req.params;
            if (!id) return res.status(400).json({ error: 'Campaign ID is required' });

            const campaign = await prisma.campaign.findUnique({
                where: { id },
                include: {
                    media: true,
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
            const { id } = req.params;
            if (!id) return res.status(400).json({ error: 'Campaign ID is required' });

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

    // Delete campaign
    deleteCampaign: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ error: 'Campaign ID is required' });

            await prisma.campaign.delete({
                where: { id }
            });
            return res.json({ message: 'Campaign deleted successfully' });
        } catch (err) {
            if ((err as any).code === 'P2025') {
                return res.status(404).json({ error: 'Campaign not found' });
            }
            next(err);
        }
    }
};
