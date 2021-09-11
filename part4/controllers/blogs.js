const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const { secret } = require('../utils/config')
const isIdValid = require('mongoose').Types.ObjectId.isValid

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    userName: 1,
    name: 1,
    id: 1
  })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const { authorization } = request.headers
  const { body } = request
  const { title, likes = 0, url, author } = body
  let token = null
  if (authorization.toLocaleLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  let userData = null
  try {
    userData = jwt.verify(token, secret)
  } catch (error) {
    return next(error)
  }

  if (!title) {
    return response.status(400).json({ error: 'the title is required' })
  }

  const NewBlogData = {
    title,
    user: userData.id,
    likes,
    url,
    author
  }

  const blog = new Blog(NewBlogData)

  const user = await User.findById(NewBlogData.user)

  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  if (!id) {
    response.status(400).json({ error: 'missing id' })
    return
  }
  if (!isIdValid(id)) {
    response.status(400).json({ error: 'invalid id' })
    return
  }

  const result = await Blog.findByIdAndDelete(id)

  response.status(200).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
  const newData = request.body
  const id = request.params.id

  if (Object.keys(newData).length === 0) {
    response.status(400).json({ error: 'the body is empty' })
    return
  }

  if (!isIdValid(id)) {
    response.status(400).json({ error: 'invalid id' })
    return
  }

  const result = await Blog.findByIdAndUpdate(id, newData, { new: true })

  response.status(200).json(result)
})

module.exports = blogsRouter
