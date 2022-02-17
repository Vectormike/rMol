import * as ORM from 'knex';
import dotenv from 'dotenv';
dotenv.config();

const knex = ORM.knex({
  client: 'mysql',
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
    directory: __dirname + '../../../database/migrations',
  },
});

const setupTestDB = () => {
  beforeAll(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
  }, 30000);

  afterAll(async () => {
    await knex.migrate.rollback();
  }, 30000);
};

export default setupTestDB;
