import { NextRequest, NextResponse } from 'next/server'

import { getSubplots, RequestParams } from '@/api/requests/charts/subplot/getSubplots'

export async function POST(req: NextRequest) {
  const body: RequestParams = await req.json()
  const isPublic = req.nextUrl.searchParams.get('isPublic') !== 'false'
  if (!body) {
    return new NextResponse('Missing category', {
      status: 500,
    })
  }

  const proxiedResponse = await getSubplots(body, isPublic)

  if (proxiedResponse.data) {
    return NextResponse.json(proxiedResponse.data)
  }

  return new NextResponse('Downstream service request failed', {
    status: 500,
  })
}
