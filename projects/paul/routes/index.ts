import express, { Request, Response } from 'express';

import Joi from 'joi';

const messageSchema = Joi.object({
  message: Joi.string().min(1).required(),
});

const rootRouter = express.Router();

rootRouter.get('/', (_request: Request, response: Response) => {
  response.send('<h1>Paul</h1>');
});

rootRouter.post('/', (request: Request, response: Response) => {
  const { body } = request;

  const { error } = messageSchema.validate(body);

  if (error) {
    return response
      .status(400)
      .send('Payload should have "{message: "something" }" ');
  }

  return response.send({ message: 'message sent to' });
});

export default rootRouter;
