"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
var createValidator_1 = __importDefault(require("../../helpers/createValidator"));
var AuthValidator = /** @class */ (function () {
    function AuthValidator() {
        this.CreateAccountDto = createValidator_1.default(function (Joi) {
            return {
                email: Joi.string().required().trim().error(new Error('Email is required')),
                full_name: Joi.string().required().trim().error(new Error('Full name is required')),
                password: Joi.string().required().error(new Error('Password is required')),
            };
        });
        this.LoginDto = createValidator_1.default(function (Joi) {
            return {
                email: Joi.string().required().trim().error(new Error('Email is required')),
                password: Joi.string().required().error(new Error('Password is required')),
            };
        });
        this.ChangePasswordDto = createValidator_1.default(function (Joi) {
            return {
                password: Joi.string().required().trim().error(new Error('Please enter a valid password')),
            };
        });
        this.RefreshTokenDto = createValidator_1.default(function (Joi) {
            return {
                refreshToken: Joi.string().required().trim().error(new Error('Refresh token is required')),
            };
        });
    }
    return AuthValidator;
}());
exports.AuthValidator = AuthValidator;
//# sourceMappingURL=auth.dto.js.map