import { readFile } from 'node:fs/promises';
import dotenv from 'dotenv';
import { StringCodec, type Subscription, connect } from 'nats';

import { logger } from '../libs/logger.js';

dotenv.config();

const natsServerAddress = process.env.NATS_SERVER_URL || '0.0.0.0:4222';

export const natsClient = await connect({ servers: natsServerAddress });
export const stringCodec = StringCodec();

export const beatlesSubscription = natsClient.subscribe('beatles');

export interface BeatlesMessage {
  from: string;
  to: string[];
}

export const singIfReceiveMessage = async () => {
  const fileContents = await readFile('./package.json', { encoding: 'utf-8' });

  const { name } = JSON.parse(fileContents);

  for await (const message of beatlesSubscription) {
    const { from, to }: BeatlesMessage = JSON.parse(
      stringCodec.decode(message.data),
    );

    const shouldSing = to.includes(name);
    if (shouldSing) {
      logger.warn({
        from,
        message: ['la ♪', 'la ♩', 'la ♫', 'la ♪'],
        to,
      });
    }
  }
};

export const printNatsSubscribedMessages = async (
  subscription: Subscription,
) => {
  for await (const message of subscription) {
    const mesage = JSON.parse(stringCodec.decode(message.data));
    logger.info({
      message: `message receive from NATS: ${mesage}`,
    });
  }
};
