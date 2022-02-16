"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterService = void 0;
var errors_1 = require("../../errors");
var axios_1 = __importDefault(require("../../helpers/axios"));
var logger_1 = __importDefault(require("../../logger"));
var CharacterService = /** @class */ (function () {
    function CharacterService() {
    }
    /**
     * Fetch character by an order
     * @param orderByField
     * @param order
     */
    CharacterService.prototype.fetchCharacters = function (orderByField, order) {
        return __awaiter(this, void 0, void 0, function () {
            var url, characters, characterApiResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!['name', 'gender'].includes(orderByField)) {
                            throw new errors_1.BadRequestError("Invalid Filter for ordering. filter can only be by gender or name");
                        }
                        if (!['asc', 'desc'].includes(order)) {
                            throw new errors_1.BadRequestError("order param can only be asc or desc");
                        }
                        if ((order && !orderByField) || (!order && orderByField)) {
                            throw new errors_1.BadRequestError("incomplete filter parameters");
                        }
                        url = '/people/';
                        logger_1.default.info("fetch characters from swapi " + url);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 1:
                        characters = _a.sent();
                        characterApiResult = characters.data.results;
                        logger_1.default.info("fetch characters  from swapi " + url);
                        if (orderByField) {
                            return [2 /*return*/, this.orderCharactersByField(orderByField, order, characterApiResult)];
                        }
                        console.log("HHHH");
                        return [2 /*return*/, characterApiResult];
                }
            });
        });
    };
    /**
     *  Order characters
     * @param orderBy
     * @param order
     * @param characters
     * @returns
     */
    CharacterService.prototype.orderCharactersByField = function (orderBy, order, characters) {
        return characters.sort(function (a, b) {
            if (order = 'asc') {
                return a[orderBy].localeCompare(b[orderBy]);
            }
            return b[orderBy].localeCompare(a[orderBy]);
        });
    };
    return CharacterService;
}());
exports.CharacterService = CharacterService;
//# sourceMappingURL=question.service.js.map