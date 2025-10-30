import { NextRequest, NextResponse } from 'next/server'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { getHealthAlerts } from '@/api/requests/health-alerts/getHealthAlerts'

export async function GET(req: NextRequest, context: { params: Promise<{ category: string }> }) {
  const params = await context.params;

  const {
    category
  } = params;

  if (!category) {
    return new NextResponse('Missing category', {
      status: 500,
    })
  }

  const proxiedResponse = await getHealthAlerts(category as HealthAlertTypes)

  if (proxiedResponse.success) {
    return NextResponse.json(proxiedResponse.data)
  }

  return new NextResponse('Downstream service request failed', {
    status: 500,
  })
}
