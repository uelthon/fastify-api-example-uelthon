import fastify from 'fastify'

import notesRoutes from './routes/notes.routes'
import usersRoutes from './routes/users.routes'

const app = fastify({
  logger: true
})

app.get('/', async (req, res) => {
  await res.status(200).send('hello there')
})

void app.register(usersRoutes, {
  prefix: '/api/users'
})

void app.register(notesRoutes, {
  prefix: '/api/notes'
})

export default app
