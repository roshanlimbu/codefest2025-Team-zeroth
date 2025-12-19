import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL || '';


const adapter = new PrismaMariaDb(connectionString);
const prisma = new PrismaClient({ adapter });

export default prisma;
