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
exports.AnswerService = void 0;
var errors_1 = require("../../errors");
var answer_model_1 = require("./answer.model");
var question_model_1 = require("../question/question.model");
var logger_1 = __importDefault(require("../../logger"));
var redis_connection_1 = require("../../redis.connection");
var AnswerService = /** @class */ (function () {
    function AnswerService(answerModel, questionModel) {
        if (answerModel === void 0) { answerModel = answer_model_1.Answer; }
        if (questionModel === void 0) { questionModel = question_model_1.Question; }
        this.answerModel = answerModel;
        this.questionModel = questionModel;
    }
    /**
     * fetch Answer
     */
    AnswerService.prototype.fetchAnswers = function (questionId) {
        return __awaiter(this, void 0, void 0, function () {
            var answers, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.questionModel.query().findOne(questionId)];
                    case 1:
                        answers = _a.sent();
                        return [2 /*return*/, answers];
                    case 2:
                        error_1 = _a.sent();
                        logger_1.default.info(JSON.stringify(error_1));
                        throw new errors_1.BadRequestError('Unable to fetch Answer');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Create answers
    *
    */
    AnswerService.prototype.createAnswer = function (questionId, payload, options) {
        return __awaiter(this, void 0, void 0, function () {
            var answerPayload, answerId, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        answerPayload = {
                            text: payload.text,
                            author_id: options.currentUser.id,
                            question_id: questionId,
                        };
                        return [4 /*yield*/, this.answerModel.query().insert(answerPayload)];
                    case 1:
                        answerId = _a.sent();
                        return [4 /*yield*/, this.questionModel.query().insert({
                                answer_id: answerId.id
                            })];
                    case 2:
                        _a.sent();
                        redis_connection_1.redisClient.publish('answer-notify', JSON.stringify(answerId));
                        return [2 /*return*/, this.answerModel.query().findOne(answerId)];
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
    * Remove answers
    *
    */
    AnswerService.prototype.removeAnswer = function (answerId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.answerModel.query().where({ id: answerId }).del()];
                }
                catch (error) {
                    logger_1.default.info(JSON.stringify(error));
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    return AnswerService;
}());
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map