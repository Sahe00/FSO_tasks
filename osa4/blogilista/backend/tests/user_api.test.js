const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

test('user with a too-short password is not created', async () => {
  const response = await api
    .post('/api/users')
    .send({
      username: 'validuser',
      name: 'Valid User',
      password: 'ab'
    })
    .expect(400)
    .expect('Content-Type', /application\/json/)

  assert.ok(response.body.error)
  assert.strictEqual(await User.countDocuments({}), 0)
})

test('user with a too-short username is not created', async () => {
  const response = await api
    .post('/api/users')
    .send({
      username: 'ab',
      name: 'Valid User',
      password: 'validpassword'
    })
    .expect(400)
    .expect('Content-Type', /application\/json/)

  assert.ok(response.body.error)
  assert.strictEqual(await User.countDocuments({}), 0)
})

after(async () => {
  await mongoose.connection.close()
})