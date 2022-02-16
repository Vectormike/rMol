"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerRouter = exports.answerController = exports.answerService = void 0;
var guards_1 = __importDefault(require("../../shared/guards"));
var answer_controller_1 = require("./answer.controller");
var answer_model_1 = require("./answer.model");
var answer_router_1 = require("./answer.router");
var answer_service_1 = require("./answer.service");
var answer_dto_1 = require("./answer.dto");
exports.answerService = new answer_service_1.AnswerService(answer_model_1.Answer);
exports.answerController = answer_controller_1.AnswerControllerFactory(exports.answerService);
exports.answerRouter = answer_router_1.AnswerRouter({
    controller: exports.answerController,
    guards: guards_1.default,
    validator: new answer_dto_1.AnswerValidator()
});
//# sourceMappingURL=index.js.map