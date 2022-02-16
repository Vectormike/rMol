"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterRouter = void 0;
var express_1 = require("express");
function CharacterRouter(options) {
    var controller = options.controller, guards = options.guards, validator = options.validator;
    var router = express_1.Router();
    /**
     * @fetchFilms - fetch films
     */
    router.get("/", controller.fetchCharacters);
    router.route("/characters")
        .get(guards.AuthGuard({ strict: true }), controller.fetchCharacters);
    return router;
}
exports.CharacterRouter = CharacterRouter;
//# sourceMappingURL=question.router.js.map