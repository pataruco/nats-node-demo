import { connect, type Subscription } from '@nats-io/transport-node';

import { NATS_SERVER_URL, SERVICE_NAME, type ServiceName } from './config.ts';
import { logger } from './libs/logger.ts';

export const natsClient = await connect({ servers: NATS_SERVER_URL });

export const beatlesSubscription = natsClient.subscribe('beatles');

export interface BeatlesMessage {
  from: ServiceName;
  to: ServiceName[];
}

export const singIfReceiveMessage = async () => {
  for await (const message of beatlesSubscription) {
    const { from, to } = message.json<BeatlesMessage>();

    const shouldSing = to.includes(SERVICE_NAME);
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
    logger.info({
      message: `message received from NATS: ${message.string()}`,
    });
  }
};
