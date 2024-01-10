import { NextResponse } from 'next/server'

import { logger } from '@/lib/logger'

export async function GET() {
  logger.info('GET /api/health - FE is healthy')
  return NextResponse.json({ status: 'ok' })
}
