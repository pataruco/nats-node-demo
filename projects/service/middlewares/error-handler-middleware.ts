import type { NextFunction, Request, Response } from 'express';

import { logger } from '../libs/logger.ts';

// Express only treats a function with 4 parameters as an error handler,
// so `_next` has to stay even though it is unused.
export const errorHandlerMiddleware = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  const { message } = error;
  response.status(500).send({ message });

  logger.error({ error });
};
