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
exports.UserService = void 0;
var bcrypt = __importStar(require("bcrypt"));
var env_1 = __importDefault(require("../../helpers/env"));
var user_model_1 = require("./user.model");
var UserService = /** @class */ (function () {
    function UserService(userModel) {
        if (userModel === void 0) { userModel = user_model_1.User; }
        this.userModel = userModel;
        this.BCRYPT_SALT = parseInt(env_1.default.get('BCRYPT_SALT'));
    }
    /**
     * Takes in a `UserType` object and filters it to return a `UserProfileType` object. The purpose of this
     * helper method is to protect sensitive user information
     * @param { UserType } user - User data
     * @returns { UserProfileType }
     */
    UserService.prototype.obtainProfile = function (user) {
        return {
            id: user.id,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            role: user.role,
        };
    };
    /**
     * Hashes a password and returns the hash
     * @param { string } password - A regular raw readable string
     * @returns a hashed password
     */
    UserService.prototype.hashPassword = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, bcrypt.hash(password, this.BCRYPT_SALT)];
            });
        });
    };
    /**
     * Runs a set of necessary operations before a user account is created
     * @param { createUserInput } createUserInput - An object containing the data required for creating a new user
     */
    UserService.prototype.runPreUserCreationProcesses = function (createUserInput) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hashPassword(createUserInput.password)];
                    case 1:
                        hashedPassword = _a.sent();
                        return [2 /*return*/, {
                                hashedPassword: hashedPassword,
                            }];
                }
            });
        });
    };
    /**
     * Creates a new user document
     * @param { createUserInput } createUserInput - An object containing the data required for creating a new user
     */
    UserService.prototype.createUser = function (createUserInput) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.runPreUserCreationProcesses(createUserInput)];
                    case 1:
                        hashedPassword = (_a.sent()).hashedPassword;
                        return [4 /*yield*/, this.userModel.query().insert(__assign(__assign({}, createUserInput), { password: hashedPassword }))];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Finds a user by username
     */
    UserService.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.query().findOne({ email: email })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Finds a user by ID
     */
    UserService.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.query().findOne({ id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Updates user information
     *
     * @param { string } id - The ID of a user
     * @param { UserType } data - An object containing the details of the user to be updated
     */
    UserService.prototype.update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.query().patch(data).where({ id: id })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.userModel.query().findOne({ id: id })];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, this.obtainProfile(user)];
                }
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map