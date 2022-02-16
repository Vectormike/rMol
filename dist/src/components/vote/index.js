"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteRouter = exports.voteController = exports.voteService = void 0;
var vote_service_1 = require("./vote.service");
var vote_controller_1 = require("./vote.controller");
var vote_router_1 = require("./vote.router");
var guards_1 = __importDefault(require("../../shared/guards"));
exports.voteService = new vote_service_1.VoteService();
exports.voteController = vote_controller_1.VoteControllerFactory(exports.voteService);
exports.voteRouter = vote_router_1.VoteRouter({
    controller: exports.voteController,
    guards: guards_1.default,
});
//# sourceMappingURL=index.js.map