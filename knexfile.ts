import type { Knex } from 'knex'
import { knexSnakeCaseMappers } from 'objection'
import * as dotenv from 'dotenv'
dotenv.config()

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {

  development: {
    client: 'postgresql',
    connection: process.env.POSTGRES_URI,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/db/seeds'
    },
    ...knexSnakeCaseMappers
  }

}

export default config
