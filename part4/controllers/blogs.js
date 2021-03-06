const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')
const isIdValid = require('mongoose').Types.ObjectId.isValid

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    userName: 1,
    name: 1,
    id: 1
  })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const userData = request.token
  const { body } = request
  const { title, likes = 0, url, author } = body

  if (userData.error) {
    return response.status(401).json(userData)
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
  const blogId = request.params.id
  const userData = request.token

  if (userData.error) {
    return response.status(401).json(userData)
  }

  if (!isIdValid(blogId) || !blogId) {
    return response.status(400).json({ error: 'invalid or missing id' })
  }

  const blog = await Blog.findById(blogId)

  if (!blog) {
    return response.status(400).json({ error: 'blog not found' })
  }

  if (blog.user.toString() !== userData.id.toString()) {
    return response.status(401).json({ error: 'blogs can only be deleted by their owner' })
  }

  const result = await Blog.findByIdAndDelete(blogId)

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
