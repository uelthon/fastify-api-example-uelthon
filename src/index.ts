import app from './app'
import startDB from './db'
import { PORT } from './utils/config'

const startServer = async (): Promise<void> => {
  startDB()
  try {
    await app.listen({ port: PORT })
    app.log.info(`server connect to port ${PORT}`)
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

void startServer()
