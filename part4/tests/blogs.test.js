const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index.js')
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
    title: 'quito blog',
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

describe('blog get methods', () => {
  test('correct number of notes', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('id as blog identifier', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('blog post methods', () => {
  test('make post add a blog', async () => {
    const postData = {
      title: 'this is a test blog',
      author: 'juan carrero',
      likes: 0
    }

    const postResponse = await api
      .post('/api/blogs')
      .send(postData)
      .expect(201)

    const getResponse = await api
      .get('/api/blogs')

    const getResponseData = getResponse.body.map(item => {
      return item.title
    })

    expect(postResponse.body.title).toBe(postData.title)
    expect(getResponseData).toContain(postData.title)
  })

  test('post request -> default likes 0', async () => {
    const postData = {
      title: 'test post without likes',
      author: 'juan carrero'
    }

    const response = await api
      .post('/api/blogs')
      .send(postData)
      .expect(201)

    expect(response.body.likes).toBe(0)
  })

  test('status 400 on post without data', async () => {
    const postData = {
      author: 'juan carrero',
      likes: 2
    }
    await api
      .post('/api/blogs')
      .send(postData)
      .expect(400)

    const getResponse = await api.get('/api/blogs')

    expect(getResponse.body).toHaveLength(initialBlogs.length)
  })
})

describe('blog delete methods', () => {
  test('delete post successfully', async () => {
    const blogs = await api.get('/api/blogs')
    const deleteItem = blogs.body[0]

    const deleteResponse = await api
      .delete(`/api/blogs/${deleteItem.id}`)
      .expect(200)

    expect(deleteItem).toMatchObject(deleteResponse.body)

    const getResponse = await api.get('/api/blogs')

    expect(getResponse.body).toHaveLength(blogs.body.length - 1)
  })

  test('error when trying to delete with invalid id', async () => {
    const deleteResponse = await api
      .delete('/api/blogs/kfnsjdfn')
      .expect(400)

    expect(deleteResponse.body.error).toBe('invalid id')
  })
})

describe('blogs put methods', () => {
  test('object updated correctly', async () => {
    const newData = {
      likes: 10
    }

    const initialBlogs = await api.get('/api/blogs')
    const itemToUpdate = initialBlogs.body[0]

    await api
      .put(`/api/blogs/${itemToUpdate.id}`)
      .send(newData)
      .expect(200)

    const Updatedblogs = await api.get('/api/blogs')
    const updatedItem = Updatedblogs.body[0]

    expect(updatedItem.likes).toBe(newData.likes)
  })

  test('error when the body is empty', async () => {
    const initialBlogs = await api.get('/api/blogs')

    const response = await api
      .put(`/api/blogs/${initialBlogs.body[0].id}`)
      .send({})
      .expect(400)

    expect(response.body.error).toBe('the body is empty')
  })

  test('error when the id is invalid', async () => {
    const response = await api
      .put('/api/blogs/ndkjasdn')
      .send({ likes: 500 })
      .expect(400)

    expect(response.body.error).toBe('invalid id')
  })
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})