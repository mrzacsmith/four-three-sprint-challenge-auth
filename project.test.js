// 👉 You can run these tests in your terminal by executing `npm test`
const request = require('supertest')
const server = require('./api/server')
const db = require('./data/dbConfig')

beforeAll(async () => {
  await db.migrate.latest()
})
afterAll(async(done) => {
  await db.destroy()
  done()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  // 👉 PROJECTS
  // 👉 PROJECTS
  // 👉 PROJECTS
  describe('auth endpoints', () => {
    beforeEach(async () => {
      await db('users').truncate()
    })
    describe('[POST] /api/auth/register', () => {

    })
    describe('[POST] /api/auth/login', () => {

    })
  })

  // 👉 JOKES
  // 👉 JOKES
  // 👉 JOKES
  describe('jokes endpoint', () => {

  })
})
