import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTableIfNotExists('users', (table) => {
    table.increments('id').primary()
    table.string('username').notNullable().unique().checkLength('>=', 3)
    table.string('password').notNullable().checkLength('>=', 6)
    table.timestamps(true, true)
  })
    .createTableIfNotExists('notes', (table) => {
      table.increments('id').primary()
      table.string('title').notNullable().checkLength('>=', 3)
      table.string('content').notNullable().checkLength('>=', 3)
      table.boolean('pin').defaultTo(false)
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
      table.timestamps(true, true)
    })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.table('notes', (table) => {
    table.dropColumn('user_id')
  })
  await knex.schema.dropTable('users')
  await knex.schema.dropTable('notes')
}
