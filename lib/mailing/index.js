"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const logging_1 = require("../logging");
exports.SendMail = ({ host, port, auth }, email) => {
    try {
        const transport = nodemailer_1.createTransport({
            host,
            port,
            auth,
        });
        transport.sendMail(email);
    }
    catch (error) {
        logging_1.logger('Email').error({ level: '5', message: error });
        return error;
    }
};
//# sourceMappingURL=index.js.map