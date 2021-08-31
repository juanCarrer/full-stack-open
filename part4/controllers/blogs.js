const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const isIdValid = require('mongoose').Types.ObjectId.isValid

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.title) {
    response.status(400).json({ error: 'the title is required' })
    return
  }

  blog.likes ?? (blog.likes = 0)

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

module.exports = blogsRouter
