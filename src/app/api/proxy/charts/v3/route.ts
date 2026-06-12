import { NextRequest, NextResponse } from 'next/server'

import { getCharts, RequestParams } from '@/api/requests/charts/getCharts'

export async function POST(req: NextRequest) {
  const body: RequestParams = await req.json()
  const isPublic = Boolean(req.nextUrl.searchParams.get('public'))
  if (!body) {
    return new NextResponse('Missing category', {
      status: 500,
    })
  }

  const proxiedResponse = await getCharts(body, isPublic)

  if (proxiedResponse.data) {
    return NextResponse.json(proxiedResponse.data)
  }

  return new NextResponse('Downstream service request failed', {
    status: 500,
  })
}
