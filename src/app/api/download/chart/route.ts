import { NextRequest, NextResponse } from 'next/server'

import { getDownloads, requestSchema } from '@/api/requests/downloads/getDownloads'
import { logger } from '@/lib/logger'

export async function POST(req: NextRequest) {
  const url = new URL(req.headers.get('origin') || '')
  url.pathname = '/error'

  const body = await req.formData()

  const plots = []
  for (const [key, value] of body.entries()) {
    if (key === 'plots') {
      if (typeof value !== 'string') {
        return NextResponse.redirect(url, 301)
      }
      plots.push(JSON.parse(value))
    }
  }

  const confidenceIntervalsValue = body.get('confidence_intervals')
  const confidenceIntervals = confidenceIntervalsValue === 'true'

  const params = requestSchema.safeParse({
    file_format: body.get('format'),
    x_axis: body.get('x_axis'),
    confidence_intervals: confidenceIntervals,
    plots,
  })

  if (params.success) {
    const { plots, file_format: fileFormat, x_axis, confidence_intervals } = params.data

    const response = await getDownloads(plots, fileFormat, x_axis, confidence_intervals)

    if (!response) {
      logger.error('Proxied request to /api/downloads/v2 failed')
      return NextResponse.redirect(url, 301)
    }

    if (params.data.file_format === 'csv') {
      logger.info('successful csv download')
      return new NextResponse(response, {
        headers: { 'content-type': 'text/csv', 'content-disposition': 'attachment; filename=ukhsa-chart-download.csv' },
      })
    }

    if (params.data.file_format === 'json') {
      logger.info('successful json download')
      return new Response(JSON.stringify(response), {
        headers: {
          'content-type': 'text/json',
          'content-disposition': 'attachment; filename=ukhsa-chart-download.json',
        },
      })
    }
  } else {
    logger.error(`Download Chart Schema parse error: ${params.error}`)
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.redirect(url, 301)
}
