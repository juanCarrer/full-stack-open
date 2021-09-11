const Logger = require('./logger')
const jwt = require('jsonwebtoken')
const { secret } = require('../utils/config')

const requestLogger = (request, response, next) => {
  Logger.info('Method:', request.method)
  Logger.info('Path:  ', request.path)
  Logger.info('Body:  ', request.body)
  Logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
  const { authorization } = request.headers

  let tokenString = null
  if (authorization.toLocaleLowerCase().startsWith('bearer')) {
    tokenString = authorization.substring(7)
  }

  let token = null
  try {
    token = jwt.verify(tokenString, secret)
  } catch (error) {
    return next(error)
  }

  request.token = token

  next()
}

const errorHandler = (error, request, response, next) => {
  const ERRORS = {
    JsonWebTokenError: (response) => {
      return response.status(401).json({ error: 'authorization token malformed or invalid' })
    },
    CastError: (response) => {
      return response.status(400).send({ error: 'malformatted id' })
    },
    ValidationError: (response) => {
      return response.status(400).json({ error: error.message })
    },
    defaultError: (response) => {
      return response.status(500).end()
    }
  }

  Logger.error(error.message)

  const handler = ERRORS[error.name] || ERRORS.defaultError

  handler(response)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}
