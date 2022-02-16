"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmRouter = void 0;
var express_1 = require("express");
function FilmRouter(options) {
    var controller = options.controller, guards = options.guards, validator = options.validator;
    var router = express_1.Router();
    /**
     * @fetchFilms - fetch films
     */
    router.get("/", guards.AuthGuard({ strict: true }), controller.fetchFilms);
    router.route("/:filmId/comments")
        .post(validator.createCommentValidator.validate, guards.AuthGuard({ strict: true }), controller.createCommentOnFlim)
        .get(guards.AuthGuard({ strict: true }), controller.getCommentOnFlim);
    return router;
}
exports.FilmRouter = FilmRouter;
//# sourceMappingURL=film.router.js.map