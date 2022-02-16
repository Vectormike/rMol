"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationError = /** @class */ (function (_super) {
    __extends(ApplicationError, _super);
    function ApplicationError(message, status, statusCode) {
        var _this = _super.call(this) || this;
        _this.message = 'ApplicationError';
        _this.status = 'error';
        _this.statusCode = 500;
        if (message) {
            _this.message = message;
        }
        if (status) {
            _this.status = status;
        }
        if (statusCode) {
            _this.statusCode = statusCode;
        }
        return _this;
    }
    return ApplicationError;
}(Error));
exports.default = ApplicationError;
//# sourceMappingURL=application-error.js.map