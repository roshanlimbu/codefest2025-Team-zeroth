import { Request, Response, NextFunction } from 'express';
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient().$extends(withAccelerate())


export const userFuncObj = {
    getAllusers: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await prisma.user.findMany({
                cacheStrategy: { 
                    ttl: 30, // Consider data fresh for 30 seconds
                    swr: 60  // Serve stale data for up to 60 seconds while fetching fresh data
                }
            })
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
