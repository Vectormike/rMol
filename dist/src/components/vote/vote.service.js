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
exports.VoteService = void 0;
var errors_1 = require("../../errors");
var vote_model_1 = require("./vote.model");
var logger_1 = __importDefault(require("../../logger"));
var VoteService = /** @class */ (function () {
    function VoteService(voteModel) {
        if (voteModel === void 0) { voteModel = vote_model_1.Vote; }
        this.voteModel = voteModel;
    }
    /**
     * Up a vote on an answer
     */
    VoteService.prototype.upVote = function (vote, answerId, options) {
        var _a;
        if (vote === void 0) { vote = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var existingVote, answerVotes, votePayload_1, voteId_1, votePayload, voteId, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        logger_1.default.info("Making an upvote");
                        return [4 /*yield*/, this.voteModel.query().findOne({ userId: options.currentUser.id })];
                    case 1:
                        existingVote = _b.sent();
                        console.log(existingVote);
                        console.log('1');
                        if (!!existingVote) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.voteModel.query().findOne({ answerId: answerId })];
                    case 2:
                        answerVotes = _b.sent();
                        console.log('2');
                        if (!!answerVotes) return [3 /*break*/, 4];
                        console.log('Hi');
                        votePayload_1 = {
                            userId: options.currentUser.id,
                            answerId: answerId,
                            vote: 0
                        };
                        console.log(votePayload_1);
                        return [4 /*yield*/, this.voteModel.query().insert(votePayload_1)];
                    case 3:
                        voteId_1 = _b.sent();
                        logger_1.default.info("Upvote done");
                        return [2 /*return*/, this.voteModel.query().findOne(voteId_1)];
                    case 4:
                        votePayload = {
                            userId: options.currentUser.id,
                            vote: answerVotes.vote += vote
                        };
                        return [4 /*yield*/, this.voteModel.query().insert(votePayload)];
                    case 5:
                        voteId = _b.sent();
                        logger_1.default.info("Upvote done");
                        return [2 /*return*/, this.voteModel.query().findOne(voteId)];
                    case 6: return [2 /*return*/, {
                            message: "You can't vote more than once"
                        }];
                    case 7:
                        error_1 = _b.sent();
                        if (((_a = error_1.response) === null || _a === void 0 ? void 0 : _a.status) == 404) {
                            throw new errors_1.NotFoundError("You can't vote on a question that doesnot exist.");
                        }
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Down a vote on an answer
     */
    VoteService.prototype.downVote = function (vote, answerId, options) {
        var _a;
        if (vote === void 0) { vote = -1; }
        return __awaiter(this, void 0, void 0, function () {
            var existingVote, answerVotes, votePayload_2, voteId_2, votePayload, voteId, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        logger_1.default.info("Making downvote");
                        return [4 /*yield*/, this.voteModel.query().findOne({ userId: options.currentUser.id })];
                    case 1:
                        existingVote = _b.sent();
                        console.log(existingVote);
                        console.log('1');
                        if (!!existingVote) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.voteModel.query().findOne({ answerId: answerId })];
                    case 2:
                        answerVotes = _b.sent();
                        console.log('2');
                        if (!!answerVotes) return [3 /*break*/, 4];
                        console.log('Hi');
                        votePayload_2 = {
                            userId: options.currentUser.id,
                            answerId: answerId,
                            vote: -1
                        };
                        return [4 /*yield*/, this.voteModel.query().insert(votePayload_2)];
                    case 3:
                        voteId_2 = _b.sent();
                        logger_1.default.info("Downvote done");
                        return [2 /*return*/, this.voteModel.query().findOne(voteId_2)];
                    case 4:
                        votePayload = {
                            userId: options.currentUser.id,
                            vote: answerVotes.vote -= vote
                        };
                        return [4 /*yield*/, this.voteModel.query().insert(votePayload)];
                    case 5:
                        voteId = _b.sent();
                        logger_1.default.info("Downvote done");
                        return [2 /*return*/, this.voteModel.query().findOne(voteId)];
                    case 6: return [2 /*return*/, {
                            message: "You can't vote more than once"
                        }];
                    case 7:
                        error_2 = _b.sent();
                        if (((_a = error_2.response) === null || _a === void 0 ? void 0 : _a.status) == 404) {
                            throw new errors_1.NotFoundError("You can't vote on a question that doesnot exist.");
                        }
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return VoteService;
}());
exports.VoteService = VoteService;
//# sourceMappingURL=vote.service.js.map