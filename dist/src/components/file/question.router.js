"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRouter = void 0;
var express_1 = require("express");
function FileRouter(options) {
    var controller = options.controller, guards = options.guards, validator = options.validator;
    var router = express_1.Router();
    /**
     * @fetchFilms - fetch films
     */
    router
        .route('/')
        // .get(guards.AuthGuard({ strict: true }), controller.fetchQuestions)
        .post(guards.AuthGuard({ strict: true }), controller.uploadFile);
    // router.route('/:questionId').get(guards.AuthGuard({strict: true}), controller.subscribeToQuestion)
    return router;
}
exports.FileRouter = FileRouter;
//# sourceMappingURL=question.router.js.map