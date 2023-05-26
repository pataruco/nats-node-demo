import dotenv from 'dotenv';
import { readFile } from 'node:fs/promises';

dotenv.config();

export const HOST = process.env.HOST || '127.0.0.1';
export const PORT = process.env.PORT || 4000;

export const getPackageName = async () => {
  const fileContents = await readFile('./package.json', { encoding: 'utf-8' });
  const { name } = JSON.parse(fileContents);
  return name;
};
