"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerRouter = void 0;
var express_1 = require("express");
function AnswerRouter(options) {
    var controller = options.controller, guards = options.guards, validator = options.validator;
    var router = express_1.Router();
    /**
     * @fetchFilms - fetch answers
     */
    router.get("/", guards.AuthGuard({ strict: true }), controller.fetchAnswers);
    router.route("/:questionId")
        .post(validator.createAnswerValidator.validate, guards.AuthGuard({ strict: true }), controller.createAnswer);
    return router;
}
exports.AnswerRouter = AnswerRouter;
//# sourceMappingURL=answer.router.js.map