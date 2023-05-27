import dotenv from 'dotenv';
import { readFile } from 'node:fs/promises';

dotenv.config();

export const HOST = process.env.HOST || '127.0.0.1';
export const PORT = process.env.PORT || 0;
export const NATS_SERVER_URL = process.env.NATS_SERVER_URL || '0.0.0.0:4222';

const fileContents = await readFile('./package.json', { encoding: 'utf-8' });

export const { name: packageJsonName } = JSON.parse(fileContents);
