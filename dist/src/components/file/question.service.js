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
exports.QuestionService = void 0;
var errors_1 = require("../../errors");
var file_model_1 = require("./file.model");
var redis_connection_1 = require("../../redis.connection");
var logger_1 = __importDefault(require("../../logger"));
var QuestionService = /** @class */ (function () {
    function QuestionService(fileModel) {
        if (fileModel === void 0) { fileModel = file_model_1.File; }
        this.fileModel = fileModel;
    }
    /**
     * Fetch questions
     *
     */
    QuestionService.prototype.fetchQuestions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                logger_1.default.info("fetch questions");
                // Check Cache
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        logger_1.default.info('Checking Questions in cache');
                        redis_connection_1.redisClient.GET("questions", function (err, result) { return __awaiter(_this, void 0, void 0, function () {
                            var questions_1;
                            return __generator(this, function (_a) {
                                logger_1.default.info('Internal Server Error');
                                if (err) {
                                    logger_1.default.info('Internal Server Error');
                                    reject(Error('Internal Server Error'));
                                }
                                if (result) {
                                    logger_1.default.info('questions gotten from cache');
                                    resolve(JSON.parse(result));
                                }
                                else {
                                    logger_1.default.info('Fetch questions from DB');
                                    questions_1 = this.fileModel.query().select('title', 'text');
                                    redis_connection_1.redisClient.SET('questions', JSON.stringify(questions_1), 'EX', 365 * 24 * 60 * 60, function (err, reply) {
                                        if (err) {
                                            logger_1.default.info('Internal Server Error');
                                            reject(new Error('Internal Server Error'));
                                        }
                                        resolve(questions_1);
                                    });
                                }
                                return [2 /*return*/];
                            });
                        }); });
                    }).then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                        var questions;
                        return __generator(this, function (_a) {
                            questions = data;
                            return [2 /*return*/, questions];
                        });
                    }); })];
            });
        });
    };
    /**
     * Create questions
     *
     */
    QuestionService.prototype.createQuestions = function (payload, options) {
        return __awaiter(this, void 0, void 0, function () {
            var questionPayload, questionId, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        questionPayload = {
                            title: payload.title,
                            text: payload.text,
                            author_id: options.currentUser.id,
                        };
                        return [4 /*yield*/, this.fileModel.query().insert(questionPayload)];
                    case 1:
                        questionId = _a.sent();
                        return [2 /*return*/, this.fileModel.query().findOne(questionId)];
                    case 2:
                        error_1 = _a.sent();
                        logger_1.default.info(JSON.stringify(error_1));
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    QuestionService.prototype.subscribeToQuestion = function (questionId) {
        return __awaiter(this, void 0, void 0, function () {
            var answers, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fileModel.query().findOne(questionId)];
                    case 1:
                        answers = _a.sent();
                        redis_connection_1.redisClient.subscribe('answer-notify');
                        return [2 /*return*/, answers];
                    case 2:
                        error_2 = _a.sent();
                        logger_1.default.info(JSON.stringify(error_2));
                        throw new errors_1.BadRequestError('Unable to subscribe.');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return QuestionService;
}());
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map