"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteValidator = void 0;
var createValidator_1 = __importDefault(require("../../helpers/createValidator"));
var VoteValidator = /** @class */ (function () {
    function VoteValidator() {
        this.createAnswerValidator = createValidator_1.default(function (Joi) {
            return {
                vote: Joi.number()
                    .required()
                    .error(new Error("Vote is required")),
            };
        });
    }
    return VoteValidator;
}());
exports.VoteValidator = VoteValidator;
//# sourceMappingURL=vote.dto.js.map