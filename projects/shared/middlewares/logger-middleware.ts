import type { NextFunction, Request, Response } from 'express';
import { logger } from '../libs/logger';

export const httpLoggerMiddleware = async (
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
  });
};
