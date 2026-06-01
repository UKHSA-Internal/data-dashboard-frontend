import pino from 'pino'

const setupLogger = () => {
  if (process.env.NODE_ENV !== 'production' && process.env.NEXT_RUNTIME === 'nodejs') {
    const pretty = require('pino-pretty')
    return pino(pretty({ colorize: true }))
  }

  return pino()
}

const auditLogger = pino({ level: 'info' })

export function auditLog(user: string, action: string, target?: string) {
  const timestamp = new Date().toISOString()

  // Match against the Python logging format to keep audit events consistent
  const message = `[AUDIT_EVENT] ${timestamp} [User:${user} - Action:${action} - Target:${target}]`

  auditLogger.info(message)
}

export const logger = setupLogger()
