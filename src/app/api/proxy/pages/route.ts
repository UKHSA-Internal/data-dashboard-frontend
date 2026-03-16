import { NextRequest, NextResponse } from 'next/server'

import { getPages } from '@/api/requests/cms/getPages'

export async function GET(req: NextRequest) {
  const searchParams: Record<string, string> = {}
  for (const [k, v] of req.nextUrl.searchParams) {
    searchParams[k] = v
  }
  const proxiedResponse = await getPages(searchParams)

  if (proxiedResponse.data) {
    return NextResponse.json(proxiedResponse.data)
  }

  return new NextResponse('Downstream service request failed', {
    status: 500,
  })
}
