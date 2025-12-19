import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma.js';
import argon2 from 'argon2';
import axios from 'axios';
import { genCsrfToken } from '../utils/utils.js';
import { v4 as uuidv4 } from 'uuid';

const OTP_SERVICE = process.env.OTP_SERVICE ?? 'http://localhost:8081';
const COOKIE_NAME = process.env.COOKIE_NAME ?? 'sid';
const SESSION_TTL_MINUTES = Number(process.env.SESSION_TTL_MINUTES ?? 60);

const ROLE_BY_TYPE = {
    1: 'ADMIN',
    2: 'USER',
    3: 'DONOR',
} as const;

type Role = typeof ROLE_BY_TYPE[keyof typeof ROLE_BY_TYPE];

type PendingRegistration = {
    name: string;
    password: string;
    type: String,
    expiresAt: number;
};

const pendingRegistrations = new Map<string, PendingRegistration>();

export const auth = {
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, password, type } = req.body;

            if (!name || !email || !password || !type) {
                return res.status(400).json({ error: 'name, email, password and type required' });
            }

            const role = ROLE_BY_TYPE[Number(type) as keyof typeof ROLE_BY_TYPE];
            if (!role) {
                return res.status(400).json({ error: 'Invalid user type' });
            }

            const exists = await prisma.user.findUnique({ where: { email } });
            if (exists) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const hashed = await argon2.hash(password);

            await axios.post(`${OTP_SERVICE}/sendOTP`, { email });

            const expiresAt = Date.now() + 5 * 60 * 1000;

            pendingRegistrations.set(email, {
                name,
                password: hashed,
                type,
                expiresAt,
            });

            return res.status(201).json({
                message: 'OTP sent. Complete verification to finish registration.',
            });
        } catch (err) {
            console.error('[REGISTER] Error:', err);
            next(err);
        }
    },

    verifyOTP: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, otp } = req.body;

            if (!email || !otp) {
                return res.status(400).json({ error: 'email and otp required' });
            }

            const pending = pendingRegistrations.get(email);
            if (!pending) {
                return res.status(400).json({ error: 'No pending registration for this email' });
            }

            if (Date.now() > pending.expiresAt) {
                pendingRegistrations.delete(email);
                return res.status(400).json({ error: 'OTP expired. Please register again.' });
            }

            const resp = await axios.post(`${OTP_SERVICE}/verifyOTP`, { email, otp });
            if (!resp.data?.success) {
                return res.status(400).json({ error: 'Invalid OTP' });
            }

            const exists = await prisma.user.findUnique({ where: { email } });
            if (exists) {
                pendingRegistrations.delete(email);
                return res.status(400).json({ error: 'User already exists' });
            }
            const type = pending.type === '1' ? 'ADMIN' : pending.type === '2' ? 'USER' : 'DONOR';

            const user = await prisma.user.create({
                data: {
                    name: pending.name,
                    email,
                    type,
                    password: pending.password,
                    isVerified: true,
                },
            });

            pendingRegistrations.delete(email);

            return res.json({
                message: 'OTP verified and user registered',
                userId: user.id,
            });
        } catch (err) {
            console.error('[VERIFY_OTP] Error:', err);
            next(err);
        }
    },

    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            const user = await prisma.user.findUnique({ where: { email } });
            if (!user || !user.isVerified) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            const valid = await argon2.verify(user.password, password);
            if (!valid) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            const sessionId = uuidv4();
            const csrfToken = genCsrfToken();
            const expiresAt = new Date(Date.now() + SESSION_TTL_MINUTES * 60 * 1000);

            await prisma.session.create({
                data: {
                    id: sessionId,
                    userId: user.id,
                    csrfToken,
                    expiresAt,
                },
            });

            res.cookie(COOKIE_NAME, sessionId, {
                httpOnly: true,
                sameSite: 'lax',
                secure: false, // set true in prod (HTTPS)
                maxAge: SESSION_TTL_MINUTES * 60 * 1000,
            });

            return res.json({ message: 'Logged in', csrfToken });
        } catch (err) {
            console.error('[LOGIN] Error:', err);
            next(err);
        }
    },

    logOut: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const sessionId = req.cookies[COOKIE_NAME];
            if (!sessionId) {
                return res.status(400).json({ error: 'No active session' });
            }

            await prisma.session.deleteMany({ where: { id: sessionId } });

            res.cookie(COOKIE_NAME, '', {
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
                maxAge: 0,
            });

            return res.json({ message: 'Logged out' });
        } catch (err) {
            console.error('[LOGOUT] Error:', err);
            next(err);
        }
    },

    verifyKYC: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.body;

            const user = await prisma.user.findUnique({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            await prisma.user.update({
                where: { id: userId },
                data: { kycVerified: true },
            });

            return res.json({ message: 'KYC verified successfully' });
        } catch (err) {
            console.error('[VERIFY_KYC] Error:', err);
            next(err);
        }
    },
};

