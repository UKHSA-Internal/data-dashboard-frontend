import { GeographyParams, getGeographies } from '@/api/requests/geographies/getGeographies'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const geography_type = searchParams.get('geography_type')
  if (!geography_type) {
    return new NextResponse('Missing geography_type', {
      status: 500,
    })
  }

  const body: GeographyParams = { geography_type: geography_type }

  if (!body) {
    return new NextResponse('Missing category', {
      status: 500,
    })
  }

  const proxiedResponse = await getGeographies(body)

  if (proxiedResponse.data) {
    return NextResponse.json(proxiedResponse.data)
  }

  return new NextResponse('Downstream service request failed', {
    status: 500,
  })
}
