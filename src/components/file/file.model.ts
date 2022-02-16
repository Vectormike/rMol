import { User } from '../user/user.model';
import { Model, ModelObject } from 'objection';

export class File extends Model {
  id!: number;
  user_id: number;
  url: string;
  safe: boolean;
  safe_count: number;
  createdAt: Date;

  static tableName = 'files';
  static idColumn = 'id';

  //   static get relationMappings() {
  //     return {
  //         user: {
  //             relation: Model.BelongsToOneRelation,
  //             modelClass: User,
  //             join: {
  //                 from: 'questions.author_id',
  //                 to: 'users.id'
  //             }
  //         }
  //     }
  //   }
}

export type FileShape = ModelObject<File>;
