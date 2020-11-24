// 👉 You can run these tests in your terminal by executing `npm test`
const request = require('supertest')
const server = require('./api/server')
const db = require('./data/dbConfig')
const jokes = require('./api/jokes/jokes-data')

const userA = { username: 'foo', password: 'bar' }

beforeAll(async () => {
  await db.migrate.latest()
})
afterAll(async (done) => {
  await db.destroy()
  done()
})

it('sanity check jokes', () => {
  expect(true).not.toBe(false)
  expect(JSON.stringify(jokes)).toEqual(expect.stringMatching(`I'm tired of following my dreams`));
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
      it('can add a new user with a bcrypted password to the users table', async () => {
        await request(server).post('/api/auth/register').send(userA)
        const user = await db('users').first()
        expect(user).toHaveProperty('id')
        expect(user).toHaveProperty('username')
        expect(user).toHaveProperty('password')
        expect(user.password).toMatch(/^\$2[ayb]\$.{56}$/)
        expect(user.username).toBe(userA.username)
      })
      it('responds with the newly created user on successful registration', async () => {
        const { body } = await request(server).post('/api/auth/register').send(userA)
        expect(body).toHaveProperty('id')
        expect(body).toHaveProperty('username')
        expect(body).toHaveProperty('password')
        expect(body.password).toMatch(/^\$2[ayb]\$.{56}$/)
        expect(body.username).toBe(userA.username)
      })
      it('responds with the proper code on successful registration', async () => {
        const { status } = await request(server).post('/api/auth/register').send(userA)
        expect(status).toBe(201)
      })
      it('responds with an error message and code if username exists in users table', () => {

      })
      it('responds with an error message and code if username or password are not sent', () => {

      })
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
