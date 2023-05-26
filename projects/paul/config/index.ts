import dotenv from 'dotenv';

dotenv.config();

export const HOST = process.env.HOST || '127.0.0.1';
export const PORT = process.env.PORT || 4000;
