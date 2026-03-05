import { Request, Response } from 'express'

import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'
import { getSwitchBoardState } from '@/app/(pages)/switchboard/shared/state'
import { logger } from '@/lib/logger'

import { covid19PageMock, respiratoryVirusesMock } from '../cms/pages/fixtures/page'

const normalizeSlug = (rawSlug: string) => {
  return rawSlug
    .split('/')
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment))
    .join('/')
}

const draftCoverMock: PageResponse<PageType.Composite> = {
  ...respiratoryVirusesMock,
  title: 'Cover',
  meta: {
    ...respiratoryVirusesMock.meta,
    seo_title: 'Cover | UKHSA data dashboard',
    search_description: 'Draft cover page preview',
    html_url: 'http://localhost:3000/cover/',
    slug: 'cover',
  },
}

const draftsMap: Record<string, PageResponse<PageType>> = {
  cover: draftCoverMock,
  'respiratory-viruses/covid-19': covid19PageMock,
}

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    const {
      api: {
        pages: {
          detail: { status },
        },
      },
    } = getSwitchBoardState(req.headers.cookie)

    const authHeader = req.headers.authorization

    if (!authHeader?.toLowerCase().startsWith('bearer ')) {
      return res.status(401).json({ message: 'missing or invalid authorization header' })
    }

    const rawSlug = req.params[0]

    if (!rawSlug) {
      return res.status(400).json({ message: 'missing draft slug' })
    }

    const slug = normalizeSlug(rawSlug)
    const page = draftsMap[slug]

    if (!page) {
      return res.status(404).json({ message: 'page not found' })
    }

    return res.status(status).json(page)
  } catch (error) {
    logger.error(error)
    let message = 'unknown error occurred'

    if (error instanceof Error) {
      message = error.message
    }

    return res.status(500).json({ message })
  }
}
