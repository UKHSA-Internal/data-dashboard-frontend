import { NextRequest, NextResponse } from 'next/server'

import { requestSchema } from '@/api/requests/downloads/getDownloads'

export async function POST(req: NextRequest) {
  const url = new URL(req.headers.get('origin') || '')
  url.pathname = '/error'

  const body = await req.json()

  const plots = Array.isArray(body.plots) ? body.plots : [body.plots]

  const params = requestSchema.safeParse({
    file_format: body.format,
    plots,
  })

  if (params.success) {
    // const { plots, file_format: fileFormat } = params.data

    const url = new URL(req.headers.get('origin') || '')
    url.pathname = 'http://localhost:3000/error'
    return NextResponse.redirect(url, 301)

    //   const response = await getDownloads(plots, fileFormat)

    //   if (!response) {
    //     logger.error('Proxied request to /api/downloads/v2 failed')
    //     // return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    //     return NextResponse.redirect(url, 301)
    //   }

    //   if (params.data.file_format === 'csv') {
    //     logger.info('successful csv download')
    //     return new NextResponse(response, {
    //       headers: { 'content-type': 'text/csv', 'content-disposition': 'attachment; filename=data.csv' },
    //     })
    //   }

    //   if (params.data.file_format === 'json') {
    //     logger.info('successful json download')
    //     return new Response(response, {
    //       headers: { 'content-type': 'text/json', 'content-disposition': 'attachment; filename=data.json' },
    //     })
    //   }
    // } else {
    //   logger.error(params.error)
    // }
  }

  return NextResponse.redirect(url, 301)
}
