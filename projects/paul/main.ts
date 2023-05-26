import express from 'express';
import http from 'http';

import { HOST, PORT } from './config';
import rootRouter from './routes';

import { errorHandlerMiddleware, httpLoggerMiddleware, logger } from 'shared';

const app = express();
app.use(express.json());
app.use(httpLoggerMiddleware);
app.use(errorHandlerMiddleware);
app.use(rootRouter);

const httpServer = http.createServer(app);

const main = async () => {
  await httpServer.listen({ port: PORT }, () => {
    logger.info(`server listening 📡 ${JSON.stringify({ HOST, PORT })}`);
  });
};

main();
