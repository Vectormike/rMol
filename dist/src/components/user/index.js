"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
var user_model_1 = require("./user.model");
var user_service_1 = require("./user.service");
exports.userService = new user_service_1.UserService(user_model_1.User);
//# sourceMappingURL=index.js.map