import request from 'supertest';
import * as ORM from 'knex';
import app from '../app';
import dotenv from 'dotenv';
dotenv.config();
const knex = ORM.knex({
  client: 'pg',
  connection: {
    database: process.env.DB_NAME_TEST,
    user: process.env.DB_USERNAME_TEST,
    port: Number(process.env.DB_PORT_TEST),
    host: process.env.DB_HOST_TEST,
    password: process.env.DB_PASSWORD_TEST,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    loadExtensions: ['.ts'],
    extension: 'ts',
    tableName: 'knex_migrations',
    directory: __dirname + '../../database/migrations',
  },
});

beforeAll(async () => {
  await knex.migrate.rollback();
  await knex.migrate.latest();
}, 30000);

afterAll(async () => {
  await knex.migrate.rollback();
});

describe('User and Authentication management', () => {
  let token;
  let refreshToken;

  it('should register a user', async (done) => {
    const res = await request(app).post(`/api/auth/register`).send({
      email: 'victorjonah199@gmail.com',
      full_name: 'Victor Jonah',
      password: 'Redeemer',
    });
    console.log('STATUS_RES', res.body.data);
    expect(res.status).toBe(201);
    expect(res.body.data.full_name).toEqual('Victor Jonah');
    done();
  });

  it('should login a user', async (done) => {
    const res = await request(app).post(`/api/auth/login`).send({
      email: 'victorjonah199@gmail.com',
      password: 'Redeemer',
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('Logged in successfully');

    refreshToken = res.body.data.refreshToken;
    done();
  });
});
