import express, { Request, Response } from 'express';
import Joi from 'joi';

import { packageJsonName } from '../config/index.js';
import { natsClient, stringCodec } from '../nats/index.js';

const messageSchema = Joi.object({
  singers: Joi.array()
    .items(
      Joi.string().valid('paul'),
      Joi.string().valid('john'),
      Joi.string().valid('ringo'),
      Joi.string().valid('george'),
    )
    .min(1),
});

const rootRouter = express.Router();

rootRouter.get('/', async (_request: Request, response: Response) => {
  response.send(`<h1>${packageJsonName.toUpperCase()}</h1>`);
});

rootRouter.post('/', (request: Request, response: Response) => {
  const { body } = request;

  const { error } = messageSchema.validate(body);
  if (error) {
    const errors = error.details.map(({ message }) => message);

    return response.status(400).send({ errors: [...errors] });
  }

  const { singers } = body;

  const singersString = singers.join(', ');

  natsClient.publish('beatles', stringCodec.encode(JSON.stringify(body)));

  return response.send({ message: `people singing: ${singersString}` });
});

export default rootRouter;
