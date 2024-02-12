import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData()

    if (!body.has('file_format') || !body.has('endpoint')) {
      throw new Error('download api route handler - missing parameters')
    }

    const endpoint = body.get('endpoint') as string

    logger.info('Triggering composite download to %s', endpoint)

    const searchParams = new URLSearchParams()
    searchParams.set('file_format', body.get('file_format') as string)

    const { data, error } = await client<string>(endpoint, { searchParams })

    if (error || !data) {
      throw error
    }

    logger.info(`POST %s success`, endpoint)

    return new NextResponse(data, {
      headers: { 'content-type': 'application/zip', 'content-disposition': 'attachment; filename=bulk-download.zip' },
    })
  } catch (error) {
    logger.error('POST /api/download proxy endpoint failed')
    logger.error(error)

    return redirect('/error')
  }
}
