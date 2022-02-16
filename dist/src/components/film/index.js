"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filmRouter = exports.filmController = exports.filmService = void 0;
var comment_1 = require("../comment");
var guards_1 = __importDefault(require("../../shared/guards"));
var film_controller_1 = require("./film.controller");
var film_router_1 = require("./film.router");
var film_service_1 = require("./film.service");
var film_dto_1 = require("./film.dto");
exports.filmService = new film_service_1.FilmService(comment_1.commentService);
exports.filmController = film_controller_1.FilmControllerFactory(exports.filmService);
exports.filmRouter = film_router_1.FilmRouter({
    controller: exports.filmController,
    guards: guards_1.default,
    validator: new film_dto_1.FilmValidator()
});
//# sourceMappingURL=index.js.map