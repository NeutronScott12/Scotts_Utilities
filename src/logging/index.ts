import * as winston from 'winston';
import * as logform from 'logform';

const { combine, timestamp, label, prettyPrint } = logform.format;

export const logger = (loggerLabel: string): winston.Logger => {
	// const myFormat = printf((info) => {
	// 	return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
	// });

	return winston.createLogger({
		format: combine(label({ loggerLabel }), timestamp(), prettyPrint()),
		transports: [ new winston.transports.Console() ]
	});
};
