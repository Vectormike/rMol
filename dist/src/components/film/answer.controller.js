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
exports.FilmControllerFactory = void 0;
var http_status_1 = __importDefault(require("http-status"));
var logger_1 = __importDefault(require("../../logger"));
function FilmControllerFactory(filmService) {
    return {
        /**
         * Fetch all films
         */
        fetchFilms: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var search, films, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            search = req.query.search;
                            return [4 /*yield*/, filmService.fetchFilms(search)];
                        case 1:
                            films = _a.sent();
                            logger_1.default.info(JSON.stringify(films));
                            return [2 /*return*/, res.status(http_status_1.default.OK).json({
                                    message: 'Film successfully fetched',
                                    status: 'success',
                                    statusCode: http_status_1.default.OK,
                                    data: films,
                                })];
                        case 2:
                            error_1 = _a.sent();
                            logger_1.default.info(error_1);
                            next(error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * create comment on film
         */
        createCommentOnFlim: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var params, body, user, films, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = req.params, body = req.body, user = req.user;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, filmService.createFilmComment(params.filmId, body, { currentUser: user })];
                        case 2:
                            films = _a.sent();
                            logger_1.default.info(JSON.stringify(films));
                            return [2 /*return*/, res.status(http_status_1.default.CREATED).json({
                                    message: 'Comment successfully added',
                                    status: 'success',
                                    statusCode: http_status_1.default.CREATED,
                                    data: films,
                                })];
                        case 3:
                            error_2 = _a.sent();
                            logger_1.default.info(error_2);
                            next(error_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * Fetch all comments on film
         */
        getCommentOnFlim: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var params, _a, page, limit, films, error_3;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            params = req.params, _a = req.query, page = _a.page, limit = _a.limit;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, filmService.getCommentOnFlim(params.filmId, { pagination: {
                                        page: Number(page || 0),
                                        limit: Number(limit || 2)
                                    } })];
                        case 2:
                            films = _b.sent();
                            logger_1.default.info(JSON.stringify(films));
                            return [2 /*return*/, res.status(http_status_1.default.OK).json({
                                    message: 'Successfully fetch comments',
                                    status: 'success',
                                    statusCode: http_status_1.default.Ok,
                                    data: films,
                                })];
                        case 3:
                            error_3 = _b.sent();
                            logger_1.default.info(error_3);
                            next(error_3);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
    };
}
exports.FilmControllerFactory = FilmControllerFactory;
//# sourceMappingURL=answer.controller.js.map