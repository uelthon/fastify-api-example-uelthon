import { Model, JSONSchema } from 'objection'

class User extends Model {
  static get tableName (): string {
    return 'users'
  }

  static get jsonSchema (): JSONSchema {
    return {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 3 },
        password: { type: 'string', minLength: 6 }
      }
    }
  }
}

export default User
