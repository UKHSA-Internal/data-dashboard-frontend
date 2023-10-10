import { NextRequest, NextResponse } from 'next/server'

import { getDownloads, requestSchema } from '@/api/requests/downloads/getDownloads'
import { logger } from '@/lib/logger'

export async function POST(req: NextRequest) {
  const url = new URL(req.headers.get('origin') || '')
  url.pathname = '/error'

  const body = await req.formData()

  const plotsFormData = body.get('plots')

  if (typeof plotsFormData !== 'string') {
    return NextResponse.redirect(url, 301)
  }

  const jsonPlots = JSON.parse(plotsFormData)
  const plots = Array.isArray(jsonPlots) ? jsonPlots : [jsonPlots]

  const params = requestSchema.safeParse({
    file_format: body.get('format'),
    plots,
  })

  if (params.success) {
    const { plots, file_format: fileFormat } = params.data

    const response = await getDownloads(plots, fileFormat)

    if (!response) {
      logger.error('Proxied request to /api/downloads/v2 failed')
      return NextResponse.redirect(url, 301)
    }

    if (params.data.file_format === 'csv') {
      logger.info('successful csv download')
      return new NextResponse(response, {
        headers: { 'content-type': 'text/csv', 'content-disposition': 'attachment; filename=data.csv' },
      })
    }

    if (params.data.file_format === 'json') {
      logger.info('successful json download')
      return new Response(response, {
        headers: { 'content-type': 'text/json', 'content-disposition': 'attachment; filename=data.json' },
      })
    }
  } else {
    logger.error(params.error)
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.redirect(url, 301)
}
