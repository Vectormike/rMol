"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileRouter = exports.fileController = exports.questionService = void 0;
var guards_1 = __importDefault(require("../../shared/guards"));
var file_controller_1 = require("./file.controller");
var file_router_1 = require("./file.router");
var file_service_1 = require("./file.service");
exports.questionService = new file_service_1.FileService();
exports.fileController = file_controller_1.FileControllerFactory(exports.questionService);
exports.fileRouter = file_router_1.FileRouter({
    controller: exports.fileController,
    guards: guards_1.default,
});
//# sourceMappingURL=index.js.map