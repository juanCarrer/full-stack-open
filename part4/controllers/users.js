const usersRouter = require('express').Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
  const { body } = request
  const { userName, password, name } = body

  if (!userName || !password) {
    response.status(400).json({ error: 'userName and passwords required' })
    return
  }

  if (userName.length < 3 || password.length < 3) {
    response.status(400).json({ error: 'username and passwords must be at least 3 character log' })
    return
  }

  const saltOrRounds = 10
  const passwordHash = await bcrypt.hash(password, saltOrRounds)

  const userData = {
    userName,
    name,
    passwordHash
  }

  const newUser = new User(userData)
  const createdUser = await newUser.save()
  response.status(201).json(createdUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.status(200).json(users)
})

module.exports = usersRouter
