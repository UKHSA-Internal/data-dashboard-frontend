import { NextResponse } from 'next/server'
import { getMetrics } from '@/api/requests/telemetry/getMetrics'

export async function GET() {
  try {
    const text = await getMetrics()

    return new NextResponse(text, {
      headers: { 'content-type': 'text/plain' },
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Metrics failed' },
      { status: 500 }
    )
  }
}