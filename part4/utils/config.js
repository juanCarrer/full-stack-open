require('dotenv').config()

const PORT = process.env.PORT
const mongoURL = process.env.mongoURL

module.exports = {
  PORT,
  mongoURL
}
