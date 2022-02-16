"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterRouter = exports.characterController = exports.characterService = void 0;
var guards_1 = __importDefault(require("../../shared/guards"));
var character_controller_1 = require("./character.controller");
var character_router_1 = require("./character.router");
var character_service_1 = require("./character.service");
exports.characterService = new character_service_1.CharacterService();
exports.characterController = character_controller_1.CharacterControllerFactory(exports.characterService);
exports.characterRouter = character_router_1.CharacterRouter({
    controller: exports.characterController,
    guards: guards_1.default,
});
//# sourceMappingURL=index.js.map