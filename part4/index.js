const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const Logger = require('./utils/logger')
const { unknownEndpoint, errorHandler } = require('./utils/middelware')

const { mongoURL, PORT = 3001 } = config

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    Logger.info('[DB] connected')
  })
  .catch(error => {
    Logger.error(error)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
  Logger.info(`Server running on port ${PORT}`)
})
