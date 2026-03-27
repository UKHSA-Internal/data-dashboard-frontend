import { NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/api/requests/helpers'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // 👇 your hidden metrics mode
  if (searchParams.get('metrics') === '1') {
    try {
      const url = `${getApiBaseUrl()}/telemetry/metrics/`
      const response = await fetch(url)

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

  // 👇 normal behaviour (unchanged)
  return NextResponse.json({ status: 'ok' })
}