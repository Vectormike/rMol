"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
var token_model_1 = require("./token.model");
var token_service_1 = require("./token.service");
exports.tokenService = new token_service_1.TokenService(token_model_1.Token);
//# sourceMappingURL=index.js.map