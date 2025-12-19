import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma.js';

export interface AuthedRequest extends Request {
  user?: { id: string; email: string };
  sessionId?: string;
}

export async function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const sid = req.cookies?.[process.env.COOKIE_NAME ?? 'sid'];
    if (!sid) return res.status(401).json({ error: 'No session cookie' });

    const session = await prisma.session.findUnique({
      where: { id: sid },
      include: { user: true },
    });

    if (!session) return res.status(401).json({ error: 'Invalid session' });
    if (session.expiresAt && session.expiresAt < new Date()) {
      // session expired -> delete
      await prisma.session.delete({ where: { id: sid } });
      return res.status(401).json({ error: 'Session expired' });
    }

    // XSRF protection: require header to match stored csrfToken
    const headerToken = req.header('x-xsrf-token') || req.header('x-csrf-token') || req.header('x-xsrf-token'.toLowerCase());
    if (!headerToken) return res.status(403).json({ error: 'Missing XSRF token header' });

    if (headerToken !== session.csrfToken) return res.status(403).json({ error: 'Invalid XSRF token' });

    // attach user info to req
    req.user = { id: session.user.id, email: session.user.email };
    req.sessionId = session.id;
    next();
  } catch (err) {
    next(err);
  }
}
