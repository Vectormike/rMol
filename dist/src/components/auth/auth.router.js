"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
var express_1 = require("express");
function AuthRouter(options) {
    var controller = options.controller, guards = options.guards, validator = options.validator;
    var router = express_1.Router();
    /**
     * @register - register a user
     */
    router.post('/register', validator.CreateAccountDto.validate, controller.register);
    /**
     * @login - sign in a user
     */
    router.post('/login', validator.LoginDto.validate, controller.login);
    /**
     * @logout
     */
    router.post('/logout', validator.RefreshTokenDto.validate, controller.logout);
    /**
     * @generateRefreshTohen
     */
    router.post('/refresh-token', validator.RefreshTokenDto.validate, controller.generateToken);
    return router;
}
exports.AuthRouter = AuthRouter;
//# sourceMappingURL=auth.router.js.map