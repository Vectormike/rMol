"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionRouter = void 0;
var express_1 = require("express");
function QuestionRouter(options) {
    var controller = options.controller, guards = options.guards, validator = options.validator;
    var router = express_1.Router();
    /**
     * @fetchFilms - fetch films
     */
    router.route("/")
        .get(guards.AuthGuard({ strict: true }), controller.fetchQuestions)
        .post(guards.AuthGuard({ strict: true }), controller.createQuestion);
    router.route('/:questionId').get(guards.AuthGuard({ strict: true }), controller.subscribeToQuestion);
    return router;
}
exports.QuestionRouter = QuestionRouter;
//# sourceMappingURL=question.router.js.map