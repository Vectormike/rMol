"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("./components/auth");
var file_1 = require("./components/file");
var router = express_1.Router();
router.get('/', function (req, res) {
    return res.status(200).send({
        message: 'Welcome to Risevest bruh!',
    });
});
router.use('/api/auth', auth_1.authRouter);
router.use('/api/file', file_1.fileRouter);
exports.default = router;
//# sourceMappingURL=routes.js.map