import type { NextFunction, Request, Response } from 'express';
import { logger } from '../libs/logger';

export const errorHandlerMiddleware = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error) {
    const { message } = error;
    response.status(500).send({
      message,
    });

    logger.error({ error });
  }
};
