import { NextRequest, NextResponse } from 'next/server'

import { getSubplotDownloads, requestSchema } from '@/api/requests/downloads/subplot/getSubplotDownloads'
import { logger } from '@/lib/logger'

export async function POST(req: NextRequest) {
  const url = new URL(req.headers.get('origin') || '')
  url.pathname = '/error'

  const body = await req.formData()

  const params = requestSchema.safeParse({
    file_format: body.get('file_format') || 'csv',
    target_threshold: body.get('target_threshold'),
    target_threshold_label: body.get('target_threshold_label'),
    chart_parameters: JSON.parse(body.get('chart_parameters') as string),
    subplots: JSON.parse(body.get('subplots') as string),
  })

  if (params.success) {
    const {
      data: { file_format, target_threshold, target_threshold_label, chart_parameters, subplots },
    } = params

    const response = await getSubplotDownloads(
      file_format,
      target_threshold,
      target_threshold_label,
      chart_parameters,
      subplots
    )

    if (!response) {
      logger.error(`Error while downloading subplot download response: ${response}`)
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
      return new NextResponse(JSON.stringify(response), {
        headers: {
          'content-type': 'text/json',
          'content-disposition': 'attachment; filename=ukhsa-chart.download.json',
        },
      })
    }
  } else {
    logger.error(`Download Chart Schema parse error: ${params.error}`)
    return NextResponse.redirect(url, 301)
  }
  return NextResponse.redirect(url, 301)
}
