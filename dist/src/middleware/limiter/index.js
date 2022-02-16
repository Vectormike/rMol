"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var handler = function (req, res /*next*/) {
    res.status(429).send({
        message: "Too many accounts created from this IP, please try again after an hour",
        status: "Too Many Requests",
        status_code: 429,
    });
};
exports.rateLimiter = express_rate_limit_1.default({
    windowMs: 24 * 60 * 60 * 1000,
    max: 10000000,
    handler: handler,
    headers: true,
});
//# sourceMappingURL=index.js.map