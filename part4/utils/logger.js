const { env } = require('./config')

class Logger {
  info (message) {
    if (env !== 'test') {
      console.log('[INFO] -', message)
    }
  }

  error (error) {
    console.error('[ERROR] -', error)
  }
}

module.exports = new Logger()
