import { FastifyInstance } from 'fastify'

import notesControllers from '../controllers/notes.controllers'

export default async function routes (fastify: FastifyInstance): Promise<void> {
  fastify.get('/', notesControllers.queries.getAll)
  fastify.get('/:id', notesControllers.queries.getOne)
  fastify.post('/', notesControllers.mutations.create)
  fastify.put('/:id', notesControllers.mutations.update)
  fastify.delete('/:id', notesControllers.mutations.delete)
}
