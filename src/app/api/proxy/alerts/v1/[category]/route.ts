import { NextRequest, NextResponse } from 'next/server'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { getHealthAlerts } from '@/api/requests/health-alerts/getHealthAlerts'

interface PathParameters {
  params: {
    category?: HealthAlertTypes
  }
}

export async function GET(req: NextRequest, { params: { category } }: PathParameters) {
  if (!category) {
    return new NextResponse('Missing category', {
      status: 500,
    })
  }

  const proxiedResponse = await getHealthAlerts(category)

  if (proxiedResponse.success) {
    return NextResponse.json(proxiedResponse.data)
  }

  return new NextResponse('Downstream service request failed', {
    status: 500,
  })
}
