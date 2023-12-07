import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

import { client } from '@/api/api-utils'
import { logger } from '@/lib/logger'

export async function POST(req: NextRequest) {
  const body = await req.formData()

  if (!body.has('file_format')) {
    logger.info('bulk download api route handler - missing format')
    redirect('/error')
  }

  logger.info('Triggering bulk download')

  const searchParams = new URLSearchParams()
  searchParams.set('file_format', (body.get('file_format') as string) || 'csv')

  const { data, error } = await client<string>('bulkdownloads/v1', { searchParams }).catch((error) => {
    logger.info('bulkdownloads/v1 error', error)
    redirect('/error')
  })

  if (error || !data) {
    logger.info('bulk download api route handler error', error)
    return redirect('/error')
  }

  return new NextResponse(data, {
    headers: { 'content-type': 'application/zip', 'content-disposition': 'attachment; filename=bulk-download.zip' },
  })
}
