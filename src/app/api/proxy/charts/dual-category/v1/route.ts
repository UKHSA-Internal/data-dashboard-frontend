import { NextRequest, NextResponse } from 'next/server'

import { getDualCategoryCharts, RequestParams } from '@/api/requests/charts/getDualCategoryCharts'

export async function POST(req: NextRequest) {
  const body: RequestParams = await req.json()

  if (!body) {
    return new NextResponse('Missing request body', {
      status: 500,
    })
  }

  const proxiedResponse = await getDualCategoryCharts(body)

  if (proxiedResponse.data) {
    return NextResponse.json(proxiedResponse.data)
  }

  return new NextResponse('Downstream service request failed', {
    status: 500,
  })
}
