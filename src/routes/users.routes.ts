import {
  FastifyInstance
} from 'fastify'
import usersControllers from '../controllers/users.controllers'

// interface requestGeneric extends RequestGenericInterface {
//   Params: {
//     id: string
//   }
//   Body: {
//     username: string
//   }
// }

export default async function routes (fastify: FastifyInstance): Promise<void> {
  fastify.get('/', usersControllers.queries.getAll)

  fastify.get('/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' }
        },
        required: ['id']
      }
    } as const
  }, usersControllers.queries.getOne)

  fastify.post('/', {
    schema: {
      body: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            minLength: 3
          },
          password: {
            type: 'string',
            minLength: 6
          }
        },
        required: ['username', 'password']
      }
    } as const
  }, usersControllers.mutations.create)
}
