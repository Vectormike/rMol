"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = exports.authController = exports.authService = void 0;
var guards_1 = __importDefault(require("../../shared/guards"));
var token_1 = require("../token");
var user_1 = require("../user/");
var auth_controller_1 = require("./auth.controller");
var auth_service_1 = require("./auth.service");
var auth_dto_1 = require("./auth.dto");
var auth_router_1 = require("./auth.router");
exports.authService = new auth_service_1.AuthService(user_1.userService, token_1.tokenService);
exports.authController = auth_controller_1.AuthControllerFactory(exports.authService);
exports.authRouter = auth_router_1.AuthRouter({
    controller: exports.authController,
    guards: guards_1.default,
    validator: new auth_dto_1.AuthValidator(),
});
//# sourceMappingURL=index.js.map