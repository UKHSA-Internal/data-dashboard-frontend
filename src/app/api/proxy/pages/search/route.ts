import { NextRequest, NextResponse } from 'next/server'

import { SearchResponse } from '@/api/requests/cms/searchPages'
import { client } from '@/api/utils/api.utils'

export async function GET(req: NextRequest) {
  // FIXME: should we clean down to expected params here?

  const proxiedResponse = await client<SearchResponse>('search', { searchParams: req.nextUrl.searchParams })

  if (proxiedResponse.data) {
    return NextResponse.json(proxiedResponse.data)
  }

  return new NextResponse('Downstream service request failed', {
    status: 500,
  })
}
