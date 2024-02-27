import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'

export async function GET(req: NextRequest) {
  try {
    const searchParams = new URL(req.url).searchParams

    if (!searchParams.has('endpoint')) {
      throw new Error('download api route handler - missing endpoint')
    }

    const endpoint = searchParams.get('endpoint') as string

    logger.info('Triggering download to %s', endpoint)

    const { data, error, headers } = await client<string>(endpoint, { searchParams })

    if (error || !data) {
      throw error
    }

    logger.info(`GET %s success`, endpoint)

    return new NextResponse(data, { headers })
  } catch (error) {
    logger.error('GET /api/download proxy endpoint failed')
    logger.error(error)

    return redirect('/error')
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData()

    if (!body.has('endpoint')) {
      throw new Error('download api route handler - missing endpoint')
    }

    const endpoint = body.get('endpoint') as string

    logger.info('Triggering download to %s', endpoint)

    const searchParams = new URLSearchParams()

    if (body.has('file_format')) {
      searchParams.set('file_format', body.get('file_format') as string)
    }

    const { data, error, headers } = await client<string>(endpoint, { searchParams })

    if (error || !data) {
      throw error
    }

    logger.info(`POST %s success`, endpoint)

    return new NextResponse(data, { headers })
  } catch (error) {
    logger.error('POST /api/download proxy endpoint failed')
    logger.error(error)

    return redirect('/error')
  }
}
