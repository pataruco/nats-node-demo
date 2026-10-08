import type { NextFunction, Request, Response } from 'express';

import { SERVICE_NAME } from '../config.ts';
import { logger } from '../libs/logger.ts';

export const httpLoggerMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const start = Date.now();
  next();
  const duration = Date.now() - start;
  const { method, url, hostname, body } = request;
  const { statusCode, statusMessage } = response;
  logger.info({
    request: { method, url, hostname, body },
    response: { url, statusCode, statusMessage },
    duration,
    serviceName: SERVICE_NAME,
  });
};
