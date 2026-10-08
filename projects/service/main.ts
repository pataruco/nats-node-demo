import http from 'node:http';
import express from 'express';

import { PORT, SERVICE_NAME } from './config.ts';
import { logger } from './libs/logger.ts';
import {
  errorHandlerMiddleware,
  httpLoggerMiddleware,
} from './middlewares/index.ts';
import { singIfReceiveMessage } from './nats.ts';
import rootRouter from './routes.ts';

const app = express();

app.use(express.json());
app.use(httpLoggerMiddleware);
app.use(rootRouter);
// Error handlers must come after the routes they cover
app.use(errorHandlerMiddleware);

const httpServer = http.createServer(app);

httpServer.listen({ port: PORT }, () => {
  logger.info(`server listening 📡 ${JSON.stringify({ SERVICE_NAME, PORT })}`);
});

await singIfReceiveMessage();

// To log every message on the subject instead of singing, replace the line
// above with:
// await printNatsSubscribedMessages(beatlesSubscription);
