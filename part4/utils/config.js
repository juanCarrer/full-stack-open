require('dotenv').config()

const PORT = process.env.PORT
const env = process.env.NODE_ENV || 'development'

const mongoURL = env === 'test' ? process.env.MONGO_URL_TEST : process.env.mongoURL

module.exports = {
  PORT,
  mongoURL,
  env
}
