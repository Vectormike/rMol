"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFileValidator = void 0;
var createValidator_1 = __importDefault(require("../../helpers/createValidator"));
var UploadFileValidator = /** @class */ (function () {
    function UploadFileValidator() {
        this.fileValidator = createValidator_1.default(function (Joi) {
            return {
                file: Joi.string().max(500).error(new Error('Image  ust be uploaded')).required().trim(),
            };
        });
    }
    return UploadFileValidator;
}());
exports.UploadFileValidator = UploadFileValidator;
//# sourceMappingURL=file.dto.js.map