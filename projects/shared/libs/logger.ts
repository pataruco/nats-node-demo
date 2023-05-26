// Copy/pasta from winston docs
import winston from 'winston';
const { createLogger, format, transports } = winston;
const { combine, timestamp, prettyPrint, json, colorize } = format;

export const logger = createLogger({
  format: combine(
    timestamp(),
    prettyPrint(),
    json(),
    colorize({
      all: true,
    }),
  ),
  transports: [new transports.Console()],
  exitOnError: false,
});
