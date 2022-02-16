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
exports.FileService = void 0;
var parser_1 = __importDefault(require("datauri/parser"));
var cloudinary_1 = __importDefault(require("../../config/cloudinary"));
var errors_1 = require("../../errors");
var file_model_1 = require("./file.model");
var sharp_1 = __importDefault(require("sharp"));
var stream_1 = require("stream");
var logger_1 = __importDefault(require("../../logger"));
var path_1 = __importDefault(require("path"));
var FileService = /** @class */ (function () {
    function FileService(fileModel) {
        if (fileModel === void 0) { fileModel = file_model_1.File; }
        this.fileModel = fileModel;
    }
    /**
     * Upload File
     *
     */
    FileService.prototype.uploadFile = function (file, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url, bufferToStream, data, stream, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = void 0;
                        bufferToStream = function (buffer) {
                            var readable = new stream_1.Readable({
                                read: function () {
                                    this.push(buffer);
                                    this.push(null);
                                },
                            });
                            return readable;
                        };
                        return [4 /*yield*/, sharp_1.default(file.buffer).resize(320, 240).toBuffer()];
                    case 1:
                        data = _a.sent();
                        stream = cloudinary_1.default.v2.uploader.upload_stream(function (error, result) {
                            if (result) {
                                console.log(result);
                            }
                        });
                        bufferToStream(data).pipe(stream);
                        // const filePayload = {
                        //   url: result.secure_url,
                        //   user_id: options.currentUser.id,
                        // };
                        console.log(url, 'ssss');
                        return [3 /*break*/, 3];
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
     * Create folders to hold files
     *
     */
    FileService.prototype.createFolder = function (body, file, options) {
        return __awaiter(this, void 0, void 0, function () {
            var parser_2, data, fileResponse, result, filePayload_1, fileInstance, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        parser_2 = new parser_1.default();
                        data = function (file) { return parser_2.format(path_1.default.extname(file.originalname).toString(), file.buffer); };
                        fileResponse = data(file).content;
                        return [4 /*yield*/, cloudinary_1.default.v2.uploader.upload_large(fileResponse, { folder: body.folder })];
                    case 1:
                        result = _a.sent();
                        filePayload_1 = {
                            url: result.secure_url,
                            user_id: options.currentUser.id,
                        };
                        return [4 /*yield*/, this.fileModel.query().insert(filePayload_1)];
                    case 2:
                        fileInstance = _a.sent();
                        return [2 /*return*/, fileInstance];
                    case 3:
                        error_2 = _a.sent();
                        logger_1.default.info(JSON.stringify(error_2));
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Download File
     *
     */
    FileService.prototype.downloadFile = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var fileInstance, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fileModel.query().where({ id: id, user_id: options.currentUser.id }).first()];
                    case 1:
                        fileInstance = _a.sent();
                        return [2 /*return*/, fileInstance];
                    case 2:
                        error_3 = _a.sent();
                        logger_1.default.info(JSON.stringify(error_3));
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Mark files as unsafe
     *
     */
    FileService.prototype.markUnsafe = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var fileInstance, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.fileModel.query().findById(id)];
                    case 1:
                        fileInstance = _a.sent();
                        if (!fileInstance) {
                            throw new errors_1.NotFoundError('File does not exist');
                        }
                        if (!(fileInstance.safe_count === 3)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.fileModel.query().del().where({ id: id })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { message: 'File deleted!' }];
                    case 3: return [4 /*yield*/, this.fileModel
                            .query()
                            .update({ safe: false, safe_count: ++fileInstance.safe_count })
                            .where({ id: id })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        logger_1.default.info(JSON.stringify(error_4));
                        throw error_4;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Mark files as safe
     *
     */
    FileService.prototype.markSafe = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var fileInstance, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.fileModel.query().findById(id)];
                    case 1:
                        fileInstance = _a.sent();
                        if (!fileInstance) {
                            throw new errors_1.NotFoundError('File does not exist');
                        }
                        if (!(fileInstance.safe === false)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.fileModel.query().update({ safe: true, safe_count: 0 }).where({ id: id })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_5 = _a.sent();
                        logger_1.default.info(JSON.stringify(error_5));
                        throw error_5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return FileService;
}());
exports.FileService = FileService;
function filePayload(filePayload) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=file.service.js.map