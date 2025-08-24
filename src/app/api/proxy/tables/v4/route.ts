import { NextRequest, NextResponse } from 'next/server'

import { getTables, RequestParams } from '@/api/requests/tables/getTables'

export async function POST(req: NextRequest) {
  const body: RequestParams = await req.json()

  if (!body) {
    return new NextResponse('Missing category', {
      status: 500,
    })
  }

  const proxiedResponse = await getTables(body)

  if (proxiedResponse.data) {
    return NextResponse.json(proxiedResponse.data)
  }

  return new NextResponse('Downstream service request failed', {
    status: 500,
  })
}
