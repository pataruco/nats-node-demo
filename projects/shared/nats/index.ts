import { connect, StringCodec, Subscription } from 'nats';
import { readFile } from 'node:fs/promises';

import { logger } from '../libs/logger.js';

export const natsClient = await connect({ servers: ' 0.0.0.0:4222' });
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
