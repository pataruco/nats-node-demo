import express from 'express';
import http from 'http';

import { HOST, PORT } from './config/index.js';
import rootRouter from './routes/index.js';

import { errorHandlerMiddleware, httpLoggerMiddleware, logger } from 'shared';
import { singIfReceiveMessage } from './nats/index.js';

const app = express();

app.use(express.json());
app.use(httpLoggerMiddleware);
app.use(errorHandlerMiddleware);
app.use(rootRouter);

const httpServer = http.createServer(app);

httpServer.listen({ port: PORT }, async () => {
  logger.info(`server listening 📡 ${JSON.stringify({ HOST, PORT })}`);
});

await singIfReceiveMessage();

// If you want to see all messages been listened, uncomment line below
// and comment await singIfReceiveMessage();

// await printNatsSubscribedMessages(beatlesSubscription);
