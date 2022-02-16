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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var jwt = __importStar(require("jsonwebtoken"));
var bcrypt = __importStar(require("bcrypt"));
var env_1 = __importDefault(require("../../helpers/env"));
var errors_1 = require("../../errors");
var logger_1 = __importDefault(require("../../logger"));
var redis_connection_1 = require("../../redis.connection");
var AuthService = /** @class */ (function () {
    function AuthService(userService, tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.frontendBaseUrl = env_1.default.getBackendUrl();
        this.JWT_AUTH_SECRET = env_1.default.get('JWT_AUTH_SECRET');
        this.REFRESH_TOKEN_SECRET = env_1.default.get('REFRESH_TOKEN_SECRET');
        this.BCRYPT_SALT = parseInt(env_1.default.get('BCRYPT_SALT'));
    }
    /**
     * Generates JWT for a user
     * @param data - An object containing the ID and email of a user
     * @returns { string } - JWT
     */
    AuthService.prototype.generateJWT = function (user) {
        var payload = {
            id: user.id,
            email: user.email,
            role: user.role,
            date: Date.now(),
        };
        return jwt.sign(payload, this.JWT_AUTH_SECRET, { expiresIn: '1d' });
    };
    /**
     * generate new refresh token
     */
    AuthService.prototype.generateNewRefreshToken = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        jwt.verify(refreshToken, _this.REFRESH_TOKEN_SECRET, function (err, payload) {
                            logger_1.default.info('invalid refresh token');
                            if (err)
                                return reject(new errors_1.UnauthorizedError('invalid refresh token'));
                            redis_connection_1.redisClient.GET("refreshToken:" + payload.id + ":" + refreshToken, function (err, result) { return __awaiter(_this, void 0, void 0, function () {
                                var newRefreshToken, token;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            logger_1.default.info('Internal Server Error');
                                            if (err) {
                                                reject(Error('Internal Server Error'));
                                            }
                                            if (!(refreshToken === result)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.generateRefreshToken(payload)];
                                        case 1:
                                            newRefreshToken = _a.sent();
                                            token = this.generateJWT(payload);
                                            return [2 /*return*/, resolve({ refreshToken: newRefreshToken, token: token })];
                                        case 2:
                                            logger_1.default.info('Invalid Refresh token');
                                            reject(new errors_1.UnauthorizedError('Invalid Refresh token'));
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); });
                        });
                    })];
            });
        });
    };
    /**
     * Generates JWT for a user
     * @param data - An object containing the ID and email of a user
     * @returns { string } - JWT
     */
    AuthService.prototype.generateRefreshToken = function (user) {
        var _this = this;
        var payload = {
            id: user.id,
            email: user.email,
            role: user.role,
            date: Date.now(),
        };
        return new Promise(function (resolve, reject) {
            jwt.sign(payload, _this.REFRESH_TOKEN_SECRET, { expiresIn: '90d' }, function (err, token) {
                console.log(payload);
                if (err) {
                    reject(new Error('Internal Server Error'));
                }
                resolve(token);
            });
        });
    };
    /**
     * Composes the login data
     */
    AuthService.prototype.composeLoginData = function (user, token, refreshToken) {
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            token: token,
            refreshToken: refreshToken,
        };
    };
    /**
     * Creates a new user account
     */
    AuthService.prototype.register = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userService.createUser({
                                email: data.email,
                                full_name: data.full_name,
                                password: data.password,
                                role: 'user',
                            })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, {
                                email: user.email,
                            }];
                    case 2:
                        error_1 = _a.sent();
                        logger_1.default.info(JSON.stringify(error_1));
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Logs a user in
     */
    AuthService.prototype.login = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var genericMessage, user, match, jwt, refreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        genericMessage = 'Invalid email or password';
                        return [4 /*yield*/, this.userService.findByEmail(data.email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            logger_1.default.info(genericMessage);
                            throw new errors_1.UnauthorizedError(genericMessage);
                        }
                        if (!user.password) {
                            logger_1.default.info(genericMessage);
                            throw new errors_1.UnauthorizedError(genericMessage);
                        }
                        return [4 /*yield*/, bcrypt.compare(data.password, user.password)];
                    case 2:
                        match = _a.sent();
                        if (!match) {
                            logger_1.default.info(genericMessage);
                            throw new errors_1.UnauthorizedError(genericMessage);
                        }
                        jwt = this.generateJWT(user);
                        return [4 /*yield*/, this.generateRefreshToken(user)];
                    case 3:
                        refreshToken = _a.sent();
                        return [2 /*return*/, this.composeLoginData(user, jwt, refreshToken)];
                }
            });
        });
    };
    /**
     * Changes the password of a user
     */
    AuthService.prototype.changePassword = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, match, hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (data.newPassword !== data.confirmPassword) {
                            logger_1.default.info('Passwords do not match');
                            throw new errors_1.BadRequestError('Passwords do not match');
                        }
                        return [4 /*yield*/, this.userService.findById(data.userId)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            logger_1.default.info('Account not found');
                            throw new errors_1.NotFoundError('Account not found');
                        }
                        return [4 /*yield*/, bcrypt.compare(data.currentPassword, user.password)];
                    case 2:
                        match = _a.sent();
                        if (!match) {
                            logger_1.default.info('Current password is incorrect');
                            throw new errors_1.BadRequestError('Current password is incorrect');
                        }
                        return [4 /*yield*/, bcrypt.hash(data.newPassword, this.BCRYPT_SALT)];
                    case 3:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, this.userService.update(user.id, { password: hashedPassword })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**g
     * Logouts a user's client out of the application by deleting their refresh token if one exists
     */
    AuthService.prototype.logout = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!refreshToken) {
                    logger_1.default.info('Provide a refresh token');
                    throw new Error('Provide a refresh token');
                }
                // const { id }: any = await verifyRefreshToken(refreshToken);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        jwt.verify(refreshToken, _this.REFRESH_TOKEN_SECRET, function (err, payload) {
                            if (err) {
                                logger_1.default.info('Invalid refresh token');
                                return reject(new errors_1.UnauthorizedError('Invalid refresh token'));
                            }
                            redis_connection_1.redisClient.DEL("refreshToken:" + payload.id + ":" + refreshToken, function (err, result) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (err) {
                                        logger_1.default.info('Invalid refresh token');
                                        reject(Error('Invalid refresh token'));
                                    }
                                    resolve();
                                    return [2 /*return*/];
                                });
                            }); });
                        });
                    })];
            });
        });
    };
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map