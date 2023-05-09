import pino from 'pino'

const devOptions = {
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
}

const prodOptions = {}

const options = process.env.NODE_ENV === 'development' ? devOptions : prodOptions

export const logger = pino(options)
