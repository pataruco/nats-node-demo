import express from 'express';
import http from 'http';

import { HOST, PORT } from './config';
import logger from './libs/logger';
import errorHandlerMiddleware from './middlewares/error-handler-middleware';
import httpLoggerMiddleware from './middlewares/logger-middleware';
import rootRouter from './routes';

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
