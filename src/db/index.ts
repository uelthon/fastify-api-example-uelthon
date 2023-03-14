import { Model } from 'objection'
import knex from 'knex'
import knexConfig from './knexfile'

const startDB = (): void => {
  const db = knex(knexConfig.development)
  Model.knex(db)
}

export default startDB
