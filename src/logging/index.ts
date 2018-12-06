import * as winston from "winston";
import * as logform from "logform";

const { combine, timestamp, label, printf } = logform.format;

export const logger = (loggerLabel: string): winston.Logger => {
  return winston.createLogger({
    format: combine(
      label({ loggerLabel }),
      timestamp(),
      printf(({ timestamp, label, level, message }) => {
        return `${timestamp} [${label}] ${level}: ${message}`;
      })
    ),
    transports: [new winston.transports.Console()]
  });
};
