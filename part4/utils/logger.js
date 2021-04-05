class Logger {
  info (message) {
    console.log('[INFO] -', message)
  }

  error (error) {
    console.error('[ERROR] -', error)
  }
}

module.exports = new Logger()
