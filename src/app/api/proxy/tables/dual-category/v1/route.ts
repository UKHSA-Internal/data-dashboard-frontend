import { NextRequest, NextResponse } from 'next/server'

import { DualCategoryRequestParams, getTables } from '@/api/requests/tables/getTables'

export async function POST(req: NextRequest) {
  const body: DualCategoryRequestParams = await req.json()

  if (!body) {
    return new NextResponse('Missing request body', {
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
