import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma.js';
import argon2 from 'argon2';
import axios from 'axios';
import { genCsrfToken } from '../utils/utils.js';
import { v4 as uuidv4 } from 'uuid';

const OTP_SERVICE = process.env.OTP_SERVICE ?? 'http://localhost:8081';
const COOKIE_NAME = process.env.COOKIE_NAME ?? 'sid';
const SESSION_TTL_MINUTES = Number(process.env.SESSION_TTL_MINUTES ?? 60);

// pending registrations stored in-memory until OTP verification completes
const pendingRegistrations = new Map<string, { name: string; password: string; expiresAt: number }>();


export const auth = {
    register : async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password)
                return res.status(400).json({ error: 'name, email and password required' });

            const exists = await prisma.user.findUnique({ where: { email } });
            if (exists) return res.status(400).json({ error: 'User already exists' });

            const hashed = await argon2.hash(password);

            // send OTP and keep registration pending
            await axios.post(`${OTP_SERVICE}/sendOTP`, { email });

            const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
            pendingRegistrations.set(email, { name, password: hashed, expiresAt });

            return res.status(201).json({ message: 'OTP sent. Complete verification to finish registration.' });
        } catch (err) {
            next(err);
        }
    },
    verifyOTP :  async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, otp } = req.body;
            if (!email || !otp) return res.status(400).json({ error: 'email and otp required' });

            const pending = pendingRegistrations.get(email);
            if (!pending) return res.status(400).json({ error: 'No pending registration for this email' });

            if (Date.now() > pending.expiresAt) {
                pendingRegistrations.delete(email);
                return res.status(400).json({ error: 'OTP expired. Please register again.' });
            }

            const resp = await axios.post(`${OTP_SERVICE}/verifyOTP`, { email, otp });
            if (!resp.data || resp.data.success !== true) return res.status(400).json({ error: 'Invalid OTP' });

            const exists = await prisma.user.findUnique({ where: { email } });
            if (exists) {
                pendingRegistrations.delete(email);
                return res.status(400).json({ error: 'User already exists' });
            }

            const created = await prisma.user.create({
                data: { name: pending.name, email, password: pending.password, isVerified: true },
            });
            pendingRegistrations.delete(email);

            console.log('User created after OTP verification:', { id: created.id, email: created.email, isVerified: created.isVerified });

            return res.json({ message: 'OTP verified and user registered', userId: created.id });
        } catch (err) {
            next(err);
        }
    },

    login : async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('[LOGIN] Starting login request for:', req.body.email);
            const { email, password } = req.body;

            console.log('[LOGIN] Querying user from DB...');
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) return res.status(400).json({ error: 'Invalid credentials' });

            console.log('[LOGIN] User found, checking verification status...');
            if (!user.isVerified) return res.status(403).json({ error: 'User not verified' });

            console.log('[LOGIN] Verifying password with argon2...');
            const valid = await argon2.verify(user.password, password);
            if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

            console.log('[LOGIN] Password valid, generating session...');
            const csrfToken = genCsrfToken();
            const sessionId = uuidv4();
            const expiresAt = new Date(Date.now() + SESSION_TTL_MINUTES * 60 * 1000);

            console.log('[LOGIN] Creating session in DB...');
            await prisma.session.create({
                data: {
                    id: sessionId,
                    userId: user.id,
                    csrfToken,
                    expiresAt,
                },
            });

            console.log('[LOGIN] Session created, setting cookie and responding...');
            res.cookie(COOKIE_NAME, sessionId, {
                httpOnly: true,
                sameSite: 'lax',
                secure: false, // TODO: set to true when using HTTPS
                maxAge: SESSION_TTL_MINUTES * 60 * 1000,
            });

            return res.json({ message: 'Logged in', csrfToken });
        } catch (err) {
            console.error('[LOGIN] Error during login:', err);
            next(err);
        }
    }

}



