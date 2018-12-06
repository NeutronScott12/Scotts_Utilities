"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const bcryptjs_1 = require("bcryptjs");
exports.createToken = (data, secret, expiresIn, refreshSecret, refreshData) => {
    try {
        const token = jsonwebtoken_1.sign(data, secret, { expiresIn });
        if (refreshSecret) {
            const refreshToken = jsonwebtoken_1.sign(refreshData, refreshSecret, {
                expiresIn: "7d"
            });
            return [token, refreshToken];
        }
        return token;
    }
    catch (error) {
        return error;
    }
};
exports.verifyToken = (token, secret) => {
    return jsonwebtoken_1.verify(token, secret);
};
exports.hashPassword = (password, salt) => __awaiter(this, void 0, void 0, function* () {
    return yield bcryptjs_1.hash(password, salt);
});
exports.comparePassword = (password, userPassword) => __awaiter(this, void 0, void 0, function* () {
    return yield bcryptjs_1.compare(password, userPassword);
});
//# sourceMappingURL=index.js.map