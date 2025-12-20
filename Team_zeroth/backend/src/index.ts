import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import authRouter from './routes/auth.js';
import profileRouter from './routes/profile.js';
import campaignRouter from './routes/campaign.js';
import adminUserRouter from './routes/adminUser.js';
import adminCampaignsRouter from './routes/adminCampaigns.js';
import donationRouter from './routes/donation.js';
import khaltiRouter from './routes/khalti.js';


const app = express();
app.use(express.json());
app.use(cookieParser());

// Configure CORS to allow credentials (cookies)
app.use(cors({
    origin: function (origin, callback) {
        // In development, allow any localhost or local network origin
        if (process.env.NODE_ENV !== 'production') {
            // Allow any localhost port or local network IP (192.168.x.x, 10.x.x.x, 172.16-31.x.x)
            if (!origin || 
                origin.startsWith('http://localhost:') || 
                origin.startsWith('http://127.0.0.1:') ||
                /^http:\/\/(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(origin)) {
                callback(null, true);
            } else {
                console.log(`CORS blocked origin: ${origin}`);
                callback(new Error('CORS not allowed'));
            }
        } else {
            // In production, use specific allowed origins from env variable
            const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.log(`CORS blocked origin: ${origin}`);
                callback(new Error('CORS not allowed'));
            }
        }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'x-xsrf-token', 'x-csrf-token'],
}));

const PORT = Number(process.env.PORT) || 8080;


app.get('/', async (req: Request, res: Response) => {
    console.log('hello world hello world');
    res.json("This is update🙌🏻");
});

app.use('/', authRouter);
app.use('/api', profileRouter);
app.use('/api/campaigns', campaignRouter);
app.use('/uploads', express.static('uploads'));
app.use('/api/donations', donationRouter);
app.use('/api/payments/khalti', khaltiRouter);
// Admin routes (user listing etc.)
app.use('/admin', adminUserRouter);
app.use('/admin/campaigns', adminCampaignsRouter);

if (process.env.NODE_ENV !== 'production') {
    app.get('/debug/routes', (req: Request, res: Response) => {
        const routes: string[] = [];
        // app._router may be undefined in some setups
        // @ts-ignore
        const stack = app._router?.stack || [];
        for (const layer of stack) {
            if (layer.route && layer.route.path) {
                const methods = Object.keys(layer.route.methods).join(',').toUpperCase();
                routes.push(`${methods} ${layer.route.path}`);
            }
        }
        res.json({ routes });
    });
}

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
