const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const bcrypt = require('bcrypt')
const { secret } = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { userName, password } = body

  const user = await User.findOne({ userName })

  const isPasswordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && isPasswordCorrect)) {
    return response.status(401).json({ error: 'invalid userName or password' })
  }

  const tokenPayload = {
    userName: user.userName,
    id: user._id
  }

  const token = jwt.sign(tokenPayload, secret)

  response.status(200).send({ token, userName: user.userName, id: user._id })
})

module.exports = loginRouter
