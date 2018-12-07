"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const logform = require("logform");
const { combine, timestamp, label, printf } = logform.format;
exports.logger = (loggerLabel) => {
    return winston.createLogger({
        format: combine(label({ loggerLabel }), timestamp(), printf(({ timestamp, label, level, message }) => {
            return `${timestamp} [${label}] ${level}: ${message}`;
        })),
        transports: [new winston.transports.Console()],
    });
};
//# sourceMappingURL=index.js.map