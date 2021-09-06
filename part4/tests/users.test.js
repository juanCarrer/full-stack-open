const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index.js')
const User = require('../models/users')
const api = supertest(app)

const initialUsers = [
  {
    name: 'juan test',
    userName: 'juan-test',
    password: 'pass'
  },
  {
    name: 'juan test test',
    userName: 'juan-test2',
    password: 'passsss'
  }
]

beforeEach(async () => {
  await User.deleteMany({})

  for (const usersData of initialUsers) {
    const newUser = new User(usersData)
    await newUser.save()
  }
})

describe('users tests', () => {
  test('get all test as expexted', async () => {
    const users = await api
      .get('/api/users')
      .expect(200)

    expect(users.body).toHaveLength(initialUsers.length)
  })

  test('creating a new user successfully', async () => {
    const newUserData = {
      name: 'new test',
      userName: 'newTest',
      password: 'teeeeest'
    }

    await api
      .post('/api/users')
      .send(newUserData)
      .expect(201)

    const allusers = await api
      .get('/api/users')
      .expect(200)

    const usernames = allusers.body.map(item => item.userName)

    expect(usernames).toContain(newUserData.userName)
    expect(allusers.body).toHaveLength(initialUsers.length + 1)
  })

  test('user post fail on empty body', async () => {
    const userData = {}

    const errorMessage = await api
      .post('/api/users')
      .send(userData)
      .expect(400)

    expect(errorMessage.body.error).toBe('userName and passwords required')
  })
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
