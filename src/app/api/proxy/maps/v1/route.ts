import { NextRequest, NextResponse } from 'next/server'

import { MapDataRequest } from '@/api/models/Maps'
import { postMapData } from '@/api/requests/cover-maps/postMaps'

export async function POST(req: NextRequest) {
  const body: MapDataRequest = await req.json()
  const isPublic = req.nextUrl.searchParams.get('isPublic') !== 'false'

  if (!body) {
    return new NextResponse('Missing category', {
      status: 500,
    })
  }

  const proxiedResponse = await postMapData(body, isPublic)

  if (proxiedResponse.data) {
    return NextResponse.json(proxiedResponse.data)
  }

  return new NextResponse('Downstream service request failed', {
    status: 500,
  })
}
