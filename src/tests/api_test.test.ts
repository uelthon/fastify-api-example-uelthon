import supertest from 'supertest'
import { Model } from 'objection'
import knex from 'knex'
import User from '../db/models/user.model'
import Note from '../db/models/note.model'
import knexfile from '../db/knexfile'
import app from '../app'

let db: any
beforeAll(async () => await app.ready())
beforeAll(async () => {
  db = knex(knexfile.development)
  Model.knex(db)
})

describe('prueba de inicio de servidor', () => {
  test('api start', async () => {
    await supertest(app.server)
      .get('/')
      .expect(200)
      .expect('Content-Type',
        'text/plain; charset=utf-8')
  })
})

describe('prueba routes', () => {
  describe('users', () => {
    test('get /api/users', async () => {
      await supertest(app.server)
        .get('/api/users')
        .expect(200)
        .expect('Content-Type',
          'application/json; charset=utf-8')
    })
    test('get /api/users/:id', async () => {
      await supertest(app.server)
        .get('/api/users/1')
        .expect(200)
        .expect('Content-Type',
          'application/json; charset=utf-8')
    })
  })
  test('notes', async () => {
    await supertest(app.server)
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type',
        'application/json; charset=utf-8')
  })
})

afterAll(async () => {
  await db.destroy()
})
afterAll(async () => await app.close())
