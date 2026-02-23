import { NextRequest, NextResponse } from 'next/server'

import { getPages } from '@/api/requests/cms/getPages'

export async function GET(req: NextRequest) {
  const query = req.url
  const proxiedResponse = await getPages({ query })

  if (proxiedResponse.data) {
    return NextResponse.json(proxiedResponse.data)
  }

  return new NextResponse('Downstream service request failed', {
    status: 500,
  })
}
