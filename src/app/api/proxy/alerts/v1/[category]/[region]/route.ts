import { NextRequest, NextResponse } from 'next/server'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { getHealthAlertByRegion } from '@/api/requests/health-alerts/getHealthAlertByRegion'

export async function GET(req: NextRequest, context: { params: Promise<{ category: string; region: string }> }) {
  const params = await context.params

  const { category, region } = params

  if (!category || !region) {
    return new NextResponse('Missing category and/or region', {
      status: 500,
    })
  }

  const proxiedResponse = await getHealthAlertByRegion(category as HealthAlertTypes, region)
  if (proxiedResponse.success) {
    return NextResponse.json(proxiedResponse.data)
  }

  return new NextResponse('Downstream service request failed', {
    status: 500,
  })
}
