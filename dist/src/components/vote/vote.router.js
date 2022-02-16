"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteRouter = void 0;
var express_1 = require("express");
function VoteRouter(options) {
    var controller = options.controller, guards = options.guards;
    var router = express_1.Router();
    /**
     * @createAnswer - create voting
     */
    router.route("/:answerId")
        .post(guards.AuthGuard({ strict: true }), controller.createVote)
        .post(guards.AuthGuard({ strict: true }), controller.downVote);
    return router;
}
exports.VoteRouter = VoteRouter;
//# sourceMappingURL=vote.router.js.map