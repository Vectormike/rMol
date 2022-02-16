"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
var createValidator_1 = __importDefault(require("../../helpers/createValidator"));
var UserValidator = /** @class */ (function () {
    function UserValidator() {
        this.createUserManuallyValidator = createValidator_1.default(function (Joi) {
            return {
                firstName: Joi.string()
                    .required()
                    .trim()
                    .error(new Error("firstName is required")),
                lastName: Joi.string()
                    .required()
                    .trim()
                    .error(new Error("lastName is required")),
                email: Joi.string()
                    .email()
                    .required()
                    .trim()
                    .lowercase()
                    .error(new Error("A valid email address is required")),
                role: Joi.string()
                    .trim()
                    .lowercase()
                    .valid('student', 'admin')
                    .error(new Error("Role must be either \"student\" or \"admin\"")),
            };
        });
    }
    return UserValidator;
}());
exports.UserValidator = UserValidator;
//# sourceMappingURL=user.dto.js.map