"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmValidator = void 0;
var createValidator_1 = __importDefault(require("../../helpers/createValidator"));
var FilmValidator = /** @class */ (function () {
    function FilmValidator() {
        this.createCommentValidator = createValidator_1.default(function (Joi) {
            return {
                body: Joi.string()
                    .max(500)
                    .error(new Error('Body must not be grater than 500 characters'))
                    .required()
                    .trim()
                    .error(new Error("Comment body is required")),
            };
        });
    }
    return FilmValidator;
}());
exports.FilmValidator = FilmValidator;
//# sourceMappingURL=answer.dto.js.map