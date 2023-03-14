import { RouteHandler } from 'fastify'
import { z, ZodError } from 'zod'
import Note from '../db/models/note.model'
import User from '../db/models/user.model'

const requestId = z.object({
  id: z.string({
    required_error: 'incorrect or missing id'
  })
}).partial()

const noteVal = z.object({
  title: z.string({
    required_error: 'title is required'
  }).min(4, {
    message: 'title almost be 4 letters'
  }),
  content: z.string({
    required_error: 'content is required'
  }).min(4, {
    message: 'content almost be 4 letters'
  }),
  pin: z.boolean().nullish(),
  user_id: z.number({
    required_error: 'incorrect or missing id'
  })
}).partial()

interface Queries {
  getAll: RouteHandler
  getOne: RouteHandler
}

interface Mutations {
  create: RouteHandler
  update: RouteHandler
  delete: RouteHandler<{
    Params: {
      id: string
    }
  }>
}

const queries: Queries = {
  getAll: async (req, res) => {
    const notes = await Note.query()
    await res.status(200).send(notes)
  },
  getOne: async (req, res) => {
    try {
      const { id } = requestId.required({
        id: true
      }).parse(req.params)
      const note = await Note.query().findById(id)
      await res.status(200).send(note)
    } catch (error) {
      if (error instanceof ZodError) {
        const formatError = error.issues
        await res.status(400).send(formatError.map(e => e.message))
      }
      console.log(error)
    }
  }
}

const mutations: Mutations = {
  create: async (req, res) => {
    try {
      const body = noteVal.parse(req.body)
      const { user_id: userId } = noteVal.required({
        user_id: true
      }).parse(req.body)
      const user = (await User.query().findById(userId))?.toJSON() //eslint-disable-line
      const note = await Note.query().insert(body)
      await res.status(200).send(note)
    } catch (error) {
      if (error instanceof ZodError) {
        const formatError = error.issues
        await res.status(400).send(formatError.map(e => e.message))
      }
      console.log(error)
    }
  },
  update: async (req, res) => {
    try {
      const { id } = requestId.required({
        id: true
      }).parse(req.params)
      const body = noteVal.parse(req.body)
      const note = await Note.query().findById(id).patch(body)
      await res.status(200).send(note)
    } catch (error) {
      if (error instanceof ZodError) {
        const formatError = error.issues
        await res.status(400).send(formatError.map(e => e.message))
      }
      console.log(error)
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = requestId.required({
        id: true
      }).parse(req.params)
      await res.code(200).send({ status: `${id} delete success` })
    } catch (error) {
      if (error instanceof ZodError) {
        const formatError = error.issues
        await res.code(400).send(formatError.map(e => e.message))
      }
    }
  }
}

export default {
  queries,
  mutations
}
