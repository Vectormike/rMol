"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionRouter = exports.questionController = exports.questionService = void 0;
var guards_1 = __importDefault(require("../../shared/guards"));
var question_controller_1 = require("./question.controller");
var question_router_1 = require("./question.router");
var question_service_1 = require("./question.service");
exports.questionService = new question_service_1.QuestionService();
exports.questionController = question_controller_1.QuestionControllerFactory(exports.questionService);
exports.questionRouter = question_router_1.QuestionRouter({
    controller: exports.questionController,
    guards: guards_1.default,
});
//# sourceMappingURL=index.js.map