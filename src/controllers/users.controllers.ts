import { RouteHandler } from 'fastify'
import User from '../db/models/user.model'

const getAll: RouteHandler = async (req, res) => {
  const users = await User.query()
  await res.code(200).send(users)
}

const getOne: RouteHandler<{
  Params: {
    id: string
  }
}> = async (req, res) => {
  const id = req.params.id
  const user = await User.query().findById(id)
  await res.code(200).send(user)
}

const create: RouteHandler<{
  Body: {
    username: string
    password: string
  }
}> = async (req, res) => {
  const { username, password } = req.body
  const user = await User.query().insert({
    username,
    password
  })
  await res.code(200).send(user)
}

export default {
  queries: {
    getAll,
    getOne
  },
  mutations: {
    create
  }
}
