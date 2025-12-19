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
                kycVerified: true
            }
        });
        if (!user) return res.status(404).json({ error: 'User not found' });

        return res.json({ ok: true, user });
    } catch (err) {
        next(err);
    }
}
