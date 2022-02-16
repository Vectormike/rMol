"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var Env = /** @class */ (function () {
    function Env() {
        this.nodeEnv = this.get('NODE_ENV');
    }
    Env.prototype.get = function (variable) {
        return process.env[variable];
    };
    Env.prototype.getFrontendBaseUrl = function () {
        if (this.nodeEnv === 'development') {
            return this.get('LOCAL_UI_BASEURL');
        }
        return this.get('REMOTE_UI_BASEURL');
    };
    Env.prototype.getBackendUrl = function () {
        if (this.nodeEnv === 'development') {
            return this.get('BASE_URL_DEV');
        }
        return this.get('BASE_URL_URL_PROD');
    };
    return Env;
}());
exports.default = new Env();
//# sourceMappingURL=env.js.map