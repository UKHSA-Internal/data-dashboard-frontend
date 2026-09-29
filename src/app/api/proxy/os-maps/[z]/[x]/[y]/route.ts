import { NextResponse } from 'next/server'

import { getOSMapTile } from '@/api/requests/os-maps/getOSMapTile'
import { logger } from '@/lib/logger'

export async function GET(_req: Request, context: { params: Promise<{ z: string; x: string; y: string }> }) {
  try {
    const { z, x, y } = await context.params
    const proxiedResponse = await getOSMapTile(z, x, y)

    if (!proxiedResponse.ok) {
      return new NextResponse('Downstream service request failed', {
        status: 502,
      })
    }

    return new NextResponse(proxiedResponse.body, {
      status: 200,
      headers: {
        'Content-Type': proxiedResponse.headers.get('content-type') ?? 'image/png',
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch (error) {
    logger.error('OS Maps tile proxy failed', error instanceof Error ? error.message : error)

    return new NextResponse('Downstream service request failed', {
      status: 502,
    })
  }
}
