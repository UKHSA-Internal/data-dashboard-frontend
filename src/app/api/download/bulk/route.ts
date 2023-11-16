import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

import { client } from '@/api/api-utils'
import { logger } from '@/lib/logger'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.headers.get('origin') || '')

  if (!searchParams.has('file_format')) {
    logger.info('bulk download api route handler - missing format')
    redirect('/error')
  }

  logger.info('Triggering bulk download')

  const { data, error } = await client<string>(`bulkdownloads/v1?file_format=${searchParams.get('file_format')}`).catch(
    (error) => {
      logger.info('bulkdownloads/v1 error', error)
      redirect('/error')
    }
  )

  if (error || !data) {
    logger.info('bulk download api route handler error', error)
    redirect('/error')
  }

  return new NextResponse(data, {
    headers: { 'content-type': 'text/csv', 'content-disposition': 'attachment; filename=data.csv' },
  })
}
