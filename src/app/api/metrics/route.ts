import { NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/api/requests/helpers'

export async function GET() {
  try {
    const url = `${getApiBaseUrl()}/telemetry/metrics/`

    const response = await fetch(url, {
      method: 'GET',
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch metrics' },
        { status: 500 }
      )
    }

    const text = await response.text()

    return new NextResponse(text, {
      status: 200,
      headers: {
        'content-type': 'text/plain',
      },
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Metrics proxy failed' },
      { status: 500 }
    )
  }
}