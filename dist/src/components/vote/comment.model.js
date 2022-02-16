"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
var user_model_1 = require("../user/user.model");
var objection_1 = require("objection");
var Comment = /** @class */ (function (_super) {
    __extends(Comment, _super);
    function Comment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Comment, "relationMappings", {
        get: function () {
            return {
                user: {
                    relation: objection_1.Model.BelongsToOneRelation,
                    modelClass: user_model_1.User,
                    join: {
                        from: 'comments.userId',
                        to: 'users.id'
                    }
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    Comment.tableName = 'comments';
    Comment.idColumn = 'id';
    return Comment;
}(objection_1.Model));
exports.Comment = Comment;
//# sourceMappingURL=comment.model.js.map