"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Update with your config settings.require('ts-node/register');
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// console.log(process.env);
module.exports = {
    development: {
        client: 'pg',
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            port: process.env.DB_PORT,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            loadExtensions: ['.ts'],
            extension: 'ts',
            tableName: 'knex_migrations',
            directory: __dirname + '/src/database/migrations',
        },
    },
    test: {
        client: 'mysql',
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            port: process.env.DB_PORT,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            loadExtensions: ['.ts'],
            extension: 'ts',
            tableName: 'knex_migrations',
            directory: __dirname + './src/database/migrations',
        },
    },
    production: {
        client: 'mysql2',
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            port: process.env.DB_PORT,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            loadExtensions: ['.ts'],
            extension: 'ts',
            tableName: 'knex_migrations',
            directory: __dirname + './src/database/migrations',
        },
    },
};
//# sourceMappingURL=knexfile.js.map