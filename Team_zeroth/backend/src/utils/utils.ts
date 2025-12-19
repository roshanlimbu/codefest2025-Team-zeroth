import crypto from 'crypto';

export function genCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function nowPlusMinutes(minutes: number): Date {
  return new Date(Date.now() + minutes * 60 * 1000);
}

