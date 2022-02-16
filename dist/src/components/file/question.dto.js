"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionValidator = void 0;
var createValidator_1 = __importDefault(require("../../helpers/createValidator"));
var QuestionValidator = /** @class */ (function () {
    function QuestionValidator() {
        this.createQuestionValidator = createValidator_1.default(function (Joi) {
            return {
                title: Joi.string()
                    .max(500)
                    .error(new Error('Body must not be grater than 500 characters'))
                    .required()
                    .trim()
                    .error(new Error("Title is required")),
                text: Joi.string()
                    .required()
                    .trim()
                    .error(new Error("Text is required")),
            };
        });
    }
    return QuestionValidator;
}());
exports.QuestionValidator = QuestionValidator;
//# sourceMappingURL=question.dto.js.map