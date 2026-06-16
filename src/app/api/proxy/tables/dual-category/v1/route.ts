import { NextRequest, NextResponse } from 'next/server'

import { getDualCategoryTables, RequestParams } from '@/api/requests/tables/getDualCategoryTables'

export async function POST(req: NextRequest) {
  const body: RequestParams = await req.json()

  if (!body) {
    return new NextResponse('Missing request body', {
      status: 500,
    })
  }

  const proxiedResponse = await getDualCategoryTables(body)

  if (proxiedResponse.data) {
    return NextResponse.json(proxiedResponse.data)
  }

  return new NextResponse('Downstream service request failed', {
    status: 500,
  })
}
