import { NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/api/requests/helpers'

export async function GET(request: Request) {
  const url = new URL(request.url)

  console.log('==== TELEMETRY DEBUG START ====')
  console.log('FULL URL:', request.url)
  console.log('PATHNAME:', url.pathname)
  console.log('SEARCH:', url.search)
  console.log('PARAM metrics:', url.searchParams.get('metrics'))
  console.log('ALL PARAMS:', [...url.searchParams.entries()])

  // TEMP: force trigger to prove execution
  if (request.url.includes('metrics')) {
    console.log('>>> METRICS BLOCK ENTERED <<<')

    try {
      const backendUrl = `${getApiBaseUrl()}/telemetry/metrics/`
      console.log('CALLING BACKEND:', backendUrl)

      const response = await fetch(backendUrl)

      console.log('BACKEND STATUS:', response.status)

      const text = await response.text()

      console.log('BACKEND RESPONSE SAMPLE:', text.slice(0, 200))

      return new NextResponse(text, {
        status: 200,
        headers: {
          'content-type': 'text/plain',
        },
      })
    } catch (err) {
      console.error('FETCH ERROR:', err)

      return NextResponse.json(
        { error: 'Metrics proxy failed' },
        { status: 500 }
      )
    }
  }

  console.log('>>> FALLBACK HEALTH RESPONSE <<<')

  return NextResponse.json({
    status: 'ok',
    debug: {
      url: request.url,
      metricsParam: url.searchParams.get('metrics'),
    },
  })
}