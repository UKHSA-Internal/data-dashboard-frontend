import { NextResponse } from 'next/server'

export async function GET() {
  // Potentially should remove this, its a bit noisy for every request
  //logger.info('GET /api/health - FE is healthy')
  return NextResponse.json({ status: 'ok' })
}
