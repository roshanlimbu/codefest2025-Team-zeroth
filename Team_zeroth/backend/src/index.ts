import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import authRouter from './routes/auth.js';
import profileRouter from './routes/profile.js';
import campaignRouter from './routes/campaign.js';


const app = express();
app.use(express.json());
app.use(cookieParser());

// Configure CORS to allow credentials (cookies)
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests from localhost and the frontend origin
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
            'http://localhost:5174',
            'http://localhost:8000',
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log(`CORS blocked origin: ${origin}`);
            callback(new Error('CORS not allowed'));
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
