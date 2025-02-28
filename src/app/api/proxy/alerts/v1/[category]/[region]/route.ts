import { NextRequest, NextResponse } from 'next/server'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { getHealthAlertByRegion } from '@/api/requests/health-alerts/getHealthAlertByRegion'

interface PathParameters {
  params: {
    category: HealthAlertTypes
    region: string
  }
}

export async function GET(req: NextRequest, { params: { category, region } }: PathParameters) {
  if (!category || !region) {
    return new NextResponse('Missing category and/or region', {
      status: 500,
    })
  }

  const proxiedResponse = await getHealthAlertByRegion(category, region)
  if (proxiedResponse.success) {
    return NextResponse.json(proxiedResponse.data)
  }

  return new NextResponse('Downstream service request failed', {
    status: 500,
  })
}
