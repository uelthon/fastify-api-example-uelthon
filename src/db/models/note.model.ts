import { Model, JSONSchema, RelationMappings } from 'objection'
import User from './user.model'

class Note extends Model {
  static get tableName (): string {
    return 'notes'
  }

  static get jsonSchema (): JSONSchema {
    return {
      type: 'object',
      required: ['title', 'content'],

      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 3 },
        content: { type: 'string', minLength: 3 },
        pin: { type: 'boolean' },
        user_id: { type: 'integer' }
      }
    }
  }

  static get relationMappings (): RelationMappings {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'notes.user_id',
          to: 'users.id'
        }
      }
    }
  }
}

export default Note
