import { NextRequest, NextResponse } from 'next/server'

import { dualCategoryRequestSchema, getDownloads } from '@/api/requests/downloads/getDownloads'
import { logger } from '@/lib/logger'

export async function POST(req: NextRequest) {
  const url = new URL(req.headers.get('origin') || '')
  url.pathname = '/error'

  const body = await req.formData()

  const params = dualCategoryRequestSchema.safeParse({
    is_public: body.get('is_public') === 'true',
    file_format: body.get('file_format'),
    ...JSON.parse((body.get('dual_category_data') as string) || '{}'),
  })

  if (!params.success) {
    logger.error(`Error while downloading dual category download response: ${params.error}`)
    return NextResponse.redirect(url, 301)
  }

  const response = await getDownloads(params.data)

  if (!response) {
    logger.error(`Error while downloading dual category download response: ${response}`)
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
        'content-disposition': 'attachment; filename=ukhsa-chart-download.json',
      },
    })
  }

  logger.error(`Error while downloading dual category download response: ${response}`)
  return NextResponse.redirect(url, 301)
}
