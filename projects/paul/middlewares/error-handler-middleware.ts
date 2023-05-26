import { NextFunction, Request, Response } from 'express';

const errorHandlerMiddleware = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { message } = error;
  response.status(500).send({
    message,
  });
};

export default errorHandlerMiddleware;
