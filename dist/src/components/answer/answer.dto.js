"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerValidator = void 0;
var createValidator_1 = __importDefault(require("../../helpers/createValidator"));
var AnswerValidator = /** @class */ (function () {
    function AnswerValidator() {
        this.createAnswerValidator = createValidator_1.default(function (Joi) {
            return {
                text: Joi.string()
                    .required()
                    .trim()
                    .error(new Error("Text body is required")),
            };
        });
    }
    return AnswerValidator;
}());
exports.AnswerValidator = AnswerValidator;
//# sourceMappingURL=answer.dto.js.map