import type { NextFunction, Request, Response } from 'express';
import { readFile } from 'node:fs/promises';

import { logger } from '../libs/logger';

export const httpLoggerMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const fileContents = await readFile('./package.json', { encoding: 'utf-8' });

  const { name } = JSON.parse(fileContents);

  const start = Date.now();
  next();
  const duration = Date.now() - start;
  const { method, url, hostname, body } = request;
  const { statusCode, statusMessage } = response;
  logger.info({
    request: { method, url, hostname, body },
    response: { url, statusCode, statusMessage },
    duration,
    serviceName: name,
  });
};
