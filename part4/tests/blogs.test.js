const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index.js')
const Blog = require('../models/blogs')
const api = supertest(app)

const initialBlogs = [
  {
    title: 'primer blog',
    author: 'juan carrero',
    url: 'http://blog',
    likes: 5
  },
  {
    title: 'segundo blog',
    author: 'jose carrero',
    url: 'http://blog',
    likes: 2
  },
  {
    title: 'tercero blog',
    author: 'andrea Arazme',
    url: 'http://blog',
    likes: 100
  },
  {
    title: 'cuarto blog',
    author: 'juan carrero',
    url: 'http://blog',
    likes: 10
  },
  {
    title: 'sexto blog',
    author: 'jose carrero',
    url: 'http://blog',
    likes: 35
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blogData of initialBlogs) {
    const blog = new Blog(blogData)
    await blog.save()
  }
})

test('correct number of notes', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('content-Type', /application\/json/)

  expect(response.body.length).toBe(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
