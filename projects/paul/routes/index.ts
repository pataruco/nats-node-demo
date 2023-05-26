import express, { Request, Response } from 'express';
import Joi from 'joi';

import { getPackageName } from '../config';

const messageSchema = Joi.object({
  message: Joi.string().min(1).required(),
});

const rootRouter = express.Router();

rootRouter.get('/', async (_request: Request, response: Response) => {
  const name: string = await getPackageName();
  response.send(`<h1>${name.toUpperCase()}</h1>`);
});

rootRouter.post('/', (request: Request, response: Response) => {
  const { body } = request;

  const { error } = messageSchema.validate(body);

  if (error) {
    const errors = error.details.map(({ message }) => message);

    return response.status(400).send({ errors: [...errors] });
  }

  // TODO: trigger nats message2

  return response.send({ message: 'message sent to' });
});

export default rootRouter;
