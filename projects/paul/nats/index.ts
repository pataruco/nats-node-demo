import { connect, StringCodec, Subscription } from 'nats';
import { logger } from 'shared';

export const natsClient = await connect({ servers: ' 0.0.0.0:4222' });
export const stringCodec = StringCodec();

export const beatlesSubscription = natsClient.subscribe('beatles');
// export const beatlesRequest = natsClient.request('beatles.*');

export const printNatsSubscribedMessages = async (
  subscription: Subscription,
) => {
  console.log('RUNNING');
  for await (const message of subscription) {
    console.log('LOGGING');
    logger.info({
      from: 'paul',
      message: stringCodec.decode(message.data),
    });
  }
};
