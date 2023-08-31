import { NextRequest, NextResponse } from 'next/server'

import { logger } from '@/lib/logger'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    if (!formData.has('category') || !formData.has('topic')) {
      console.log('Handle error')
    }

    const category = formData.get('category')
    const topic = formData.get('topic')

    const url = new URL(req.headers.get('referer') || '')

    if (formData.has('geographyType')) {
      url.searchParams.set('geographyType', formData.get('geographyType') as string)
    }

    if (formData.has('geography')) {
      url.searchParams.set('geography', formData.get('geography') as string)
    }

    url.pathname = `/topics/${topic}/${category}`

    console.log('success')

    return NextResponse.redirect(url, 302)
  } catch (error) {
    const url = new URL(req.headers.get('referer') || '')
    logger.trace('fail')
    url.searchParams.set('error', '1')
    return NextResponse.redirect(url, 302)
  }
}
