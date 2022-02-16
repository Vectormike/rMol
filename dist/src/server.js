"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/first */
var dotenv_1 = __importDefault(require("dotenv"));
var result = dotenv_1.default.config();
if (result.error) {
    dotenv_1.default.config({ path: '.env.default' });
}
var app_1 = __importDefault(require("./app"));
var logger_1 = __importDefault(require("./logger"));
app_1.default.listen(app_1.default.get('port'), function () {
    logger_1.default.info("Server server started at http://localhost:" + app_1.default.get('port'));
});
//# sourceMappingURL=server.js.map