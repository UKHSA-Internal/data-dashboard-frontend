import { NextRequest, NextResponse } from 'next/server'

import { MapRequestParams, postMapData } from '@/api/requests/cover-maps/postMaps'

export async function POST(req: NextRequest) {
  const body: MapRequestParams = await req.json()

  if (!body) {
    return new NextResponse('Missing category', {
      status: 500,
    })
  }

  const proxiedResponse = await postMapData(body)

  if (proxiedResponse.data) {
    return NextResponse.json(proxiedResponse.data)
  }

  return new NextResponse('Downstream service request failed', {
    status: 500,
  })
}
