"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genToken = exports.verifyRefreshToken = exports.signRefreshToken = exports.verifyAccessToken = exports.signAccessToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwt_1 = __importDefault(require("../config/jwt"));
var createError = require("http-errors");
// import TokenModel from '../models/Token';
function signAccessToken(payload) {
    return new Promise(function (resolve, reject) {
        var secret = jwt_1.default.appKey;
        var options = {
            expiresIn: "24h",
            issuer: "lms",
            audience: payload.id,
        };
        jsonwebtoken_1.default.sign(payload, secret, options, function (err, token) {
            if (err) {
                reject(createError.InternalServerError());
                return;
            }
            resolve(token);
        });
    });
}
exports.signAccessToken = signAccessToken;
function signRefreshToken(payload) {
    return new Promise(function (resolve, reject) {
        var secret = jwt_1.default.refreshTokenKey;
        var options = {
            expiresIn: "1y",
            issuer: "lms",
            audience: payload.id,
        };
        jsonwebtoken_1.default.sign(payload, secret, options, function (err, token) {
            if (err) {
                reject(createError.InternalServerError());
                return;
            }
            // TokenModel.create({ userId: payload.id, value: token })
            //   .then(_tokenObject => {
            //     resolve(token);
            //   })
            //   .catch(err => {
            //     console.log('RefreshTokenStorageError', err);
            //     reject(createError.InternalServerError());
            //   })
        });
    });
}
exports.signRefreshToken = signRefreshToken;
function verifyAccessToken(req, res, next) {
    if (!req.headers["authorization"])
        return next(createError.Unauthorized());
    var authHeader = req.headers["authorization"];
    var bearerToken = authHeader.split(" ");
    var token = bearerToken[1];
    jsonwebtoken_1.default.verify(token, jwt_1.default.appKey, function (err, payload) {
        if (err) {
            var message = err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
            return next(createError.Unauthorized(message));
        }
        req.payload = payload;
        next();
    });
}
exports.verifyAccessToken = verifyAccessToken;
function verifyRefreshToken(refreshToken) {
    return new Promise(function (resolve, reject) {
        jsonwebtoken_1.default.verify(refreshToken, jwt_1.default.refreshTokenKey, function (err, payload) {
            if (err)
                return reject(createError.Unauthorized());
            var userId = payload.aud;
            resolve(payload);
        });
    });
}
exports.verifyRefreshToken = verifyRefreshToken;
function genToken(payload) {
    var secret = jwt_1.default.appKey;
    var token = jsonwebtoken_1.default.sign(__assign(__assign({}, payload), { date: Date.now() }), secret, { expiresIn: '90d' });
    return token;
}
exports.genToken = genToken;
//# sourceMappingURL=jwt.js.map