"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRouter = void 0;
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.memoryStorage();
var upload = multer_1.default({ storage: storage, limits: { fileSize: Infinity, files: 1 } });
function FileRouter(options) {
    var controller = options.controller, guards = options.guards, validator = options.validator;
    var router = express_1.Router();
    router.post('/upload', guards.AuthGuard({ strict: true }), upload.single('file'), controller.uploadFile);
    router.post('/folder', guards.AuthGuard({ strict: true }), upload.single('file'), controller.createFolder);
    router.get('/download/:id', guards.AuthGuard({ strict: true }), controller.downloadFile);
    router.patch('/mark-unsafe/:id', guards.AuthGuard({ strict: true }), controller.markUnsafe);
    router.patch('/mark-safe/:id', guards.AuthGuard({ strict: true }), controller.markSafe);
    return router;
}
exports.FileRouter = FileRouter;
//# sourceMappingURL=file.router.js.map