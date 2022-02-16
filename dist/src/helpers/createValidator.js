"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi")); // Typically imported as 'Joi'
var errors_1 = require("../errors");
var logger_1 = __importDefault(require("../logger"));
function default_1(createSchema, options) {
    if (options === void 0) { options = {}; }
    var schema = joi_1.default.object().keys(__assign({}, createSchema(joi_1.default)));
    return {
        validate: function (req, res, next) {
            var result = schema.validate(req[options.propToValidate || 'body']);
            try {
                if (result.error) {
                    logger_1.default.info('validation error');
                    logger_1.default.info(result.error);
                    throw new errors_1.BadRequestError(result.error.message);
                }
                req.body = result.value;
                next();
            }
            catch (error) {
                next(error);
            }
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=createValidator.js.map