"use strict";
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
exports.FileControllerFactory = void 0;
var http_status_1 = __importDefault(require("http-status"));
var logger_1 = __importDefault(require("../../logger"));
function FileControllerFactory(fileService) {
    return {
        /**
         * Upload file
         */
        uploadFile: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var user, file, uploadedFile, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            user = req.user, file = req.file;
                            return [4 /*yield*/, fileService.uploadFile(file, { currentUser: user })];
                        case 1:
                            uploadedFile = _a.sent();
                            logger_1.default.info(JSON.stringify(uploadedFile));
                            return [2 /*return*/, res.status(http_status_1.default.OK).json({
                                    message: 'File successfully uploaded',
                                    status: 'success',
                                    statusCode: http_status_1.default.CREATED,
                                })];
                        case 2:
                            error_1 = _a.sent();
                            logger_1.default.info(JSON.stringify(error_1));
                            next(error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * Create folder and upload file
         */
        createFolder: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var user, body, file, uploadedFile, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            user = req.user, body = req.body, file = req.file;
                            return [4 /*yield*/, fileService.createFolder(body, file, { currentUser: user })];
                        case 1:
                            uploadedFile = _a.sent();
                            logger_1.default.info(JSON.stringify(uploadedFile));
                            return [2 /*return*/, res.status(http_status_1.default.OK).json({
                                    message: 'File successfully uploaded',
                                    status: 'success',
                                    statusCode: http_status_1.default.CREATED,
                                })];
                        case 2:
                            error_2 = _a.sent();
                            logger_1.default.info(JSON.stringify(error_2));
                            next(error_2);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * Download file
         */
        downloadFile: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var user, id, fileInstance, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            user = req.user, id = req.params.id;
                            return [4 /*yield*/, fileService.downloadFile(id, { currentUser: user })];
                        case 1:
                            fileInstance = _a.sent();
                            logger_1.default.info(JSON.stringify(fileInstance));
                            return [2 /*return*/, res.status(http_status_1.default.OK).json({
                                    message: 'File successfully uploaded',
                                    status: 'success',
                                    statusCode: http_status_1.default.CREATED,
                                    data: fileInstance,
                                })];
                        case 2:
                            error_3 = _a.sent();
                            logger_1.default.info(JSON.stringify(error_3));
                            next(error_3);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * Mark Unsafe
         */
        markUnsafe: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var user, id, fileInstance, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            user = req.user, id = req.params.id;
                            return [4 /*yield*/, fileService.markUnsafe(id, { currentUser: user })];
                        case 1:
                            fileInstance = _a.sent();
                            logger_1.default.info(JSON.stringify(fileInstance));
                            return [2 /*return*/, res.status(http_status_1.default.OK).json({
                                    message: 'File successfully marked unsafe',
                                    status: 'success',
                                    statusCode: http_status_1.default.OK,
                                })];
                        case 2:
                            error_4 = _a.sent();
                            logger_1.default.info(JSON.stringify(error_4));
                            next(error_4);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * Mark Safe
         */
        markSafe: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var user, id, fileInstance, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            user = req.user, id = req.params.id;
                            return [4 /*yield*/, fileService.markSafe(id, { currentUser: user })];
                        case 1:
                            fileInstance = _a.sent();
                            logger_1.default.info(JSON.stringify(fileInstance));
                            return [2 /*return*/, res.status(http_status_1.default.OK).json({
                                    message: 'File successfully marked safe',
                                    status: 'success',
                                    statusCode: http_status_1.default.OK,
                                })];
                        case 2:
                            error_5 = _a.sent();
                            logger_1.default.info(JSON.stringify(error_5));
                            next(error_5);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * Get file history
         */
        getFileHistory: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var user, filesInstances, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            user = req.user;
                            return [4 /*yield*/, fileService.getFileHistory({ currentUser: user })];
                        case 1:
                            filesInstances = _a.sent();
                            logger_1.default.info(JSON.stringify(filesInstances));
                            return [2 /*return*/, res.status(http_status_1.default.OK).json({
                                    message: 'File successfully marked safe',
                                    status: 'success',
                                    statusCode: http_status_1.default.OK,
                                    data: filesInstances,
                                })];
                        case 2:
                            error_6 = _a.sent();
                            logger_1.default.info(JSON.stringify(error_6));
                            next(error_6);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
    };
}
exports.FileControllerFactory = FileControllerFactory;
//# sourceMappingURL=file.controller.js.map