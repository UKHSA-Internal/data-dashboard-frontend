import pino from 'pino'
import pretty from 'pino-pretty'

export const logger =
  process.env.NODE_ENV === 'production' ? pino({ level: 'trace' }) : pino(pretty({ colorize: true }))
