'use client'

import { logger } from '@/lib/logger'

import Error from './error'

export default function GlobalError({ error }: { error: Error }) {
  logger.error('Global error page: ', error)
  return (
    <html>
      <body>
        <Error />
      </body>
    </html>
  )
}
