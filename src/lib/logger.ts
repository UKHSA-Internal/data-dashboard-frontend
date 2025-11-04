import pino from 'pino'

const setupLogger = () => {
  if (process.env.NODE_ENV !== 'production' && process.env.NEXT_RUNTIME === 'nodejs') {
    const pretty = require('pino-pretty')
    return pino(pretty({ colorize: true }))
  }

  return pino()
}

export const logger = setupLogger()
