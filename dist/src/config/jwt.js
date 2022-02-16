"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var jwtConfig = {
    appKey: process.env.APP_SECRET_KEY,
    refreshTokenKey: process.env.REFRESH_SECRET_KEY,
};
exports.default = jwtConfig;
//# sourceMappingURL=jwt.js.map