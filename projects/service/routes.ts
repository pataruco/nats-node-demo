import express, { type Request, type Response } from 'express';
import Joi from 'joi';

import { SERVICE_NAME, SERVICE_NAMES } from './config.ts';
import { type BeatlesMessage, natsClient } from './nats.ts';

const messageSchema = Joi.object({
  singers: Joi.array()
    .items(Joi.string().valid(...SERVICE_NAMES))
    .min(1)
    .required(),
}).required();

const rootRouter = express.Router();

rootRouter.get('/', (_request: Request, response: Response) => {
  response.send(`<h1>${SERVICE_NAME.toUpperCase()}</h1>`);
});

rootRouter.post('/', (request: Request, response: Response) => {
  const { body } = request;

  const { error } = messageSchema.validate(body);
  if (error) {
    const errors = error.details.map(({ message }) => message);

    response.status(400).send({ errors });
    return;
  }

  const { singers } = body as { singers: BeatlesMessage['to'] };

  const payloadToPublish: BeatlesMessage = {
    from: SERVICE_NAME,
    to: singers,
  };

  natsClient.publish('beatles', JSON.stringify(payloadToPublish));

  response.send({ message: `people singing: ${singers.join(', ')}` });
});

export default rootRouter;
