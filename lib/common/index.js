"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sluggify = (word) => word.replace(/ /g, '-').toLowerCase();
exports.normalisePort = (port) => {
    if (typeof port === 'string') {
        return parseInt(port);
    }
    else {
        return port;
    }
};
//# sourceMappingURL=index.js.map