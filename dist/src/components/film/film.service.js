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
exports.FilmService = void 0;
var errors_1 = require("../../errors");
var axios_1 = __importDefault(require("../../helpers/axios"));
var logger_1 = __importDefault(require("../../logger"));
var redis_connection_1 = require("../../redis.connection");
var FilmService = /** @class */ (function () {
    function FilmService(commentService) {
        this.commentService = commentService;
    }
    /**
     * fetch films
     */
    FilmService.prototype.fetchFilms = function (search) {
        return __awaiter(this, void 0, void 0, function () {
            var url_1;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    url_1 = '/films/';
                    url_1 = search ? url_1 + '?' + 'search=' + search : url_1;
                    logger_1.default.info("fetch all film from swapi " + url_1);
                    //check cache
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            logger_1.default.info("Checking films in cache");
                            redis_connection_1.redisClient.GET("films", function (err, result) { return __awaiter(_this, void 0, void 0, function () {
                                var films, filmApiResult_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            logger_1.default.info("Internal Server Error");
                                            if (err) {
                                                logger_1.default.info("Internal Server Error");
                                                reject(Error("Internal Server Error"));
                                            }
                                            if (!result) return [3 /*break*/, 1];
                                            logger_1.default.info("films gotten from cache");
                                            resolve(JSON.parse(result));
                                            return [3 /*break*/, 3];
                                        case 1:
                                            logger_1.default.info("Making api request from films");
                                            return [4 /*yield*/, axios_1.default.get(url_1)];
                                        case 2:
                                            films = _a.sent();
                                            filmApiResult_1 = films.data.results;
                                            if (!search) {
                                                redis_connection_1.redisClient.SET('films', JSON.stringify(filmApiResult_1), "EX", 365 * 24 * 60 * 60, function (err, reply) {
                                                    if (err) {
                                                        logger_1.default.info("Internal Server Error");
                                                        reject(new Error("Internal Server Error"));
                                                    }
                                                    logger_1.default.info("films gotten from swapApi");
                                                    resolve(filmApiResult_1);
                                                });
                                            }
                                            resolve(filmApiResult_1);
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); });
                        }).then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                            var filmsResult, newResult;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        filmsResult = data;
                                        logger_1.default.info("response for fetch all film from swapi " + JSON.stringify(filmsResult));
                                        return [4 /*yield*/, Promise.all(filmsResult.map(function (film) { return __awaiter(_this, void 0, void 0, function () {
                                                var commentCount;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, this.commentService.fetchAllCommentsOnFilm(film.episode_id)];
                                                        case 1:
                                                            commentCount = _a.sent();
                                                            film.comment_count = commentCount[0]["count(*)"];
                                                            return [2 /*return*/, film];
                                                    }
                                                });
                                            }); }))];
                                    case 1:
                                        _a.sent();
                                        newResult = this.sortFilmsByDate(filmsResult);
                                        return [2 /*return*/, newResult];
                                }
                            });
                        }); })];
                }
                catch (error) {
                    logger_1.default.info(JSON.stringify(error));
                    throw new errors_1.BadRequestError('Unable to fetch films');
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @method sort films by release date
     * @param films
     * @returns
     */
    FilmService.prototype.sortFilmsByDate = function (films) {
        return films.sort(function (a, b) { return b.release_date - a.release_date; });
    };
    /**
    * create film comment
    */
    FilmService.prototype.createFilmComment = function (filmId, payload, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.commentService.createComment(filmId, payload, options)];
            });
        });
    };
    /**
    * get comment on film
    */
    FilmService.prototype.getCommentOnFlim = function (filmId, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("/films/" + filmId)];
                    case 1:
                        _b.sent();
                        logger_1.default.info("fetch all comments on film from--  films/" + filmId);
                        return [2 /*return*/, this.commentService.fetchCommentsByFilmId(filmId, options)];
                    case 2:
                        error_1 = _b.sent();
                        if (((_a = error_1.response) === null || _a === void 0 ? void 0 : _a.status) == 404) {
                            logger_1.default.info(filmId + ", does not exist");
                            throw new errors_1.NotFoundError("You can't comment on a film that doesnot exist");
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return FilmService;
}());
exports.FilmService = FilmService;
//# sourceMappingURL=film.service.js.map