import { Model, ModelObject } from 'objection';

export class User extends Model {
  id!: number;
  email!: string;
  full_name!: string;
  password!: string;
  role!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static tableName = 'users'; // database table name
  static idColumn = 'id'; // id column name

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    delete json.createAt;
    delete json.updatedAt;
    delete json.role;
    return json;
  }
}

export type UserShape = ModelObject<User>;
