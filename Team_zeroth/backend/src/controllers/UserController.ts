import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma.js';


export const userFuncObj = {
    getAllusers: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    type: true,
                    kycVerified: true,
                    kycSubmittedAt: true,
                    kycDocuments: true,
                    createdAt: true,
                    updatedAt: true
                },
                orderBy: { createdAt: 'desc' }
            });

            return res.json({ users });
        } catch (err) {
            next(err);
        }

    },
    getUserById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: 'User id is required' });
            }

            const user = await prisma.user.findUnique({
                where: { id }
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.json({ user });
        } catch (err) {
            next(err);
        }
    }
} 
