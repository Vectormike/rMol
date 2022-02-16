"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guards = void 0;
var auth_guard_1 = __importDefault(require("./auth.guard"));
var role_guard_1 = __importDefault(require("./role.guard"));
var Guards = /** @class */ (function () {
    function Guards() {
        this.AuthGuard = auth_guard_1.default;
        this.RoleGuard = role_guard_1.default;
    }
    return Guards;
}());
exports.Guards = Guards;
exports.default = new Guards();
//# sourceMappingURL=index.js.map