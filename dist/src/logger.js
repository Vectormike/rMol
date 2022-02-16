"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require('winston');
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var ElasticsearchTransport = require('winston-elasticsearch').ElasticsearchTransport;
var esTransportOpts = {
    level: 'info',
    dataStream: true,
    clientOpts: { node: process.env.ELASTICSEARCH_URL }
};
// const esTransport = new ElasticsearchTransport(esTransportOpts);
var colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};
winston.addColors(colors);
var logConfiguration = {
    transports: [
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
        }),
        new winston.transports.File({
            level: 'info',
            filename: "logs/logfile",
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: true
        }), //save errors on file
        // esTransport
    ],
    format: winston.format.combine(winston.format.label({
        label: "Request\uD83C\uDFF7\uFE0F"
    }), winston.format.timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss'
    }), winston.format.printf(function (info) { return info.level + ": " + info.label + ": " + [info.timestamp] + ": " + info.message; }))
};
var logger = winston.createLogger(logConfiguration);
logger.stream = {
    write: function (message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    },
};
exports.default = logger;
//# sourceMappingURL=logger.js.map