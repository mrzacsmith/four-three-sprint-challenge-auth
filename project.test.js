// 👉 You can run these tests in your terminal by executing `npm test`
const request = require('supertest')
const server = require('./api/server')
const db = require('./data/dbConfig')
const jokes = require('./api/jokes/jokes-data')

const userA = { username: 'foo', password: 'bar' }
const userB = { username: 'fizz', password: 'buzz' }
const userC = { username: 'foo', password: 'buzz' }

let registeredUserA

beforeAll(async () => {
  await db.migrate.latest()
})
afterAll(async (done) => {
  await db.destroy()
  done()
})

it('sanity check jokes', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  // 👉 PROJECTS
  // 👉 PROJECTS
  // 👉 PROJECTS
  describe('auth endpoints', () => {
    describe('[POST] /api/auth/register', () => {
      beforeEach(async () => {
        await db('users').truncate()
      })
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
      it('responds with a proper status code on successful registration', async () => {
        const { status } = await request(server).post('/api/auth/register').send(userA)
        expect(status).toBe(201)
      })
      it('responds with an error status code if username exists in users table', async () => {
        await request(server).post('/api/auth/register').send(userA)
        const { status } = await request(server).post('/api/auth/register').send(userA)
        expect(status + '').toMatch(/4|5/)
      })
      it('responds with an error message if username exists in users table', async () => {
        await request(server).post('/api/auth/register').send(userA)
        const { body } = await request(server).post('/api/auth/register').send(userA)
        expect(JSON.stringify(body)).toEqual(expect.stringMatching(/exists/i))
      })
      it('responds with an error status code if username or password are not sent', async () => {
        let res = await request(server).post('/api/auth/register').send({})
        expect(res.status + '').toMatch(/4|5/)
        res = await request(server).post('/api/auth/register').send({ username: 'foo' })
        expect(res.status + '').toMatch(/4|5/)
        res = await request(server).post('/api/auth/register').send({ password: 'bar' })
        expect(res.status + '').toMatch(/4|5/)
      })
      it('responds with an error message if username or password are not sent', async () => {
        let res = await request(server).post('/api/auth/register').send({})
        expect(JSON.stringify(res.body)).toEqual(expect.stringMatching(/required/i))
        res = await request(server).post('/api/auth/register').send({ username: 'foo' })
        expect(JSON.stringify(res.body)).toEqual(expect.stringMatching(/required/i))
        res = await request(server).post('/api/auth/register').send({ password: 'bar' })
        expect(JSON.stringify(res.body)).toEqual(expect.stringMatching(/required/i))
      })
    })
    describe('[POST] /api/auth/login', () => {
      beforeEach(async () => {
        await db('users').truncate()
        await request(server).post('/api/auth/register').send(userA)
        registeredUserA = await db('users').first()
      })
      it('responds with a proper status code on successful login', async () => {
        const res = await request(server).post('/api/auth/login').send(userA)
        expect(res.status).toBe(200)
      })
      it('responds with a welcome message and a token on successful login', async () => {
        const res = await request(server).post('/api/auth/login').send(userA)
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('token')
      })
      it('responds with an error status code if username or password are not sent', async () => {
        let res = await request(server).post('/api/auth/login').send({})
        expect(res.status + '').toMatch(/4|5/)
        res = await request(server).post('/api/auth/login').send({ username: 'foo' })
        expect(res.status + '').toMatch(/4|5/)
        res = await request(server).post('/api/auth/login').send({ password: 'bar' })
        expect(res.status + '').toMatch(/4|5/)
      })
      it('responds with an error message if username or password are not sent', async () => {
        let res = await request(server).post('/api/auth/login').send({})
        expect(JSON.stringify(res.body)).toEqual(expect.stringMatching(/required/i))
        res = await request(server).post('/api/auth/login').send({ username: 'foo' })
        expect(JSON.stringify(res.body)).toEqual(expect.stringMatching(/required/i))
        res = await request(server).post('/api/auth/login').send({ password: 'bar' })
        expect(JSON.stringify(res.body)).toEqual(expect.stringMatching(/required/i))
      })
      it('responds with a proper status code on non-existing username', async () => {
        const res = await request(server).post('/api/auth/login').send(userB)
        expect(res.status + '').toMatch(/4|5/)
      })
      it('responds with an error message on non-existing username', async () => {
        const res = await request(server).post('/api/auth/login').send(userB)
        expect(JSON.stringify(res.body)).toEqual(expect.stringMatching(/exists/i))
      })
      it('responds with a proper status code on invalid password', async () => {
        const res = await request(server).post('/api/auth/login').send(userC)
        expect(res.status + '').toMatch(/4|5/)
      })
      it('responds with an error message on invalid password', async () => {
        const res = await request(server).post('/api/auth/login').send(userC)
        expect(JSON.stringify(res.body)).toEqual(expect.stringMatching(/incorrect/i))
      })
    })
  })

  // 👉 JOKES
  // 👉 JOKES
  // 👉 JOKES
  describe('jokes endpoint', () => {

  })
})
