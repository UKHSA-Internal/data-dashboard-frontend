import { NextRequest, NextResponse } from 'next/server'

import { getSubplotTables, RequestParams } from '@/api/requests/tables/subplot/getSubplotTables'

export async function POST(req: NextRequest) {
  const body: RequestParams = await req.json()
  const isPublic = req.nextUrl.searchParams.get('isPublic') !== 'false'
  if (!body) {
    return new NextResponse('Missing category', {
      status: 500,
    })
  }

  const proxiedResponse = await getSubplotTables(body, isPublic)

  if (proxiedResponse.data) {
    return NextResponse.json(proxiedResponse.data)
  }

  return new NextResponse('Downstream service request failed', {
    status: 500,
  })
}
